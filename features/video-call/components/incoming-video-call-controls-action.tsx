import { Typography } from '@material-ui/core';
import { ReactNode } from 'react';
import useStyles from './incoming-video-call-controls-action.styles';

export interface IncomingVideoCallControlActionProps {
  button: ReactNode;
  text: string;
}

export default function IncomingVideoCallControlsAction({
  button,
  text,
}: IncomingVideoCallControlActionProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {button}
      <Typography>{text}</Typography>
    </div>
  );
}
