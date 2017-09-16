// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Modal, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createPaginationContainer, graphql } from 'react-relay';
import idx from 'idx';
import invariant from 'invariant';

import type {
  RelayType,
  ThemeColorsData,
} from '../../types';
import type { ModalCryptocurencie_viewer as Viewer } from './__generated__/ModalCryptocurencie_viewer.graphql';
import type { CryptoItem_coin as Coin } from './__generated__/CryptoItem_coin.graphql';

import CryptoItem from './CryptoItem';
import { createRenderer } from '../../RelayUtils';

const PAGE_SIZE = 10;

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const CloseButton = styled.TouchableOpacity.attrs({
  hitSlops: { top: 20, left: 20, right: 20, bottom: 20 },
})`
  height: 50;
  width: 50;
  position: absolute;
  top: 5%;
  right: 5%;
  alignItems: center;
  justifyContent: center;
  zIndex: 1;
`;

const Wrapper = styled.View`
  flex: 1;
  position: relative;
`;

const Separator = styled.View`
  height: 5;
  backgroundColor: transparent;
`;

const ContentWrapper = styled.View`marginTop: 20%;`;

const ListWrapper = styled.View`marginTop: 10;`;

const Title = styled.Text`
  fontSize: 18;
  fontWeight: 600;
  alignSelf: center;
`;

type Props = {
  showModalCrypto: boolean,
  onCloseButtonPress: Function,
  viewer: Viewer,
  relay: RelayType,
  onSelectCryptoPress: (coin: Coin) => Coin,
  theme: ThemeColorsData,
};

class ModalCryptocurencie extends Component<void, Props, void> {
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
      <Root>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.showModalCrypto}
        >
          <Wrapper style={{ backgroundColor: theme.tabBarColor }}>
            <CloseButton onPress={this._onCloseButtonPress}>
              <MaterialCommunityIcons
                color={theme.textColor}
                size={30}
                name="window-close"
              />
            </CloseButton>
            <ContentWrapper>
              <Title style={{ color: theme.textColor }}>Choose your crypto</Title>
              <ListWrapper>
                <FlatList
                  ItemSeparatorComponent={() => <Separator />}
                  contentContainerStyle={{
                    alignSelf: 'stretch',
                    paddingBottom: 50,
                  }}
                  keyExtractor={item => item.id}
                  renderItem={this._renderItem}
                  data={edges.map(e => idx(e, _ => _.node))}
                  onEndReached={this._onEndReached}
                />
              </ListWrapper>
            </ContentWrapper>
          </Wrapper>
        </Modal>
      </Root>
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
