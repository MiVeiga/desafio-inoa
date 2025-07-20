import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 * 60 });

export function getCachedData(key: string) {
  return cache.get(key);
}

export function setCache(key: string, value: any) {
  cache.set(key, value);
} 