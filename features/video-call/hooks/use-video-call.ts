import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useDataChannel } from '../../data-channel/hooks/use-data-channel';
import {
  videoCallAcceptMessage,
  videoCallDeclineMessage,
  videoCallInitiateMessage,
  videoCallLeaveMessage,
} from '../../data-channel/utils/data-channel-message.utils';
import { setActive, setInactive } from '../video-call.slice';

export function useVideoCall() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.videoCall.status);
  const participantId = useAppSelector(
    (state) => state.videoCall.participantId,
  );
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const participant = useMemo(
    () => contacts.find((contact) => contact.id === participantId),
    [contacts, participantId],
  );

  const {
    peerStream,
    sendMessage,
    addStream,
    removeStream,
    clearPeerStream,
    selfStream: selfStreamWrapper,
  } = useDataChannel();

  const { stream: selfStream, setStream: setSelfStream } = selfStreamWrapper;

  const startSelfStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setSelfStream(stream);
    addStream(stream);
    return stream;
  }, [addStream, setSelfStream]);

  const stopSelfStream = useCallback(() => {
    if (selfStream) {
      selfStream.getTracks().forEach((track) => track.stop());
      removeStream(selfStream);
    }
    setSelfStream(undefined);
  }, [removeStream, selfStream, setSelfStream]);

  const joinVideoCall = useCallback(
    async (messageId: string, participantId: string) => {
      await startSelfStream();
      sendMessage(videoCallAcceptMessage(messageId));
      dispatch(setActive({ status: 'active', messageId, participantId }));
    },
    [dispatch, sendMessage, startSelfStream],
  );

  const startVideoCall = useCallback(
    async (participantId: string) => {
      await startSelfStream();
      const message = videoCallInitiateMessage();
      dispatch(
        setActive({ status: 'active', messageId: message.id, participantId }),
      );
      sendMessage(message);
    },
    [dispatch, sendMessage, startSelfStream],
  );

  const declineVideoCall = useCallback(
    (messageId: string) => {
      sendMessage(videoCallDeclineMessage(messageId));
      dispatch(setInactive());
      stopSelfStream();
      clearPeerStream();
    },
    [clearPeerStream, dispatch, sendMessage, stopSelfStream],
  );

  const leaveVideoCall = useCallback(
    (messageId: string) => {
      sendMessage(videoCallLeaveMessage(messageId));
      dispatch(setInactive());
      stopSelfStream();
      clearPeerStream();
    },
    [clearPeerStream, dispatch, sendMessage, stopSelfStream],
  );

  return useMemo(
    () => ({
      status,
      participant,
      startVideoCall,
      leaveVideoCall,
      joinVideoCall,
      declineVideoCall,
      peerStream,
      selfStreamUnstable: selfStreamWrapper.unstable,
      toggleAudio: selfStreamWrapper.toggleAudio,
      toggleVideo: selfStreamWrapper.toggleVideo,
      audioEnabled: selfStreamWrapper.audioEnabled,
      videoEnabled: selfStreamWrapper.videoEnabled,
    }),
    [
      declineVideoCall,
      joinVideoCall,
      leaveVideoCall,
      participant,
      peerStream,
      selfStreamWrapper.audioEnabled,
      selfStreamWrapper.toggleAudio,
      selfStreamWrapper.toggleVideo,
      selfStreamWrapper.unstable,
      selfStreamWrapper.videoEnabled,
      startVideoCall,
      status,
    ],
  );
}
