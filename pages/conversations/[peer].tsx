import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import ConversationView from '../../features/conversation/components/conversation-view';
import useConversation from '../../features/conversation/hooks/use-conversation';
import { useDataChannel } from '../../features/data-channel/hooks/use-data-channel';
import { useVideoCall } from '../../features/video-call/hooks/use-video-call';

export type Inputs = {
  text: string;
};

export default function Conversation() {
  const router = useRouter();
  const { query } = router;

  const { connectToPeer } = useDataChannel();
  const { startVideoCall } = useVideoCall();

  const { sendTextMessage } = useConversation();
  const auth = useAppSelector((state) => state.auth);
  const conversation = useAppSelector((state) => state.conversation);
  const contact = useAppSelector((state) =>
    state.contacts.contacts.find(
      (contact) => contact.id === conversation.otherParticipant,
    ),
  );
  const roomName = contact?.username;

  useEffect(() => {
    if (conversation.initiate && conversation.connectionStatus === 'initial') {
      connectToPeer(query.peer as string);
    }
  }, [
    connectToPeer,
    conversation.connectionStatus,
    conversation.initiate,
    query.peer,
  ]);

  const [messageInput, setMessageInput] = useState('');

  const handleMessageInputChange = (value: string) => setMessageInput(value);

  const canSendMessage =
    messageInput.length > 0 && conversation.connectionStatus === 'connected';

  const handleMessageInputSubmit = () => {
    if (canSendMessage) {
      sendTextMessage(messageInput);
      setMessageInput('');
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the page when a new message is sent or received
    window.scrollBy(0, document.body.scrollHeight);
  }, [conversation.messages.length]);

  if (auth.status !== 'authenticated') {
    return null;
  }

  return (
    <ConversationView
      roomName={roomName}
      contact={contact ?? { id: 'UNKNOWN', username: 'UNKNOWN' }}
      messages={conversation.messages}
      connectionStatus={conversation.connectionStatus}
      messageInput={messageInput}
      onMessageInputChange={handleMessageInputChange}
      onMessageInputSubmit={handleMessageInputSubmit}
      onStartVideoCall={() => {
        if (!conversation.otherParticipant) {
          throw new Error(
            'Cannot start a video call with an peer whose ID is unknown.',
          );
        }
        startVideoCall(conversation.otherParticipant);
      }}
    />
  );
}
