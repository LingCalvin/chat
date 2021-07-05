import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authReducer from '../features/auth/auth-slice';
import contactsReducer from '../features/contacts/contacts.slice';
import conversationReducer from '../features/conversation/conversation-slice';
import { authApi } from './services/auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
    conversation: conversationReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
