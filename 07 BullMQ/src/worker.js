import { Worker } from "bullmq";
import { connection } from "./queue.js";

const worker = new Worker(
  "emails",
  async (job) => {
    //inside the callback function we write the business logic for processing the job
    console.log(`Processing job ${job.id} with data:`, job.data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async work
    console.log(`Job ${job.id} completed`);
  },
  { connection },
);


// there are multiple events bullmq offer  that we can listen to on the worker instance. For example, we can listen to the "completed" event to know when a job has been processed successfully, or the "failed" event to know when a job has failed.
worker.on("completed", (job) => {
  console.log(`Job ${job.id} has been completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} has failed with error:`, err);
});
