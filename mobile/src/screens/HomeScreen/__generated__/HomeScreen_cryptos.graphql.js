/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type HomeScreen_cryptos = {|
  +edges: ?$ReadOnlyArray<?{|
    +node: ?{| |};
  |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeScreen_cryptos",
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
              "kind": "FragmentSpread",
              "name": "Coin_coin",
              "args": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CryptosConnection"
};

module.exports = fragment;
