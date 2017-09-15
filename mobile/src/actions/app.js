// @flow

import type { Action } from '../types';

export function toggleTheme(): Action {
  return {
    type: 'app/TOGGLE_THEME',
  }
}
