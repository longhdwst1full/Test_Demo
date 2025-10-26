import { createClient, RedisClientType } from "redis";
import dotenv from "dotenv";

dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const REDIS_PORT = parseInt(process.env.REDIS_PORT || "6379", 10);

const client: RedisClientType = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

export async function connect() {
  if (!client.isOpen) {
    await client.connect();
  }
}

export async function get(key: string): Promise<string | null> {
  await connect();
  const val = await client.get(key);
  return val;
}

export async function set(
  key: string,
  value: string,
  ttlSeconds?: number
): Promise<void> {
  await connect();
  if (ttlSeconds) {
    await client.set(key, value, { EX: ttlSeconds });
  } else {
    await client.set(key, value);
  }
}

export { client };
