import { DataChannelMessage } from './data-channel-messages';

export interface DataChannelEvent {
  /** The timestamp of when the {@link DataChannelEvent.message} was received. */
  timestamp: string;
  /** The ID of the sender of {@link DataChannelEvent.message}. */
  senderId: string;
  /** The message that was sent. */
  message: DataChannelMessage;
}
