export interface ReadReceiptEvent {
  id: string;
  type: 'read receipt';
  payload: { messageId: string; readDate: string };
  sentDate: string;
}
