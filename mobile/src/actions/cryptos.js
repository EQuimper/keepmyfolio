// @flow

import type { HoldingData } from '../types';

export function addNewHolding(coin: HoldingData) {
  return {
    type: 'cryptos/ADD_NEW_HOLDING',
    coin
  }
}
