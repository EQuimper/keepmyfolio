// @flow

import { graphql } from 'graphql';

import schema from '../schema';
import createHandler from './createHandler';
import redis from './redisMiddleware';
import json from './jsonMiddleware';

function parseVariables(variables) {
  if (!variables) {
    return null;
  }
  if (typeof variables === 'string') {
    return JSON.parse(variables);
  }
  return variables;
}

export const graphqlHandler = createHandler(
  json(
    redis(async (evt, context) => {
      const { query, variables } = evt.body;

      // $FlowFixMe
      const result = await graphql(
        schema,
        query,
        null,
        { ...context },
        parseVariables(variables)
      );

      if (result.errors) {
        result.errors.forEach(error => console.log(error)); // eslint-disable-line
      }

      return result;
    })
  )
);
