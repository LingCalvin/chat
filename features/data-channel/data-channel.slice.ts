import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReadyState } from 'react-use-websocket';

interface DataChannelState {
  webSocketReadyState: ReadyState;
}

const initialState: DataChannelState = {
  webSocketReadyState: ReadyState.UNINSTANTIATED,
};

export const dataChannelSlice = createSlice({
  name: 'dataChannel',
  initialState,
  reducers: {
    setWebSocketReadyState: (
      state,
      action: PayloadAction<DataChannelState['webSocketReadyState']>,
    ) => {
      state.webSocketReadyState = action.payload;
    },
  },
});

export const { setWebSocketReadyState } = dataChannelSlice.actions;
const dataChannelReducer = dataChannelSlice.reducer;
export default dataChannelReducer;
