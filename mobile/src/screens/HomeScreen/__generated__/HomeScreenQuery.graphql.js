/**
 * @flow
 * @relayHash f8ca8aed144b291c89367a501d79d0ae
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type HomeScreenQueryResponse = {|
  +Cryptos: ?{| |};
|};
*/


/*
query HomeScreenQuery {
  Cryptos {
    ...HomeScreen_cryptos
  }
}

fragment HomeScreen_cryptos on CryptosConnection {
  edges {
    node {
      ...Coin_coin
      id
    }
  }
}

fragment Coin_coin on Crypto {
  name
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeScreenQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "CryptosConnection",
        "name": "Cryptos",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "HomeScreen_cryptos",
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
  "name": "HomeScreenQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "HomeScreenQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "CryptosConnection",
        "name": "Cryptos",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "CryptosEdge",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Crypto",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query HomeScreenQuery {\n  Cryptos {\n    ...HomeScreen_cryptos\n  }\n}\n\nfragment HomeScreen_cryptos on CryptosConnection {\n  edges {\n    node {\n      ...Coin_coin\n      id\n    }\n  }\n}\n\nfragment Coin_coin on Crypto {\n  name\n}\n"
};

module.exports = batch;
