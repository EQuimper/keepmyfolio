// @flow

import { createBlacklistFilter } from 'redux-persist-transform-filter';

export const colors = {
  red: '#F8333C',
  green: '#4ADF86',
  darkGray: '#31393C',
  greyOutline: '#bbbbbb',
  primary: '#00C0FF',
  primaryLight: 'rgba(0, 192, 255, 0.15)',
  lightGrey: '#B4B4B4',
  white: '#ffffff',
  transparent: 'transparent'
};

/**
 * App themes
 */
export const themes = {
  dark: {
    ...colors,
    tabBarColor: '#192543',
    cardBackground: '#161C36',
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
    thumbTintColor: colors.darkGray
  },
};

/**
 * Remove some keey from the app reducer
 */
export const subsetOfAppReducer = createBlacklistFilter(
  'app',
  ['isSearchBarShow']
);

/**
 * List of reducer we persist with redux-persist
 */
export const persistWhitelist = ['app'];

/**
 * Object of each key the app use in the asyncStorage
 */
export const storageKey = {
  theme: '@keepmyfolio-theme'
}

/**
 * All colors for graphs
 */
export const pieChartColors = {
  light: ['#82C2EE', '#EFBD4A', '#436D96', '#382B28', '#78C68E', '#E04837'],
  dark: ['#66CA71', '#FDBE34', '#5A57C7', '#F38181', '#FFF1A8', '#0496FF']
}
