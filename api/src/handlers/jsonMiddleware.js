// @flow

import type { Middleware } from '../types';

export default function jsonMiddleware(next: Middleware) {
  return async (evt: Object, context: Object) => {
    const newEvt = evt;
    try {
      newEvt.body = JSON.parse(evt.body);
    } catch (error) {
      throw new Error(`Error parsing body. ${error.toString()}`);
    }
    const body = await next(newEvt, context);
    return JSON.stringify(body);
  }
}
