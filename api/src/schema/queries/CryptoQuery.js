// @flow

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { connectionDefinitions, connectionFromArray, connectionArgs, globalIdField } from 'graphql-relay';
import fetch from 'isomorphic-fetch';
import { nodeInterface } from './resolver';

require('babel-polyfill');

const COIN_MARKET_CAP_BASE_URL = 'https://api.coinmarketcap.com/v1';

const CryptoType = new GraphQLObjectType({
  name: 'Cryptos',
  description: 'A cryptocurencie coin',
  fields: () => ({
    id: globalIdField('Crypto'),
    name: { type: new GraphQLNonNull(GraphQLString) },
    symbol: { type: new GraphQLNonNull(GraphQLString) },
    rank: { type: new GraphQLNonNull(GraphQLString) },
    cryptoId: {
      type: GraphQLString,
      resolve: item => item.id,
    },
    priceUsd: {
      type: GraphQLString,
      resolve: item => item.price_usd,
    },
    priceBtc: {
      type: GraphQLString,
      resolve: item => item.price_btc,
    },
    volumeUsd24h: {
      type: GraphQLString,
      resolve: item => item['24h_volume_usd'],
    },
    marketCapUsd: {
      type: GraphQLString,
      resolve: item => item.market_cap_usd,
    },
    availableSuply: {
      type: GraphQLString,
      resolve: item => item.available_supply,
    },
    totalSuply: {
      type: GraphQLString,
      resolve: item => item.total_supply,
    },
    percentChange1h: {
      type: GraphQLString,
      resolve: item => item.percent_change_1h,
    },
    percentChange24h: {
      type: GraphQLString,
      resolve: item => item.percent_change_24h,
    },
    percentChange7d: {
      type: GraphQLString,
      resolve: item => item.percent_change_7d,
    },
    lastUpdated: {
      type: GraphQLString,
      resolve: item => item.last_updated,
    },
  }),
  interfaces: [nodeInterface]
});

const {
  connectionType: CryptoConnectionType,
  edgeType: CryptoEdgeType, // eslint-disable-line
} = connectionDefinitions({
  name: 'Cryptos',
  nodeType: CryptoType
});

export const cryptosField = {
  // name: 'All Cryptos',
  type: CryptoConnectionType,
  args: {
    limit: { type: GraphQLInt },
    ...connectionArgs
  },
  resolve: async (_: Object, args: Object) => {
    const res = await fetch(
      `${COIN_MARKET_CAP_BASE_URL}/ticker/?limit=${args.limit || 10}}`,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const data = await res.json();

    return connectionFromArray(data, args);
  },
};
