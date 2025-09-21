import { Redis } from "@upstash/redis";
import config from "@/lib/env.config";

const {
  env: {
    upstash: { redisUrl, redisToken },
  },
} = config;

if (!redisUrl || !redisToken)
  throw new Error(
    "Redis URL or token is not defined. Please check your environment variables.",
  );

const redis = new Redis({
  url: redisUrl,
  token: redisToken,
});

export default redis;
