import { useCallback, useMemo } from 'react';
import { useDataChannel } from '../../data-channel/hooks/use-data-channel';
import {
  deliveryReceiptMessage,
  readReceiptMessage,
  textMessage,
} from '../../data-channel/utils/data-channel-message.utils';

export default function useConversation() {
  const { sendMessage } = useDataChannel();

  const sendDeliveryReceipt = useCallback(
    (messageId: string) => {
      sendMessage(deliveryReceiptMessage(messageId));
    },
    [sendMessage],
  );

  const sendTextMessage = useCallback(
    (body: string) => {
      sendMessage(textMessage({ body }));
    },
    [sendMessage],
  );

  const sendReadReceipt = useCallback(
    (messageId: string) => {
      sendMessage(readReceiptMessage(messageId));
    },
    [sendMessage],
  );

  return useMemo(
    () => ({
      sendDeliveryReceipt,
      sendTextMessage,
      sendReadReceipt,
    }),
    [sendDeliveryReceipt, sendReadReceipt, sendTextMessage],
  );
}
