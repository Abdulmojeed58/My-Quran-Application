import { createClient } from "redis";
import { logger } from "@/lib/logger";
import { Config } from "@/utils/constants";

export const client = createClient({
  password: Config.redisPassword,
  socket: {
    host: Config.redisHost,
    port: Number(Config.redisPort),
  },
});

// client.on("error", (err: any) => {
//   console.log(err);
//   logger.error(err, "Redis Client Error");
// });

client.on("error", (error) => logger.error(error, "Redis Client Error"));

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
    console.error("[GetFromCache]", error);
    logger.error("[AddToCache]", error);
  }
}

export async function getFromCache(key: string): Promise<Data | null> {
  try {
    const result = await client.get(key);
    if (!result) return null;

    return JSON.parse(result) as Data;
  } catch (error) {
    console.error("[GetFromCache]", error);
    logger.error("[AddToCache]", error);
    return null;
  }
}
