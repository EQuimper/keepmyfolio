// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Keyboard } from 'react-native';
import invariant from 'invariant';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import format from 'date-fns/format';
import { connect } from 'react-redux';

import type { CryptoItem_coin as Coin } from './__generated__/CryptoItem_coin.graphql';
import type {
  Navigation,
  ThemeColorsData,
  State as AppState,
} from '../../types';

import { colors } from '../../utils/constants';
import ModalCryptocurencie from './ModalCryptocurencie';

const Root = styled.TouchableWithoutFeedback`flex: 1;`;

const Wrapper = styled.View`flex: 1;`;

const Title = styled.Text`
  color: #fff;
  fontWeight: 600;
  fontSize: 16;
  marginLeft: 5;
`;

const Card = styled.View`
  height: 50;
  width: 100%;
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
  justifyContent: center;
`;

const ButtonWrapper = styled.View`
  flexDirection: row;
  alignItems: center;
  justifyContent: space-around;
`;

const Button = styled.TouchableOpacity`
  height: 50;
  width: 50;
  borderRadius: 25;
  backgroundColor: ${props => props.color};
  justifyContent: center;
  alignItems: center;
  marginTop: 20;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.lightGrey,
  selectionColor: colors.primary,
})`
  flex: 1;
  alignSelf: stretch;
  paddingHorizontal: 5;
`;

type Props = {
  navigation: Navigation,
  theme: ThemeColorsData,
};

type State = {
  showModalCrypto: boolean,
  selectedCrypto: ?Coin,
  totalAmoutOfDollarPay: string,
  totalAmountOfCrypto: string,
  price: string,
  dateBuy: Date,
};

const initialState: State = {
  showModalCrypto: false,
  selectedCrypto: null,
  totalAmountOfCrypto: '',
  totalAmoutOfDollarPay: '',
  price: '',
  dateBuy: new Date(),
};

class AddCoinScreen extends Component<void, Props, State> {
  state = initialState;

  get getCryptoName() {
    if (!this.state.selectedCrypto) {
      return <Title style={{ color: colors.lightGrey }}>Choose a crypto</Title>;
    }

    return (
      <Title style={{ color: this.props.theme.textColor }}>
        {this.state.selectedCrypto.name}
      </Title>
    );
  }

  get getPrice(): string {
    if (!this.state.selectedCrypto) {
      return '';
    }

    if (this.state.price) {
      return this.state.price;
    }

    invariant(this.state.selectedCrypto.priceUsd, 'Price is need');

    return this.state.selectedCrypto.priceUsd;
  }

  get getDisabled(): boolean {
    if (!this.state.selectedCrypto) {
      return false;
    }

    return true;
  }

  get getTotalAmountPay(): string {
    if (!this.state.selectedCrypto || !this.state.totalAmountOfCrypto) {
      return '0';
    }

    invariant(this.state.selectedCrypto.priceUsd, 'Price is need');

    let result: string;

    const priceCrypto = parseFloat(this.state.selectedCrypto.priceUsd);
    const totalAmountOfCrypto = parseFloat(this.state.totalAmountOfCrypto);
    const price = parseFloat(this.state.price);

    if (price) {
      result = (totalAmountOfCrypto * price).toFixed(2);
    } else {
      result = (totalAmountOfCrypto * priceCrypto).toFixed(2);
    }

    return result;
  }

  _onPriceChange = (price: string) => {
    this.setState({ price });
  };

  _onTotalCoinChange = (amount: string) => {
    this.setState({ totalAmountOfCrypto: amount });
  };

  _onOutsidePress = () => Keyboard.dismiss();

  _onModalCryptoPress = () => {
    this.setState({
      showModalCrypto: !this.state.showModalCrypto,
    });
  };

  _onSelectCryptoPress = (coin: Coin) => {
    this.setState({
      ...initialState,
      selectedCrypto: coin,
    });
  };

  _resetState = () => {
    this.setState({ ...initialState });
  };

  _onCancelPress = () => {
    this._resetState();
  };

  _onSubmitPress = () => {
    this.props.navigation.navigate('Wallet');
    this._resetState();
  };

  render() {
    const { theme } = this.props;
    return (
      <Root
        onPress={this._onOutsidePress}
        style={{ backgroundColor: theme.cardBackground }}
      >
        <Wrapper style={{ backgroundColor: theme.cardBackground }}>
          <ItemWrapper first>
            <Title style={{ color: theme.textColor }}>Cryptocurencie</Title>
            <Card style={{ backgroundColor: theme.tabBarColor }}>
              <SelectCrypto onPress={this._onModalCryptoPress}>
                {this.getCryptoName}
              </SelectCrypto>
            </Card>
          </ItemWrapper>
          <ItemWrapper>
            <Title style={{ color: theme.textColor }}>Price Pay</Title>
            <Card style={{ backgroundColor: theme.tabBarColor }}>
              <Input
                keyboardType="numeric"
                placeholder="0.00"
                style={{ color: theme.textColor }}
                value={this.getPrice}
                onChangeText={this._onPriceChange}
                editable={this.getDisabled}
              />
            </Card>
          </ItemWrapper>
          <ItemWrapper>
            <Title style={{ color: theme.textColor }}>Total</Title>
            <Card style={{ backgroundColor: theme.tabBarColor }}>
              <Input
                keyboardType="numeric"
                placeholder="0"
                style={{ color: theme.textColor }}
                value={this.state.totalAmountOfCrypto}
                onChangeText={this._onTotalCoinChange}
                editable={this.getDisabled}
              />
            </Card>
          </ItemWrapper>
          <ItemWrapper>
            <Title style={{ color: theme.textColor }}>Date Buy</Title>
            <Card style={{ backgroundColor: theme.tabBarColor }}>
              <Title style={{ color: theme.textColor }}>
                {format(this.state.dateBuy, 'DD MMMM YYYY')}
              </Title>
            </Card>
          </ItemWrapper>
          <ItemWrapper>
            <Title style={{ color: theme.textColor }}>Total amount pay $</Title>
            <Card style={{ backgroundColor: theme.tabBarColor }}>
              <Title style={{ color: theme.textColor }}>
                {this.getTotalAmountPay}
              </Title>
            </Card>
          </ItemWrapper>
          <ButtonWrapper>
            <Button
              disabled={!this.getDisabled}
              onPress={this._onCancelPress}
              color={colors.red}
            >
              <FontAwesome size={25} color="#fff" name="close" />
            </Button>
            <Button
              onPress={this._onSubmitPress}
              disabled={!this.getDisabled}
              color={colors.green}
            >
              <Entypo size={25} color="#fff" name="check" />
            </Button>
          </ButtonWrapper>
          <ModalCryptocurencie
            theme={this.props.theme}
            onCloseButtonPress={this._onModalCryptoPress}
            showModalCrypto={this.state.showModalCrypto}
            onSelectCryptoPress={this._onSelectCryptoPress}
          />
        </Wrapper>
      </Root>
    );
  }
}

export default connect((state: AppState) => ({
  theme: state.app.theme,
}))(AddCoinScreen);
