// @flow

import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

const _resolvers = [];

const idFetcher = async (globalId, ctx, info) => {
  const { type, id } = fromGlobalId(globalId);

  for (const resolver of _resolvers) {
    const res = await resolver.idFetcher(type, id, ctx, info);

    if (res) {
      return res;
    }
  }

  return null;
};

const typeResolver = (obj, ctx) => {
  for (const resolver of _resolvers) {
    const res = resolver.typeResolver(obj, ctx);
    if (res) {
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
