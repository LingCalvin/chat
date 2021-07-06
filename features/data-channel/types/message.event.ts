import { DeliveryReceiptEvent } from '../interfaces/delivery-receipt.event';
import { ReadReceiptEvent } from '../interfaces/read-receipt.event';
import { TextMessageEvent } from '../interfaces/text-message.event';

export type MessageEvent =
  | DeliveryReceiptEvent
  | ReadReceiptEvent
  | TextMessageEvent;
