import {
  AppBar,
  Container,
  Divider,
  IconButton,
  List,
  ListSubheader,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import SwitchListItem from '../features/settings/components/switch-list-item';
import {
  enableNotifications,
  toggleMessagePreview,
  togglePersistContacts,
  toggleSilentNotifications,
} from '../features/settings/settings.slice';

export default function Settings() {
  const router = useRouter();
  const { notifications, persistance } = useAppSelector(
    (state) => state.settings,
  );
  const dispatch = useAppDispatch();

  const [notificationPermission, setNotificationPermission] = useState<
    typeof Notification.permission
  >(notifications.enabled ? 'granted' : 'default');

  useEffect(() => {
    setNotificationPermission(Notification.permission);
  }, []);

  const notificationPermissionChecked =
    notificationPermission === 'granted' && notifications.enabled;

  const handleToggleNotifications = () => {
    if (!notificationPermissionChecked) {
      Notification.requestPermission().then((perm) => {
        setNotificationPermission(perm);
        if (perm === 'granted') {
          dispatch(enableNotifications(true));
        }
      });
    } else {
      dispatch(enableNotifications(false));
    }
  };

  const handleToggleMessagePreview = () => dispatch(toggleMessagePreview());
  const handleToggleSilentNotifications = () =>
    dispatch(toggleSilentNotifications());

  const handleTogglePersistContacts = () => dispatch(togglePersistContacts());

  return (
    <div>
      <AppBar>
        <Toolbar>
          <IconButton
            aria-label="Back"
            edge="start"
            color="inherit"
            onClick={router.back}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" component="h1">
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <List>
          <ListSubheader>Persistance</ListSubheader>
          <SwitchListItem
            primary="Contacts"
            secondary="Save contacts"
            checked={persistance.contacts}
            onToggle={handleTogglePersistContacts}
          />
          <Divider />
          <ListSubheader>Notifications</ListSubheader>
          <SwitchListItem
            primary="Notifications"
            secondary="Get alerted about new messages"
            checked={notificationPermissionChecked}
            onToggle={handleToggleNotifications}
          />
          <SwitchListItem
            primary="Preview message"
            secondary="Show the message contents"
            checked={notifications.messagePreview}
            onToggle={handleToggleMessagePreview}
          />
          <SwitchListItem
            primary="Silent"
            secondary="Disable notification sounds and vibration"
            checked={notifications.silent}
            onToggle={handleToggleSilentNotifications}
          />
        </List>
      </Container>
    </div>
  );
}
