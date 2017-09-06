// @flow

import { combineReducers } from 'redux';

import nav from './navigation';
import entities from './entities';

export default combineReducers({
  nav,
  entities
});