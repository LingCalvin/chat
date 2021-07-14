import { useEffect, useMemo, useState } from 'react';
import useToggle from '../../../common/hooks/use-toggle';

/**
 * Wraps a {@link MediaStream} to sync some of its {@link MediaStreamTrack}s'
 * properties with state.
 *
 * @remarks
 *
 * It is unsafe to wrap the same {@link MediaStream} objects with multiple
 * {@link useStreamWrapper}s.
 *
 * @privateRemarks
 *
 * Wrapping the same {@link MediaStream} multiple times can cause a mismatch
 * between the wrapper's state and the properties of the object.
 */
export default function useStreamWrapper() {
  const [stream, setStream] = useState<MediaStream | undefined>();

  const { state: audioEnabled, toggle: toggleAudio } = useToggle(true);
  const { state: videoEnabled, toggle: toggleVideo } = useToggle(true);

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

  return useMemo(
    () => ({
      stream,
      setStream,
      audioEnabled,
      toggleAudio,
      videoEnabled,
      toggleVideo,
      unstable,
    }),
    [audioEnabled, stream, toggleAudio, toggleVideo, unstable, videoEnabled],
  );
}
