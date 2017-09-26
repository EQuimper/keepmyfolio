// @flow

import createCachedSelector from 're-reselect';

import type { State } from '../types';

import { moneyThousand } from '../utils/helpers/formatNumber';

const getCryptosEntities = (state: State) => state.get('cryptos').entities;
const getCryptos = (_, props) => props.viewer.cryptos.edges;

export const getWalletTotalAmount = createCachedSelector(
  [getCryptosEntities, getCryptos],
  (entities, cryptos) => {

    let totalAmount: number = 0;

    // TODO: Make sure the transaction it's a map
    // TODO: Get price for each coin at this moment
    entities.map(coin => {
      coin.map(transaction => {
        const price = cryptos.find(item => item.node.id === transaction.id).node.priceUsd;

        const totalPrice = parseFloat(transaction.amountOfCoin) * price
        return totalAmount += totalPrice;
      })

      return totalAmount;
    });

    return moneyThousand(totalAmount);
  }
)(state => '231')
