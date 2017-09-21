/**
 * @flow
 * @relayHash e15ee2409073aeed8a7a6e954b8dec7d
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type HomeScreenPaginationQueryResponse = {|
  +viewer: ?{| |};
|};
*/

/*
query HomeScreenPaginationQuery(
  $count: Int!
  $cursor: String
) {
  viewer {
    ...HomeScreen_viewer
  }
}

fragment HomeScreen_viewer on Viewer {
  cryptos(first: $count, after: $cursor) {
    edges {
      node {
        id
        ...Coin_coin
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment Coin_coin on Crypto {
  name
  cryptoId
  percentChange1h
  percentChange24h
  percentChange7d
  symbol
  priceUsd
  priceBtc
  marketCapUsd
  totalSuply
  volumeUsd24h
}
*/

const batch /*: ConcreteBatch*/ = {
  fragment: {
    argumentDefinitions: [
      {
        kind: 'LocalArgument',
        name: 'count',
        type: 'Int!',
        defaultValue: null,
      },
      {
        kind: 'LocalArgument',
        name: 'cursor',
        type: 'String',
        defaultValue: null,
      },
    ],
    kind: 'Fragment',
    metadata: null,
    name: 'HomeScreenPaginationQuery',
    selections: [
      {
        kind: 'LinkedField',
        alias: 'viewer',
        args: null,
        concreteType: 'Viewer',
        name: '__viewer_viewer',
        plural: false,
        selections: [
          {
            kind: 'FragmentSpread',
            name: 'HomeScreen_viewer',
            args: null,
          },
        ],
        storageKey: null,
      },
    ],
    type: 'Query',
  },
  id: null,
  kind: 'Batch',
  metadata: {},
  name: 'HomeScreenPaginationQuery',
  query: {
    argumentDefinitions: [
      {
        kind: 'LocalArgument',
        name: 'count',
        type: 'Int!',
        defaultValue: null,
      },
      {
        kind: 'LocalArgument',
        name: 'cursor',
        type: 'String',
        defaultValue: null,
      },
    ],
    kind: 'Root',
    name: 'HomeScreenPaginationQuery',
    operation: 'query',
    selections: [
      {
        kind: 'LinkedField',
        alias: null,
        args: null,
        concreteType: 'Viewer',
        name: 'viewer',
        plural: false,
        selections: [
          {
            kind: 'LinkedField',
            alias: null,
            args: [
              {
                kind: 'Variable',
                name: 'after',
                variableName: 'cursor',
                type: 'String',
              },
              {
                kind: 'Variable',
                name: 'first',
                variableName: 'count',
                type: 'Int',
              },
            ],
            concreteType: 'CryptosConnection',
            name: 'cryptos',
            plural: false,
            selections: [
              {
                kind: 'LinkedField',
                alias: null,
                args: null,
                concreteType: 'CryptosEdge',
                name: 'edges',
                plural: true,
                selections: [
                  {
                    kind: 'LinkedField',
                    alias: null,
                    args: null,
                    concreteType: 'Crypto',
                    name: 'node',
                    plural: false,
                    selections: [
                      {
                        kind: 'ScalarField',
                        alias: null,
                        args: null,
                        name: 'symbol',
                        storageKey: null,
                      },
                      {
                        kind: 'ScalarField',
                        alias: null,
                        args: null,
                        name: 'id',
                        storageKey: null,
                      },
                      {
                        kind: 'ScalarField',
                        alias: null,
                        args: null,
                        name: 'cryptoId',
                        storageKey: null,
                      },
                      {
                        kind: 'ScalarField',
                        alias: null,
                        args: null,
                        name: 'percentChange1h',
                        storageKey: null,
                      },
                      {
                        kind: 'ScalarField',
                        alias: null,
                        args: null,
                        name: 'percentChange24h',
                        storageKey: null,
                      },
                      {
                        kind: 'ScalarField',
                        alias: null,
                        args: null,
                        name: 'percentChange7d',
                        storageKey: null,
                      },
                      {
                        kind: 'ScalarField',
                        alias: null,
                        args: null,
                        name: 'name',
                        storageKey: null,
                      },
                      {
                        kind: 'ScalarField',
                        alias: null,
                        args: null,
                        name: 'priceUsd',
                        storageKey: null,
                      },
                      {
                        kind: 'ScalarField',
                        alias: null,
                        args: null,
                        name: 'priceBtc',
                        storageKey: null,
                      },
                      {
                        kind: 'ScalarField',
                        alias: null,
                        args: null,
                        name: 'marketCapUsd',
                        storageKey: null,
                      },
                      {
                        kind: 'ScalarField',
                        alias: null,
                        args: null,
                        name: 'totalSuply',
                        storageKey: null,
                      },
                      {
                        kind: 'ScalarField',
                        alias: null,
                        args: null,
                        name: 'volumeUsd24h',
                        storageKey: null,
                      },
                      {
                        kind: 'ScalarField',
                        alias: null,
                        args: null,
                        name: '__typename',
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                  {
                    kind: 'ScalarField',
                    alias: null,
                    args: null,
                    name: 'cursor',
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
              {
                kind: 'LinkedField',
                alias: null,
                args: null,
                concreteType: 'PageInfo',
                name: 'pageInfo',
                plural: false,
                selections: [
                  {
                    kind: 'ScalarField',
                    alias: null,
                    args: null,
                    name: 'endCursor',
                    storageKey: null,
                  },
                  {
                    kind: 'ScalarField',
                    alias: null,
                    args: null,
                    name: 'hasNextPage',
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
            ],
            storageKey: null,
          },
          {
            kind: 'LinkedHandle',
            alias: null,
            args: [
              {
                kind: 'Variable',
                name: 'after',
                variableName: 'cursor',
                type: 'String',
              },
              {
                kind: 'Variable',
                name: 'first',
                variableName: 'count',
                type: 'Int',
              },
            ],
            handle: 'connection',
            name: 'cryptos',
            key: 'HomeScreen_cryptos',
            filters: null,
          },
        ],
        storageKey: null,
      },
      {
        kind: 'LinkedHandle',
        alias: null,
        args: null,
        handle: 'viewer',
        name: 'viewer',
        key: '',
        filters: null,
      },
    ],
  },
  text:
    'query HomeScreenPaginationQuery(\n  $count: Int!\n  $cursor: String\n) {\n  viewer {\n    ...HomeScreen_viewer\n  }\n}\n\nfragment HomeScreen_viewer on Viewer {\n  cryptos(first: $count, after: $cursor) {\n    edges {\n      node {\n        id\n        ...Coin_coin\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment Coin_coin on Crypto {\n  name\n  cryptoId\n  percentChange1h\n  percentChange24h\n  percentChange7d\n  symbol\n  priceUsd\n  priceBtc\n  marketCapUsd\n  totalSuply\n  volumeUsd24h\n}\n',
};

module.exports = batch;
