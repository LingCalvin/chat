import { v4 as uuidv4 } from 'uuid';
import {
  BaseMessage,
  DeliveryReceiptMessage,
  MessageType,
  ReadReceiptMessage,
  TextMessage,
  VideoCallAcceptMessage,
  VideoCallInitiateMessage,
  VideoCallLeaveMessage,
  VideoCallRejectMessage,
  VideoCallRescindMessage,
} from '../interfaces/data-channel-messages';

/**
 * Returns a unique identifier.
 * @internal
 *
 * @remarks
 *
 * This function returning a UUID is an implementation detail and the format of
 * the string returned should not be relied upon.
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
 * @internal
 */
function baseMessage(): Omit<BaseMessage, 'type' | 'payload'> {
  return { id: uid(), timestamp: getTimestamp() };
}
/**
 * @internal
 */
function message<T extends MessageType, U>(type: T, payload: U) {
  return { ...baseMessage(), type, payload };
}

export function deliveryReceiptMessage(
  messageId: string,
): DeliveryReceiptMessage {
  return message(MessageType.DeliveryReceipt, { messageId });
}

export function readReceiptMessage(messageId: string): ReadReceiptMessage {
  return message(MessageType.ReadReceipt, { messageId });
}

export function textMessage(payload: { body: string }): TextMessage {
  return { ...baseMessage(), type: MessageType.Text, payload };
}

export function videoCallAcceptMessage(
  messageId: string,
): VideoCallAcceptMessage {
  return message(MessageType.VideoCallAccept, { messageId });
}

export function videoCallInitiateMessage(): VideoCallInitiateMessage {
  const base = baseMessage();
  const timestamp = new Date(base.timestamp);
  const expirationDate = new Date(timestamp.getTime() + 30000).toISOString();
  return {
    ...base,
    type: MessageType.VideoCallInitiate,
    payload: { expirationDate },
  };
}

export function videoCallLeaveMessage(
  messageId: string,
): VideoCallLeaveMessage {
  return message(MessageType.VideoCallLeave, { messageId });
}

export function videoCallRejectMessage(
  messageId: string,
): VideoCallRejectMessage {
  return message(MessageType.VideoCallReject, { messageId });
}

export function videoCallRescindMessage(
  messageId: string,
): VideoCallRescindMessage {
  return message(MessageType.VideoCallRescind, { messageId });
}
