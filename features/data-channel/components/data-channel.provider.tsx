import { ReactNode } from 'react';
import DataChannelContext from '../contexts/data-channel.context';
import useDataChannel from '../hooks/use-data-channel';

export interface DataChannelProviderProps {
  children?: ReactNode;
}

export default function DataChannelProvider({
  children,
}: DataChannelProviderProps) {
  const channel = useDataChannel();

  return (
    <DataChannelContext.Provider value={channel}>
      {children}
    </DataChannelContext.Provider>
  );
}
