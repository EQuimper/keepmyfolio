// @flow

import invariant from 'invariant';

export function getIfPercentNegative(percent: string): boolean {
  invariant(percent, 'Percent value is required');

  const arr = [...percent];

  return arr[0] === '-';
}
