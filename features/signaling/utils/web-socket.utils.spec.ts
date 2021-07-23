import { generateWebSocketUrl } from './web-socket.utils';

describe('generateWebSocketUrl', () => {
  test('returns null when the ticket is undefined', () => {
    expect(generateWebSocketUrl(undefined)).toBeNull();
  });
  test('returns a string when the ticket is not null', () => {
    expect(typeof generateWebSocketUrl('')).toBe('string');
  });
});
