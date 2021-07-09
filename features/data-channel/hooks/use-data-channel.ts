import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { ReadyState } from 'react-use-websocket';
import SimplePeer from 'simple-peer';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useCreateTicketMutation } from '../../../app/services/auth';
import useSyncedRef from '../../../common/hooks/use-synced-ref';
import { addContact } from '../../contacts/contacts.slice';
import {
  addMessage,
  markMessageDelivered,
  markMessageRead,
  setConnectionStatus,
  setParticipant,
} from '../../conversation/conversation-slice';
import { sendNotification } from '../../notifications/utils/notification.utils';
import {
  setConnectedToSignalingServer,
  setWebSocketReadyState,
} from '../data-channel.slice';
import {
  isPreSignalMessage,
  isSignalMessage,
  Message,
} from '../interfaces/message';
import { DataChannelEvent } from '../types/data-channel.event';
import {
  callEndEvent,
  deliveryReceiptEvent,
  readReceiptEvent,
  textMessageEvent,
} from '../utils/data-channel-event.utils';
import useWebSocket from './use-web-socket';
export interface SocketProviderProps {
  children?: ReactNode;
}

export default function useDataChannel() {
  const auth = useAppSelector((state) => state.auth);
  const id = auth.status === 'authenticated' ? auth.id : null;
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const conversation = useAppSelector((state) => state.conversation);
  const dispatch = useAppDispatch();
  const [ticket, setTicket] = useState('');
  const [createTicket] = useCreateTicketMutation();

  const settings = useAppSelector((state) => state.settings.notifications);
  const notificationSettings = useSyncedRef(settings);

  const [peerStream, setPeerStream] = useState<MediaStream>();
  const [selfStream, setSelfStream] = useState<MediaStream>();
  const selfStreamRef = useSyncedRef(selfStream);

  const activeContact = useMemo(() => {
    return contacts.find(
      (contact) => contact.id === conversation.otherParticipant,
    );
  }, [contacts, conversation.otherParticipant]);

  const [peer, setPeer] = useState<SimplePeer.Instance>();

  const sendDataChannelEvent = useCallback(
    (event: DataChannelEvent) => {
      peer?.send(JSON.stringify(event));
    },
    [peer],
  );

  // Cleanup and close the connection
  useEffect(() => {
    return () => peer?.destroy();
  }, [peer]);

  const socketUrl =
    auth.status === 'authenticated' &&
    process.env.NEXT_PUBLIC_SIGNALING_SERVER &&
    ticket
      ? `${process.env.NEXT_PUBLIC_SIGNALING_SERVER}?ticket=${ticket}`
      : null;

  const { readyState, sendMessage: sendWebSocketMessage } = useWebSocket(
    socketUrl,
    {
      onClose: () => dispatch(setConnectedToSignalingServer(false)),
      onMessage: (ev: MessageEvent) => {
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
    },
  );

  useEffect(() => {
    if (auth.status === 'authenticated') {
      createTicket()
        .unwrap()
        .then(({ ticket }) => {
          setTicket(ticket);
          dispatch(setConnectedToSignalingServer(true));
        });
    }
  }, [auth.status, createTicket, dispatch]);

  useEffect(() => {
    dispatch(setWebSocketReadyState(readyState));
  }, [dispatch, readyState]);

  // Keep the WebSocket connection open
  useEffect(() => {
    const pingDelay = Number(
      process.env.NEXT_PUBLIC_SIGNALING_SERVER_PING_INTERVAL,
    );
    if (readyState === ReadyState.OPEN && pingDelay) {
      const pingInterval = setInterval(
        () => sendWebSocketMessage({ event: 'ping' }),
        pingDelay,
      );
      return () => clearInterval(pingInterval);
    }
  }, [readyState, sendWebSocketMessage]);

  // Send a pre-signal event to the peer
  const preSignal = useCallback(
    (id: string, type: 'initiate' | 'accept') => {
      sendWebSocketMessage({
        event: 'pre-signal',
        data: { type, recipientId: id },
      });
    },
    [sendWebSocketMessage],
  );

  // Send signal data to the peer
  const signal = useCallback(
    (id: string, data: unknown) => {
      sendWebSocketMessage({
        event: 'signal',
        data: { recipientId: id, signalData: data },
      });
    },
    [sendWebSocketMessage],
  );

  const sendTextMessage = useCallback(
    (text: string) => {
      const message = textMessageEvent(text);
      dispatch(
        addMessage({
          ...message,
          sender: id,
          recipient: conversation.otherParticipant,
          receivedDate: null,
          readDate: null,
        }),
      );
      sendDataChannelEvent(message);
    },
    [conversation.otherParticipant, dispatch, id, sendDataChannelEvent],
  );

  const sendDeliveryReceipt = useCallback(
    (messageId: string, receivedDate: string) => {
      sendDataChannelEvent(deliveryReceiptEvent(messageId, receivedDate));
    },
    [sendDataChannelEvent],
  );

  const sendReadReceipt = useCallback(
    (messageId: string, readDate: string) => {
      sendDataChannelEvent(readReceiptEvent(messageId, readDate));
    },
    [sendDataChannelEvent],
  );

  const initializeMediaStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setSelfStream(stream);
    peer?.addStream(stream);
    return stream;
  }, [peer]);

  useEffect(() => {
    // Send signal data to peer when available
    const handleSignal = (data: unknown) => {
      if (conversation.otherParticipant !== null) {
        signal(conversation.otherParticipant, data);
      }
    };
    // Handle data being sent along the channel
    const handleData = (data: string) => {
      const event: DataChannelEvent = JSON.parse(data);
      if (event.type === 'text') {
        const message = {
          ...event,
          receivedDate: new Date().toISOString(),
          readDate: null,
          sender: conversation.otherParticipant,
          recipient: id,
        };
        if (notificationSettings.current.enabled) {
          sendNotification(activeContact?.username ?? '', {
            body: notificationSettings.current.messagePreview
              ? message.payload
              : undefined,
            silent: notificationSettings.current.silent,
          });
        }

        dispatch(addMessage(message));
        sendDeliveryReceipt(message.id, message.receivedDate);
      } else if (event.type === 'delivery receipt') {
        dispatch(
          markMessageDelivered({
            id: event.payload.messageId,
            date: event.payload.receivedDate,
          }),
        );
      } else if (event.type === 'read receipt') {
        dispatch(
          markMessageRead({
            id: event.payload.messageId,
            date: event.payload.readDate,
          }),
        );
      } else if (event.type === 'call end') {
        if (selfStreamRef.current) {
          selfStreamRef.current.getTracks().forEach((track) => {
            track.stop();
          });
          peer?.removeStream(selfStreamRef.current);
        }
        setPeerStream(undefined);
        setSelfStream(undefined);
      }
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
    const handleStream = (stream: MediaStream) => {
      setPeerStream(stream);
      if (!selfStreamRef.current) {
        initializeMediaStream();
      }
    };
    peer?.on('signal', handleSignal);
    peer?.on('data', handleData);
    peer?.on('stream', handleStream);
    peer?.on('connect', handleConnect);
    peer?.on('close', handleClose);
    peer?.on('error', handleError);
    return () => {
      peer?.off('signal', handleSignal);
      peer?.off('data', handleData);
      peer?.off('stream', handleStream);
      peer?.off('connect', handleConnect);
      peer?.off('close', handleClose);
      peer?.off('error', handleError);
    };
  }, [
    activeContact?.username,
    conversation.otherParticipant,
    dispatch,
    id,
    initializeMediaStream,
    notificationSettings,
    peer,
    selfStreamRef,
    sendDeliveryReceipt,
    signal,
  ]);

  const connectToPeer = useCallback(
    (id: string) => preSignal(id, 'initiate'),
    [preSignal],
  );

  const startVideoCall = useCallback(() => {
    initializeMediaStream().catch(console.error);
  }, [initializeMediaStream]);

  const endVideoCall = useCallback(() => {
    sendDataChannelEvent(callEndEvent());
    selfStreamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });
    if (selfStreamRef.current) {
      peer?.removeStream(selfStreamRef.current);
    }
    setSelfStream(undefined);
    setPeerStream(undefined);
  }, [peer, selfStreamRef, sendDataChannelEvent]);

  return {
    sendTextMessage,
    sendReadReceipt,
    connectToPeer,
    startVideoCall,
    endVideoCall,
    peerStream,
  };
}
