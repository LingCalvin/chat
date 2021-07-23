import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoCallControls, {
  VideoCallControlsProps,
} from './video-call-controls';

describe('VideoCallControls', () => {
  function hangUpButton() {
    return screen.getByRole('button', { name: /hang up/i });
  }

  function micToggleButton() {
    return screen.getByRole('button', { name: /mic toggle/i });
  }

  function videoToggleButton() {
    return screen.getByRole('button', { name: /video toggle/i });
  }

  const onMicToggle = jest.fn();
  const onVideoToggle = jest.fn();
  const onHangUp = jest.fn();
  const baseProps: VideoCallControlsProps = {
    onMicToggle,
    onVideoToggle,
    onHangUp,
  };

  function renderComponent(props?: Partial<VideoCallControlsProps>) {
    return render(<VideoCallControls {...baseProps} {...props} />);
  }

  afterEach(() => {
    onMicToggle.mockClear();
    onVideoToggle.mockClear();
    onHangUp.mockClear();
  });

  test('has a hang up button', () => {
    renderComponent();

    userEvent.click(hangUpButton());

    expect(hangUpButton()).toBeInTheDocument();
    expect(onHangUp).toBeCalledTimes(1);
    expect(onHangUp).toBeCalledWith();
  });

  test('has a mic toggle button', () => {
    renderComponent();

    userEvent.click(micToggleButton());

    expect(micToggleButton()).toBeInTheDocument();
    expect(onMicToggle).toBeCalledTimes(1);
    expect(onMicToggle).toBeCalledWith();
  });

  test('has a video toggle button', () => {
    renderComponent();

    userEvent.click(videoToggleButton());

    expect(videoToggleButton()).toBeInTheDocument();
    expect(onVideoToggle).toBeCalledTimes(1);
    expect(onVideoToggle).toBeCalledWith();
  });
});
