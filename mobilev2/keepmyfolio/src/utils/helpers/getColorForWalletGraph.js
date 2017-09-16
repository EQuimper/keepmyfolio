// @flow

import { pieChartColors } from '../constants';

/**
 * getColorForWalletGraph()
 *
 * Return an random color from the pallette and make
 * sure he follow the theme choice by the user
 *
 * @export
 * @param {boolean} darkTheme
 * @param {number} index
 * @returns {string}
 */
export function getColorForWalletGraph(
  darkTheme: boolean,
  index: number,
): string {
  const _theme = darkTheme ? 'dark' : 'light';
  const _index = index % pieChartColors[_theme].length;
  return pieChartColors[_theme][_index];
}
