import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import ConversationView, { ConversationViewProps } from './conversation-view';

jest.mock('next/router', () => ({ push: jest.fn() }));

const baseProps: ConversationViewProps = {
  roomName: 'room',
  contact: { id: '00000000-0000-0000-0000-000000000000', username: 'user' },
  messages: [],
  connectionStatus: 'initial',
  messageInput: '',
  onMessageInputChange: jest.fn(),
  onMessageInputSubmit: jest.fn(),
  onStartVideoCall: jest.fn(),
};

function renderComponent(props?: Partial<ConversationViewProps>) {
  return render(<ConversationView {...baseProps} {...props} />);
}

function messageField() {
  return screen.getByRole('textbox', { name: /message/i });
}

function sendButton() {
  return screen.getByRole('button', { name: /send/i });
}

function videoCallButton() {
  return screen.getByRole('button', { name: /video call/i });
}

describe('ConversationView', () => {
  afterEach(() => jest.clearAllMocks());

  test(`video call button is disabled when connectionStatus !== 'connected'`, () => {
    renderComponent();

    expect(videoCallButton()).toBeDisabled();
  });

  test('send button is disabled when not connected', () => {
    renderComponent();

    userEvent.type(messageField(), 'Hello');

    expect(sendButton()).toBeDisabled();
  });

  test('send button is disabled when message field is empty', () => {
    renderComponent({ connectionStatus: 'connected' });

    expect(sendButton()).toBeDisabled();
  });

  test('onMessageInputChange is called when message field input changes', () => {
    renderComponent();

    userEvent.type(messageField(), 'a');

    expect(baseProps.onMessageInputChange).toBeCalledTimes(1);
    expect(baseProps.onMessageInputChange).toBeCalledWith('a');
  });

  test('onMessageInputSubmit is called when connected and submitting a valid message', () => {
    renderComponent({ messageInput: 'a', connectionStatus: 'connected' });

    userEvent.click(sendButton());

    expect(baseProps.onMessageInputSubmit).toBeCalledTimes(1);
  });

  test('onStartVideoCall is called when clicking the video call button', () => {
    renderComponent({ connectionStatus: 'connected' });

    userEvent.click(videoCallButton());

    expect(baseProps.onStartVideoCall).toBeCalledTimes(1);
  });

  test('displays messages', () => {
    renderComponent({
      messages: [
        {
          id: '1',
          type: 'TEXT',
          senderId: '1',
          recipientId: '00000000-0000-0000-0000-000000000000',
          sentDate: '',
          readDate: null,
          receivedDate: null,
          body: 'message 1',
        },
        {
          id: '2',
          type: 'TEXT',
          senderId: '00000000-0000-0000-0000-000000000000',
          recipientId: '1',
          sentDate: '',
          readDate: null,
          receivedDate: null,
          body: 'message 2',
        },
      ],
    });

    expect(screen.getByText('message 1')).toBeInTheDocument();
    expect(screen.getByText('message 2')).toBeInTheDocument();
  });

  test('displays an alert when the connection is closed', () => {
    renderComponent({ connectionStatus: 'closed' });

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('displays a menu when the menu button is clicked', () => {
    renderComponent();

    userEvent.click(screen.getByRole('button', { name: /menu/i }));

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  test('navigate to the settings page when settings is clicked', () => {
    renderComponent();

    userEvent.click(screen.getByRole('button', { name: /menu/i }));
    userEvent.click(screen.getByRole('menuitem', { name: /settings/i }));

    expect(Router.push).toBeCalledTimes(1);
    expect(Router.push).toBeCalledWith('/settings');
  });
});
