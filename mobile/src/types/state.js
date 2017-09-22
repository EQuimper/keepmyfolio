// @flow

import type { Record, Map } from 'immutable';

import type { HoldingData, ThemeColorsData } from './data';

export type AppState = Record<{
  darkTheme: boolean,
  theme: ThemeColorsData,
  isSearchBarShow: boolean,
}>;

export type CryptosState = Record<{
  entities: Map<string, HoldingData>,
  transactionId: number,
}>;
