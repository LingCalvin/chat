import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  actionBox: {
    justifyContent: 'flex-end',
  },
}));

export default useStyles;
