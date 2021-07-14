import { makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => {
  const acceptColor = theme.palette.augmentColor(green, 600);
  const rejectColor = theme.palette.augmentColor(red);
  return {
    root: { display: 'flex', gap: theme.spacing(2) },
    iconButton: {
      boxShadow: 'unset',
    },
    acceptIcon: {
      backgroundColor: acceptColor.main,
      color: acceptColor.contrastText,
      '&:hover': {
        backgroundColor: acceptColor.dark,
      },
    },
    rejectIcon: {
      backgroundColor: rejectColor.main,
      color: rejectColor.contrastText,
      '&:hover': {
        backgroundColor: rejectColor.dark,
      },
    },
  };
});

export default useStyles;
