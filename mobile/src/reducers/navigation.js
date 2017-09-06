// @flow

import { router } from '../navigations';

import type { NavigationState, NavigationAction } from '../types';

export default (state: NavigationState, action: NavigationAction) => {
  const newState = router.getStateForAction(action, state);
  return newState || state;
}
