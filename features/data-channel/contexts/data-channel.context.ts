import { createContext } from 'react';
import useStreamWrapper from '../hooks/use-stream-wrapper';
import { DataChannelEvent } from '../interfaces/data-channel-events';
import {
  DataChannelMessage,
  MessageType,
} from '../interfaces/data-channel-messages';

export type Listener = (event: DataChannelEvent) => void;

type DataChannel = {
  connectToPeer: (id: string) => void;
  addEventListener: (type: MessageType, listener: Listener) => void;
  removeEventListener: (type: MessageType, listener: Listener) => void;
  sendMessage: (message: DataChannelMessage) => void;
  peerStream: MediaStream | undefined;
  selfStream: ReturnType<typeof useStreamWrapper>;
  addStream: (stream: MediaStream) => void;
  removeStream: (stream: MediaStream) => void;
  clearPeerStream: () => void;
};

export const DataChannelContext = createContext<DataChannel | undefined>(
  undefined,
);
