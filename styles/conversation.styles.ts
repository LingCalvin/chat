import { makeStyles } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const useStyles = makeStyles((theme) => {
  const chatBubble: CSSProperties = {
    overflowWrap: 'anywhere',
    borderRadius: theme.shape.borderRadius * 4,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    maxWidth: '85%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '55%',
    },
  };
  return {
    appBar: {
      minWidth: 0,
    },
    chatBubble,
    content: {
      display: 'flex',
      flexDirection: 'column',
    },
    messageBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(1),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      flexGrow: 1,
    },
    messageForm: {
      paddingBottom: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
      position: 'sticky',
      bottom: 0,
    },
    messageInputField: {
      backgroundColor: theme.palette.background.paper,
    },
    root: {
      height: '100%',
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
    },
    receivedChatBubble: {
      ...chatBubble,
      backgroundColor: theme.palette.grey[300],
      marginRight: 'auto',
    },
    sentChatBubble: {
      ...chatBubble,
      backgroundColor: indigo[400],
      color: theme.palette.primary.contrastText,
      marginLeft: 'auto',
    },
    snackbar: {
      position: 'absolute',
      bottom: '80px',
    },
  };
});

export default useStyles;
