import { createContext } from 'react';
import useDataChannel from '../hooks/use-data-channel';

type DataChannel = ReturnType<typeof useDataChannel>;

const DataChannelContext = createContext<DataChannel>({
  connectToPeer: () => {},
  sendReadReceipt: () => {},
  sendTextMessage: () => {},
  startVideoCall: () => {},
  endVideoCall: () => {},
  peerStream: undefined,
});

export default DataChannelContext;
