import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    root: { display: 'flex', gap: theme.spacing(2) },
    iconButton: {
      boxShadow: 'unset',
    },
    acceptIcon: {
      backgroundColor: theme.palette.accept.main,
      color: theme.palette.accept.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.accept.dark,
      },
    },
    declineIcon: {
      backgroundColor: theme.palette.decline.main,
      color: theme.palette.decline.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.decline.dark,
      },
    },
  };
});

export default useStyles;
