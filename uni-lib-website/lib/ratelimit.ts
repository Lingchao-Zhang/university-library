import { Ratelimit } from "@upstash/ratelimit"; 
import { redis } from "./redis";

// Create a new ratelimiter, that allows 1 requests per 1min
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, "1m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});