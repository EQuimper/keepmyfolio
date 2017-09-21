// @flow

import type { Action } from '../types';

export function toggleTheme(): Action {
  return {
    type: 'app/TOGGLE_THEME',
  };
}

export function toggleSearchBar(): Action {
  return {
    type: 'app/TOGGLE_SEARCH_BAR',
  };
}
