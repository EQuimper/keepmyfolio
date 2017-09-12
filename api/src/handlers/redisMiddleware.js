// @flow

import redis from 'redis';
import Bluebird from 'bluebird';

import type { Middleware } from '../types';

import config from '../config';

Bluebird.promisifyAll(redis.RedisClient.prototype);
Bluebird.promisifyAll(redis.Multi.prototype);

redis.RedisClient.prototype.getJSONAsync = async function getJSONAsync(key) {
  const result = await this.getAsync(key);

  if (result) {
    return JSON.parse(result);
  }

  return null;
};

redis.RedisClient.prototype.setJSONAsync = async function setJSONAsync(
  key,
  value,
  ...args
) {
  return this.setAsync(key, JSON.stringify(value), ...args);
};

export default function(next: Middleware) {
  return async (evt: Object, context: Object) => {
    const newCtx = context;
    const client = redis.createClient({ url: config.redis.url });
    newCtx.redis = client;
    const result = await next(evt, newCtx);
    client.quit();
    return result;
  };
}
