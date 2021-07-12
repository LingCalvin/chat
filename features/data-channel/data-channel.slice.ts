import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReadyState } from 'react-use-websocket';

interface DataChannelState {
  signalingServerReadyState: ReadyState;
}

const initialState: DataChannelState = {
  signalingServerReadyState: ReadyState.UNINSTANTIATED,
};

export const dataChannelSlice = createSlice({
  name: 'dataChannel',
  initialState,
  reducers: {
    setSignalingServerReadyState: (
      state,
      action: PayloadAction<DataChannelState['signalingServerReadyState']>,
    ) => {
      state.signalingServerReadyState = action.payload;
    },
  },
});

export const { setSignalingServerReadyState } = dataChannelSlice.actions;
const dataChannelReducer = dataChannelSlice.reducer;
export default dataChannelReducer;
