import { renderHook } from '@testing-library/react-hooks';
import { useDataChannel } from './use-data-channel';

describe('useDataChannel', () => {
  test('throws an error when not used within a DataChannelProvider', () => {
    const { result } = renderHook(() => useDataChannel());

    expect(result.error).toBeDefined();
  });
});
