import { Snackbar } from '@material-ui/core';
import { useEffect, useRef } from 'react';
import VideoCallControls from './video-call-controls';
import useStyles from './video-call.styles';

interface VideoCallProps {
  stream: MediaStream | undefined;
  micEnabled: boolean;
  videoEnabled: boolean;
  selfStreamUnstable?: boolean;
  onToggleMic: () => void;
  onToggleVideo: () => void;
  onEndCall: () => void;
}

export default function VideoCall({
  stream,
  micEnabled,
  videoEnabled,
  selfStreamUnstable,
  onToggleMic,
  onToggleVideo,
  onEndCall,
}: VideoCallProps) {
  const classes = useStyles();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream ?? null;
    }
  }, [stream]);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <div className={classes.root}>
      <div className={classes.videoContainer}>
        <video className={classes.video} ref={videoRef} autoPlay />
      </div>
      <div className={classes.controlsContainer}>
        <VideoCallControls
          micOn={micEnabled}
          videoOn={videoEnabled}
          onHangUp={onEndCall}
          onMicToggle={onToggleMic}
          onVideoToggle={onToggleVideo}
        />
      </div>
      <Snackbar
        className={classes.snackBar}
        open={selfStreamUnstable}
        message="Your connection is unstable."
      />
    </div>
  );
}
