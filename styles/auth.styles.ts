import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
  content: {
    margin: 'auto',
    width: '100%',
    maxWidth: '80ch',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

export default useStyles;
