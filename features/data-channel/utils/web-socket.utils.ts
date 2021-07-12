/**
 * Returns the URL an authenticated client should use to create a WebSocket
 * connection to the signaling server.
 *
 * @param ticket - The authorization ticket to use
 * @returns The signaling server URL if a ticket is provided. Otherwise, null is
 * returned.
 */
export function generateWebSocketUrl(
  ticket: string | undefined,
): string | null {
  if (ticket !== undefined) {
    return `${process.env.NEXT_PUBLIC_SIGNALING_SERVER}?ticket=${ticket}`;
  }
  return null;
}
