import { findLast } from './array.utils';

describe('findLast', () => {
  test('returns undefined for an empty array', () => {
    expect(findLast([], () => true)).toBeUndefined();
  });

  test('returns undefined when there are no matches', () => {
    expect(findLast([0], () => false)).toBeUndefined();
  });

  test('returns the last matched item', () => {
    expect(findLast([1, 2], () => true)).toBe(2);
  });
});
