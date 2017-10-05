// @flow

import React, { PureComponent } from 'react';
import idx from 'idx';
import invariant from 'invariant';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { createPaginationContainer, graphql } from 'react-relay';

/**
 * TYPES
 */
import type {
  Navigation,
  RelayType,
  State as AppState,
  ThemeColorsData,
} from '../../types';
import type { HomeScreen_viewer as Viewer } from './__generated__/HomeScreen_viewer.graphql';

/**
 * COMPONENTS
 */
import SearchBar from '../../components/SearchBar';
import Coin from './Coin';

/**
 * UTILS
 */
import { createRenderer } from '../../RelayUtils';
import { colors } from '../../utils/constants';

const PAGE_SIZE = 10;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  separator: {
    backgroundColor: colors.transparent,
    height: 5,
  },
  contentContainerList: {
    alignSelf: 'stretch',
  },
});

type Props = {
  navigation: Navigation,
  relay: RelayType,
  theme: ThemeColorsData,
  viewer: Viewer,
};

type State = {
  refreshing: boolean,
};

class HomeScreen extends PureComponent<Props, State> {
  state = {
    refreshing: false,
  };

  _renderItem = ({ item }) => (
    <Coin
      coin={item}
      navigation={this.props.navigation}
      theme={this.props.theme}
    />
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

  _renderSeparator = () => <View style={styles.separator} />

  _keyExtractor = (item) => {
    invariant(item, 'Item is needed');
    return item.id;
  }

  render() {
    const edges = idx(this.props, _ => _.viewer.cryptos.edges);
    invariant(edges, 'Edges cannot be null');
    return (
      <View
        style={[styles.root, { backgroundColor: this.props.theme.tabBarColor }]}
      >
        <SearchBar theme={this.props.theme} />
        <FlatList
          ItemSeparatorComponent={this._renderSeparator}
          contentContainerStyle={styles.contentContainerList}
          data={edges.map(e => idx(e, _ => _.node))}
          keyExtractor={this._keyExtractor}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              onRefresh={this._onRefresh}
              refreshing={this.state.refreshing}
              tintColor={colors.primary}
            />
          }
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const HomeScreenConnected = connect((state: AppState) => ({
  theme: state.get('app').theme,
}))(HomeScreen);

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
