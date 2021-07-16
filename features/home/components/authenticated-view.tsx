import {
  AppBar,
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
import React, { useEffect, useState } from 'react';
import { ReadyState } from 'react-use-websocket';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ConnectForm from '../../conversation/components/connect-form';
import { setParticipant } from '../../conversation/conversation-slice';
import useStyles from './authenticated-view.styles';

// Only render this component client-side because it requires access to
// Notification
const PermissionBanner = dynamic(
  () => import('../../notifications/components/notification-permission-banner'),
  { ssr: false },
);

export interface AuthenticatedViewProps {
  userId: string;
}

export default function AuthenticatedView({ userId }: AuthenticatedViewProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const connectionStatus = useAppSelector(
    (state) => state.dataChannel.signalingServerReadyState,
  );
  const router = useRouter();
  const chatPartner = useAppSelector(
    (state) => state.conversation.otherParticipant,
  );

  useEffect(() => {
    if (chatPartner !== null) {
      router.push(`/conversations/${chatPartner}`);
    }
  }, [chatPartner, router]);

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography className={classes.header} variant="h5" component="h1">
            Connect to peer
          </Typography>
          <IconButton
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
      <div className={classes.content}>
        <PermissionBanner className={classes.banner} />
        <Container className={classes.connectionBox}>
          <Typography variant="h3" component="p">
            Connect to peer
          </Typography>
          <div className={classes.idContainer}>
            <Typography variant="h5" component="p">
              Your ID
            </Typography>
            <Typography>{userId}</Typography>
          </div>
          <ConnectForm
            disabled={connectionStatus !== ReadyState.OPEN}
            onSubmit={({ id }) => {
              dispatch(setParticipant({ id, initiate: true }));
              router.push(`/conversations/${id}`);
            }}
          />
        </Container>
      </div>
    </div>
  );
}
