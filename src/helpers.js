/* @flow */

export function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function integrityCheck(flag: Array<string>) {
  return (
    flag.length === 5 &&
    flag[0].length === 8 &&
    flag[1].length === 4 &&
    flag[2].length === 4 &&
    flag[3].length === 4 &&
    flag[4].length === 12
  );
}

export function coordinateCheck(coord: any) {
  return !isNaN(coord) && typeof coord !== 'undefined' && coord !== null;
}
