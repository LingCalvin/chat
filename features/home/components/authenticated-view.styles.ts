import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  buttonBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  idContainer: {
    textAlign: 'center',
  },
  header: {
    flexGrow: 1,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  banner: {
    gridArea: 'banner',
  },
  content: {
    flexGrow: 1,
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateAreas: `
    "banner"
    "connection-box"`,
    gap: theme.spacing(1),
  },
  connectionBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    gridArea: 'connection-box',
    textAlign: 'center',
    alignSelf: 'center',
  },
}));

export default useStyles;
