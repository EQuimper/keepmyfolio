// @flow

import type { Record } from 'immutable';
import type {
  NavigationState,
  NavigationAction,
  NavigationRoute,
  NavigationScreenProp,
} from 'react-navigation/lib-rn/TypeDefinition';

import type { Action } from './action';

import type { AppState, CryptosState } from './state';

export type RelayType = any;

export type Navigation = NavigationScreenProp<
  NavigationRoute,
  NavigationAction,
>;

export type State = Record<{
  nav: NavigationState,
  app: AppState,
  cryptos: CryptosState,
}>;

export type ThunkAction = (
  dispatch: (action: Action | ThunkAction) => void,
  getState: () => State,
) => any;

export type {
  NavigationState,
  NavigationAction,
  Action,
  AppState,
  CryptosState,
};

export {
  ThemeColorsData,
  HoldingData,
  TimeSelect,
  DeviceInfoType,
} from './data';
