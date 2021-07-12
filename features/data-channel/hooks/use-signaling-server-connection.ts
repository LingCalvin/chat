import { useContext } from 'react';
import { SignalingServerConnectionContext } from '../contexts/signaling-server-connection.context';

export function useSignalingServerConnection() {
  const context = useContext(SignalingServerConnectionContext);
  if (context === undefined) {
    throw new Error(
      'useSignalingServerConnection must be used within a SignalingServerProvider',
    );
  }
  return context;
}
