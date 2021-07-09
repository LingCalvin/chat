import { v4 as uuidv4 } from 'uuid';
import { CallEndEvent } from '../interfaces/call-end.event';
import { DeliveryReceiptEvent } from '../interfaces/delivery-receipt.event';
import { ReadReceiptEvent } from '../interfaces/read-receipt.event';
import { TextMessageEvent } from '../interfaces/text-message.event';

/**
 * Returns a unique identifier.
 * @internal
 *
 * @remarks
 *
 * This function returning a UUID is an implementation detail and the format
 * returned should not be relied upon.
 */
function uid(): string {
  return uuidv4();
}
/**
 * Returns the current date as a string in ISO format.
 * @internal
 */
function getTimestamp(): string {
  return new Date().toISOString();
}
/**
 * Returns a {@link CallEndEvent}.
 */
export function callEndEvent(): CallEndEvent {
  return { id: uid(), type: 'call end', sentDate: getTimestamp() };
}
/**
 * Returns a {@link DeliveryReceiptEvent}.
 */
export function deliveryReceiptEvent(
  messageId: string,
  receivedDate: string,
): DeliveryReceiptEvent {
  return {
    id: uid(),
    type: 'delivery receipt',
    payload: { messageId, receivedDate },
    sentDate: getTimestamp(),
  };
}
/**
 * Returns a {@link ReadReceiptEvent}.
 */
export function readReceiptEvent(
  messageId: string,
  readDate: string,
): ReadReceiptEvent {
  return {
    id: uid(),
    type: 'read receipt',
    payload: { messageId, readDate },
    sentDate: getTimestamp(),
  };
}
/**
 * Returns a {@link TextMessageEvent}.
 */
export function textMessageEvent(message: string): TextMessageEvent {
  return {
    id: uid(),
    type: 'text',
    payload: message,
    sentDate: getTimestamp(),
  };
}
