import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  controls: {
    gridArea: 'controls',
    width: '100%',
    justifyContent: 'space-between',
  },
  portrait: {
    fontSize: `12rem`,
    gridArea: 'portrait',
  },
  root: {
    display: 'grid',
    gridTemplateAreas: `"title"
    "portrait"
    "controls"`,
    gridTemplateRows: 'auto 1fr auto',
    height: '100%',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    justifyItems: 'center',
  },
  title: {
    gridArea: 'title',
  },
}));

export default useStyles;
