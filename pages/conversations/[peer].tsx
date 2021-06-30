import {
  AppBar,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import PeerConnectionContext from '../../contexts/peer-connection.context';
import useStyles from '../../styles/conversation.styles';

export type Inputs = {
  text: string;
};

export default function Conversation() {
  const classes = useStyles();
  const { query } = useRouter();
  const { selfId, status, connectToPeer, sendMessage, messages } = useContext(
    PeerConnectionContext,
  );

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
    if (status === 'uninitialized') {
      connectToPeer(query.peer as string);
    }
  }, [connectToPeer, query.peer, status]);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar>
          <Typography noWrap variant="h4" component="h1">
            {query.peer}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.messageBox}>
        {messages.map((message, i) => {
          const isSelf = message.sender === selfId;
          return (
            <div
              key={i}
              className={
                isSelf ? classes.sentChatBubble : classes.receivedChatBubble
              }
              title={
                isSelf
                  ? `Sent: ${new Date(message.sentDate)}`
                  : `Received: ${new Date(message.receivedDate)}`
              }
            >
              <Typography>{message.payload}</Typography>
            </div>
          );
        })}
      </div>
      <form onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          aria-label="message"
          placeholder="Message"
          value={messageInput}
          onChange={handleMessageInputChange}
          disabled={status !== 'open'}
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
    </div>
  );
}
