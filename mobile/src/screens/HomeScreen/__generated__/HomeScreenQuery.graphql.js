/**
 * @flow
 * @relayHash 08b6d18ffaac929586a1f0eb4106a807
 */

/* eslint-disable */

'use strict';

import type { ConcreteBatch } from 'relay-runtime';
export type HomeScreenQueryResponse = {|
  +viewer: ?{||},
|};
/*
query HomeScreenQuery(
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
  symbol
  priceUsd
}
*/

const batch: ConcreteBatch = {
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
    name: 'HomeScreenQuery',
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
  name: 'HomeScreenQuery',
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
    name: 'HomeScreenQuery',
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
                        name: 'id',
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
                        name: 'symbol',
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
    'query HomeScreenQuery(\n  $count: Int!\n  $cursor: String\n) {\n  viewer {\n    ...HomeScreen_viewer\n  }\n}\n\nfragment HomeScreen_viewer on Viewer {\n  cryptos(first: $count, after: $cursor) {\n    edges {\n      node {\n        id\n        ...Coin_coin\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment Coin_coin on Crypto {\n  name\n  cryptoId\n  percentChange1h\n  symbol\n  priceUsd\n}\n',
};

module.exports = batch;
