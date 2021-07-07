import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  notifications: {
    enabled: boolean;
    doNotAskPermission: boolean;
  };
}

const initialState: SettingsState = {
  notifications: {
    enabled: true,
    doNotAskPermission: false,
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    allowPermissionRequest: (state, action: PayloadAction<boolean>) => {
      state.notifications.doNotAskPermission = !action.payload;
    },
    enableNotifications: (state, action: PayloadAction<boolean>) => {
      state.notifications.enabled = action.payload;
    },
    mergeSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { allowPermissionRequest, enableNotifications, mergeSettings } =
  settingsSlice.actions;
const settingsReducer = settingsSlice.reducer;
export default settingsReducer;
