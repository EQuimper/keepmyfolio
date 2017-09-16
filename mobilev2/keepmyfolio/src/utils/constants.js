// @flow

export const colors = {
  red: '#F8333C',
  green: '#4ADF86',
  darkGray: '#31393C',
  greyOutline: '#bbbbbb',
  primary: '#00C0FF',
  lightGrey: '#B4B4B4',
  white: '#ffffff',
};

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

export const persistWhitelist = ['app'];

export const storageKey = {
  theme: '@keepmyfolio-theme'
}

export const pieChartColors = {
  light: ['#82C2EE', '#EFBD4A', '#436D96', '#382B28', '#78C68E', '#E04837'],
  dark: ['#66CA71', '#5A57C7', '#FDBE34', '#F38181', '#FFF1A8']
}
