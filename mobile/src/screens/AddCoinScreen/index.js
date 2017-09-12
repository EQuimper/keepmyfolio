// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Keyboard } from 'react-native';

import { colors } from '../../utils/constants';
// import ModalCryptocurencie from './ModalCryptocurencie';

const Root = styled.TouchableWithoutFeedback`
  flex: 1;
  backgroundColor: ${props => props.theme.tabBarColor};
`;

const Wrapper = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.tabBarColor};
`;

const Title = styled.Text`
  color: #fff;
  fontWeight: 600;
  fontSize: 16;
  marginLeft: 5;
`;

const Card = styled.View`
  height: 50;
  width: 100%;
  backgroundColor: ${props => props.theme.cardBackground};
  justifyContent: center;
`;

const ItemWrapper = styled.View`
  height: 80;
  justifyContent: space-around;
  marginTop: ${props => (props.first ? 0 : 10)};
`;

const SelectCrypto = styled.TouchableOpacity`
  flex: 1;
  alignSelf: stretch;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.lightGrey,
  selectionColor: colors.primary
})`
  flex: 1;
  color: #fff;
  alignSelf: stretch;
  paddingHorizontal: 5;
`;

type State = {
  showModalCrypto: boolean
};

class AddCoinScreen extends Component<void, {}, State> {
  state = {
    showModalCrypto: false
  };

  _onOutsidePress = () => Keyboard.dismiss();

  _onModalCryptoPress = () => {
    this.setState({
      showModalCrypto: !this.state.showModalCrypto
    });
  };

  render() {
    return (
      <Root onPress={this._onOutsidePress}>
        <Wrapper>
          <ItemWrapper first>
            <Title>Cryptocurencie</Title>
            <Card>
              <SelectCrypto onPress={this._onModalCryptoPress}>
                <Title>Hello world</Title>
              </SelectCrypto>
            </Card>
          </ItemWrapper>
          <ItemWrapper>
            <Title>Price USD</Title>
            <Card>
              <Input keyboardType="numeric" placeholder="0.00" />
            </Card>
          </ItemWrapper>
          <ItemWrapper>
            <Title>Total</Title>
            <Card>
              <Input keyboardType="numeric" placeholder="0" />
            </Card>
          </ItemWrapper>
          <ItemWrapper>
            <Title>Date Buy</Title>
            <Card>
              <Title>September 7 2017</Title>
            </Card>
          </ItemWrapper>
        </Wrapper>
      </Root>
    );
  }
}

export default AddCoinScreen;

{/* <ModalCryptocurencie
  onCloseButtonPress={this._onModalCryptoPress}
  showModalCrypto={this.state.showModalCrypto}
/> */}
