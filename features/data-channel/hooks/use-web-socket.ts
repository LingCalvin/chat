import { useCallback, useEffect } from 'react';
import useReactWebSocket, { Options, ReadyState } from 'react-use-websocket';
import { WebSocketRequest } from '../types/web-socket-request';

// How often to ping the server
const pingDelay = Number(
  process.env.NEXT_PUBLIC_SIGNALING_SERVER_PING_INTERVAL,
);

export default function useWebSocket(
  url: string | (() => string | Promise<string>) | null,
  options?: Options,
  connect?: boolean,
) {
  const { readyState, sendJsonMessage } = useReactWebSocket(
    url,
    options,
    connect,
  );

  const sendMessage = useCallback(
    (message: WebSocketRequest) => {
      sendJsonMessage(message);
    },
    [sendJsonMessage],
  );

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

  return { readyState, sendMessage };
}
