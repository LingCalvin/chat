import { renderHook } from '@testing-library/react-hooks';
import { useSignalingServerConnection } from './use-signaling-server-connection';

describe('useSignalingServerConnection', () => {
  test('throws an error when not used within a SignalingServerConnectionProvider', () => {
    const { result } = renderHook(() => useSignalingServerConnection());

    expect(result.error).toBeDefined();
  });
});
