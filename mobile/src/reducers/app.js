// @flow

import { Record } from 'immutable';

import type { AppState, Action, ThemeColorsData } from '../types';

import { themes } from '../utils/constants';

const StateRecord = Record({
  darkTheme: true,
  theme: themes.dark,
  isSearchBarShow: false,
});

function toggleTheme(state) {
  const _darkTheme: boolean = !state.get('darkTheme');
  const _theme: ThemeColorsData = themes[_darkTheme ? 'dark' : 'light'];
  return state.set('darkTheme', _darkTheme).set('theme', _theme);
}

function toggleSearchBar(state) {
  const _isSearchBarShow: boolean = !state.get('isSearchBarShow');
  return state.set('isSearchBarShow', _isSearchBarShow);
}

export default function appReducer(
  state: AppState = new StateRecord(),
  action: Action,
): AppState {
  switch (action.type) {
    case 'app/TOGGLE_THEME':
      return toggleTheme(state);

    case 'app/TOGGLE_SEARCH_BAR':
      return toggleSearchBar(state);

    default:
      return state;
  }
}
