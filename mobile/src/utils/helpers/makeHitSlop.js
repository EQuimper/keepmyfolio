// @flow

import invariant from 'invariant';

type HitSlop = {
  top: number,
  bottom: number,
  left: number,
  right: number,
};

export function makeHitSlop(size: number): HitSlop {
  invariant(size, 'Size is required');

  return {
    top: size,
    bottom: size,
    left: size,
    right: size
  }
}
