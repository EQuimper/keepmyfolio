// @flow

import { Record, Map } from 'immutable';

import type { Action, CryptosState } from '../types';

const StateRecord = Record({
  entities: new Map(),
  transactionId: 0,
});

export default function cryptos(
  state: CryptosState = new StateRecord(),
  action: Action,
): CryptosState {
  switch (action.type) {
    case 'cryptos/ADD_NEW_HOLDING': {
      const _transactionId: number = state.get('transactionId') + 1;

      const _newTransaction = { [state.get('transactionId')]: action.coin };

      const _entities = state
        .get('entities')
        .mergeDeepIn(['entities', action.coin.id], _newTransaction);

      return state
        .set('transactionId', _transactionId)
        .set('entities', _entities);
    }

    default:
      return state;
  }
}
