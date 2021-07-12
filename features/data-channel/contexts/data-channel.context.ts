import { createContext } from 'react';

type DataChannel = {
  sendTextMessage: (text: string) => void;
  sendReadReceipt: (messageId: string, readDate: string) => void;
  connectToPeer: (id: string) => void;
  startVideoCall: () => void;
  endVideoCall: () => void;
  toggleAudio: () => void;
  toggleVideo: () => void;
  selfStreamUnstable: boolean;
  audioEnabled: boolean;
  videoEnabled: boolean;
  peerStream: MediaStream | undefined;
};

export const DataChannelContext = createContext<DataChannel | undefined>(
  undefined,
);
