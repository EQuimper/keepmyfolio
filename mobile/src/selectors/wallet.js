// @flow

import { createSelector } from 'reselect';
import { List, Map } from 'immutable';

import type { State } from '../types';

import { moneyThousand } from '../utils/helpers/formatNumber';

const getCryptosEntities = (state: State) => state.get('cryptos').entities;
const getCryptos = (_, props) => props.viewer.cryptos.edges;

export const getWalletTotalAmount = createSelector(
  [getCryptosEntities, getCryptos],
  (entities, cryptos) => {
    let totalAmount: number = 0;
    let totalPercentChange: number = 0;
    const listOfCryptosIds: Array<string> = [];

    // TODO: Make sure the transaction it's a map
    // TODO: Get price for each coin at this moment
    entities.map(coin => {

      const firstCoinId: string = coin.first().id;

      const percentChange = cryptos.find(item => item.node.id === firstCoinId).node.percentChange24h;

      console.log('====================================');
      console.log(percentChange);
      console.log('====================================');

      totalPercentChange += parseFloat(percentChange);

      coin.map((transaction) => {
        const price = cryptos.find(item => item.node.id === transaction.id).node.priceUsd;

        const totalPrice = parseFloat(transaction.amountOfCoin) * price
        return totalAmount += totalPrice;
      })

      return totalAmount;
    });

    return {
      totalAmount: moneyThousand(totalAmount),
      totalPercentChange: totalPercentChange.toFixed(2),
    };
  }
)
