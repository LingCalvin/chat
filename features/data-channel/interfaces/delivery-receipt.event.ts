export interface DeliveryReceiptEvent {
  id: string;
  type: 'delivery receipt';
  payload: { messageId: string; receivedDate: string };
  sentDate: string;
}
