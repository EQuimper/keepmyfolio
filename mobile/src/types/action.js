// @flow

import type { CoinMarketCapData, HoldingData } from './data';

type LoginAction = {
  type: 'LOGIN',
};

type GetAllCoinMarketAction = {
  type: 'GET_ALL_COIN_MARKET',
};

type GetAllCoinMarketSuccessAction = {
  type: 'GET_ALL_COIN_MARKET_SUCCESS',
  data: Array<CoinMarketCapData>,
};

type GetAllCoinMarketErrorAction = {
  type: 'GET_ALL_COIN_MARKET_ERROR',
  error: Error,
};

type ToggleThemeAction = {
  type: 'appState/TOGGLE_THEME',
};

type AddNewHoldingAction = {
  type: 'cryptos/ADD_NEW_HOLDING',
  coin: HoldingData,
};

export type Action =
  | LoginAction
  | GetAllCoinMarketAction
  | GetAllCoinMarketSuccessAction
  | GetAllCoinMarketErrorAction
  | ToggleThemeAction
  | AddNewHoldingAction;
