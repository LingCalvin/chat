import { PingWebSocketRequest } from '../interfaces/ping.web-socket-request';
import { PreSignalWebSocketRequest } from '../interfaces/pre-signal.web-socket-request';
import { SignalWebSocketRequest } from '../interfaces/signal.web-socket-request';

export type WebSocketRequest =
  | PingWebSocketRequest
  | PreSignalWebSocketRequest
  | SignalWebSocketRequest;
