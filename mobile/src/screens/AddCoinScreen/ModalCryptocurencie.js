// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
`

const Wrapper = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.tabBarColor};
  position: relative;
  background-color: yellow;
`;

const ContentWrapper = styled.View`
  marginTop: 20%;
  background-color: red;
`

const Title = styled.Text`
  color: #fff;
  fontSize: 18;
  fontWeight: 600;
  alignSelf: center;
`;

type Props = {
  showModalCrypto: boolean,
  onCloseButtonPress: Function,
};

class ModalCryptocurencie extends Component<void, Props, void> {

  _onCloseButtonPress = () => this.props.onCloseButtonPress();

  render() {
    return (
      <Root>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.showModalCrypto}
        >
          <Wrapper>
            <CloseButton onPress={this._onCloseButtonPress}>
              <MaterialCommunityIcons color="#fff" size={30} name="window-close" />
            </CloseButton>
            <ContentWrapper>
              <Title>Choose your crypto coin</Title>
            </ContentWrapper>
          </Wrapper>
        </Modal>
      </Root>
    );
  }
}

export default ModalCryptocurencie;
