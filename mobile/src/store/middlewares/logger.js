// @flow

import { createLogger } from 'redux-logger';

export default createLogger({
  collapsed: true,
  predicate: (getState, { type }) => {
    const blacklist = [];

    return blacklist.every(i => i !== type);
  },
});
