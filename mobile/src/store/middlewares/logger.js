// @flow

import { createLogger } from 'redux-logger';

export default createLogger({
  collapsed: true,
  predicate: (getState, { type }) => {
    // List of action type we don't want to log in the console
    const blacklist = [
      'Navigation/NAVIGATE',
      'Navigation/BACK'
    ];

    return blacklist.every(i => i !== type);
  },
});
