import Redis from "ioredis";

const subscriber = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

subscriber.subscribe("notifications", (error) => {
  if (!error) {
    console.log("Subscribed to notifications channel successfully!");
  }
  return error;
});

subscriber.on("message", (channel, message) => {
  console.log(`Received message from ${channel}:${JSON.parse(message)}`);
});
