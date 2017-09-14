// @flow

// import { AsyncStorage } from 'react-native';

import type { Action } from '../types';

// import { storageKey } from '../utils/constants';

// export function toggleTheme(): ThunkAction {
//   return async (dispatch, getState) => {
//     const { darkTheme } = getState().app;
//
//     if (darkTheme) {
//       try {
//         await AsyncStorage.setItem(storageKey.theme, 'light');
//       } catch (e) {
//         throw e;
//       }
//     } else {
//       try {
//         await AsyncStorage.setItem(storageKey.theme, 'dark');
//       } catch (e) {
//         throw e;
//       }
//     }
//
//     return dispatch({
//       type: 'appState/TOGGLE_THEME',
//     });
//   }
// }

export function toggleTheme(): Action {
  return {
    type: 'appState/TOGGLE_THEME',
  }
}
