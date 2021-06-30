import { createContext } from 'react';
import usePeerToPeerConnection from '../hooks/use-peer-to-peer-connection';

export type PeerConnection = ReturnType<typeof usePeerToPeerConnection>;

const PeerConnectionContext = createContext<PeerConnection>({
  selfId: undefined,
  peerId: undefined,
  status: 'uninitialized',
  connectToPeer: () => {},
  sendMessage: () => {},
  messages: [],
});

export default PeerConnectionContext;
