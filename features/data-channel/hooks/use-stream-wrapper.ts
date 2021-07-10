import { useEffect, useState } from 'react';
import useToggle from '../../../common/hooks/use-toggle';

export default function useStreamWrapper(mediaStream?: MediaStream) {
  const [stream, setStream] = useState<MediaStream | undefined>(mediaStream);

  const { state: audioEnabled, toggle: toggleAudio } = useToggle(
    mediaStream?.getAudioTracks()[0].enabled ?? true,
  );
  const { state: videoEnabled, toggle: toggleVideo } = useToggle(
    mediaStream?.getVideoTracks()[0].enabled ?? true,
  );

  const [unstable, setUnstable] = useState(
    () => stream?.getTracks().some((track) => track.muted) ?? false,
  );

  // Track whether the stream has muted tracks
  useEffect(() => {
    if (!stream) {
      return;
    }
    const checkStability = () =>
      setUnstable(stream.getTracks().some((track) => track.muted));

    stream.getTracks().forEach((track) => {
      track.addEventListener('muted', checkStability);
      track.addEventListener('unmuted', checkStability);
    });
    return () => {
      stream.getTracks().forEach((track) => {
        track.removeEventListener('muted', checkStability);
        track.removeEventListener('unmuted', checkStability);
      });
    };
  }, [stream]);

  // Sync track enabled properties with state
  useEffect(() => {
    stream?.getAudioTracks().forEach((track) => (track.enabled = audioEnabled));
  }, [audioEnabled, stream]);
  useEffect(() => {
    stream?.getVideoTracks().forEach((track) => (track.enabled = videoEnabled));
  }, [stream, videoEnabled]);

  return {
    stream,
    setStream,
    audioEnabled,
    toggleAudio,
    videoEnabled,
    toggleVideo,
    unstable,
  };
}
