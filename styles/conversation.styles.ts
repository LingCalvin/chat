import { makeStyles } from '@material-ui/core';
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
    messageBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(1),
      overflowY: 'auto',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    root: {
      height: '100vh',
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
    },
    receivedChatBubble: {
      ...chatBubble,
      backgroundColor: theme.palette.grey[300],
      marginRight: 'auto',
    },
    sentChatBubble: {
      ...chatBubble,
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      marginLeft: 'auto',
    },
  };
});

export default useStyles;
