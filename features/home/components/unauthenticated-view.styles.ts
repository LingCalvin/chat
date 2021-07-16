import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    gap: theme.spacing(1),
    width: '100%',
    maxWidth: '80ch',
  },
}));

export default useStyles;
