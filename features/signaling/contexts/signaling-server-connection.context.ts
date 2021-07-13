import { createContext } from 'react';
import { Options, ReadyState } from 'react-use-websocket';
import { WebSocketRequest } from '../types/web-socket-request';

type SignalingServerConnection = {
  readyState: ReadyState;
  sendMessage: (message: WebSocketRequest) => void;
  setOnMessage: (callback: Options['onMessage'] | undefined) => void;
};
export const SignalingServerConnectionContext = createContext<
  SignalingServerConnection | undefined
>(undefined);
