import { Button, Container, Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import Link from 'next/link';
import SignUpForm from '../../components/sign-up-form';
import isFetchBaseQueryError from '../../lib/type-guards/is-fetch-base-query-error';
import { useSignUpMutation } from '../../services/auth';
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
  if (error.status === 409) {
    return 'A user with that username already exists.';
  }
  return 'An unexpected error has occurred.';
}

export default function SignIn() {
  const classes = useStyles();
  const [signUp, { isLoading, data, error }] = useSignUpMutation();

  const alert = errorMessage(error);

  const signUpView = (
    <>
      <Typography variant="h1">Sign up</Typography>
      {alert && <Alert severity="error">{alert}</Alert>}
      <SignUpForm
        TextFieldVariant="outlined"
        ButtonVariant="contained"
        ButtonColor="primary"
        disabled={isLoading}
        onSubmit={signUp}
      />
    </>
  );

  const successView = (
    <>
      <Typography variant="h1" align="center">
        Account created
      </Typography>
      <Link href="/auth/sign-in" passHref>
        <Button variant="contained" color="primary">
          Sign in
        </Button>
      </Link>
    </>
  );

  return (
    <Container className={classes.root}>
      <div className={classes.content}>
        {data !== undefined ? successView : signUpView}
      </div>
    </Container>
  );
}
