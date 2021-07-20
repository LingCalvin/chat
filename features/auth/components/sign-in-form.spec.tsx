import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import SignInForm, { SignInFormProps } from './sign-in-form';

function usernameField() {
  return screen.getByRole('textbox', { name: /username/i });
}

function passwordField() {
  return screen.getByLabelText(/password/i);
}

function submitButton() {
  return screen.getByRole('button', { name: /sign in/i });
}

describe('SignInForm', () => {
  const onSubmit = jest.fn<void, Parameters<SignInFormProps['onSubmit']>>();
  beforeEach(() => render(<SignInForm onSubmit={onSubmit} />));
  afterEach(() => onSubmit.mockClear());

  test('has a username field', () => {
    expect(usernameField()).toBeInTheDocument();
  });

  test('has a password field', () => {
    expect(passwordField()).toBeInTheDocument();
    expect(passwordField()).toHaveAccessibleName();
  });

  test('has a submit button', () => {
    expect(submitButton()).toBeInTheDocument();
  });

  test('calls onSubmit when submitting valid values', async () => {
    await act(async () => {
      userEvent.type(usernameField(), 'username');
      userEvent.type(passwordField(), 'password');
      userEvent.click(submitButton());
    });

    expect(usernameField()).toBeValid();
    expect(passwordField()).toBeValid();
    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).toBeCalledWith(
      {
        username: 'username',
        password: 'password',
      },
      expect.anything(),
    );
  });

  test('displays an error when username is empty', async () => {
    await act(async () => {
      userEvent.type(passwordField(), 'password');
      userEvent.click(submitButton());
    });

    expect(usernameField()).toBeInvalid();
    expect(usernameField()).toHaveAccessibleDescription();
    expect(onSubmit).not.toBeCalled();
  });

  test('displays an error when password is empty', async () => {
    await act(async () => {
      userEvent.type(usernameField(), 'username');
      userEvent.click(submitButton());
    });

    expect(passwordField()).toBeInvalid();
    expect(passwordField()).toHaveAccessibleDescription();
    expect(onSubmit).not.toBeCalled();
  });
});
