// @flow

import type { Middleware } from '../types';

const headers = {
  'Access-Control-Allow-Origin': '*'
};

const isProd = process.env.NODE_ENV === 'production';

export default function createHandler(next: Middleware) {
  return async (evt: Object, context: Object, cb: Function) => {
    const newCtx = context;

    newCtx.callbackWaitsForEmptyEventLoop = false;

    try {
      const response = await next(evt, newCtx);

      cb(null, {
        statusCode: 200,
        headers,
        body: response || undefined
      });
    } catch (error) {
      cb(null, {
        statusCode: 500,
        headers,
        body: isProd
          ? JSON.stringify({ error: 'Internal server error' })
          : JSON.stringify({ error: error.message })
      });
    }
  };
}
