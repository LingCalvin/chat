import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import useWebSocket, { Options, ReadyState } from 'react-use-websocket';
import { useAppDispatch } from '../../../app/hooks';
import useTicket from '../../auth/hooks/use-ticket';
import { pingDelay } from '../constants/ping';
import { SignalingServerConnectionContext } from '../contexts/signaling-server-connection.context';
import { setSignalingServerReadyState } from '../data-channel.slice';
import { WebSocketRequest } from '../types/web-socket-request';
import { generateWebSocketUrl } from '../utils/web-socket.utils';

export interface SignalingServerConnectionProviderProps {
  children?: ReactNode;
}

export function SignalingServerConnectionProvider({
  children,
}: SignalingServerConnectionProviderProps) {
  const [onMessage, setOnMessageInternal] = useState<
    Options['onMessage'] | undefined
  >();
  // NOTE: The setState function for onMessage needs to be wrapped because
  // setState accepts a function used to generate the next state based on the
  // current state
  const setOnMessage = useCallback(
    (onMessage: Options['onMessage'] | undefined) =>
      setOnMessageInternal(() => onMessage),
    [],
  );
  const dispatch = useAppDispatch();
  const ticket = useTicket();

  const { readyState, sendJsonMessage } = useWebSocket(
    generateWebSocketUrl(ticket),
    { onMessage },
  );

  const sendMessage = useCallback(
    (message: WebSocketRequest) => {
      sendJsonMessage(message);
    },
    [sendJsonMessage],
  );

  useEffect(() => {
    dispatch(setSignalingServerReadyState(readyState));
  }, [dispatch, readyState]);

  // Keep the connection open
  useEffect(() => {
    if (readyState === ReadyState.OPEN && pingDelay) {
      const pingInterval = setInterval(
        () => sendMessage({ event: 'ping' }),
        pingDelay,
      );
      return () => clearInterval(pingInterval);
    }
  }, [readyState, sendMessage]);

  const value = useMemo(
    () => ({
      readyState,
      sendMessage,
      setOnMessage,
    }),
    [readyState, sendMessage, setOnMessage],
  );

  return (
    <SignalingServerConnectionContext.Provider value={value}>
      {children}
    </SignalingServerConnectionContext.Provider>
  );
}
