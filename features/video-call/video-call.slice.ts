import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoCallState {
  status: 'incoming' | 'inactive' | 'connecting' | 'active';
  messageId: string | undefined;
  participantId: string | undefined;
  callOfferExpiration: string | undefined;
}

const initialState: VideoCallState = {
  status: 'inactive',
  messageId: undefined,
  participantId: undefined,
  callOfferExpiration: undefined,
};

export const videoCallSlice = createSlice({
  name: 'videoCall',
  initialState,
  reducers: {
    setInactive: (state) => {
      state.status = 'inactive';
      state.participantId = undefined;
    },
    setActive: (
      state,
      action: PayloadAction<{
        status: 'incoming' | 'connecting' | 'active';
        messageId: string;
        participantId: string;
        callOfferExpiration?: string | undefined;
      }>,
    ) => {
      state.status = action.payload.status;
      state.messageId = action.payload.messageId;
      state.participantId = action.payload.participantId;
      state.callOfferExpiration = action.payload.callOfferExpiration;
    },
  },
});

export const { setInactive, setActive } = videoCallSlice.actions;
const videoCallReducer = videoCallSlice.reducer;
export default videoCallReducer;
