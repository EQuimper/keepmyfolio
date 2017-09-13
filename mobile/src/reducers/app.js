// @flow

import type { AppState, Action } from '../types';

const initialState = {
  darkTheme: true,
};

export default function appReducer(state: AppState = initialState, action: Action) {
  switch (action.type) {
    case 'appState/TOGGLE_THEME':
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    default:
      return state;
  }
}
