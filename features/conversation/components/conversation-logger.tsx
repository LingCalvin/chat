import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { useDataChannel } from '../../data-channel/hooks/use-data-channel';
import { DataChannelEvent } from '../../data-channel/interfaces/data-channel-events';
import { MessageType } from '../../data-channel/interfaces/data-channel-messages';
import { addMessage } from '../conversation-slice';

export default function ConversationLogger() {
  const { addEventListener, removeEventListener } = useDataChannel();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleText = (event: DataChannelEvent) => {
      const { message } = event;
      if (message.type === MessageType.Text) {
        dispatch(
          addMessage({
            type: 'TEXT',
            id: message.id,
            sentDate: message.timestamp,
            body: message.payload.body,
            senderId: event.senderId ?? 'UNKNOWN',
            recipientId: 'UNKNOWN',
            receivedDate: event.timestamp,
            readDate: null,
          }),
        );
      }
    };
    addEventListener(MessageType.Text, handleText);
    return () => {
      removeEventListener(MessageType.Text, handleText);
    };
  }, [addEventListener, dispatch, removeEventListener]);
  return null;
}
