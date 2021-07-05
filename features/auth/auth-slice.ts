import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '../../interfaces/user-info';

interface InitialAuthState {
  status: 'unauthenticated';
}

interface AuthenticatedAuthState {
  status: 'authenticated';
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
      };
    },
    clearAuthentication: (_state) => {
      return { status: 'unauthenticated' };
    },
  },
});

export const { setAuthentication, clearAuthentication } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
