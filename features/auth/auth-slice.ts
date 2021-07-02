import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

interface InitialAuthState {
  status: 'unauthenticated';
  accessToken: null;
}

interface AuthenticatedAuthState {
  status: 'authenticated';
  accessToken: string;
  id: string;
  username: string;
}

type AuthState = InitialAuthState | AuthenticatedAuthState;

const initialState: AuthState = { accessToken: null } as AuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      const userData: { sub: string; username: string } = jwtDecode(
        action.payload,
      );
      return {
        status: 'authenticated',
        accessToken: action.payload,
        id: userData.sub,
        username: userData.username,
      };
    },
    clearToken: (state) => {
      return { status: 'unauthenticated', accessToken: null };
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
