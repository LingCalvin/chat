import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import useToggle from './use-toggle';

describe('useToggle', () => {
  test('the default state should be the argument passed in', () => {
    const { result: resultDefaultFalse } = renderHook(() => useToggle(false));
    const { result: resultDefaultTrue } = renderHook(() => useToggle(true));

    expect(resultDefaultFalse.current.state).toBe(false);
    expect(resultDefaultTrue.current.state).toBe(true);
  });
  test('toggle sets state to its negations', () => {
    const { result } = renderHook(() => useToggle());
    const initialState = result.current.state;

    act(() => result.current.toggle());

    expect(result.current.state).toBe(!initialState);
  });
  test('setState sets the state', () => {
    const { result } = renderHook(() => useToggle());
    const initialState = result.current.state;

    act(() => result.current.setState(!initialState));

    expect(result.current.state).toBe(!initialState);
  });
});
