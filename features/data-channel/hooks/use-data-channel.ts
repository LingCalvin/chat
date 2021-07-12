import { useContext } from 'react';
import { DataChannelContext } from '../contexts/data-channel.context';

export function useDataChannel() {
  const context = useContext(DataChannelContext);
  if (context === undefined) {
    throw new Error('useDataChannel must be used within a DataChannelProvider');
  }
  return context;
}
