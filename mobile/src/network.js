// @flow

import { Network } from 'relay-runtime';

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
  return fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(res => res.json());
}

export default Network(fetchQuery);
