import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const queueKey = "queue:emails";

app.post("/emails", async (req, res) => {
  const job = {
    to: req.body.to,
    subject: req.body.subject || "No Subject",
    body: req.body.message,
    createdAt: new Date().toISOString(),
  };
  await redis.lpush(queueKey, JSON.stringify(job));
  res.json({ queued: true, job });
});

app.get("/email-process", async (req, res) => {
  const rawJob = await redis.rpop(queueKey);
  if (!rawJob) {
    return res.json({ message: "No jobs in the queue" });
  }
  const job = JSON.parse(rawJob);
  // Simulate email sending
  console.log(`Sending email to: ${job.to}, subject: ${job.subject}`);
  res.json({ sent: true, job });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
