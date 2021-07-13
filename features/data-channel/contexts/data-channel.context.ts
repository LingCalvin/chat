import { createContext } from 'react';
import { DataChannelEvent } from '../interfaces/data-channel-events';
import {
  DataChannelMessage,
  MessageType,
} from '../interfaces/data-channel-messages';

export type Listener = (event: DataChannelEvent) => void;

type DataChannel = {
  connectToPeer: (id: string) => void;
  startVideoCall: () => void;
  endVideoCall: () => void;
  toggleAudio: () => void;
  toggleVideo: () => void;
  addEventListener: (type: MessageType, listener: Listener) => void;
  removeEventListener: (type: MessageType, listener: Listener) => void;
  sendMessage: (message: DataChannelMessage) => void;
  selfStreamUnstable: boolean;
  audioEnabled: boolean;
  videoEnabled: boolean;
  peerStream: MediaStream | undefined;
};

export const DataChannelContext = createContext<DataChannel | undefined>(
  undefined,
);
