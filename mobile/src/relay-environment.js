// @flow

import React, { Component } from 'react';
import { Environment, RecordSource, Store } from 'relay-runtime';
import { QueryRenderer, graphql } from 'react-relay';

import network from './network';

const handlerProvider = null;

const relayEnvironment = () => {
  const source = new RecordSource();
  const relayStore = new Store(source);
  const modern = new Environment({
    network,
    store: relayStore,
    handlerProvider
  });

  return modern;
}

type Props = {
  children?: React.Element<*>,
};

export default class RelayProvider extends Component<Props> {
  render() {
    return (
      <QueryRenderer
        environment={relayEnvironment()}
        render={this.props.children}
        query={graphql`
          query GetAllCrytos {
            cryptos {
              edges {
                node {
                  id
                  cryptoId
                  symbol
                  priceUsd
                  volumeUsd24h
                  percentChange1h
                  percentChange7d
                  name
                }
              }
            }
          }
        `}
      />
    )
  }
}
