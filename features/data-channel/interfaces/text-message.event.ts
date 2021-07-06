export interface TextMessageEvent {
  id: string;
  type: 'text';
  payload: string;
  sentDate: string;
}
