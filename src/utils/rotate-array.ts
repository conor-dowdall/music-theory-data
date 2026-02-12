/**
 * Rotates an array by a given number of steps.
 * The rotation wraps around, so a positive rotation moves elements to the left,
 * and a negative rotation moves them to the right.
 *
 * @param array The array to rotate.
 * @param rotation The number of positions to rotate the array.
 * @returns A new array with the elements rotated.
 */
export function rotateArrayLeft<T>(array: T[], rotation: number): T[] {
  const normalizedRotation =
    ((rotation % array.length) + array.length) % array.length;
  return array
    .slice(normalizedRotation)
    .concat(array.slice(0, normalizedRotation));
}
/**
 * Rotates an array so that it starts with a specific element.
 * @param array The array to rotate.
 * @param start The element that should become the first element of the new array.
 * @returns A new array, rotated to begin with the `start` element.
 * @throws If the `start` element is not found in the array.
 */
export function rotateArrayToStartWith<T>(array: T[], start: T): T[] {
  const index = array.indexOf(start);
  if (index === -1) {
    throw new Error(`Element "${start}" not found in the array.`);
  }
  return rotateArrayLeft(array, index);
}
