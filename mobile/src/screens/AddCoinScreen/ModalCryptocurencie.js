// @flow

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { PureComponent } from 'react';
import idx from 'idx';
import invariant from 'invariant';
import {
  Modal,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { createPaginationContainer, graphql } from 'react-relay';
// ------------------------------------
// TYPES
// ------------------------------------
import type { CryptoItem_coin as Coin } from './__generated__/CryptoItem_coin.graphql';
import type { ModalCryptocurencie_viewer as Viewer } from './__generated__/ModalCryptocurencie_viewer.graphql';
import type { RelayType, ThemeColorsData } from '../../types';
// ------------------------------------
// COMPONENTS
// ------------------------------------
import CryptoItem from './CryptoItem';
// ------------------------------------
// UTILS
// ------------------------------------
import { createRenderer } from '../../RelayUtils';
import { colors } from '../../utils/constants';

const PAGE_SIZE = 10;

const HIT_SLOP = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 20,
};

const styles = StyleSheet.create({
  contentWrapper: {
    marginTop: '20%',
  },
  closeBtn: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: '5%',
    top: '5%',
    width: 50,
    zIndex: 1,
  },
  listContainer: {
    alignSelf: 'stretch',
    paddingBottom: 50,
  },
  listWrapper: {
    marginTop: 10,
  },
  separator: {
    backgroundColor: colors.transparent,
    height: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
  },
  wrapper: {
    flex: 1,
    position: 'relative',
  },
});

type Props = {
  onCloseButtonPress: Function,
  onSelectCryptoPress: (coin: Coin) => Coin,
  relay: RelayType,
  showModalCrypto: boolean,
  theme: ThemeColorsData,
  viewer: Viewer,
};

class ModalCryptocurencie extends PureComponent<void, Props, void> {
  _onCloseButtonPress = () => this.props.onCloseButtonPress();

  _onEndReached = () => {
    if (this.props.relay.hasMore() && !this.props.relay.isLoading()) {
      this.props.relay.loadMore(PAGE_SIZE, () => {});
    }
  };

  _renderItem = ({ item }) => {
    invariant(item, 'Item cannot be null');
    return (
      <CryptoItem
        coin={item}
        onSelectPress={this.props.onSelectCryptoPress}
        theme={this.props.theme}
      />
    );
  };

  render() {
    const edges = idx(this.props, _ => _.viewer.cryptos.edges);
    invariant(edges, 'Edges cannot be null');

    const { theme } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.showModalCrypto}
      >
        <View style={[styles.wrapper, { backgroundColor: theme.tabBarColor }]}>
          <TouchableOpacity
            hitSlop={HIT_SLOP}
            onPress={this._onCloseButtonPress}
            style={styles.closeBtn}
          >
            <MaterialCommunityIcons
              color={theme.textColor}
              name="window-close"
              size={30}
            />
          </TouchableOpacity>
          <View style={styles.contentWrapper}>
            <Text style={[styles.title, { color: theme.textColor }]}>
              Choose your crypto
            </Text>
            <View style={styles.listWrapper}>
              <FlatList
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={styles.listContainer}
                data={edges.map(e => idx(e, _ => _.node))}
                keyExtractor={item => item.id}
                onEndReached={this._onEndReached}
                renderItem={this._renderItem}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const PaginationContainer = createPaginationContainer(
  ModalCryptocurencie,
  graphql`
    fragment ModalCryptocurencie_viewer on Viewer {
      cryptos(first: $count, after: $cursor)
        @connection(key: "ModalCryptocurencie_cryptos") {
        edges {
          node {
            id
            ...CryptoItem_coin
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
      query ModalCryptocurenciePaginationQuery($count: Int!, $cursor: String) {
        viewer {
          ...ModalCryptocurencie_viewer
        }
      }
    `,
  },
);

export default createRenderer(PaginationContainer, {
  query: graphql`
    query ModalCryptocurencieQuery($count: Int!, $cursor: String) {
      viewer {
        ...ModalCryptocurencie_viewer
      }
    }
  `,
  queriesParams: () => ({
    count: PAGE_SIZE,
    cursor: null,
  }),
});
