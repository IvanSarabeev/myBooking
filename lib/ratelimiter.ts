import { Ratelimit } from "@upstash/ratelimit";
import redis from "@/lib/redis";

const ratelimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default ratelimiter;
