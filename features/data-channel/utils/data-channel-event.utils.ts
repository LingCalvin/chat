import { DataChannelEvent } from '../interfaces/data-channel-events';
import { DataChannelMessage } from '../interfaces/data-channel-messages';

export function dataChannelEvent(
  message: DataChannelMessage,
  recipientId: string,
  senderId: string,
): DataChannelEvent {
  return {
    timestamp: new Date().toISOString(),
    recipientId,
    senderId,
    message,
  };
}
