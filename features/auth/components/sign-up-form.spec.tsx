import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import SignUpForm, { SignUpFormProps } from './sign-up-form';

function usernameField() {
  return screen.getByRole('textbox', { name: /username/i });
}

function passwordField() {
  return screen.getByLabelText(/^password$/i);
}

function confirmPasswordField() {
  return screen.getByLabelText(/^confirm password$/i);
}

function submitButton() {
  return screen.getByRole('button', { name: /sign up/i });
}

describe('SignUpForm', () => {
  const onSubmit = jest.fn<void, Parameters<SignUpFormProps['onSubmit']>>();
  beforeEach(() => render(<SignUpForm onSubmit={onSubmit} />));
  afterEach(() => onSubmit.mockClear());

  test('has a username field', () => {
    expect(usernameField()).toBeInTheDocument();
  });

  test('has a password field', () => {
    expect(passwordField()).toBeInTheDocument();
    expect(passwordField()).toHaveAccessibleName();
  });

  test('has a confirm password field', () => {
    expect(confirmPasswordField()).toBeInTheDocument();
    expect(confirmPasswordField()).toHaveAccessibleName();
  });

  test('has a submit button', () => {
    expect(submitButton()).toBeInTheDocument();
  });

  test('calls onSubmit when submitting valid values', async () => {
    await act(async () => {
      userEvent.type(usernameField(), 'username');
      userEvent.type(passwordField(), 'password');
      userEvent.type(confirmPasswordField(), 'password');
      userEvent.click(submitButton());
    });

    expect(usernameField()).toBeValid();
    expect(passwordField()).toBeValid();
    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        username: 'username',
        password: 'password',
      }),
      expect.anything(),
    );
  });

  test('displays an error when username is empty', async () => {
    await act(async () => {
      userEvent.type(passwordField(), 'password');
      userEvent.type(confirmPasswordField(), 'password');
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

  test('displays an error when confirm password is empty', async () => {
    await act(async () => {
      userEvent.type(usernameField(), 'username');
      userEvent.type(passwordField(), 'password');
      userEvent.click(submitButton());
    });

    expect(confirmPasswordField()).toBeInvalid();
    expect(confirmPasswordField()).toHaveAccessibleDescription();
    expect(onSubmit).not.toBeCalled();
  });

  test('displays an error when confirm password does not match password', async () => {
    await act(async () => {
      userEvent.type(usernameField(), 'username');
      userEvent.type(passwordField(), 'password');
      userEvent.type(confirmPasswordField(), 'password mismatch');
      userEvent.click(submitButton());
    });

    expect(confirmPasswordField()).toBeInvalid();
    expect(confirmPasswordField()).toHaveAccessibleDescription();
    expect(onSubmit).not.toBeCalled();
  });

  test('displays an error when password is less than 8 characters', async () => {
    await act(async () => {
      userEvent.type(usernameField(), 'username');
      userEvent.type(passwordField(), 'short');
      userEvent.type(confirmPasswordField(), 'short');
      userEvent.click(submitButton());
    });

    expect(passwordField()).toBeInvalid();
    expect(onSubmit).not.toBeCalled();
  });
});
