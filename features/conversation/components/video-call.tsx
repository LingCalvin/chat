import { useEffect, useRef } from 'react';
import useToggle from '../../../common/hooks/use-toggle';
import useStyles from '../../../styles/video-call.styles';
import VideoCallControls from './video-call-controls';

interface VideoCallProps {
  stream: MediaStream;
  onEndCall: () => void;
}

export default function VideoCall({ stream, onEndCall }: VideoCallProps) {
  const classes = useStyles();

  const { state: micOn, toggle: toggleMic } = useToggle(true);
  const { state: videoOn, toggle: toggleVideo } = useToggle(true);

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
          micOn={micOn}
          videoOn={videoOn}
          onHangUp={onEndCall}
          onMicToggle={toggleMic}
          onVideoToggle={toggleVideo}
        />
      </div>
    </div>
  );
}
