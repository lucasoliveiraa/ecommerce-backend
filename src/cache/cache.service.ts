import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCache<T>(key: string, fnRequestCache: () => Promise<T>): Promise<T> {
    const cache: T = await this.cacheManager.get(key);

    if (cache) {
      return cache;
    }

    const responseCache: T = await fnRequestCache();

    await this.cacheManager.set(key, responseCache);

    return responseCache;
  }
}
