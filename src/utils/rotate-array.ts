/**
 * Rotates an array to the left by a given number of steps.
 * The rotation wraps around, so a positive rotation moves elements to the left,
 * and a negative rotation moves them to the right.
 *
 * @param array The array to rotate.
 * @param rotation The number of positions to rotate the array.
 * @returns A new array with the elements rotated.
 */
export function rotateArrayLeft<T>(array: readonly T[], rotation: number): T[] {
  if (!array.length) return [...array];
  const r = ((rotation % array.length) + array.length) % array.length;
  return [...array.slice(r), ...array.slice(0, r)];
}

/**
 * Rotates an array to the right by a given number of steps.
 * The rotation wraps around, so a positive rotation moves elements to the right,
 * and a negative rotation moves them to the left.
 *
 * @param array The array to rotate.
 * @param rotation The number of positions to rotate the array.
 * @returns A new array with the elements rotated.
 */
export function rotateArrayRight<T>(
  array: readonly T[],
  rotation: number,
): T[] {
  return rotateArrayLeft(array, -rotation);
}

/**
 * Rotates an array so that it starts with a specific element.
 * @param array The array to rotate.
 * @param start The element that should become the first element of the new array.
 * @returns A new array, rotated to begin with the `start` element.
 * @throws If the `start` element is not found in the array.
 */
export function rotateArrayToStartWith<T>(array: readonly T[], start: T): T[] {
  const index = array.indexOf(start);
  if (index === -1) {
    throw new Error(`Element "${start}" not found in the array.`);
  }
  return rotateArrayLeft(array, index);
}
