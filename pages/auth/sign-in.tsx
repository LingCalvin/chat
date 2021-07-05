import { Container, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { useRouter } from 'next/router';
import SignInForm from '../../components/sign-in-form';
import { setAuthentication } from '../../features/auth/auth-slice';
import { useAppDispatch } from '../../hooks';
import { Credentials } from '../../interfaces/credentials';
import isFetchBaseQueryError from '../../lib/type-guards/is-fetch-base-query-error';
import { useSignInMutation } from '../../services/auth';
import useStyles from '../../styles/auth.styles';

function errorMessage(
  error: FetchBaseQueryError | SerializedError | undefined,
) {
  if (error === undefined) {
    return '';
  }
  if (!isFetchBaseQueryError(error)) {
    return 'An unexpected error has occurred.';
  }
  if (error.status === 401) {
    return 'Invalid credentials.';
  }
  return 'An unexpected error has occurred.';
}

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [signIn, { isLoading, error }] = useSignInMutation();

  const handleSignIn = (credentials: Credentials) => {
    signIn(credentials)
      .unwrap()
      .then((userInfo) => {
        dispatch(setAuthentication(userInfo));
        router.push('/');
      });
  };

  const alert = errorMessage(error);

  return (
    <Container className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h1">Sign in</Typography>
        {alert && <Alert severity="error">{alert}</Alert>}
        <SignInForm
          disabled={isLoading}
          TextFieldVariant="outlined"
          ButtonVariant="contained"
          ButtonColor="primary"
          onSubmit={handleSignIn}
        />
      </div>
    </Container>
  );
}
