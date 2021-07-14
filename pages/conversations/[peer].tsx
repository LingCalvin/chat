import {
  AppBar,
  Container,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { MoreVert, Send, VideoCall as VideoCallIcon } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useRouter } from 'next/router';
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useAppSelector } from '../../app/hooks';
import TextField from '../../common/components/text-field';
import useMenu from '../../common/hooks/use-menu';
import ChatBubble from '../../features/conversation/components/chat-bubble';
import useConversation from '../../features/conversation/hooks/use-conversation';
import { useDataChannel } from '../../features/data-channel/hooks/use-data-channel';
import { useVideoCall } from '../../features/video-call/hooks/use-video-call';
import useStyles from '../../styles/conversation.styles';

export type Inputs = {
  text: string;
};

export default function Conversation() {
  const classes = useStyles();
  const router = useRouter();
  const { query } = router;

  const { connectToPeer } = useDataChannel();
  const { startVideoCall } = useVideoCall();

  const { sendTextMessage } = useConversation();
  const auth = useAppSelector((state) => state.auth);
  const conversation = useAppSelector((state) => state.conversation);
  const roomName = useAppSelector((state) =>
    state.contacts.contacts.find(
      (contact) => contact.id === conversation.otherParticipant,
    ),
  )?.username;

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

  const handleMessageInputChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    e.preventDefault();
    setMessageInput(e.target.value);
  };

  const canSendMessage =
    messageInput.length > 0 && conversation.connectionStatus === 'connected';

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (canSendMessage) {
      sendTextMessage(messageInput);
      setMessageInput('');
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the page when a new message is sent or received
    window.scrollBy(0, document.body.scrollHeight);
  }, [conversation.messages.length]);

  const menu = useMenu();

  if (auth.status !== 'authenticated') {
    return null;
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} color="inherit" position="fixed">
        <Toolbar>
          <Typography noWrap variant="h4" component="h1">
            {roomName}
          </Typography>
          <div className={classes.spacer} />
          <IconButton
            aria-label="video call"
            color="inherit"
            onClick={() => {
              if (!conversation.otherParticipant) {
                throw new Error(
                  'Cannot start a video call with an peer whose ID is unknown.',
                );
              }
              startVideoCall(conversation.otherParticipant);
            }}
            disabled={conversation.connectionStatus !== 'connected'}
          >
            <VideoCallIcon />
          </IconButton>
          <IconButton aria-label="menu" edge="end" onClick={menu.handleClick}>
            <MoreVert />
          </IconButton>
        </Toolbar>
        <Menu anchorEl={menu.anchorEl} open={menu.open} onClose={menu.onClose}>
          <MenuItem onClick={() => router.push('/settings')}>Settings</MenuItem>
        </Menu>
      </AppBar>
      <Toolbar />
      <Container className={classes.content}>
        <div className={classes.messageBox}>
          {conversation.messages.map((message) => {
            const isSelf = message.senderId === auth.id;
            return (
              <ChatBubble
                key={message.id}
                className={
                  isSelf ? classes.sentChatBubble : classes.receivedChatBubble
                }
                sent={isSelf}
                message={message}
              />
            );
          })}
        </div>
        {conversation.connectionStatus === 'closed' ? (
          <div className={classes.messageForm}>
            <Alert variant="filled" severity="error">
              The connection has been closed.
            </Alert>
          </div>
        ) : (
          <form className={classes.messageForm} onSubmit={onSubmit}>
            <TextField
              className={classes.messageInputField}
              variant="outlined"
              fullWidth
              placeholder="Message"
              value={messageInput}
              onChange={handleMessageInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="send"
                      type="submit"
                      disabled={!canSendMessage}
                    >
                      <Send />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        )}
      </Container>
    </div>
  );
}
