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
  messages: TextMessage[];
}

const initialState: ConversationState = {
  otherParticipant: null,
  messages: [],
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<TextMessage>) => {
      state.messages.push(action.payload);
    },
    setParticipant: (state, action: PayloadAction<string>) => {
      state.otherParticipant = action.payload;
    },
  },
});

export const { addMessage, setParticipant } = conversationSlice.actions;
const conversationReducer = conversationSlice.reducer;
export default conversationReducer;
