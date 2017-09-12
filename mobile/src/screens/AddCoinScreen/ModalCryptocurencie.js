// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Modal, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createPaginationContainer, graphql } from 'react-relay';
import idx from 'idx';

import { createRenderer } from '../../RelayUtils';
import type { ModalCryptocurencie_viewer as Viewer } from './__generated__/ModalCryptocurencie_viewer.graphql';

const PAGE_SIZE = 10;

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const CloseButton = styled.TouchableOpacity.attrs({
  hitSlops: { top: 20, left: 20, right: 20, bottom: 20 }
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
  backgroundColor: ${props => props.theme.tabBarColor};
  position: relative;
`;

const Separator = styled.View`
  height: 5;
  backgroundColor: transparent;
`;

const ContentWrapper = styled.View`marginTop: 20%;`;

const ListWrapper = styled.View`marginTop: 10;`;

const Title = styled.Text`
  color: #fff;
  fontSize: 18;
  fontWeight: 600;
  alignSelf: center;
`;

type Props = {
  showModalCrypto: boolean,
  onCloseButtonPress: Function,
  viewer: Viewer
};

class ModalCryptocurencie extends Component<void, Props, void> {
  _onCloseButtonPress = () => this.props.onCloseButtonPress();

  _renderItem = () => {};

  render() {
    const edges = idx(this.props, _ => _.viewer.cryptos.edges) || [];
    return (
      <Root>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.showModalCrypto}
        >
          <Wrapper>
            <CloseButton onPress={this._onCloseButtonPress}>
              <MaterialCommunityIcons
                color="#fff"
                size={30}
                name="window-close"
              />
            </CloseButton>
            <ContentWrapper>
              <Title>Choose your crypto</Title>
              <ListWrapper>
                <FlatList
                  ItemSeparatorComponent={() => <Separator />}
                  contentContainerStyle={{ alignSelf: 'stretch' }}
                  keyExtractor={item => item.id}
                  renderItem={this._renderItem}
                  data={edges.map(e => idx(e, _ => _.node))}
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
            name
            cryptoId
          }
        }
      }
    }
  `,
  {
    getVariables(props, { count, cursor }) {
      return {
        count,
        cursor
      };
    },
    query: graphql`
      query ModalCryptocurenciePaginationQuery($count: Int!, $cursor: String) {
        viewer {
          ...ModalCryptocurencie_viewer
        }
      }
    `
  }
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
    cursor: null
  })
});
