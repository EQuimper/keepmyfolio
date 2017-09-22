// @flow

import { combineReducers } from 'redux-immutable';

import nav from './navigation';
import app from './app';
import cryptos from './cryptos';

export default combineReducers({
  nav,
  app,
  cryptos,
});
