// @flow

import { CoinMarket } from '../utils/api';

import type { CoinMarketCapData } from '../types';

function getAllCoinMarketSuccess(data: CoinMarketCapData) {
  return {
    type: 'GET_ALL_COIN_MARKET_SUCCESS',
    data
  }
}

function getAllCoinMarketError(error: Error) {
  return {
    type: 'GET_ALL_COIN_MARKET_ERROR',
    error
  }
}

export function getAllCoinMarket() {
  return async (dispatch) => {
    dispatch({ type: 'GET_ALL_COIN_MARKET' });
    try {
      const { data } = await CoinMarket.getAll(10);
      return dispatch(getAllCoinMarketSuccess(data));
    } catch (error) {
      return dispatch(getAllCoinMarketError(error));
    }
  }
}
