// @flow

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from 'graphql';
import {
  connectionDefinitions,
  connectionFromArray,
  connectionArgs,
  globalIdField
} from 'graphql-relay';

import type { Context } from '../../types';

import { nodeInterface, addResolver } from './resolver';
import { getCryptos } from '../../services/CoinMarket';

const CryptoType = new GraphQLObjectType({
  name: 'Crypto',
  description: 'A cryptocurencie coin',
  fields: () => ({
    id: globalIdField('Crypto'),
    name: { type: new GraphQLNonNull(GraphQLString) },
    symbol: { type: new GraphQLNonNull(GraphQLString) },
    rank: { type: new GraphQLNonNull(GraphQLString) },
    cryptoId: {
      type: GraphQLString,
      resolve: item => item.id
    },
    priceUsd: {
      type: GraphQLString,
      resolve: item => item.price_usd
    },
    priceBtc: {
      type: GraphQLString,
      resolve: item => item.price_btc
    },
    volumeUsd24h: {
      type: GraphQLString,
      resolve: item => item['24h_volume_usd']
    },
    marketCapUsd: {
      type: GraphQLString,
      resolve: item => item.market_cap_usd
    },
    availableSuply: {
      type: GraphQLString,
      resolve: item => item.available_supply
    },
    totalSuply: {
      type: GraphQLString,
      resolve: item => item.total_supply
    },
    percentChange1h: {
      type: GraphQLString,
      resolve: item => item.percent_change_1h
    },
    percentChange24h: {
      type: GraphQLString,
      resolve: item => item.percent_change_24h
    },
    percentChange7d: {
      type: GraphQLString,
      resolve: item => item.percent_change_7d
    },
    lastUpdated: {
      type: GraphQLString,
      resolve: item => item.last_updated
    }
  }),
  interfaces: [nodeInterface]
});

const {
  connectionType: CryptoConnectionType,
  edgeType: CryptoEdgeType // eslint-disable-line
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
  resolve: async (_: Object, args: Object, ctx: Context) => {
    const data = await getCryptos(ctx, args.limit || 100);

    return connectionFromArray(data, args);
  }
};

addResolver(async (type, id, ctx) => {
  if (type === 'Crypto') {
    const cryptos = await getCryptos(ctx, 100);
    return cryptos.find(item => item.id === id);
  }

  return null;
}, () => CryptoType);
