import { createContext } from 'react';
import useDataChanel from '../hooks/use-data-channel';

type DataChannel = ReturnType<typeof useDataChanel>;

const DataChannelContext = createContext<DataChannel>({
  sendMessage: () => {},
  connectToPeer: () => {},
});

export default DataChannelContext;
