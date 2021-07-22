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

  // Prevent event from being passed to the callback
  const handleMicToggle = () => onMicToggle();
  const handleVideoToggle = () => onVideoToggle();
  const handleHangUp = () => onHangUp();

  return (
    <div className={clsx(classes.root, className)}>
      <Fab
        aria-label="mic toggle"
        className={classes.iconButton}
        size="medium"
        onClick={handleMicToggle}
      >
        {micOn ? <Mic /> : <MicOff />}
      </Fab>
      <Fab
        aria-label="hang up"
        className={classes.hangUpIcon}
        onClick={handleHangUp}
      >
        <CallEnd />
      </Fab>
      <Fab
        aria-label="video toggle"
        className={classes.iconButton}
        size="medium"
        onClick={handleVideoToggle}
      >
        {videoOn ? <Videocam /> : <VideocamOff />}
      </Fab>
    </div>
  );
}
