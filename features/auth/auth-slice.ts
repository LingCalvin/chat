import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from './interfaces/user-info';

interface InitialAuthState {
  status: 'unauthenticated';
}

interface AuthenticatedAuthState {
  status: 'authenticated';
  ticket: string | undefined;
  id: string;
  username: string;
}

type AuthState = InitialAuthState | AuthenticatedAuthState;

const initialState: AuthState = { status: 'unauthenticated' } as AuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthentication: (_state, action: PayloadAction<UserInfo>) => {
      return {
        status: 'authenticated',
        id: action.payload.id,
        username: action.payload.username,
        ticket: undefined,
      };
    },
    clearAuthentication: (_state) => {
      return { status: 'unauthenticated' };
    },
    setTicket: (state, action: PayloadAction<string | undefined>) => {
      if (state.status === 'authenticated') {
        state.ticket = action.payload;
      }
    },
  },
});

export const { setAuthentication, clearAuthentication, setTicket } =
  authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
