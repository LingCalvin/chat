import { UserInfo } from '../../auth/interfaces/user-info';

export interface PreSignalMessage {
  event: 'pre-signal';
  data: { type: 'initiate' | 'accept'; sender: UserInfo };
}
