import { DataChannelEvent } from '../interfaces/data-channel-events';
import { DataChannelMessage } from '../interfaces/data-channel-messages';

export function dataChannelEvent(
  message: DataChannelMessage,
  senderId: string,
): DataChannelEvent {
  return {
    timestamp: new Date().toISOString(),
    senderId,
    message,
  };
}
