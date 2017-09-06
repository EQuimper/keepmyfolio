// @flow

import type { CoinMarketCapData } from './data';

type LoginAction = {
  type: 'LOGIN',
};

type GetAllCoinMarketAction = {
  type: 'GET_ALL_COIN_MARKET';
};

type GetAllCoinMarketSuccessAction = {
  type: 'GET_ALL_COIN_MARKET_SUCCESS',
  data: Array<CoinMarketCapData>,
};

type GetAllCoinMarketErrorAction = {
  type: 'GET_ALL_COIN_MARKET_ERROR',
  error: Error,
};

export type Action =
  | LoginAction
  | GetAllCoinMarketAction
  | GetAllCoinMarketSuccessAction
  | GetAllCoinMarketErrorAction;
