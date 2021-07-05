import {
  AppBar,
  Container,
  IconButton,
  InputAdornment,
  Snackbar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import TextField from '../../common/components/text-field';
import DataChannelContext from '../../features/data-channel/contexts/data-channel.context';
import useStyles from '../../styles/conversation.styles';

export type Inputs = {
  text: string;
};

export default function Conversation() {
  const classes = useStyles();
  const { query } = useRouter();

  const { sendMessage, connectToPeer } = useContext(DataChannelContext);
  const auth = useAppSelector((state) => state.auth);
  const conversation = useAppSelector((state) => state.conversation);
  const roomName = useAppSelector((state) =>
    state.contacts.contacts.find(
      (contact) => contact.id === conversation.otherParticipant,
    ),
  )?.username;

  useEffect(() => {
    if (conversation.initiate) {
      connectToPeer(query.peer as string);
    }
  }, [connectToPeer, conversation.initiate, query.peer]);

  const [messageInput, setMessageInput] = useState('');

  const handleMessageInputChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    e.preventDefault();
    setMessageInput(e.target.value);
  };

  const canSendMessage =
    messageInput.length > 0 && conversation.connectionStatus === 'connected';

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (canSendMessage) {
      sendMessage(messageInput);
      setMessageInput('');
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the page when a new message is sent or received
    window.scrollBy(0, document.body.scrollHeight);
  }, [conversation.messages.length]);

  if (auth.status !== 'authenticated') {
    return <></>;
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <Typography noWrap variant="h4" component="h1">
            {roomName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container className={classes.content}>
        <div className={classes.messageBox}>
          {conversation.messages.map((message, i) => {
            const isSelf = message.sender === auth.id;
            return (
              <div
                key={i}
                className={
                  isSelf ? classes.sentChatBubble : classes.receivedChatBubble
                }
                title={
                  isSelf
                    ? `Sent: ${new Date(message.sentDate ?? '')}`
                    : `Received: ${new Date(message.receivedDate ?? '')}`
                }
              >
                <Typography>{message.payload}</Typography>
              </div>
            );
          })}
        </div>
        <form className={classes.messageForm} onSubmit={onSubmit}>
          <TextField
            className={classes.messageInputField}
            variant="outlined"
            fullWidth
            placeholder="Message"
            value={messageInput}
            onChange={handleMessageInputChange}
            inputProps={{ 'aria-label': 'message' }}
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
      </Container>
      <Snackbar
        className={classes.snackbar}
        open={conversation.connectionStatus === 'closed'}
      >
        <Alert variant="filled" severity="error">
          The connection has been closed.
        </Alert>
      </Snackbar>
    </div>
  );
}
