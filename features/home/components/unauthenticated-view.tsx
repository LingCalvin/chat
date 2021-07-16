import { Button, Container, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import useStyles from './unauthenticated-view.styles';

export default function UnauthenticatedView() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h2" component="h1">
        Start chatting
      </Typography>
      <Link href="/auth/sign-up" passHref>
        <Button variant="outlined" fullWidth>
          Sign up
        </Button>
      </Link>
      <Link href="/auth/sign-in" passHref>
        <Button color="primary" variant="contained" fullWidth>
          Sign in
        </Button>
      </Link>
    </Container>
  );
}
