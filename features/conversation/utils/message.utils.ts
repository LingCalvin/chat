import { TextMessage } from '../interfaces/text.message';

export function getStatus(
  message: TextMessage,
): 'sent' | 'delivered' | 'read' | 'unknown' {
  if (message.readDate) {
    return 'read';
  }
  if (message.receivedDate) {
    return 'delivered';
  }
  if (message.sentDate) {
    return 'sent';
  }
  return 'unknown';
}
