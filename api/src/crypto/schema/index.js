// @flow

import { GraphQLSchema } from 'graphql';

import Query from './queries';

export default new GraphQLSchema({
  query: Query
})
