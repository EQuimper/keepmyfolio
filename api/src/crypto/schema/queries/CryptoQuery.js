// @flow

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from 'graphql';

const COIN_MARKET_CAP_BASE_URL = 'https://api.coinmarketcap.com/v1';

const CryptoType = new GraphQLObjectType({
  name: 'cryptos',
  description: 'A cryptocurencie coin',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    symbol: { type: new GraphQLNonNull(GraphQLString) },
    rank: { type: new GraphQLNonNull(GraphQLString) },
    priceUsd: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: item => item.price_usd,
    },
    priceBtc: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: item => item.price_btc,
    },
    volumeUsd24h: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: item => item['24h_volume_usd'],
    },
    marketCapUsd: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: item => item.market_cap_usd,
    },
    availableSuply: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: item => item.available_supply,
    },
    totalSuply: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: item => item.total_supply,
    },
    percentChange1h: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: item => item.percent_change_1h,
    },
    percentChange24h: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: item => item.percent_change_24h,
    },
    percentChange7d: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: item => item.percent_change_7d,
    },
    lastUpdated: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: item => item.last_updated,
    },
  }),
});

export const cryptosField = new GraphQLObjectType({
  name: 'Cryptos',
  type: CryptoType,
  // args: {
  //   limit: { type: new GraphQLNonNull(GraphQLInt) }
  // },
  resolve: () => fetch(`${COIN_MARKET_CAP_BASE_URL}/ticker/?limit=100`)
});
