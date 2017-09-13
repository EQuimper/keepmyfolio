// @flow

import type { Action } from '../types';

export function toggleTheme(): Action {
  return {
    type: 'appState/TOGGLE_THEME',
  };
}
