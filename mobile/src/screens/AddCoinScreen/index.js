// @flow

import React, { PureComponent } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import invariant from 'invariant';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import format from 'date-fns/format';
import { connect } from 'react-redux';

/**
 * TYPES
 */
import type { CryptoItem_coin as Coin } from './__generated__/CryptoItem_coin.graphql';
import type {
  Navigation,
  ThemeColorsData,
  State as AppState,
} from '../../types';

/**
 * COMPONENTS
 */
import ModalCryptocurencie from './ModalCryptocurencie';

/**
 * ACTIONS
 */
import { addNewHolding } from '../../actions/cryptos';

/**
 * UTILS
 */
import { colors } from '../../utils/constants';

const ICON_SIZE = 25;
const ICON_COLOR = colors.white;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  title: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 5,
  },
  card: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
  },
  selectCrypto: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  itemWrapper: {
    height: 80,
    justifyContent: 'space-around',
    marginTop: 10,
  },
  input: {
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: 5,
  },
});

// TODO: USE FORMATTER
function calculAmountPay(
  priceInMarket: string,
  price: string,
  totalAmount: string,
): string {
  const _priceInMarket = parseFloat(priceInMarket);
  const _price = parseFloat(price);
  const _totalAmount = parseFloat(totalAmount);

  let _result: string;

  if (_price) {
    _result = (_totalAmount * _price).toFixed(2);
  } else {
    _result = (_totalAmount * _priceInMarket).toFixed(2);
  }

  return _result;
}

type Props = {
  navigation: Navigation,
  theme: ThemeColorsData,
  addNewHolding: typeof addNewHolding,
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

// TODO: MAKE MODAL IN ROUTES
class AddCoinScreen extends PureComponent<void, Props, State> {
  state = initialState;

  _getCryptoName() {
    if (!this.state.selectedCrypto) {
      return (
        <Text style={[styles.title, { color: colors.lightGrey }]}>
          Choose a crypto
        </Text>
      );
    }

    return (
      <Text style={[styles.title, { color: this.props.theme.textColor }]}>
        {this.state.selectedCrypto.name}
      </Text>
    );
  }

  _getPrice(): string {
    if (!this.state.selectedCrypto) {
      return '';
    }

    if (this.state.price) {
      return this.state.price;
    }

    invariant(this.state.selectedCrypto.priceUsd, 'Price is need');

    return this.state.selectedCrypto.priceUsd;
  }

  _getDisabled(): boolean {
    if (!this.state.selectedCrypto) {
      return false;
    }

    return true;
  }

  _getTotalAmountPay(): string {
    const { selectedCrypto, totalAmountOfCrypto, price } = this.state;
    if (!selectedCrypto || !totalAmountOfCrypto) {
      return '0';
    }

    invariant(selectedCrypto.priceUsd, 'Price is need');

    return calculAmountPay(selectedCrypto.priceUsd, price, totalAmountOfCrypto);
  }

  _onPriceChange = (price: string) => {
    const { selectedCrypto, totalAmountOfCrypto } = this.state;

    invariant(selectedCrypto, 'Selected crypto required');
    invariant(selectedCrypto.priceUsd, 'Selected crypto priceUsd required');

    this.setState({
      price,
      totalAmoutOfDollarPay: calculAmountPay(
        selectedCrypto.priceUsd,
        price,
        totalAmountOfCrypto,
      ),
    });
  };

  _onTotalCoinChange = (amount: string) => {
    const { selectedCrypto, price } = this.state;

    invariant(selectedCrypto, 'Selected crypto required');
    invariant(selectedCrypto.priceUsd, 'Selected crypto priceUsd required');

    this.setState({
      totalAmountOfCrypto: amount,
      totalAmoutOfDollarPay: calculAmountPay(
        selectedCrypto.priceUsd,
        price,
        amount,
      ),
    });
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

    const {
      selectedCrypto,
      price,
      dateBuy,
      totalAmountOfCrypto,
      totalAmoutOfDollarPay,
    } = this.state;

    invariant(selectedCrypto, 'SelectedCrypto Required');
    invariant(selectedCrypto.priceUsd, 'SelectedCrypto priceUsd Required');

    const coin = {
      priceTotalPay: totalAmoutOfDollarPay,
      priceByCoin: price || selectedCrypto.priceUsd,
      amountOfCoin: totalAmountOfCrypto,
      name: selectedCrypto.name,
      dateBuy,
      id: selectedCrypto.id,
      cryptoId: selectedCrypto.cryptoId
    };

    this.props.addNewHolding(coin);

    this._resetState();
  };

  render() {
    const { theme } = this.props;
    const _firstItem = { marginTop: 0 };
    return (
      <TouchableWithoutFeedback
        onPress={this._onOutsidePress}
        style={[styles.root, { backgroundColor: theme.cardBackground }]}
      >
        <View
          style={[styles.wrapper, { backgroundColor: theme.cardBackground }]}
        >
          <View style={[styles.itemWrapper, _firstItem]}>
            <Text style={[styles.title, { color: theme.textColor }]}>
              Cryptocurencie
            </Text>
            <View style={[styles.card, { backgroundColor: theme.tabBarColor }]}>
              <TouchableOpacity
                onPress={this._onModalCryptoPress}
                style={styles.selectCrypto}
              >
                {this._getCryptoName()}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={[styles.title, { color: theme.textColor }]}>
              Price Pay
            </Text>
            <View style={[styles.card, { backgroundColor: theme.tabBarColor }]}>
              <TextInput
                editable={this._getDisabled()}
                keyboardType="numeric"
                onChangeText={this._onPriceChange}
                placeholder="0.00"
                placeholderTextColor={colors.lightGrey}
                selectionColor={colors.primary}
                style={[styles.input, { color: theme.textColor }]}
                value={this._getPrice()}
              />
            </View>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={[styles.title, { color: theme.textColor }]}>
              Total
            </Text>
            <View style={[styles.card, { backgroundColor: theme.tabBarColor }]}>
              <TextInput
                editable={this._getDisabled()}
                keyboardType="numeric"
                onChangeText={this._onTotalCoinChange}
                placeholder="0"
                placeholderTextColor={colors.lightGrey}
                selectionColor={colors.primary}
                style={[styles.input, { color: theme.textColor }]}
                value={this.state.totalAmountOfCrypto}
              />
            </View>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={[styles.title, { color: theme.textColor }]}>
              Date Buy
            </Text>
            <View style={[styles.card, { backgroundColor: theme.tabBarColor }]}>
              <Text style={[styles.title, { color: theme.textColor }]}>
                {format(this.state.dateBuy, 'DD MMMM YYYY')}
              </Text>
            </View>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={[styles.title, { color: theme.textColor }]}>
              Total amount pay $
            </Text>
            <View style={[styles.card, { backgroundColor: theme.tabBarColor }]}>
              <Text style={[styles.title, { color: theme.textColor }]}>
                {this._getTotalAmountPay()}
              </Text>
            </View>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              disabled={!this._getDisabled()}
              onPress={this._onCancelPress}
              style={[styles.button, { backgroundColor: colors.red }]}
            >
              <FontAwesome color={ICON_COLOR} name="close" size={ICON_SIZE} />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!this._getDisabled()}
              onPress={this._onSubmitPress}
              style={[styles.button, { backgroundColor: colors.green }]}
            >
              <Entypo color={ICON_COLOR} name="check" size={ICON_SIZE} />
            </TouchableOpacity>
          </View>
          {this.state.showModalCrypto && (
            <ModalCryptocurencie
              onCloseButtonPress={this._onModalCryptoPress}
              onSelectCryptoPress={this._onSelectCryptoPress}
              showModalCrypto={this.state.showModalCrypto}
              theme={this.props.theme}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(
  (state: AppState) => ({
    theme: state.get('app').theme,
  }),
  { addNewHolding },
)(AddCoinScreen);
