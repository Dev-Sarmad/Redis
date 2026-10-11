import Redis from "ioredis";
import express from "express";
const app = express();
app.use(express.json());

const publisher = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.post("/notifications", async (req, res) => {
  const payload = {
    title: req.body.title,
    message: req.body.message,
    createdAt: new Date().toISOString(),
  };
  const recievers = await publisher.publish(
    "notifications",
    JSON.stringify(payload),
  );
  res
    .status(200)
    .json({ message: "Notification sent successfully!", recievers });
});

app.listen(3000, () => {
  console.log("app service is running on port 3000");
});
