// @flow

import type { EntitiesState, Action } from '../types';

const initialState = {
  coins: []
};

export default (state: EntitiesState = initialState, action: Action) => {
  switch (action.type) {
    case 'GET_ALL_COIN_MARKET_SUCCESS':
      return {
        ...state,
        coins: action.data
      };
    default:
      return state;
  }
};
