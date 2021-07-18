import { useEffect } from 'react';
import { useAppSelector } from '../../../app/hooks';
import useAuthId from '../../auth/hooks/use-auth-id';
import { useDataChannel } from '../../data-channel/hooks/use-data-channel';
import { DataChannelEvent } from '../../data-channel/interfaces/data-channel-events';
import { MessageType } from '../../data-channel/interfaces/data-channel-messages';
import { sendNotification } from '../../notifications/utils/notification.utils';

export default function Notifier() {
  const id = useAuthId();
  const { addEventListener, removeEventListener } = useDataChannel();
  const notificationSettings = useAppSelector(
    (state) => state.settings.notifications,
  );
  const contacts = useAppSelector((state) => state.contacts.contacts);

  useEffect(() => {
    const notify = (event: DataChannelEvent) => {
      if (
        event.message.type === MessageType.Text &&
        event.senderId !== id &&
        notificationSettings.enabled
      ) {
        const { message } = event;
        const contact =
          contacts.find((contact) => contact.id === event.senderId)?.username ??
          'Unknown';
        return sendNotification(contact, {
          body: notificationSettings.messagePreview
            ? message.payload.body
            : undefined,
          silent: notificationSettings.silent,
        });
      }
    };
    addEventListener(MessageType.Text, notify);
    return () => removeEventListener(MessageType.Text, notify);
  }, [
    addEventListener,
    contacts,
    id,
    notificationSettings.enabled,
    notificationSettings.messagePreview,
    notificationSettings.silent,
    removeEventListener,
  ]);

  return null;
}
