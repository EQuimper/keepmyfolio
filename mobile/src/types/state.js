// @flow

import type { CoinMarketCapData, ThemeColorsData } from './data';

export type EntitiesState = {
  coins: Array<CoinMarketCapData>,
};

export type AppState = {
  darkTheme: boolean,
  theme: ThemeColorsData,
};

export type CryptosState = {
  entities: { [id: string]: CoinMarketCapData },
  transactionId: number,
};
