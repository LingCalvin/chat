import { Fab } from '@material-ui/core';
import {
  CallEnd,
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
} from '@material-ui/icons';
import clsx from 'clsx';
import useStyles from './video-call-controls.styles';

export interface VideoCallControlsProps {
  onMicToggle: () => void;
  onVideoToggle: () => void;
  onHangUp: () => void;
  micOn?: boolean;
  videoOn?: boolean;
  className?: string;
}

export default function VideoCallControls({
  onMicToggle,
  onVideoToggle,
  onHangUp,
  micOn,
  videoOn,
  className,
}: VideoCallControlsProps) {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)}>
      <Fab className={classes.iconButton} size="medium" onClick={onMicToggle}>
        {micOn ? <Mic /> : <MicOff />}
      </Fab>
      <Fab color="secondary" onClick={onHangUp}>
        <CallEnd />
      </Fab>
      <Fab className={classes.iconButton} size="medium" onClick={onVideoToggle}>
        {videoOn ? <Videocam /> : <VideocamOff />}
      </Fab>
    </div>
  );
}
