// @flow

import type {
  NavigationState,
  NavigationAction,
  NavigationRoute,
  NavigationScreenProp,
} from 'react-navigation/lib-rn/TypeDefinition';

import type { Action } from './action';

import type { EntitiesState, AppState } from './state';

export type RelayType = any;

export type Navigation = NavigationScreenProp<
  NavigationRoute,
  NavigationAction,
>;

export type State = {
  nav: NavigationState,
  entities: EntitiesState,
  app: AppState,
};

export type ThunkAction = (
  dispatch: (action: Action | ThunkAction) => void,
  getState: () => State,
) => any;

export type {
  NavigationState,
  NavigationAction,
  Action,
  EntitiesState,
  AppState,
};

export { CoinMarketCapData, ThemeColorsData } from './data';
