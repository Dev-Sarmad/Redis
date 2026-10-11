import express from "express";
import { emailQueue } from "./queue.js";

const app = express();

app.use(express.json());

app.post("/send-welcome-email", async (req, res) => {
  const { email, name } = req.body;
  const job = await emailQueue.add(
    "send-welcome-email",
    { to: email, name },
    { attempts: 3, backoff: { type: "exponential", delay: 5000 } },
  );
  res.status(200).json({ message: "Job added to the queue", jobId: job.id });
});
 
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
