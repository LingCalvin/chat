import { ThemeProvider } from '@material-ui/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { theme } from '../../../common/constants/theme';
import IncomingVideoCallControls from './incoming-video-call-controls';

describe('IncomingVideoCallControls', () => {
  function acceptButton() {
    return screen.getByRole('button', { name: /accept/i });
  }

  function declineButton() {
    return screen.getByRole('button', { name: /decline/i });
  }

  const onAccept = jest.fn();
  const onDecline = jest.fn();
  beforeEach(() =>
    render(
      <ThemeProvider theme={theme}>
        <IncomingVideoCallControls onAccept={onAccept} onDecline={onDecline} />,
      </ThemeProvider>,
    ),
  );
  afterEach(() => {
    onAccept.mockClear();
    onDecline.mockClear();
  });

  test('has an accept button', () => {
    userEvent.click(acceptButton());

    expect(acceptButton()).toBeInTheDocument();
    expect(onAccept).toBeCalledTimes(1);
  });

  test('has a decline button', () => {
    userEvent.click(declineButton());

    expect(declineButton()).toBeInTheDocument();
    expect(onDecline).toBeCalledTimes(1);
  });
});
