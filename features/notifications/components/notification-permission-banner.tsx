import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  allowPermissionRequest,
  enableNotifications,
} from '../../settings/settings.slice';
import useStyles from './notification-permission-banner.styles';

export interface NotificationPermissionBannerProps {
  className?: string;
}

export default function NotificationPermissionBanner({
  className,
}: NotificationPermissionBannerProps) {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const notificationSettings = useAppSelector(
    (state) => state.settings.notifications,
  );

  const [permission, setPermission] = useState(Notification.permission);

  const onDismiss = () => dispatch(allowPermissionRequest(false));
  const onEnable = () =>
    Notification.requestPermission().then((perm) => {
      setPermission(perm);
      if (perm === 'granted') {
        dispatch(enableNotifications(true));
      }
    });

  if (
    !notificationSettings.doNotAskPermission &&
    permission !== 'granted' &&
    permission !== 'denied' &&
    notificationSettings.enabled
  ) {
    return (
      <Card className={clsx(classes.root, className)}>
        <CardContent>
          <Typography>
            Enable notifications to get alerted about new messages.
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
  return null;
}
