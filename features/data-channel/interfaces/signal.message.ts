import { SignalData } from 'simple-peer';
import { UserInfo } from '../../auth/interfaces/user-info';

export interface SignalMessage {
  event: 'signal';
  data: { sender: UserInfo; signalData: SignalData };
}
