import { Container, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../app/hooks';
import { useSignInMutation } from '../../app/services/auth';
import isFetchBaseQueryError from '../../common/type-guards/is-fetch-base-query-error';
import { setAuthentication } from '../../features/auth/auth-slice';
import SignInForm from '../../features/auth/components/sign-in-form';
import { Credentials } from '../../features/auth/interfaces/credentials';
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
