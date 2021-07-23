import { TextMessage } from '../interfaces/text.message';
import { getStatus } from './message.utils';

const baseTextMessage: TextMessage = {
  id: '',
  type: 'TEXT',
  senderId: '',
  recipientId: '',
  sentDate: '',
  readDate: null,
  receivedDate: null,
  body: '',
};

describe('getStatus', () => {
  test(`returns 'read' if readDate is a non-empty string`, () => {
    expect(
      getStatus({
        ...baseTextMessage,
        readDate: '0',
        receivedDate: '0',
        sentDate: '0',
      }),
    ).toBe('read');
  });
  test(`returns 'delivered' if readDate is null and receivedDate is a non-empty string`, () => {
    expect(
      getStatus({ ...baseTextMessage, receivedDate: '0', sentDate: '0' }),
    ).toBe('delivered');
  });
  test(`returns 'delivered' if readDate is null and receivedDate is a non-empty string`, () => {
    expect(getStatus({ ...baseTextMessage, receivedDate: '0' })).toBe(
      'delivered',
    );
  });
  test(`returns 'sent' if readDate and receivedDate are null and sentDate is a non-empty string`, () => {
    expect(getStatus({ ...baseTextMessage, sentDate: '0' })).toBe('sent');
  });
  test(`returns 'unknown' if readDate, receivedDate, and sentDate are falsy values`, () => {
    expect(getStatus(baseTextMessage)).toBe('unknown');
  });
});
