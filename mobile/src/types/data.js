// @flow

export type ThemeColorsData = {
  cardBackground: string,
  darkGray: string,
  darkBlue: string,
  green: string,
  greyOutline: string,
  headerTitleColor: string,
  lightGrey: string,
  primary: string,
  primaryLight: string,
  red: string,
  tabBarColor: string,
  textColor: string,
  thumbTintColor: string,
  transparent: string,
  white: string,
};

export type HoldingData = {
  amountOfCoin: string,
  dateBuy: Date,
  id: any,
  name: any,
  priceByCoin: string,
  priceTotalPay: string,
};

export type TimeSelect = '1d' | '7d' | '1m' | '6m' | '1y' | 'ALL';

export type DeviceInfoType = {
  isEmulator: boolean,
};
