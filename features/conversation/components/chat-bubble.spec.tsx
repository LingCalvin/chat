import { render, screen } from '@testing-library/react';
import { TextMessage } from '../interfaces/text.message';
import ChatBubble from './chat-bubble';

describe('ChatBubble', () => {
  const baseTextMessage = Object.freeze<TextMessage>({
    id: '',
    type: 'TEXT',
    senderId: '',
    recipientId: '',
    sentDate: '',
    readDate: null,
    receivedDate: null,
    body: '',
  });

  test('shows the message body', () => {
    const body = 'message body';

    render(<ChatBubble message={{ ...baseTextMessage, body }} />);

    expect(screen.getByText(body)).toBeInTheDocument();
  });

  test('shows the status as unknown when receivedDate and sent are falsy', () => {
    render(<ChatBubble message={baseTextMessage} />);

    expect(screen.getByText('unknown')).toBeInTheDocument();
  });

  test('shows the status as sent when sentDate is truthy, receivedDate and readDate are falsy, and sent is true', () => {
    render(
      <ChatBubble
        sent
        message={{ ...baseTextMessage, sentDate: new Date().toISOString() }}
      />,
    );

    expect(
      screen.getByText((content) => content.endsWith('Sent')),
    ).toBeInTheDocument();
  });

  test('shows the status as delivered when receivedDate is truthy, readDate is falsy, and sent is true', () => {
    render(
      <ChatBubble
        sent
        message={{ ...baseTextMessage, receivedDate: new Date().toISOString() }}
      />,
    );

    expect(
      screen.getByText((content) => content.endsWith('Delivered')),
    ).toBeInTheDocument();
  });

  test('shows the status as read when readDate is truthy and sent is true', () => {
    render(
      <ChatBubble
        sent
        message={{ ...baseTextMessage, readDate: new Date().toISOString() }}
      />,
    );

    expect(
      screen.getByText((content) => content.endsWith('Read')),
    ).toBeInTheDocument();
  });

  test('shows the received date when the message was sent by another party', () => {
    render(
      <ChatBubble
        message={{ ...baseTextMessage, receivedDate: new Date().toISOString() }}
      />,
    );

    expect(screen.queryByText('unknown')).not.toBeInTheDocument();
  });
});
