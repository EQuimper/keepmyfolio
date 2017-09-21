// @flow

import type { Action, CryptosState } from '../types';

const initialState: CryptosState = {
  entities: {},
  transactionId: 0,
};

export default function cryptos(
  state: CryptosState = initialState,
  action: Action,
) {
  switch (action.type) {
    case 'cryptos/ADD_NEW_HOLDING':
      return {
        ...state,
        transactionId: state.transactionId + 1,
        entities: {
          ...state.entities,
          [action.coin.id]: {
            ...state.entities[action.coin.id],
            [state.transactionId]: {
              ...action.coin,
            },
          },
        },
      };
    default:
      return state;
  }
}
