// @flow

import { Platform } from 'react-native';
import { createBlacklistFilter } from '@actra-development-oss/redux-persist-transform-filter-immutable';
import DeviceInfo from 'react-native-device-info';

/**
 * TYPES
 */
import type { DeviceInfoType } from '../types';

import { makeHitSlop } from './helpers/makeHitSlop';

/**
 * Basic app colors
 */
export const colors = {
  red: '#F8333C',
  green: '#4ADF86',
  darkGray: '#31393C',
  greyOutline: '#bbbbbb',
  primary: '#00C0FF',
  primaryLight: 'rgba(0, 192, 255, 0.15)',
  lightGrey: '#B4B4B4',
  white: '#ffffff',
  transparent: 'transparent',
  darkBlue: '#161C36',
  black: '#000',
  selectionColor: Platform.OS === 'ios' ? '#00C0FF' : undefined
};

/**
 * App themes
 */
export const themes = {
  dark: {
    ...colors,
    tabBarColor: '#192543',
    cardBackground: colors.darkBlue,
    headerTitleColor: colors.white,
    textColor: colors.white,
    thumbTintColor: colors.white,
  },
  light: {
    ...colors,
    tabBarColor: '#F3F3F3',
    cardBackground: colors.white,
    headerTitleColor: colors.darkGray,
    textColor: colors.darkGray,
    thumbTintColor: colors.darkGray,
  },
};

/**
 * Remove some key from the app reducer
 */
export const subsetOfAppReducer = createBlacklistFilter('app', [
  'isSearchBarShow',
]);

/**
 * List of reducer we persist with redux-persist
 */
export const persistWhitelist = ['app', 'cryptos'];

/**
 * Object of each key the app use in the asyncStorage
 */
export const storageKey = {
  theme: '@keepmyfolio-theme',
};

/**
 * All colors for graphs
 */
export const pieChartColors = {
  light: ['#82C2EE', '#EFBD4A', '#436D96', '#382B28', '#78C68E', '#E04837'],
  dark: ['#66CA71', '#FDBE34', '#5A57C7', '#F38181', '#FFF1A8', '#0496FF'],
};

/**
 * Properties of the app
 */
export const properties = {
  feedbackEmail: {
    email: 'quimperemanuel@gmail.com',
    subject: 'KeepMyFolio feedback',
  },
};

/**
 * Constants about the device
 */
export const deviceInfo: DeviceInfoType = {
  isEmulator: DeviceInfo.isEmulator(),
};

/**
 * Basic metrics of the app
 */
export const metrics = {
  hitSlop: makeHitSlop,
  shadow: {
    basic: {
      shadowOffset: {
        width: 2,
        height: 0
      },
      shadowOpacity: 0.2,
      shadowColor: colors.black,
      shadowRadius: 6
    }
  }
};

/**
 * Fonts of the app
 */
export const fonts = {

}
