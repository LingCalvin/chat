import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReadyState } from 'react-use-websocket';

interface DataChannelState {
  connectedToSignalingServer: boolean;
  webSocketReadyState: ReadyState;
}

const initialState: DataChannelState = {
  connectedToSignalingServer: false,
  webSocketReadyState: ReadyState.UNINSTANTIATED,
};

export const dataChannelSlice = createSlice({
  name: 'dataChannel',
  initialState,
  reducers: {
    setConnectedToSignalingServer: (
      state,
      action: PayloadAction<DataChannelState['connectedToSignalingServer']>,
    ) => {
      state.connectedToSignalingServer = action.payload;
    },
    setWebSocketReadyState: (
      state,
      action: PayloadAction<DataChannelState['webSocketReadyState']>,
    ) => {
      state.webSocketReadyState = action.payload;
    },
  },
});

export const { setConnectedToSignalingServer, setWebSocketReadyState } =
  dataChannelSlice.actions;
const dataChannelReducer = dataChannelSlice.reducer;
export default dataChannelReducer;
