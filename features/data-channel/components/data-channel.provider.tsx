import { ReactNode } from 'react';
import DataChannelContext from '../contexts/data-channel.context';
import useDataChanel from '../hooks/use-data-channel';

export interface DataChannelProviderProps {
  children?: ReactNode;
}

export default function DataChannelProvider({
  children,
}: DataChannelProviderProps) {
  const channel = useDataChanel();

  return (
    <DataChannelContext.Provider value={channel}>
      {children}
    </DataChannelContext.Provider>
  );
}
