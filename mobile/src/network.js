// @flow

import { Network } from 'relay-runtime';
import RelayQueryResponseCache from 'relay-runtime/lib/RelayQueryResponseCache';

import config from './config';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const _cache = new RelayQueryResponseCache({ size: 30, ttl: 5 * 60 * 1000 });

function fetchQuery(
  operation,
  variables,
  cachedConfig,
  // uploadables,
) {
  const cachedResponse = _cache.get(operation.name, variables);
  const isQuery = operation.query.operation === 'query';

  // If is a query return the response
  if (isQuery && cachedResponse !== null && cachedConfig && !cachedConfig.force) {
    return Promise.resolve(cachedResponse);
  }

  // If is a mutation clear the cached to avoid bad thing happen
  if (operation.query.operation === 'mutation') {
    _cache.clear();
  }

  return fetch(config.baseUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  })
  .then(res => res.json())
  .then(res => {
    if (res.errors) {
      throw new Error(res.errors[0].message);
    }

    if (isQuery) {
      _cache.set(operation.name, variables, res);
    }

    return res;
  });
}

export function clearCache() {
  _cache.clear();
}

export default Network.create(fetchQuery);
