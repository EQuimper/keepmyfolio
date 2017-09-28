// @flow

import { createSelector } from 'reselect';

import type { State } from '../types';

import { moneyThousand } from '../utils/helpers/formatNumber';
import { getPiePercent } from '../utils/helpers/getPiePercent';

const getCryptosEntities = (state: State) => state.get('cryptos').entities;
const getCryptos = (_, props) => props.viewer.cryptos.edges;

export const getWalletTotalAmount = () =>
  createSelector([getCryptosEntities, getCryptos], (entities, cryptos) => {
    console.log('====================================');
    console.log('getWalletTotalAmount CALL');
    console.log('====================================');
    let totalAmount: number = 0;
    let pastAmount: number = 0;
    let difference: number = 0;

    // TODO: Make sure the transaction it's a map
    // TODO: Get price for each coin at this moment
    entities.map(coin => {
      const firstCoinId: string = coin.first().id;

      const node = cryptos.find(item => item.node.id === firstCoinId).node;

      coin.map(transaction => {
        const price: number = parseFloat(
          cryptos.find(item => item.node.id === transaction.id).node.priceUsd,
        );

        const totalAmountChange =
          parseFloat(node.percentChange24h) * price / 100;

        pastAmount +=
          parseFloat(transaction.amountOfCoin) * (price - totalAmountChange);

        const totalPrice = parseFloat(transaction.amountOfCoin) * price;

        return (totalAmount += totalPrice);
      });

      return totalAmount;
    });

    difference = totalAmount - pastAmount;

    const totalPercentChange = ((difference / totalAmount) || 0) * 100;

    return {
      totalAmount: moneyThousand(String(totalAmount)),
      totalPercentChange: totalPercentChange.toFixed(2),
      totalAmountChange: difference.toFixed(2),
    };
  });

export const getPieData = () =>
  createSelector([getCryptosEntities, getCryptos], (entities, cryptos) => {
    console.log('====================================');
    console.log('getPieData CALL');
    console.log('====================================');
    let totalAmount: number = 0;
    const pieData: Array<{ name: string, amount: string }> = [];

    // TODO: Make sure the transaction it's a map
    // TODO: Get price for each coin at this moment
    entities.map(coin => {
      const firstCoinId: string = coin.first().id;

      const node = cryptos.find(item => item.node.id === firstCoinId).node;

      const pieItem = coin.reduce((prev, current) => {
        const price = cryptos.find(item => item.node.id === current.id).node
          .priceUsd;
        const itemTotal = parseFloat(current.amountOfCoin) * parseFloat(price);
        const newObj = {
          name: node.symbol,
          amount: ((parseFloat(prev.amount) || 0) + itemTotal).toFixed(2),
        };

        return newObj;
      }, {});

      pieData.push(pieItem);

      coin.map(transaction => {
        const price = cryptos.find(item => item.node.id === transaction.id).node
          .priceUsd;

        const totalPrice = parseFloat(transaction.amountOfCoin) * price;
        return (totalAmount += totalPrice);
      });

      return totalAmount;
    });

    return getPiePercent(pieData, String(totalAmount));
  });
