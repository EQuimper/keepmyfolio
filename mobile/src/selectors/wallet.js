// @flow

import { createSelector } from 'reselect';
import { Map, List, fromJS } from 'immutable';
import invariant from 'invariant';

/**
 * TYPES
 */
import type { State } from '../types';

/**
 * UTILS
 */
import { moneyThousand } from '../utils/helpers/numbers';
import { getPiePercent } from '../utils/helpers/getPiePercent';

const getCryptosEntities = (state: State) => state.get('cryptos').entities;
const getCryptos = (_, props) => props.viewer.cryptos.edges;

export const getWalletTotalAmount = () =>
  createSelector([getCryptosEntities, getCryptos], (entities, cryptos) => {
    let totalAmount: number = 0;
    let pastAmount: number = 0;
    let difference: number = 0;

    // TODO: Get price for each coin at this moment
    entities.map(coin => {
      invariant(Map.isMap(coin), 'Each coin need to be a map');

      const firstCoinId: string = coin.first().get('id');

      const node = cryptos.find(item => item.node.id === firstCoinId).node;

      coin.map(transaction => {
        const price: number = parseFloat(
          cryptos.find(item => item.node.id === transaction.get('id')).node
            .priceUsd,
        );

        const totalAmountChange =
          parseFloat(node.percentChange24h) * price / 100;

        const amountOfCoin = transaction.get('amountOfCoin');

        pastAmount += parseFloat(amountOfCoin) * (price - totalAmountChange);

        const totalPrice = parseFloat(amountOfCoin) * price;

        return (totalAmount += totalPrice);
      });

      return totalAmount;
    });

    difference = totalAmount - pastAmount;

    const totalPercentChange = (difference / totalAmount || 0) * 100;

    return {
      totalAmount: moneyThousand(String(totalAmount)),
      totalPercentChange: totalPercentChange.toFixed(2),
      totalAmountChange: difference.toFixed(2),
    };
  }
);

export const getPieData = () =>
  createSelector([getCryptosEntities, getCryptos], (entities, cryptos) => {
    let totalAmount: number = 0;
    let pieData: List<Map<string, { name: string, amount: string }>> = new List();

    // TODO: Get price for each coin at this moment
    entities.map(coin => {;
      invariant(Map.isMap(coin), 'Each coin need to be a map');

      const firstCoinId: string = coin.first().get('id');

      const node = cryptos.find(item => item.node.id === firstCoinId).node;

      const pieItem = coin.reduce((prev, current) => {
        const price = cryptos.find(item => item.node.id === current.get('id')).node
          .priceUsd;
        const itemTotal = parseFloat(current.get('amountOfCoin')) * parseFloat(price);
        const newObj = {
          name: node.symbol,
          amount: ((parseFloat(prev.amount) || 0) + itemTotal).toFixed(2),
        };

        return newObj;
      }, {});

      pieData = pieData.push(fromJS(pieItem));

      coin.map(transaction => {
        const price = cryptos.find(item => item.node.id === transaction.get('id')).node
          .priceUsd;

        const totalPrice = parseFloat(transaction.get('amountOfCoin')) * price;
        return (totalAmount += totalPrice);
      });

      return totalAmount;
    });

    return getPiePercent(pieData, String(totalAmount));
  });
