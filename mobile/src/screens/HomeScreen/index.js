// @flow

import React, { Component } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import { createPaginationContainer, graphql } from 'react-relay';
import idx from 'idx';

import { createRenderer } from '../../RelayUtils';
import Coin from './Coin';

import type { RelayType } from '../../types';
import type { HomeScreen_viewer as Viewer } from './__generated__/HomeScreen_viewer.graphql';

const PAGE_SIZE = 10;

const Root = styled.View`flex: 1;`;

const Separator = styled.View`
  height: 5;
  backgroundColor: transparent;
`;

type Props = {
  viewer: Viewer,
  relay: RelayType,
};

type State = {
  refreshing: boolean,
};

class HomeScreen extends Component<void, Props, State> {
  state = {
    refreshing: false,
  }

  _renderItem = ({ item }) => <Coin coin={item} />;

  _onEndReached = () => {
    if (this.props.relay.hasMore() && !this.props.relay.isLoading()) {
      this.props.relay.loadMore(PAGE_SIZE, () => {});
    }
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    this.props.relay.refetchConnection(PAGE_SIZE, null);
    this.setState({ refreshing: false });
  }

  render() {
    return (
      <Root>
        <FlatList
          ItemSeparatorComponent={() => <Separator />}
          contentContainerStyle={{ alignSelf: 'stretch' }}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
          data={this.props.viewer.cryptos.edges.map(e => e.node)}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              title="Pull to refresh"
              // tintColor={Colors.primary}
              // titleColor={Colors.primary}
            />
          }
        />
      </Root>
    );
  }
}

const PaginationContainer = createPaginationContainer(
  HomeScreen,
  graphql`
    fragment HomeScreen_viewer on Viewer {
      cryptos(first: $count, after: $cursor)
        @connection(key: "HomeScreen_cryptos") {
        edges {
          node {
            id
            ...Coin_coin
          }
        }
      }
    }
  `,
  {
    getVariables(props, { count, cursor }) {
      return {
        count,
        cursor,
      };
    },
    query: graphql`
      query HomeScreenPaginationQuery($count: Int!, $cursor: String) {
        viewer {
          ...HomeScreen_viewer
        }
      }
    `,
  },
);

export default createRenderer(PaginationContainer, {
  query: graphql`
    query HomeScreenQuery($count: Int!, $cursor: String) {
      viewer {
        ...HomeScreen_viewer
      }
    }
  `,
  queriesParams: () => ({
    count: PAGE_SIZE,
    cursor: null,
  }),
});
