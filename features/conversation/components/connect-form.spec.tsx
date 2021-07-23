import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConnectForm, { ConnectFormProps } from './connect-form';

function field() {
  return screen.getByRole('textbox');
}

function submitButton() {
  return screen.getByRole('button', { name: /connect/i });
}

describe('ConnectForm', () => {
  const onSubmit = jest.fn<void, Parameters<ConnectFormProps['onSubmit']>>();
  afterEach(() => onSubmit.mockClear());

  test(`has a single input field for the recipient's ID`, () => {
    render(<ConnectForm onSubmit={onSubmit} />);

    const fields = screen.getAllByRole('textbox');

    expect(fields.length).toBe(1);
  });

  test('has a connect button', () => {
    render(<ConnectForm onSubmit={onSubmit} />);

    expect(submitButton()).toBeInTheDocument();
  });

  test('submits when value is valid', async () => {
    render(<ConnectForm onSubmit={onSubmit} />);

    userEvent.type(field(), '00000000-0000-0000-0000-000000000000');
    userEvent.click(submitButton());

    expect(field()).toBeValid();
    await waitFor(() => expect(onSubmit).toBeCalledTimes(1));
    await waitFor(() =>
      expect(onSubmit).toBeCalledWith(
        { id: '00000000-0000-0000-0000-000000000000' },
        expect.anything(),
      ),
    );
  });

  test('does not submit when field is empty', () => {
    render(<ConnectForm onSubmit={onSubmit} />);

    userEvent.click(submitButton());

    expect(screen.getByRole('textbox')).toBeInvalid();
    expect(onSubmit).not.toBeCalled();
  });

  test('disables submit when disabled === true', () => {
    render(<ConnectForm onSubmit={onSubmit} disabled />);

    expect(submitButton()).toBeDisabled();
  });
});
