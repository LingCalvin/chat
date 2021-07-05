import { ReactNode, useCallback, useEffect, useState } from 'react';
import SimplePeer from 'simple-peer';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addContact } from '../../contacts/contacts.slice';
import {
  addMessage,
  setConnectionStatus,
  setParticipant,
} from '../../conversation/conversation-slice';
import {
  isPreSignalMessage,
  isSignalMessage,
  Message,
} from '../interfaces/message';

export interface SocketProviderProps {
  children?: ReactNode;
}

export default function useDataChanel() {
  const auth = useAppSelector((state) => state.auth);
  const id = auth.status === 'authenticated' ? auth.id : null;
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const conversation = useAppSelector((state) => state.conversation);
  const dispatch = useAppDispatch();

  const [socket, setSocket] = useState<WebSocket>();
  const [peer, setPeer] = useState<SimplePeer.Instance>();

  // Cleanup and close the connection
  useEffect(() => {
    return () => peer?.destroy();
  }, [peer]);

  const socketUrl =
    auth.status === 'authenticated'
      ? `${process.env.NEXT_PUBLIC_SIGNALING_SERVER}`
      : undefined;

  // Create a socket whenever the access token changes
  useEffect(() => {
    if (socketUrl !== undefined) {
      const webSocket = new WebSocket(socketUrl);
      setSocket(webSocket);
      webSocket.addEventListener('close', console.warn);
      webSocket.addEventListener('error', console.error);
      return () => {
        webSocket.removeEventListener('close', console.warn);
        webSocket.removeEventListener('error', console.error);
        webSocket.close();
      };
    }
  }, [socketUrl]);

  // Send a pre-signal event to the peer
  const preSignal = useCallback(
    (id: string, type: 'initiate' | 'accept') => {
      const sendPreSignal = () =>
        socket?.send(
          JSON.stringify({
            event: 'pre-signal',
            data: { type, recipientId: id },
          }),
        ) ?? (() => {});
      // Send the pre-signal message once the socket is open
      if (socket?.readyState === WebSocket.OPEN) {
        sendPreSignal();
      } else {
        socket?.addEventListener('open', sendPreSignal, { once: true });
      }
    },
    [socket],
  );

  // Send signal data to the peer
  const signal = useCallback(
    (id: string, data: unknown) => {
      socket?.send(
        JSON.stringify({
          event: 'signal',
          data: { recipientId: id, signalData: data },
        }),
      );
    },
    [socket],
  );

  const onMessage = useCallback(
    (ev: MessageEvent) => {
      const message: Message = JSON.parse(ev.data);
      // Handle pre-signal event sent by the initiator
      if (isPreSignalMessage(message) && message.data.type === 'initiate') {
        dispatch(setParticipant({ id: message.data.sender.id }));
        dispatch(addContact(message.data.sender));
        preSignal(message.data.sender.id, 'accept');
        // Create a new peer connection
        setPeer(new SimplePeer());
        // Handle pre-signal event sent by the acceptor
      } else if (
        isPreSignalMessage(message) &&
        message.data.type === 'accept'
      ) {
        dispatch(setParticipant({ id: message.data.sender.id }));
        dispatch(addContact(message.data.sender));
        // Initiate a new peer connection
        setPeer(new SimplePeer({ initiator: true }));
        // Handle signal events sent by known contacts
      } else if (
        isSignalMessage(message) &&
        message.data.signalData &&
        contacts.some((contact) => contact.id === message.data.sender.id)
      ) {
        peer?.signal(message.data.signalData);
      }
    },
    [contacts, dispatch, peer, preSignal],
  );
  const sendMessage = useCallback(
    (text: string) => {
      const message = {
        type: 'text',
        sendDate: new Date().toISOString(),
        payload: text,
      };
      dispatch(
        addMessage({
          ...message,
          type: 'text',
          sender: id,
          recipient: conversation.otherParticipant,
          sentDate: new Date().toISOString(),
          receivedDate: null,
        }),
      );
      peer?.send(JSON.stringify(message));
    },
    [conversation.otherParticipant, dispatch, id, peer],
  );

  // Subscribe to socket messages
  useEffect(() => {
    socket?.addEventListener('message', onMessage);
    return () => socket?.removeEventListener('message', onMessage);
  }, [onMessage, socket]);

  useEffect(() => {
    // Send signal data to peer when available
    const handleSignal = (data: unknown) => {
      if (conversation.otherParticipant !== null) {
        signal(conversation.otherParticipant, data);
      }
    };
    // Handle data being sent along the channel
    const handleData = (data: any) => {
      const message: {
        type: 'text';
        sentDate: string;
        payload: string;
      } = JSON.parse(data);
      dispatch(
        addMessage({
          ...message,
          receivedDate: new Date().toISOString(),
          sender: conversation.otherParticipant,
          recipient: id,
        }),
      );
    };
    const handleConnect = () => {
      dispatch(setConnectionStatus('connected'));
    };
    const handleClose = () => {
      dispatch(setConnectionStatus('closed'));
    };
    const handleError = (e: Error) => {
      console.error(e);
      dispatch(setConnectionStatus('closed'));
    };
    peer?.on('signal', handleSignal);
    peer?.on('data', handleData);
    peer?.on('connect', handleConnect);
    peer?.on('close', handleClose);
    peer?.on('error', handleError);
    return () => {
      peer?.off('signal', handleSignal);
      peer?.off('data', handleData);
      peer?.off('connect', handleConnect);
      peer?.off('close', handleClose);
      peer?.off('error', handleError);
    };
  }, [conversation.otherParticipant, dispatch, id, peer, sendMessage, signal]);

  const connectToPeer = useCallback(
    (id: string) => {
      preSignal(id, 'initiate');
    },
    [preSignal],
  );
  return { sendMessage, connectToPeer };
}
