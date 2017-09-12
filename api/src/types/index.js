// @flow

export type Middleware = (event: Object, context: Object) => Promise<any>;

type Redis = {
  getAsync: (key: string) => Promise<?string>,
  setAsync: (key: string, value: string, ...args: any) => Promise<void>,
  getJSONAsync: (key: string) => Promise<?Object>,
  setJSONAsync: (key: string, value: Object, ...args: any) => Promise<void>,
};

export type Context = {
  redis: Redis,
};
