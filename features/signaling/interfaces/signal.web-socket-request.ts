export interface SignalWebSocketRequest {
  event: 'signal';
  data: { recipientId: string; signalData: unknown };
}
