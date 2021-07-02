import {
  AppBar,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import DataChannelContext from '../../contexts/data-channel.context';
import { useAppSelector } from '../../hooks';
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

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (messageInput.length > 0) {
      sendMessage(messageInput);
      setMessageInput('');
    }
  };

  useEffect(() => {
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
                    disabled={messageInput.length < 1}
                  >
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Container>
    </div>
  );
}
