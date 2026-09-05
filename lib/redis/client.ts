import Redis from "ioredis";

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

export const getRedisClient = (): Redis => {
  if (!globalForRedis.redis) {
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
    globalForRedis.redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });
  }
  return globalForRedis.redis;
};

export default getRedisClient;
