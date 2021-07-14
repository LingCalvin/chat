import {
  AppBar,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ReadyState } from 'react-use-websocket';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ConnectForm from '../features/conversation/components/connect-form';
import { setParticipant } from '../features/conversation/conversation-slice';
import useStyles from '../styles/index.styles';

// Only render this component client-side because it requires access to
// Notification
const PermissionBanner = dynamic(
  () =>
    import(
      '../features/notifications/components/notification-permission-banner'
    ),
  { ssr: false },
);

export default function Home() {
  const classes = useStyles();

  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const chatPartner = useAppSelector(
    (state) => state.conversation.otherParticipant,
  );
  const connectionStatus = useAppSelector(
    (state) => state.dataChannel.signalingServerReadyState,
  );

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (chatPartner !== null) {
      router.push(`/conversations/${chatPartner}`);
    }
  }, [chatPartner, router]);

  const unauthenticatedView = (
    <div className={`${classes.unauthenticatedView} ${classes.content}`}>
      <Typography variant="h2" component="h1">
        Start chatting
      </Typography>
      <div className={classes.buttonBox}>
        <Link href="/auth/sign-up" passHref>
          <Button variant="outlined">Sign up</Button>
        </Link>
        <Link href="/auth/sign-in" passHref>
          <Button color="primary" variant="contained">
            Sign in
          </Button>
        </Link>
      </div>
    </div>
  );

  const authenticatedView = (
    <>
      <AppBar color="transparent" elevation={0}>
        <Toolbar>
          <IconButton
            className={classes.overflowMenuButton}
            edge="end"
            color="inherit"
            onClick={(e) => setMenuAnchor(e.currentTarget)}
          >
            <MoreVert />
          </IconButton>
          <Menu
            open={menuAnchor !== null}
            anchorEl={menuAnchor}
            onClose={() => setMenuAnchor(null)}
          >
            <Link passHref href="/settings">
              <MenuItem>Settings</MenuItem>
            </Link>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Typography variant="h2" component="h1">
        Connect to peer
      </Typography>
      <div className={classes.idContainer}>
        <Typography variant="h5" component="p">
          Your ID
        </Typography>
        <Typography>
          {authState.status === 'authenticated' ? authState.id : null}
        </Typography>
      </div>
      <ConnectForm
        disabled={connectionStatus !== ReadyState.OPEN}
        onSubmit={({ id }) => {
          dispatch(setParticipant({ id, initiate: true }));
          router.push(`/conversations/${id}`);
        }}
      />
    </>
  );
  return (
    <>
      {authState.status === 'authenticated' && <PermissionBanner />}
      <Container className={classes.root}>
        {authState.status === 'authenticated'
          ? authenticatedView
          : unauthenticatedView}
      </Container>
    </>
  );
}
