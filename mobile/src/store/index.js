// @flow

import { applyMiddleware, createStore } from 'redux';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { autoRehydrate } from 'redux-persist-immutable';

import rootReducer from '../reducers';
import logger from './middlewares/logger';

const middlewares = __DEV__ ? [thunk, logger] : [thunk];

const initialState = new Map();

export default createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares), autoRehydrate()),
);
