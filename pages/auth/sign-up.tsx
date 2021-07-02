import { Button, Container, Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Link from 'next/link';
import { useState } from 'react';
import SignUpForm from '../../components/sign-up-form';
import { signUp } from '../../lib/authentication';
import useStyles from '../../styles/auth.styles';

export default function SignIn() {
  const classes = useStyles();
  const [alert, setAlert] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSignUp = async (username: string, password: string) => {
    if (loading) {
      return;
    }
    setLoading(true);
    setAlert('');
    setSuccess(false);
    try {
      await signUp(username, password);
      setSuccess(true);
    } catch (e) {
      setAlert(e.message);
      setLoading(false);
    }
  };

  const signUpView = (
    <>
      <Typography variant="h1">Sign up</Typography>
      {alert && <Alert severity="error">{alert}</Alert>}
      <SignUpForm
        TextFieldVariant="outlined"
        ButtonVariant="contained"
        ButtonColor="primary"
        onSubmit={(data) => handleSignUp(data.username, data.password)}
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
        {success ? successView : signUpView}
      </div>
    </Container>
  );
}
