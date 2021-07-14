export interface TextMessage {
  id: string;
  type: 'TEXT';
  senderId: string;
  recipientId: string;
  sentDate: string;
  readDate: string | null;
  receivedDate: string | null;
  body: string;
}
