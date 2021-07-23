import { ThemeProvider } from '@material-ui/core';
import { render, screen } from '@testing-library/react';
import { theme } from '../../../common/constants/theme';
import IncomingVideoCallScreen from './incoming-video-call-screen';

describe('IncomingVideoCallScreen', () => {
  function acceptButton() {
    return screen.getByRole('button', { name: /accept/i });
  }

  function declineButton() {
    return screen.getByRole('button', { name: /decline/i });
  }

  function title() {
    return screen.getByRole('heading', { name: 'title' });
  }

  const onAccept = jest.fn();
  const onDecline = jest.fn();
  beforeEach(() =>
    render(
      <ThemeProvider theme={theme}>
        <IncomingVideoCallScreen
          title="title"
          onAccept={onAccept}
          onDecline={onDecline}
        />
      </ThemeProvider>,
    ),
  );

  test('displays the title', () => {
    expect(title()).toBeInTheDocument();
  });

  test('displays an accept button', () => {
    expect(acceptButton()).toBeInTheDocument();
  });

  test('displays a decline button', () => {
    expect(declineButton()).toBeInTheDocument();
  });
});
