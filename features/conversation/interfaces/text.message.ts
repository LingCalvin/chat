import { TextMessageEvent } from '../../data-channel/interfaces/text-message.event';

export interface TextMessage extends TextMessageEvent {
  sender: string | null;
  recipient: string | null;
  receivedDate: string | null;
  readDate: string | null;
}
