export enum MessageType {
  DeliveryReceipt = 'DELIVERY_RECEIPT',
  ReadReceipt = 'READ_RECEIPT',
  Text = 'TEXT',
  VideoCallAccept = 'VIDEO_CALL_ACCEPT',
  VideoCallInitiate = 'VIDEO_CALL_INITIATE',
  VideoCallLeave = 'VIDEO_CALL_LEAVE',
  VideoCallReject = 'VIDEO_CALL_REJECT',
  VideoCallRescind = 'VIDEO_CALL_RESCIND',
}

export interface BaseMessage {
  /** The unique ID of the message. */
  id: string;
  /** The type of the message. */
  type: MessageType;
  /** The timestamp of when the sender generated the message. */
  timestamp: string;
  /** Any data that is sent along with the message. */
  payload: unknown;
}

/** Message to acknowledge the delivery of a message. */
export interface DeliveryReceiptMessage extends BaseMessage {
  type: MessageType.DeliveryReceipt;
  payload: {
    /** The ID of the message that the sender acknowledges to have received. */
    messageId: string;
  };
}

/** Message to acknowledge that a message has been read. */
export interface ReadReceiptMessage extends BaseMessage {
  type: MessageType.ReadReceipt;
  payload: {
    /** The ID of the message that the sender acknowledges to have read. */
    messageId: string;
  };
}

/** A text message. */
export interface TextMessage extends BaseMessage {
  type: MessageType.Text;
  payload: {
    /** The body of the message. */
    body: string;
  };
}

/** Message sent when accepting a video call request. */
export interface VideoCallAcceptMessage extends BaseMessage {
  type: MessageType.VideoCallAccept;
  payload: {
    /**
     * The message ID of the {@link VideoCallInitiateMessage} that the sender
     * is accepting.
     */
    messageId: string;
  };
}

/** Message when creating a video call offer. */
export interface VideoCallInitiateMessage extends BaseMessage {
  type: MessageType.VideoCallInitiate;
  payload: {
    /** The date the offer expires. */
    expirationDate: string;
  };
}

/** Message sent when leaving a video call. */
export interface VideoCallLeaveMessage extends BaseMessage {
  type: MessageType.VideoCallLeave;
  payload: {
    /**
     * The message ID of the {@link VideoCallInitiateMessage} that the sender
     * is leaving.
     */
    messageId: string;
  };
}

/** Message sent when rejecting a video call. */
export interface VideoCallRejectMessage extends BaseMessage {
  type: MessageType.VideoCallReject;
  payload: {
    /**
     * The message ID of the {@link VideoCallInitiateMessage} that the sender
     * is rejecting.
     */
    messageId: string;
  };
}

/** Message sent when rescinding a {@link VideoCallInitiateMessage} */
export interface VideoCallRescindMessage extends BaseMessage {
  type: MessageType.VideoCallRescind;
  payload: {
    /**
     * The message ID of the {@link VideoCallInitiateMessage} that the sender
     * is rescinding.
     */
    messageId: string;
  };
}

export type DataChannelMessage =
  | DeliveryReceiptMessage
  | ReadReceiptMessage
  | TextMessage
  | VideoCallAcceptMessage
  | VideoCallInitiateMessage
  | VideoCallLeaveMessage
  | VideoCallRejectMessage
  | VideoCallRescindMessage;
