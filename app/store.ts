import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authReducer from '../features/auth/auth-slice';
import contactsReducer from '../features/contacts/contacts.slice';
import conversationReducer from '../features/conversation/conversation-slice';
import dataChannelReducer from '../features/data-channel/data-channel.slice';
import settingsReducer from '../features/settings/settings.slice';
import { authApi } from './services/auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
    conversation: conversationReducer,
    dataChannel: dataChannelReducer,
    settings: settingsReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  devTools: process.env.NODE_ENV === 'development',
});

setupListeners(store.dispatch);

// Persist settings to local storage
let previousSettings:
  | ReturnType<typeof store['getState']>['settings']
  | undefined = undefined;

store.subscribe(() => {
  const { settings: currentSettings } = store.getState();
  if (currentSettings !== previousSettings) {
    localStorage.setItem('settings', JSON.stringify(currentSettings));
  }
  previousSettings = currentSettings;
});

// Persist contacts to local storage
let previousContacts:
  | ReturnType<typeof store['getState']>['contacts']
  | undefined = undefined;

// Persist contacts to local storage
let previousPersistContacts:
  | ReturnType<typeof store['getState']>['settings']['persistance']['contacts']
  | undefined = undefined;
store.subscribe(() => {
  const {
    contacts: currentContacts,
    settings: {
      persistance: { contacts: persistContacts },
    },
  } = store.getState();
  if (persistContacts !== previousPersistContacts && persistContacts) {
    // Clear contacts from localStorage if persistance has been turned off
    localStorage.setItem('contacts', JSON.stringify(currentContacts));
  } else if (persistContacts !== previousPersistContacts && !persistContacts) {
    // Save contacts to localStorage if persistance has been turned on
    localStorage.removeItem('contacts');
  }
  previousPersistContacts = persistContacts;

  if (currentContacts !== previousContacts && persistContacts) {
    localStorage.setItem('contacts', JSON.stringify(currentContacts));
  }
  previousContacts = currentContacts;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
