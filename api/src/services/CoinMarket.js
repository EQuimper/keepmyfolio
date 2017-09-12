// @flow

import fetch from 'isomorphic-fetch';

import type { Context } from '../types';

import config from '../config';

const CACHE_KEY = 'coinmarket:0';

async function getFromCache(ctx: Context) {
  const cache = await ctx.redis.getJSONAsync(CACHE_KEY);

  if (cache && cache.expires > Date.now()) {
    return cache.value;
  }

  return null;
}

export async function getCryptos(ctx: Context, limit: number) {
  let result = await getFromCache(ctx);

  if (!result) {
    result = await fetch(`${config.COIN_MARKET_API}/ticker/?limit=${limit}`);
    result = await result.json();
    ctx.redis.setJSONAsync(CACHE_KEY, {
      expires: Date.now() + 1000 * 60 * 5,
      value: result,
    });
  }

  return result;
}
