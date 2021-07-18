import { sendNotification } from './notification.utils';

describe('sendNotification', () => {
  Object.defineProperty(globalThis, 'Notification', {
    writable: true,
    value: jest.fn(),
  });
  Object.defineProperty(Notification, 'permission', {
    configurable: true,
    get: () => 'default',
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('returns a notification if the application has permission to and the document is hidden', () => {
    jest.spyOn(Notification, 'permission', 'get').mockReturnValue('granted');
    jest.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden');

    sendNotification('', {});
    expect(Notification).toBeCalledTimes(1);
  });
  test('does not return a notification if the document is visible', () => {
    jest.spyOn(Notification, 'permission', 'get').mockReturnValue('default');
    jest.spyOn(document, 'visibilityState', 'get').mockReturnValue('visible');

    sendNotification('', {});
    expect(Notification).toBeCalledTimes(0);
  });
  test('does send a notification if permission is default', () => {
    jest.spyOn(Notification, 'permission', 'get').mockReturnValue('default');
    jest.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden');
    sendNotification('', {});
    expect(Notification).toBeCalledTimes(0);
  });
  test('does send a notification if permission is denied', () => {
    jest.spyOn(Notification, 'permission', 'get').mockReturnValue('denied');
    jest.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden');
    sendNotification('', {});
    expect(Notification).toBeCalledTimes(0);
  });
});
