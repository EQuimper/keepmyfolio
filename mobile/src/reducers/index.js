// @flow

import { combineReducers } from 'redux';

import nav from './navigation';
import app from './app';

export default combineReducers({
  nav,
  app
});
