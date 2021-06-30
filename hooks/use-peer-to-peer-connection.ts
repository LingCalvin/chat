import Peer, { DataConnection } from 'peerjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TextMessage } from '../types/message';

type ConnectionStatus = 'uninitialized' | 'initializing' | 'open' | 'closed';

export default function usePeerToPeerConnection() {
  const self = useRef<Peer>();
  const [connection, setConnection] = useState<DataConnection>();
  const [selfId, setSelfId] = useState<string>();
  const [status, setStatus] = useState<ConnectionStatus>('uninitialized');
  const [messages, setMessages] = useState<
    (TextMessage & {
      sender: string;
      recipient: string;
      receivedDate: string;
    })[]
  >([]);

  useEffect(() => {
    let connected = false;
    import('peerjs').then(({ default: Peer }) => {
      const peer = new Peer();
      self.current = peer;
      peer.on('open', setSelfId);
      peer.on('close', () => console.warn('peer closed'));
      peer.on('connection', (con) => {
        // Only allow one connection
        if (connected) {
          con.close();
        } else {
          connected = true;
          setConnection(con);
        }
      });
      peer.on('disconnected', () => console.warn('peer disconnected'));
      peer.on('error', console.error);
    });
    return () => self.current?.destroy();
  }, []);

  useEffect(() => {
    // Event handlers
    const handleData = (data: TextMessage) => {
      setMessages((state) => [
        ...state,
        {
          ...data,
          sender: connection?.peer ?? 'unknown',
          recipient: self.current?.id ?? 'unknown',
          receivedDate: new Date().toISOString(),
        },
      ]);
    };
    const handleOpen = () => {
      setStatus('open');
    };
    const handleClose = () => {
      setStatus('closed');
    };
    const handleError = console.error;

    // Set event handlers
    connection?.on('data', handleData);
    connection?.on('open', handleOpen);
    connection?.on('close', handleClose);
    connection?.on('error', handleError);

    // Remove event handlers
    return () => {
      connection?.off('data', handleData);
      connection?.off('open', handleOpen);
      connection?.off('close', handleClose);
      connection?.off('error', handleError);
    };
  }, [connection]);

  const connectToPeer = useCallback(
    (id: string) => {
      connection?.close();
      setStatus('initializing');
      setConnection(
        self.current?.connect(id, { serialization: 'json', reliable: true }),
      );
    },
    [connection],
  );

  const sendMessage = useCallback(
    (text: string) => {
      const msg: TextMessage = {
        type: 'text',
        sentDate: new Date().toISOString(),
        payload: text,
      };
      connection?.send(msg);
      setMessages((state) => [
        ...state,
        {
          ...msg,
          sender: self.current?.id ?? 'unknown',
          recipient: connection?.peer ?? 'unknown',
          receivedDate: 'unknown',
        },
      ]);
    },
    [connection],
  );

  return {
    selfId,
    status,
    peerId: connection?.peer,
    connectToPeer,
    sendMessage,
    messages,
  };
}
