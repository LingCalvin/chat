import { Button } from '@material-ui/core';
import { render, screen } from '@testing-library/react';
import IncomingVideoCallControlsAction from './incoming-video-call-controls-action';

describe('IncomingVideoCallControlsAction', () => {
  const button = <Button>button</Button>;
  const text = 'text';
  beforeEach(() =>
    render(<IncomingVideoCallControlsAction button={button} text={text} />),
  );

  test('displays the button prop', () => {
    expect(screen.getByRole('button', { name: 'button' })).toBeInTheDocument();
  });

  test('displays the text prop', () => {
    expect(screen.getByText('text')).toBeInTheDocument();
  });
});
