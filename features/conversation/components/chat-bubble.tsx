import {
  ButtonBase,
  capitalize,
  Collapse,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import useToggle from '../../../common/hooks/use-toggle';
import { TextMessage } from '../interfaces/text.message';
import { getStatus } from '../utils/message.utils';
import useStyles from './chat-bubble.styles';

export interface ChatBubbleProps {
  message: TextMessage;
  sent?: boolean;
  className?: string;
}

const dateOptions: Intl.DateTimeFormatOptions = {
  dateStyle: 'medium',
  timeStyle: 'short',
};

export default function ChatBubble({
  message,
  sent,
  className,
}: ChatBubbleProps) {
  const classes = useStyles();
  const { state: toggleState, toggle } = useToggle();

  const getInfoBoxText = () => {
    if (sent && message.sentDate) {
      return `${new Date(message.sentDate).toLocaleString(
        undefined,
        dateOptions,
      )} • ${capitalize(getStatus(message))}`;
    }
    if (!sent && message.receivedDate) {
      return new Date(message.receivedDate).toLocaleString(
        undefined,
        dateOptions,
      );
    }
    return 'unknown';
  };

  return (
    <div className={className}>
      <ButtonBase
        className={clsx({
          [classes.sentChatBubble]: sent,
          [classes.receivedChatBubble]: !sent,
        })}
        disableRipple
        focusVisibleClassName={classes.focusedChatBubble}
        onClick={toggle}
      >
        <Typography className={classes.text}>{message.body}</Typography>
      </ButtonBase>
      <Collapse className={classes.infoBox} in={toggleState}>
        <Typography variant="caption">{getInfoBoxText()}</Typography>
      </Collapse>
    </div>
  );
}
