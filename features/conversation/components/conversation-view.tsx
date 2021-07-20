import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { MoreVert, Send, VideoCall as VideoCallIcon } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import router from 'next/router';
import { ChangeEventHandler, FormEventHandler, useCallback } from 'react';
import useMenu from '../../../common/hooks/use-menu';
import { Contact } from '../../contacts/interfaces/contact';
import { TextMessage } from '../interfaces/text.message';
import ChatBubble from './chat-bubble';
import useStyles from './conversation-view.styles';

export interface ConversationViewProps {
  roomName?: string;
  contact: Contact;
  messages: TextMessage[];
  connectionStatus: 'initial' | 'connected' | 'closed';
  messageInput: string;
  onMessageInputChange: (value: string) => void;
  onMessageInputSubmit: () => void;
  onStartVideoCall: () => void;
}

export default function ConversationView({
  roomName,
  contact,
  messages,
  messageInput,
  onMessageInputChange,
  onMessageInputSubmit,
  onStartVideoCall,
  connectionStatus,
}: ConversationViewProps) {
  const classes = useStyles();

  const menu = useMenu();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      onMessageInputSubmit();
    },
    [onMessageInputSubmit],
  );

  const handleMessageInputChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = useCallback(
    (e) => {
      e.preventDefault();
      onMessageInputChange(e.target.value);
    },
    [onMessageInputChange],
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <Typography noWrap variant="h4" component="h1">
            {roomName}
          </Typography>
          <div className={classes.spacer} />
          <IconButton
            aria-label="video call"
            color="inherit"
            onClick={onStartVideoCall}
            disabled={connectionStatus !== 'connected'}
          >
            <VideoCallIcon />
          </IconButton>
          <IconButton
            aria-label="menu"
            edge="end"
            color="inherit"
            onClick={menu.handleClick}
          >
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
          {messages.map((message) => {
            const isSelf = message.senderId !== contact.id;
            if (isSelf) {
              return (
                <ChatBubble
                  key={message.id}
                  className={classes.sentChatBubble}
                  sent={isSelf}
                  message={message}
                />
              );
            }
            return (
              <div
                key={message.id}
                className={classes.receivedChatBubbleContainer}
              >
                {!isSelf && <Avatar className={classes.avatar} />}
                <ChatBubble
                  className={classes.receivedChatBubble}
                  sent={isSelf}
                  message={message}
                />
              </div>
            );
          })}
        </div>
        {connectionStatus === 'closed' ? (
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
              inputProps={{ 'aria-label': 'message' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="send"
                      type="submit"
                      disabled={
                        messageInput.length === 0 ||
                        connectionStatus !== 'connected'
                      }
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
