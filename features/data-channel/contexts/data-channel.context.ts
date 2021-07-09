import { createContext } from 'react';
import useDataChannel from '../hooks/use-data-channel';

type DataChannel = ReturnType<typeof useDataChannel>;

function noOp() {
  if (process.env.NODE_ENV !== 'production') {
    console.error('No-op function called.');
  }
}

const DataChannelContext = createContext<DataChannel>({
  connectToPeer: noOp,
  sendReadReceipt: noOp,
  sendTextMessage: noOp,
  startVideoCall: noOp,
  endVideoCall: noOp,
  peerStream: undefined,
});

export default DataChannelContext;
