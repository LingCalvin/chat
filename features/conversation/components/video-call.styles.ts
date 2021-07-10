import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: '1fr auto auto',
    gridTemplateAreas: `"main"
    "self"
    "controls"`,
    backgroundColor: 'black',
    height: '100%',
    gap: theme.spacing(3),
  },
  controlsContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(3),
    gridArea: 'controls',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  videoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gridArea: 'main / main / controls / main',
  },
  video: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  selfVideoContainer: {
    gridArea: 'self',
    maxHeight: '100%',
    maxWidth: '33%',
  },
  snackBar: {
    bottom: 90,
  },
}));

export default useStyles;
