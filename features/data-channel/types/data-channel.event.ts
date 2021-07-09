import { CallEndEvent } from '../interfaces/call-end.event';
import { DeliveryReceiptEvent } from '../interfaces/delivery-receipt.event';
import { ReadReceiptEvent } from '../interfaces/read-receipt.event';
import { TextMessageEvent } from '../interfaces/text-message.event';

export type DataChannelEvent =
  | CallEndEvent
  | DeliveryReceiptEvent
  | ReadReceiptEvent
  | TextMessageEvent;
