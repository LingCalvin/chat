import { makeStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const useStyles = makeStyles((theme) => {
  const chatBubble: CSSProperties = {
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
      textAlign: 'left',
      marginRight: 'auto',
    },
    sentChatBubble: {
      ...chatBubble,
      textAlign: 'right',
      marginLeft: 'auto',
    },
  };
});

export default useStyles;
