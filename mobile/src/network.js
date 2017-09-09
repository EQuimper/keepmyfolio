// @flow

import { Network } from 'relay-runtime';

import config from './config';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

function fetchQuery(
  operation,
  variables,
  // cacheConfig,
  // uploadables,
) {
  return fetch(config.baseUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(res => res.json());
}

export default Network.create(fetchQuery);
