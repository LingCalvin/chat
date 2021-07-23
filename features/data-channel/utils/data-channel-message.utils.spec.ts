import { MessageType } from '../interfaces/data-channel-messages';
import {
  deliveryReceiptMessage,
  readReceiptMessage,
  textMessage,
  videoCallAcceptMessage,
  videoCallDeclineMessage,
  videoCallInitiateMessage,
  videoCallLeaveMessage,
} from './data-channel-message.utils';

describe('deliveryReceiptMessage', () => {
  const message = deliveryReceiptMessage('0');
  test('returns an object with property type set to MessageType.DeliveryReceipt', () => {
    expect(message.type).toBe(MessageType.DeliveryReceipt);
  });
  test('payload.messageId indicates the specified messageId has been delivered', () => {
    expect(message.payload.messageId).toBe('0');
  });
});

describe('readReceiptMessage', () => {
  const message = readReceiptMessage('0');
  test('returns an object with property type set to MessageType.ReadReceipt', () => {
    expect(message.type).toBe(MessageType.ReadReceipt);
  });
  test('payload.messageId indicates the specified messageId has been read', () => {
    expect(message.payload.messageId).toBe('0');
  });
});

describe('textMessage', () => {
  const payload = { body: 'body' };
  const message = textMessage(payload);
  test('returns an object with property type set to MessageType.Text', () => {
    expect(message.type).toBe(MessageType.Text);
  });
  test('returns an object with property payload as the object passed in', () => {
    expect(message.payload).toEqual(payload);
  });
});

describe('videoCallAcceptMessage', () => {
  const message = videoCallAcceptMessage('0');
  test('returns an object with property type set to MessageType.VideoCallAccept', () => {
    expect(message.type).toBe(MessageType.VideoCallAccept);
  });
  test('payload.messageId indicates the messageId being responded to', () => {
    expect(message.payload.messageId).toBe('0');
  });
});

describe('videoCallDeclineMessage', () => {
  const message = videoCallDeclineMessage('0');
  test('returns an object with property type set to MessageType.VideoCallDecline', () => {
    expect(message.type).toBe(MessageType.VideoCallDecline);
  });
  test('payload.messageId indicates the messageId being responded to', () => {
    expect(message.payload.messageId).toBe('0');
  });
});

describe('videoCallInitiateMessage', () => {
  const message = videoCallInitiateMessage();
  test('returns an object with property type set to MessageType.VideoCallInitiate', () => {
    expect(message.type).toBe(MessageType.VideoCallInitiate);
  });
  test('return an object with payload.expirationDate set to 30 seconds after timestamp', () => {
    expect(
      new Date(message.payload.expirationDate).getTime() -
        new Date(message.timestamp).getTime(),
    ).toBe(30000);
  });
});

describe('videoCallLeaveMessage', () => {
  const message = videoCallLeaveMessage('0');
  test('returns an object with property type set to MessageType.VideoCallLeave', () => {
    expect(message.type).toBe(MessageType.VideoCallLeave);
  });
  test('payload.messageId indicates the messageId being responded to', () => {
    expect(message.payload.messageId).toBe('0');
  });
});
