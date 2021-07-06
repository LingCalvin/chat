import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { findLast } from '../../common/utils/array.utils';
import { TextMessage } from './interfaces/text.message';

interface ConversationState {
  connectionStatus: 'initial' | 'connected' | 'closed';
  otherParticipant: string | null;
  initiate: boolean;
  messages: TextMessage[];
}

const initialState: ConversationState = {
  connectionStatus: 'initial',
  otherParticipant: null,
  initiate: false,
  messages: [],
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<TextMessage>) => {
      state.messages.push(action.payload);
    },
    markMessageDelivered: (
      state,
      action: PayloadAction<{ id: TextMessage['id']; date: string }>,
    ) => {
      const message = findLast(
        state.messages,
        (message) => message.id === action.payload.id,
      );
      if (message !== undefined && message.receivedDate === null) {
        message.receivedDate = action.payload.date;
      }
    },
    markMessageRead: (
      state,
      action: PayloadAction<{ id: TextMessage['id']; date: string }>,
    ) => {
      const message = findLast(
        state.messages,
        (message) => message.id === action.payload.id,
      );
      if (message !== undefined && message.readDate === null) {
        message.readDate = action.payload.date;
      }
    },
    setParticipant: (
      state,
      action: PayloadAction<{ id: string; initiate?: boolean }>,
    ) => {
      state.otherParticipant = action.payload.id;
      if (action.payload.initiate !== undefined) {
        state.initiate = action.payload.initiate;
      }
    },
    setConnectionStatus: (
      state,
      action: PayloadAction<ConversationState['connectionStatus']>,
    ) => {
      state.connectionStatus = action.payload;
    },
  },
});

export const {
  addMessage,
  markMessageDelivered,
  markMessageRead,
  setParticipant,
  setConnectionStatus,
} = conversationSlice.actions;
const conversationReducer = conversationSlice.reducer;
export default conversationReducer;
