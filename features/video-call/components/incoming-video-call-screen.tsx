import { Container, Typography } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import IncomingVideoCallControls from './incoming-video-call-controls';
import useStyles from './incoming-video-call-screen.styles';

export interface IncomingVideoCallScreenProps {
  title: string;
  onAccept: () => void;
  onDecline: () => void;
}

export default function IncomingVideoCallScreen({
  title,
  onAccept,
  onDecline,
}: IncomingVideoCallScreenProps) {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography className={classes.title} variant="h1">
        {title}
      </Typography>
      <Person className={classes.portrait} />
      <IncomingVideoCallControls
        className={classes.controls}
        onAccept={onAccept}
        onDecline={onDecline}
      />
    </Container>
  );
}
