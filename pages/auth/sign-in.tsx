import { Container, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SignInForm from '../../components/sign-in-form';
import { setToken } from '../../features/auth/auth-slice';
import { useAppDispatch } from '../../hooks';
import { signIn } from '../../lib/authentication';
import useStyles from '../../styles/auth.styles';

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [alert, setAlert] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSignIn = async (username: string, password: string) => {
    if (loading) {
      return;
    }
    setLoading(true);
    setAlert('');
    try {
      const accessToken = await signIn(username, password);
      dispatch(setToken(accessToken));
      router.push('/');
    } catch (e) {
      setAlert(e.message);
      setLoading(false);
    }
  };

  return (
    <Container className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h1">Sign in</Typography>
        {alert && <Alert severity="error">{alert}</Alert>}
        <SignInForm
          TextFieldVariant="outlined"
          ButtonVariant="contained"
          ButtonColor="primary"
          onSubmit={(data) => handleSignIn(data.username, data.password)}
        />
      </div>
    </Container>
  );
}
