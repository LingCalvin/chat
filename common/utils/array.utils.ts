/**
 * Finds the last element of an array which satisfies the given predicate.
 *
 * @param array - The array to search
 * @param predicate - The function to execute on each item
 * @returns The value of the last element that satisfies `predicate()`.
 * Otherwise, `undefined` is returned.
 */
export function findLast<T>(
  array: T[],
  predicate: (element: T, index: number, array: T[]) => boolean,
): T | undefined {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      return array[i];
    }
  }
  return undefined;
}
