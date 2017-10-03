// @flow

import createCachedSelector from 're-reselect';
import { Map } from 'immutable';

/**
 * TYPES
 */
import type { State } from '../types';

/**
 * UTILS
 */
import { moneyThousand } from '../utils/helpers/numbers';

/**
 * Get an entities by his id
 */
const getAssetsEntities = (state: State, props) =>
  state.get('cryptos').entities.get(props.coin.cryptoId);

export const getAsset = createCachedSelector(
  [getAssetsEntities],
  asset => asset,
)((state, props) => props.coin.id);

/**
 * Get the price for a certain coin
 */
const getPrice = (state: State, props) => parseFloat(props.coin.priceUsd);

/**
 * Get the percent change in the last 1h for this coin
 */
const getPercentChange1h = (state: State, props) =>
  parseFloat(props.coin.percentChange1h);

  /**
   * Get the total holding of each coin
   */
export const getHolding = createCachedSelector(
  [getAssetsEntities],
  (entities: Map<string, Map<string, any>>) => {
    if (entities == null) {
      return 0;
    }

    const totalAmount: number = entities.reduce(
      (prev, current) => prev + parseFloat(current.get('amountOfCoin')),
      0,
    );

    return totalAmount;
  },
)((state, props) => props.coin.id);

/**
 * Get the total amount a user have base of the number
 * of coins holding * price of each one
 */
export const getTotal = createCachedSelector(
  [getHolding, getPrice],
  (holding: ?number, price: number) => {
    if (!holding) {
      return null;
    }

    return moneyThousand(String(holding * price));
  },
)((state, props) => props.coin.id);

/**
 * Get the amount change base of what the user I've pay before
 * And the price of today
 */
export const getAmountChange = createCachedSelector(
  [getHolding, getPrice, getPercentChange1h],
  (holding: ?number, price: number, percentChange: number) => {
    if (!holding) {
      return null;
    }

    const totalDollarUserHave: number = holding * price;

    // If percent didn't change we need to just return the total in dollar
    // Cause if no 100 * 0 === 0
    if (Math.abs(percentChange) === 0) {
      return moneyThousand(String(totalDollarUserHave));
    }

    return moneyThousand(String(totalDollarUserHave * percentChange / 100));
  },
)((state, props) => props.coin.id);
