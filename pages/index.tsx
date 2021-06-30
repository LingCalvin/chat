import { Container, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import ConnectForm, { Inputs } from '../components/connect-form';
import PeerConnectionContext from '../contexts/peer-connection.context';
import useStyles from '../styles/index.styles';

export default function Home() {
  const classes = useStyles();
  const router = useRouter();

  const {
    selfId,
    status: connectionStatus,
    peerId,
  } = useContext(PeerConnectionContext);

  useEffect(() => {
    if (connectionStatus === 'open' && peerId?.length) {
      router.push(`/conversations/${peerId}`);
    }
  }, [connectionStatus, peerId, router]);

  const handleSubmit = ({ id }: Inputs) => {
    router.push(`/conversations/${id}`);
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h3" component="h1">
        Enter another person&apos;s ID to begin chatting.
      </Typography>
      <div>
        <Typography>Your ID is</Typography>
        <Typography align="center">
          {selfId === undefined ? (
            <Skeleton className={classes.idSkeleton} />
          ) : (
            selfId
          )}
        </Typography>
      </div>

      <ConnectForm onSubmit={handleSubmit} />
    </Container>
  );
}
