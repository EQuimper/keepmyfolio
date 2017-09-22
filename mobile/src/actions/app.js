// @flow

import type { Action } from '../types';

export function toggleSearchBar(): Action {
  return {
    type: 'app/TOGGLE_SEARCH_BAR',
  };
}

export function toggleTheme(): Action {
  return {
    type: 'app/TOGGLE_THEME',
  };
}
