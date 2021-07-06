/**
 * Capitalizes the first letter of a string.
 *
 * @param string The string to capitalize
 * @returns The string with the first letter capitalized
 */
export function capitalize(string: string): string {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1);
}
