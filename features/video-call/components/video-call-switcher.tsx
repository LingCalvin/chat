import { CssBaseline, ThemeProvider } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { darkTheme, theme } from '../../../common/constants/theme';
import useAuthId from '../../auth/hooks/use-auth-id';
import { useDataChannel } from '../../data-channel/hooks/use-data-channel';
import { DataChannelEvent } from '../../data-channel/interfaces/data-channel-events';
import { MessageType } from '../../data-channel/interfaces/data-channel-messages';
import { useVideoCall } from '../hooks/use-video-call';
import { setActive, setInactive } from '../video-call.slice';

const IncomingVideoCallScreen = dynamic(
  () => import('./incoming-video-call-screen'),
);
const VideoCall = dynamic(() => import('./video-call'));

export interface VideoCallLayerProps {
  children?: ReactNode;
}

export default function VideoCallSwitcher({ children }: VideoCallLayerProps) {
  const id = useAuthId();
  const status = useAppSelector((state) => state.videoCall.status);
  const messageId = useAppSelector((state) => state.videoCall.messageId);
  const participantId = useAppSelector(
    (state) => state.videoCall.participantId,
  );
  const callOfferExpiration = useAppSelector(
    (state) => state.videoCall.callOfferExpiration,
  );
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const participant = useMemo(
    () => contacts.find((contact) => contact.id === participantId),
    [contacts, participantId],
  );

  const dispatch = useAppDispatch();

  const { addEventListener, removeEventListener } = useDataChannel();

  const {
    peerStream,
    selfStreamUnstable,
    leaveVideoCall,
    toggleAudio,
    toggleVideo,
    audioEnabled,
    videoEnabled,
    joinVideoCall,
    declineVideoCall,
  } = useVideoCall();

  useEffect(() => {
    const handleOffer = (event: DataChannelEvent) => {
      const { message } = event;
      if (
        message.type === MessageType.VideoCallInitiate &&
        event.senderId !== id
      ) {
        dispatch(
          setActive({
            status: 'incoming',
            messageId: message.id,
            participantId: event.senderId,
          }),
        );
      } else if (
        message.type === MessageType.VideoCallInitiate &&
        event.senderId === id
      ) {
        dispatch(
          setActive({
            status: 'connecting',
            messageId: message.id,
            participantId: event.recipientId,
            callOfferExpiration: message.payload.expirationDate,
          }),
        );
      }
    };
    const handleEnd = (event: DataChannelEvent) => {
      const { message } = event;
      if (
        (message.type === MessageType.VideoCallLeave ||
          message.type === MessageType.VideoCallDecline) &&
        event.senderId === participantId &&
        status !== 'inactive'
      ) {
        dispatch(setInactive());
        leaveVideoCall(message.payload.messageId);
      }
    };

    const handleAccept = (event: DataChannelEvent) => {
      const { message } = event;
      if (
        message.type === MessageType.VideoCallAccept &&
        event.senderId === participantId
      ) {
        dispatch(
          setActive({
            status: 'connecting',
            participantId,
            messageId: message.payload.messageId,
          }),
        );
      }
    };
    addEventListener(MessageType.VideoCallAccept, handleAccept);
    addEventListener(MessageType.VideoCallInitiate, handleOffer);
    addEventListener(MessageType.VideoCallLeave, handleEnd);
    addEventListener(MessageType.VideoCallDecline, handleEnd);
    return () => {
      removeEventListener(MessageType.VideoCallAccept, handleAccept);
      removeEventListener(MessageType.VideoCallInitiate, handleOffer);
      removeEventListener(MessageType.VideoCallLeave, handleEnd);
      removeEventListener(MessageType.VideoCallDecline, handleEnd);
    };
  }, [
    addEventListener,
    dispatch,
    id,
    leaveVideoCall,
    participantId,
    removeEventListener,
    status,
  ]);

  // Leave the call if the callee does not join before the offer expires
  useEffect(() => {
    if (callOfferExpiration && status === 'connecting') {
      const timeout = setTimeout(() => {
        dispatch(setInactive());
        leaveVideoCall(messageId ?? 'UNKNOWN');
      }, new Date(callOfferExpiration).getTime() - Date.now());
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [callOfferExpiration, dispatch, leaveVideoCall, messageId, status]);

  if (status === 'inactive') {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    );
  }
  if (status === 'incoming') {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <IncomingVideoCallScreen
          title={participant?.username ?? 'Unknown'}
          onAccept={() =>
            joinVideoCall(messageId ?? 'UNKNOWN', participantId ?? 'UNKNOWN')
          }
          onDecline={() => declineVideoCall(messageId ?? 'UNKNOWN')}
        />
      </ThemeProvider>
    );
  }
  if (status === 'active' || status === 'connecting') {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <VideoCall
          stream={peerStream}
          micEnabled={audioEnabled}
          videoEnabled={videoEnabled}
          onToggleMic={toggleAudio}
          onToggleVideo={toggleVideo}
          onEndCall={() => leaveVideoCall(messageId ?? 'UNKNOWN')}
          selfStreamUnstable={selfStreamUnstable}
        />
      </ThemeProvider>
    );
  }
  throw new Error(`Unhandled case: status: ${status}`);
}
