// @flow

import type { HoldingData, Action } from '../types';

export function addNewHolding(coin: HoldingData): Action {
  return {
    type: 'cryptos/ADD_NEW_HOLDING',
    coin
  }
}
