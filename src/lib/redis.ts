import { createClient } from "redis";

export const redis = createClient({
  url: "redis://:mypassword@localhost:6379",
  database: 1,
});

redis.connect();
