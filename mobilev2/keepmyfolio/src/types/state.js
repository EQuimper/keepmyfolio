// @flow

import type { HoldingData, ThemeColorsData } from './data';

export type AppState = {
  +darkTheme: boolean,
  +theme: ThemeColorsData,
};

export type CryptosState = {
  +entities: { +[id: string]: HoldingData },
  +transactionId: number,
};
