/** How often to ping the signaling server in milliseconds */
export const pingDelay = Number(
  process.env.NEXT_PUBLIC_SIGNALING_SERVER_PING_INTERVAL,
);
