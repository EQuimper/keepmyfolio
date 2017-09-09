// @flow

import { GraphQLObjectType } from 'graphql';

import { nodeField, nodesField } from './resolver';
import { cryptosField } from './CryptoQuery';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'KeepMyFolio Api',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    cryptos: cryptosField,
  }),
});
