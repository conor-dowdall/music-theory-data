export function rotateArray<T>(array: T[], rotation: number): T[] {
  const normalizedRotation = ((rotation % array.length) + array.length) %
    array.length;
  return array.slice(normalizedRotation).concat(
    array.slice(0, normalizedRotation),
  );
}

export function rotateArrayToStartWith<T>(array: T[], start: T): T[] {
  const index = array.indexOf(start);
  if (index === -1) {
    throw new Error(`Element "${start}" not found in the array.`);
  }
  return rotateArray(array, index);
}
