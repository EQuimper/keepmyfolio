// @flow

import React, { PureComponent } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import { createPaginationContainer, graphql } from 'react-relay';
import idx from 'idx';
import invariant from 'invariant';
import { connect } from 'react-redux';

import { createRenderer } from '../../RelayUtils';
import Coin from './Coin';
import { colors } from '../../utils/constants';

import type { RelayType, Navigation, State as AppState, ThemeColorsData } from '../../types';
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
  navigation: Navigation,
  theme: ThemeColorsData,
};

type State = {
  refreshing: boolean,
};

class HomeScreen extends PureComponent<void, Props, State> {
  state = {
    refreshing: false,
  };

  _renderItem = ({ item }) => (
    <Coin coin={item} navigation={this.props.navigation} theme={this.props.theme} />
  );

  _onEndReached = () => {
    if (this.props.relay.hasMore() && !this.props.relay.isLoading()) {
      this.props.relay.loadMore(PAGE_SIZE, () => {});
    }
  };

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    this.props.relay.refetchConnection(PAGE_SIZE, null);
    this.setState({ refreshing: false });
  };

  render() {
    const edges = idx(this.props, _ => _.viewer.cryptos.edges);
    invariant(edges, 'Edges cannot be null');
    return (
      <Root style={{ backgroundColor: this.props.theme.tabBarColor }}>
        <FlatList
          ItemSeparatorComponent={() => <Separator />}
          contentContainerStyle={{ alignSelf: 'stretch' }}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
          data={edges.map(e => idx(e, _ => _.node))}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor={colors.primary}
            />
          }
        />
      </Root>
    );
  }
}

const HomeScreenConnected = connect(
  (state: AppState) => ({
    theme: state.app.theme
  })
)(HomeScreen)

const PaginationContainer = createPaginationContainer(
  HomeScreenConnected,
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
