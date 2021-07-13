export interface PreSignalWebSocketRequest {
  event: 'pre-signal';
  data: { type: 'initiate' | 'accept'; recipientId: string };
}
