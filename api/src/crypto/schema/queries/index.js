// @flow

import { GraphQLObjectType } from 'graphql';

import { cryptosField } from './CryptoQuery';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'KeepMyFolio Api',
  fields: () => ({
    cryptos: cryptosField,
  }),
});
