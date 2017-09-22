/**
 * @flow
 * @relayHash 736ce98fb839fe4ef05ee01e3b5ca944
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type MarketDetailsTabQueryResponse = {|
  +coin: ?{| |};
|};
*/


/*
query MarketDetailsTabQuery(
  $coinId: ID!
) {
  coin: node(id: $coinId) {
    __typename
    ...MarketDetailsTab_coin
    id
  }
}

fragment MarketDetailsTab_coin on Crypto {
  id
  priceUsd
  marketCapUsd
  priceBtc
  totalSuply
  volumeUsd24h
  percentChange1h
  percentChange24h
  percentChange7d
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "coinId",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MarketDetailsTabQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "coin",
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "coinId",
            "type": "ID!"
          }
        ],
        "concreteType": null,
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "MarketDetailsTab_coin",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "MarketDetailsTabQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "coinId",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "MarketDetailsTabQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "coin",
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "coinId",
            "type": "ID!"
          }
        ],
        "concreteType": null,
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "type": "Crypto",
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "priceUsd",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "marketCapUsd",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "priceBtc",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "totalSuply",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "volumeUsd24h",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "percentChange1h",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "percentChange24h",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "percentChange7d",
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query MarketDetailsTabQuery(\n  $coinId: ID!\n) {\n  coin: node(id: $coinId) {\n    __typename\n    ...MarketDetailsTab_coin\n    id\n  }\n}\n\nfragment MarketDetailsTab_coin on Crypto {\n  id\n  priceUsd\n  marketCapUsd\n  priceBtc\n  totalSuply\n  volumeUsd24h\n  percentChange1h\n  percentChange24h\n  percentChange7d\n}\n"
};

module.exports = batch;
