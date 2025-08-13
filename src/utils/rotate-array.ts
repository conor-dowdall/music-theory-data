/**
 * Rotates an array by a specified number of positions.
 * Positive rotation means elements are moved to the right,
 * while negative rotation means elements are moved to the left.
 *
 * @param array - The array to rotate.
 * @param rotation - The number of positions to rotate the array.
 * @returns A new array rotated by the specified number of positions.
 */
export function rotateArray<T>(array: T[], rotation: number): T[] {
  const normalizedRotation = ((rotation % array.length) + array.length) %
    array.length;
  return array.slice(normalizedRotation).concat(
    array.slice(0, normalizedRotation),
  );
}

/**
 * Rotates an array to start with a specific element.
 * If the element is not found, it throws an error.
 *
 * @param array - The array to rotate.
 * @param start - The element to start with.
 * @returns A new array rotated to start with the specified element.
 * @throws Error if the element is not found in the array.
 */
export function rotateArrayToStartWith<T>(
  array: T[],
  start: T,
): T[] {
  const index = array.indexOf(start);
  if (index === -1) {
    throw new Error(`Element "${start}" not found in the array.`);
  }
  return rotateArray(array, index);
}
