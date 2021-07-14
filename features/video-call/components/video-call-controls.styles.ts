import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => {
  const hangUpColor = theme.palette.augmentColor(red);
  return {
    hangUpIcon: {
      backgroundColor: hangUpColor.main,
      color: hangUpColor.contrastText,
      '&:hover': {
        backgroundColor: hangUpColor.dark,
      },
    },
    iconButton: {
      boxShadow: 'unset',
    },
    root: { display: 'flex', gap: theme.spacing(2) },
  };
});

export default useStyles;
