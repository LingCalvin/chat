import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  notifications: {
    enabled: boolean;
    doNotAskPermission: boolean;
    messagePreview: boolean;
    silent: boolean;
  };
  persistance: {
    contacts: boolean;
  };
}

const initialState: SettingsState = {
  notifications: {
    enabled: true,
    doNotAskPermission: false,
    messagePreview: true,
    silent: false,
  },
  persistance: {
    contacts: false,
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    allowPermissionRequest: (state, action: PayloadAction<boolean>) => {
      state.notifications.doNotAskPermission = !action.payload;
    },
    enableMessagePreview: (state, action: PayloadAction<boolean>) => {
      state.notifications.messagePreview = action.payload;
    },
    enableNotifications: (state, action: PayloadAction<boolean>) => {
      state.notifications.enabled = action.payload;
    },
    enableSilentNotifications: (state, action: PayloadAction<boolean>) => {
      state.notifications.silent = action.payload;
    },
    mergeSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return { ...state, ...action.payload };
    },
    persistContacts: (state, action: PayloadAction<boolean>) => {
      state.persistance.contacts = action.payload;
    },
    toggleMessagePreview: (state) => {
      state.notifications.messagePreview = !state.notifications.messagePreview;
    },
    toggleNotifications: (state) => {
      state.notifications.enabled = !state.notifications.enabled;
    },
    togglePersistContacts: (state) => {
      state.persistance.contacts = !state.persistance.contacts;
    },
    toggleSilentNotifications: (state) => {
      state.notifications.silent = !state.notifications.silent;
    },
  },
});

export const {
  allowPermissionRequest,
  enableMessagePreview,
  enableNotifications,
  enableSilentNotifications,
  mergeSettings,
  persistContacts,
  toggleMessagePreview,
  toggleNotifications,
  togglePersistContacts,
  toggleSilentNotifications,
} = settingsSlice.actions;
const settingsReducer = settingsSlice.reducer;
export default settingsReducer;
