// @flow

import createCachedSelector from 're-reselect';

import type { State } from '../types';

import { moneyThousand } from '../utils/helpers/formatNumber';

const getAssetsEntities = (state: State, props) =>
  state.get('cryptos').entities.get(props.coin.cryptoId);

export const getAsset = createCachedSelector(
  [getAssetsEntities],
  asset => asset,
)((state, props) => props.coin.id);

const getPrice = (state: State, props) => parseFloat(props.coin.priceUsd);
const getPercentChange1h = (state: State, props) =>
  parseFloat(props.coin.percentChange1h);

export const getHolding = createCachedSelector(
  [getAssetsEntities],
  entities => {
    if (entities == null) {
      return 0;
    }

    const totalAmount: number = entities.reduce(
      (prev, current) => prev + parseFloat(current.amountOfCoin),
      0,
    );

    return totalAmount;
  },
)((state, props) => props.coin.id);

export const getTotal = createCachedSelector(
  [getHolding, getPrice],
  (holding, price) => {
    if (!holding) {
      return null;
    }

    return moneyThousand(String(holding * price));
  },
)((state, props) => props.coin.id);

export const getAmountChange = createCachedSelector(
  [getHolding, getPrice, getPercentChange1h],
  (holding, price, percentChange) => {
    if (!holding) {
      return null;
    }

    if (Math.abs(percentChange) === 0) {
      return null;
    }

    const totalDollarUserHave: number = holding * price;

    return moneyThousand(String(totalDollarUserHave * percentChange / 100));
  },
)((state, props) => props.coin.id);
