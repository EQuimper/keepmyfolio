// @flow

import type { AppState, Action } from '../types';

import { themes } from '../utils/constants';

const initialState: AppState = {
  darkTheme: true,
  theme: themes.dark,
  isSearchBarShow: false,
};

export default function appReducer(
  state: AppState = initialState,
  action: Action,
) {
  switch (action.type) {
    case 'app/TOGGLE_THEME':
      return {
        ...state,
        darkTheme: !state.darkTheme,
        theme: themes[state.darkTheme ? 'light' : 'dark'],
      };
    case 'app/TOGGLE_SEARCH_BAR':
      return {
        ...state,
        isSearchBarShow: !state.isSearchBarShow,
      };
    default:
      return state;
  }
}
