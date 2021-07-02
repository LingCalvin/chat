import { Button, Container, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ConnectForm from '../components/connect-form';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setParticipant } from '../features/conversation/conversation-slice';
import { useEffect } from 'react';
import useStyles from '../styles/index.styles';

export default function Home() {
  const classes = useStyles();

  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const chatPartner = useAppSelector(
    (state) => state.conversation.otherParticipant,
  );

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
        onSubmit={({ id }) => {
          dispatch(setParticipant({ id, initiate: true }));
          router.push(`/conversations/${id}`);
        }}
      />
    </>
  );
  return (
    <Container className={classes.root}>
      {authState.status === 'authenticated'
        ? authenticatedView
        : unauthenticatedView}
    </Container>
  );
}
