import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  buttonBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  content: {
    margin: 'auto',
    width: '100%',
    maxWidth: '80ch',
  },
  idContainer: {
    textAlign: 'center',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
  },

  unauthenticatedView: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));

export default useStyles;
