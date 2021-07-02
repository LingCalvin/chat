import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TextMessage {
  type: 'text';
  payload: string;
  sender: string | null;
  recipient: string | null;
  sentDate: string;
  receivedDate: string | null;
}

interface ConversationState {
  otherParticipant: string | null;
  initiate: boolean;
  messages: TextMessage[];
}

const initialState: ConversationState = {
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
    setParticipant: (
      state,
      action: PayloadAction<{ id: string; initiate?: boolean }>,
    ) => {
      state.otherParticipant = action.payload.id;
      if (action.payload.initiate !== undefined) {
        state.initiate = action.payload.initiate;
      }
    },
  },
});

export const { addMessage, setParticipant } = conversationSlice.actions;
const conversationReducer = conversationSlice.reducer;
export default conversationReducer;
