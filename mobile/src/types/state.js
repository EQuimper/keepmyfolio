// @flow

import type { Record } from 'immutable';

import type { HoldingData, ThemeColorsData } from './data';

export type AppState = Record<{
  darkTheme: boolean,
  theme: ThemeColorsData,
  isSearchBarShow: boolean,
}>;

export type CryptosState = Record<{
  entities: { [id: string]: HoldingData },
  transactionId: number,
}>;
