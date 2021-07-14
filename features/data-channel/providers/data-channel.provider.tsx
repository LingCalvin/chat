import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import SimplePeer from 'simple-peer';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addContact } from '../../contacts/contacts.slice';
import {
  setConnectionStatus,
  setParticipant,
} from '../../conversation/conversation-slice';
import { useSignalingServerConnection } from '../../signaling/hooks/use-signaling-server-connection';
import {
  isPreSignalMessage,
  isSignalMessage,
  Message,
} from '../../signaling/interfaces/message';
import { DataChannelContext, Listener } from '../contexts/data-channel.context';
import useStreamWrapper from '../hooks/use-stream-wrapper';
import {
  DataChannelMessage,
  MessageType,
} from '../interfaces/data-channel-messages';
import { dataChannelEvent } from '../utils/data-channel-event.utils';

export interface DataChannelProviderProps {
  children?: ReactNode;
}

export default function DataChannelProvider({
  children,
}: DataChannelProviderProps) {
  const id = useAppSelector((state) =>
    state.auth.status === 'authenticated' ? state.auth.id : null,
  );
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const conversation = useAppSelector((state) => state.conversation);
  const dispatch = useAppDispatch();

  const selfStreamWrapper = useStreamWrapper();
  const { stream: peerStream, setStream: setPeerStream } = useStreamWrapper();

  const activeContact = useMemo(() => {
    return contacts.find(
      (contact) => contact.id === conversation.otherParticipant,
    );
  }, [contacts, conversation.otherParticipant]);

  const eventListeners = useRef<{ [index in MessageType]: Set<Listener> }>({
    [MessageType.DeliveryReceipt]: new Set(),
    [MessageType.ReadReceipt]: new Set(),
    [MessageType.Text]: new Set(),
    [MessageType.VideoCallAccept]: new Set(),
    [MessageType.VideoCallDecline]: new Set(),
    [MessageType.VideoCallInitiate]: new Set(),
    [MessageType.VideoCallLeave]: new Set(),
  });

  const addEventListener = useCallback(
    (type: MessageType, listener: Listener) => {
      eventListeners.current[type].add(listener);
    },
    [],
  );

  const removeEventListener = useCallback(
    (type: MessageType, listener: Listener) => {
      eventListeners.current[type].delete(listener);
    },
    [],
  );

  const [peer, setPeer] = useState<SimplePeer.Instance>();

  const sendDataChannelMessage = useCallback(
    (message: DataChannelMessage) => {
      peer?.send(JSON.stringify(message));
      eventListeners.current[message.type].forEach((listener) => {
        if (!id) {
          console.warn(
            `DataChannelMessage sender ID is unknown. Correct value should be authenticated client's ID`,
            `Current ID: ${id}`,
            message,
          );
        }
        if (!activeContact?.id) {
          throw new Error(
            'Cannot send message to recipient with an undefined ID.',
          );
        }
        listener(dataChannelEvent(message, activeContact.id, id ?? 'UNKNOWN'));
      });
    },
    [activeContact?.id, id, peer],
  );

  // Cleanup and close the connection
  useEffect(() => {
    return () => peer?.destroy();
  }, [peer]);

  const { sendMessage: sendSignalingServerMessage, setOnMessage } =
    useSignalingServerConnection();

  // Send a pre-signal event to the peer
  const preSignal = useCallback(
    (id: string, type: 'initiate' | 'accept') => {
      sendSignalingServerMessage({
        event: 'pre-signal',
        data: { type, recipientId: id },
      });
    },
    [sendSignalingServerMessage],
  );

  useEffect(() => {
    setOnMessage((ev: MessageEvent | undefined) => {
      if (ev === undefined) {
        return;
      }
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
    });
  }, [contacts, dispatch, peer, preSignal, setOnMessage]);

  // Send signal data to the peer
  const signal = useCallback(
    (id: string, data: unknown) => {
      sendSignalingServerMessage({
        event: 'signal',
        data: { recipientId: id, signalData: data },
      });
    },
    [sendSignalingServerMessage],
  );

  useEffect(() => {
    // Send signal data to peer when available
    const handleSignal = (data: unknown) => {
      if (conversation.otherParticipant !== null) {
        signal(conversation.otherParticipant, data);
      }
    };
    // Handle data being sent along the channel
    const handleData = (data: string) => {
      const message: DataChannelMessage = JSON.parse(data);
      eventListeners.current[message.type].forEach((listener) => {
        if (!activeContact?.id) {
          console.warn('DataChannelMessage sender is unknown.', message);
        }
        const event = dataChannelEvent(
          message,
          id ?? 'UNKNOWN',
          activeContact?.id ?? 'UNKNOWN',
        );
        listener(event);
      });
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
    activeContact?.id,
    conversation.otherParticipant,
    dispatch,
    id,
    peer,
    setPeerStream,
    signal,
  ]);

  const connectToPeer = useCallback(
    (id: string) => preSignal(id, 'initiate'),
    [preSignal],
  );

  const addStream = useCallback(
    (stream: MediaStream) => {
      peer?.addStream(stream);
    },
    [peer],
  );

  const removeStream = useCallback(
    (stream: MediaStream) => {
      peer?.removeStream(stream);
    },
    [peer],
  );

  const clearPeerStream = useCallback(() => {
    setPeerStream(undefined);
  }, [setPeerStream]);

  const value = useMemo(
    () => ({
      connectToPeer,
      peerStream,
      selfStream: selfStreamWrapper,
      addEventListener,
      removeEventListener,
      sendMessage: sendDataChannelMessage,
      addStream,
      removeStream,
      clearPeerStream,
    }),
    [
      connectToPeer,
      peerStream,
      selfStreamWrapper,
      addEventListener,
      removeEventListener,
      sendDataChannelMessage,
      addStream,
      removeStream,
      clearPeerStream,
    ],
  );

  return (
    <DataChannelContext.Provider value={value}>
      {children}
    </DataChannelContext.Provider>
  );
}
