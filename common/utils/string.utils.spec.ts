import { capitalize } from '@material-ui/core';

describe('capitalize', () => {
  test('does not modify the empty string', () => {
    expect(capitalize('')).toBe('');
  });

  test('capitalizes only the first letter', () => {
    expect(capitalize('ab')).toBe('Ab');
  });
});
