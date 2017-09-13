// @flow

import type { CoinMarketCapData } from './data';

export type EntitiesState = {
  coins: Array<CoinMarketCapData>,
};

export type AppState = {
  darkTheme: boolean,
};
