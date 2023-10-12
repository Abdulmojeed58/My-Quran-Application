import { createClient, RedisClientType } from 'redis';
import { logger } from '@/lib/logger';
import { Config } from '@/utils/constants';

let client = null as unknown as RedisClientType;

let isRedisConnected = false;
export let isRedisReady = false;

export async function connectRedis() {
    try {
        if (!client || !isRedisConnected) {
            client = createClient({
                url: process.env.REDIS_URL,
                pingInterval: 500,
            });

            await client.connect();
            isRedisConnected = true;
            isRedisReady = true;

            logger.info('Redis connected successfully');
        }

        client.on('error', (error) => logger.error(error, 'Redis Client Error'));
        return client;
    } catch (error) {
        console.log('not connected');
        logger.error(error, '[connectRedis] redis is not connected');
        return null;
    }
}

type CacheOptions = {
    expiry?: number;
};

type Data = any;

export async function addToCache(
    key: string,
    data: Data,
    options?: CacheOptions
): Promise<void> {
    try {
        const payload = JSON.stringify(data);

        await client.set(key, payload, {
            EX: options?.expiry,
        });
    } catch (error) {
        console.error('[GetFromCache]', error);
        logger.error('[AddToCache]', error);
    }
}

export async function getFromCache(key: string): Promise<Data | null> {
    try {
        const result = await client.get(key);
        if (!result) return null;

        return JSON.parse(result) as Data;
    } catch (error) {
        console.error('[GetFromCache]', error);
        logger.error('[AddToCache]', error);
        return null;
    }
}