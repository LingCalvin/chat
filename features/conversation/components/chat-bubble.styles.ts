import { makeStyles } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const useStyles = makeStyles((theme) => {
  const chatBubble: CSSProperties = {
    pointerEvents: 'auto',
    userSelect: 'text',
    overflowWrap: 'anywhere',
    borderRadius: theme.shape.borderRadius * 4,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    textAlign: 'left',
  };
  return {
    chatBubble,
    focusedChatBubble: {
      filter: 'brightness(90%)',
      backgroundColor: 'yellow',
    },
    infoBox: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    receivedChatBubble: {
      ...chatBubble,
      backgroundColor: theme.palette.grey[300],
    },
    sentChatBubble: {
      ...chatBubble,
      backgroundColor: indigo[400],
      color: theme.palette.primary.contrastText,
    },
    text: {
      cursor: 'initial',
    },
  };
});

export default useStyles;
