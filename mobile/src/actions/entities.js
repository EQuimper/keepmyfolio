// @flow

import { CoinMarket } from '../utils/api';

import type { CoinMarketCapData, ThunkAction, Action } from '../types';

function getAllCoinMarketSuccess(data: Array<CoinMarketCapData>): Action {
  return {
    type: 'GET_ALL_COIN_MARKET_SUCCESS',
    data
  };
}

function getAllCoinMarketError(error: Error): Action {
  return {
    type: 'GET_ALL_COIN_MARKET_ERROR',
    error
  };
}

export function getAllCoinMarket(): ThunkAction {
  return async dispatch => {
    dispatch({ type: 'GET_ALL_COIN_MARKET' });
    try {
      const { data } = await CoinMarket.getAll(10);
      return dispatch(getAllCoinMarketSuccess(data));
    } catch (error) {
      return dispatch(getAllCoinMarketError(error));
    }
  };
}
