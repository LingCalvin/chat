import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  allowPermissionRequest,
  enableNotifications,
} from '../../settings/settings.slice';
import useStyles from './notification-permission-banner.styles';

export default function NotificationPermissionBanner() {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const notificationSettings = useAppSelector(
    (state) => state.settings.notifications,
  );

  const onDismiss = () => dispatch(allowPermissionRequest(false));
  const onEnable = () =>
    Notification.requestPermission().then((perm) => {
      if (perm === 'granted') {
        dispatch(enableNotifications(true));
      }
    });

  if (
    Notification.permission === 'granted' ||
    notificationSettings.enabled ||
    notificationSettings.doNotAskPermission
  ) {
    return null;
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography>
          Enable notifications to get alerted of new messages.
        </Typography>
      </CardContent>
      <CardActions className={classes.actionBox}>
        <Button color="primary" onClick={onDismiss}>
          Dismiss
        </Button>
        <Button color="primary" onClick={onEnable}>
          Enable
        </Button>
      </CardActions>
    </Card>
  );
}
