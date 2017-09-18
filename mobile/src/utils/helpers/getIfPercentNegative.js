// @flow

import invariant from 'invariant';

/**
 * getIfPercentNegative()
 *
 * Return if the percent is negative or not
 *
 * @export
 * @param {string} percent
 * @returns {boolean}
 */
export function getIfPercentNegative(percent: string): boolean {
  invariant(percent, 'Percent value is required');

  const arr = [...percent];

  return arr[0] === '-';
}
