import { dataChannelEvent } from './data-channel-event.utils';
import { textMessage } from './data-channel-message.utils';

describe('dataChannelEvent', () => {
  test('returns an object with the appropriate message, recipientId, senderId properties', () => {
    const message = textMessage({ body: '' });
    const event = dataChannelEvent(message, 'recipientId', 'senderId');
    expect(event.recipientId).toBe('recipientId');
    expect(event.senderId).toBe('senderId');
    expect(event.message).toEqual(message);
  });
});
