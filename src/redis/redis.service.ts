import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async set(key: string, value: any, expireTime?: number): Promise<void> {
    if (expireTime) {
      await this.redis.set(key, JSON.stringify(value), 'EX', expireTime);
    } else {
      await this.redis.set(key, JSON.stringify(value));
    }
  }

  async get(key: string): Promise<any> {
    const value = await this.redis.get(key);
    return JSON.parse(value);
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async keys(pattern: string): Promise<string[]> {
    return await this.redis.keys(pattern);
  }
}
