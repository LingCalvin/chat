import { PreSignalMessage } from './pre-signal.message';
import { SignalMessage } from './signal.message';
import { UnknownMessage } from './unknown.message';

export type Message = PreSignalMessage | SignalMessage | UnknownMessage;

export function isPreSignalMessage(
  message: Message,
): message is PreSignalMessage {
  return message.event === 'pre-signal';
}

export function isSignalMessage(message: Message): message is SignalMessage {
  return message.event === 'signal';
}
