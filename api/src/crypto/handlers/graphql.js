// @flow

import { graphql } from 'graphql';

import schema from '../schema';

const createResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify(body),
});

export const graphqlHandler = (e: Object, ctx: Object, cb: Function) => {
  const body = JSON.parse(e.body);

  return graphql(schema, body.query, null, {}, body.variables)
    .then(response => cb(null, createResponse(200, response)))
    .catch(error =>
      cb(
        null,
        createResponse(error.responseStatusCode || 500, {
          message: error.message || 'Internal server error',
        }),
      ),
    );
};
