// @flow

import type { HoldingData } from './data';

// ------------------------------------
// User Actions
// ------------------------------------
type LoginAction = {
  type: 'LOGIN',
};

// ------------------------------------
// App Actions
// ------------------------------------
type ToggleThemeAction = {
  type: 'app/TOGGLE_THEME',
};

type ToggleSearchBarAction = {
  type: 'app/TOGGLE_SEARCH_BAR',
};

// ------------------------------------
// Cryptos Actions
// ------------------------------------
type AddNewHoldingAction = {
  type: 'cryptos/ADD_NEW_HOLDING',
  coin: HoldingData,
};

export type Action =
  | LoginAction
  | ToggleThemeAction
  | ToggleSearchBarAction
  | AddNewHoldingAction;
