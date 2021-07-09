import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', gap: theme.spacing(2) },
  iconButton: {
    boxShadow: 'unset',
  },
}));

export default useStyles;
