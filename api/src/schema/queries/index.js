// @flow

import { GraphQLObjectType } from 'graphql';

import { nodeField, nodesField } from './resolver';
import { viewerField } from './ViewerQuery';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'KeepMyFolio Api',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    viewer: viewerField,
  }),
});
