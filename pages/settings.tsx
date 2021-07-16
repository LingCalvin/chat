import {
  AppBar,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Switch,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
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
          <IconButton edge="start" color="inherit" onClick={router.back}>
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
          <ListItem button onClick={handleTogglePersistContacts}>
            <ListItemText primary="Contacts" secondary="Save contacts" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={persistance.contacts}
                onChange={handleTogglePersistContacts}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListSubheader>Notifications</ListSubheader>
          <ListItem button onClick={handleToggleNotifications}>
            <ListItemText
              primary="Notifications"
              secondary="Get alerted about new messages"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={notificationPermissionChecked}
                onChange={handleToggleNotifications}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button onClick={handleToggleMessagePreview}>
            <ListItemText
              primary="Preview message"
              secondary="Show the message contents"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={notifications.messagePreview}
                onChange={handleToggleMessagePreview}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button onClick={handleToggleSilentNotifications}>
            <ListItemText
              primary="Silent"
              secondary="Disable notification sounds and vibration"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={notifications.silent}
                onChange={handleToggleSilentNotifications}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Container>
    </div>
  );
}
