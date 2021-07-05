import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  formHelperText: {
    '&:first-letter': {
      textTransform: 'capitalize',
    },
  },
}));

export default useStyles;
