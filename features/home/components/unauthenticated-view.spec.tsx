import { render, screen } from '@testing-library/react';
import UnauthenticatedView from './unauthenticated-view';

describe('UnauthenticatedView', () => {
  beforeEach(() => render(<UnauthenticatedView />));

  test('has a sign up link', () => {
    const signUpLink = screen.getByRole('link', { name: /sign up/i });

    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute('href', '/auth/sign-up');
  });

  test('has a sign in link', () => {
    const signInLink = screen.getByRole('link', { name: /sign in/i });

    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', '/auth/sign-in');
  });
});
