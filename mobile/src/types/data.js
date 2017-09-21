// @flow

export type ThemeColorsData = {
  red: string,
  green: string,
  darkGray: string,
  greyOutline: string,
  primary: string,
  primaryLight: string,
  transparent: string,
  lightGrey: string,
  white: string,
  tabBarColor: string,
  cardBackground: string,
  headerTitleColor: string,
  textColor: string,
  thumbTintColor: string,
};

export type HoldingData = {
  priceTotalPay: string,
  priceByCoin: string,
  amountOfCoin: string,
  name: any,
  dateBuy: Date,
  id: any,
};

export type TimeSelect = '1d' | '7d' | '1m' | '6m' | '1y' | 'ALL';

export type DeviceInfoType = {
  isEmulator: boolean,
};
