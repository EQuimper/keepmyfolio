// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { createPaginationContainer, graphql } from 'react-relay';

import { createRenderer } from '../../RelayUtils';
import { getAllCoinMarket } from '../../actions/entities';
import Loading from '../../components/Loading';
import Coin from './Coin';

import type { CoinMarketCapData } from '../../types';

const Root = styled.View`flex: 1;`;

const Separator = styled.View`
  height: 5;
  backgroundColor: transparent;
`;

type Props = {
  getAllCoinMarket: typeof getAllCoinMarket,
  coins: Array<CoinMarketCapData>,
};

class HomeScreen extends Component<void, Props, void> {
  componentDidMount() {
    this.props.getAllCoinMarket();
  }

  _renderItem = ({ item }: { item: CoinMarketCapData }) => <Coin data={item} />;

  render() {
    if (this.props.coins.length === 0) {
      return <Loading />;
    }
    return (
      <Root>
        <FlatList
          ItemSeparatorComponent={() => <Separator />}
          contentContainerStyle={{ alignSelf: 'stretch' }}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
          data={this.props.coins.edges}
        />
      </Root>
    );
  }
}

const PaginationContainer = createPaginationContainer(
  HomeScreen,
  graphql`
    fragment HomeScreen_cryptos on CryptosConnection {
      edges {
        node {
          ...Coin_coin
        }
      }
    }
  `
)

export default createRenderer(PaginationContainer, {
  query: graphql`
    query HomeScreenQuery {
      cryptos {
        ...HomeScreen_cryptos
      }
    }
  `
});
