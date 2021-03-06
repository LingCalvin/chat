/**
 * Sends a notification if permission has been granted and the document is
 * currently hidden.
 *
 * @param title - The title of the notification
 * @param options - The notification options
 */
export function sendNotification(
  title: string,
  options: NotificationOptions,
): Notification | undefined {
  if (
    Notification.permission === 'granted' &&
    document.visibilityState === 'hidden'
  ) {
    return new Notification(title, options);
  }
}
