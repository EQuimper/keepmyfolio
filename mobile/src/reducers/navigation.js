// @flow

import { router } from '../navigations';

/**
 * TYPES
 */
import type { NavigationState, NavigationAction } from '../types';

export default function navigationReducer(
  state: NavigationState,
  action: NavigationAction,
) {
  const newState = router.getStateForAction(action, state);
  return newState || state;
}
