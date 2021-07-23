import { Fab } from '@material-ui/core';
import { Call, CallEnd } from '@material-ui/icons';
import clsx from 'clsx';
import IncomingVideoCallControlsAction from './incoming-video-call-controls-action';
import useStyles from './incoming-video-call-controls.styles';

export interface IncomingVideoCallControlsProps {
  className?: string;
  onAccept: () => void;
  onDecline: () => void;
}

export default function IncomingVideoCallControls({
  className,
  onAccept,
  onDecline,
}: IncomingVideoCallControlsProps) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <IncomingVideoCallControlsAction
        text="Decline"
        button={
          <Fab
            aria-label="decline"
            className={clsx(classes.iconButton, classes.declineIcon)}
            onClick={onDecline}
          >
            <CallEnd color="inherit" />
          </Fab>
        }
      />
      <IncomingVideoCallControlsAction
        text="Accept"
        button={
          <Fab
            aria-label="accept"
            className={clsx(classes.iconButton, classes.acceptIcon)}
            onClick={onAccept}
          >
            <Call color="inherit" />
          </Fab>
        }
      />
    </div>
  );
}
