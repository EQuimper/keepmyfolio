// @flow

import { GraphQLList, GraphQLNonNull, GraphQLID, type GraphQLType } from 'graphql';
import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import type { Context } from '../../types';

require('babel-polyfill');

type IdFetcher = (
  type: string,
  id: string,
  ctx: Context,
  info: Object,
) => Promise<any>;

type TypeResolver = (obj: Object, ctx: Context) => ?GraphQLType;

const _resolvers = [];

const idFetcher = async (globalId, ctx, info) => {
  const { type, id } = fromGlobalId(globalId);

  for (const resolver of _resolvers) {
    const res = await resolver.idFetcher(type, id, ctx, info);

    if (res) {
      return res;
    }
  }

  // TODO: Log here cause error

  return null;
};

const typeResolver = (obj, ctx) => {
  for (const resolver of _resolvers) {
    const res = resolver.typeResolver(obj, ctx);
    if (res) {
      // $FlowFixMe
      return res;
    }
  }

  return null;
};

const { nodeInterface, nodeField } = nodeDefinitions(idFetcher, typeResolver);

export { nodeInterface, nodeField };

export const nodesField = {
  name: 'nodes',
  // $FlowFixMe
  type: new GraphQLList(nodeInterface),
  args: {
    ids: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
    },
  },
  resolve: (obj: Object, args: Object, ctx: Object, info: any) =>
    Promise.all(args.ids.map(id => idFetcher(id, ctx, info))),
};

export function addResolver(fetcher: IdFetcher, resolver: TypeResolver) {
  _resolvers.push({
    idFetcher: fetcher,
    typeResolver: resolver
  })
}
