import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  divider: {
    gridArea: 'divider',
  },
  editor: {
    gridArea: 'editor',
    overflow: 'hidden',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    '& .ProseMirror:focus': {
      outline: 'none',
    },
    '& code': {
      backgroundColor: theme.palette.grey[300],
      borderRadius: theme.shape.borderRadius,
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
    },
    '& p': {
      margin: 0,
      ...theme.typography.body1,
    },
  },
  menuBar: {
    gridArea: 'menu-bar',
  },
  root: {
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: '1fr auto auto',
    gridTemplateAreas: `
    "editor send-button"
    "divider divider"
    "menu-bar menu-bar"`,
  },
  sendButton: {
    gridArea: 'send-button',
    alignSelf: 'end',
  },
}));

export default useStyles;
