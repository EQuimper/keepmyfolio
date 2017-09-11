// @flow

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

const middlewares = [thunk];

if (__DEV__) {
  middlewares.push(createLogger());
}

export default createStore(
  rootReducer,
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
