import express from "express";
import Redis from "ioredis";
import mongoose from "mongoose";
const app = express();

const redisClient = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379",
);

app.get("/redis", async (req, res) => {
  try {
    const reply = await redisClient.ping();
    res.json({ redis: reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/mongo", async (req, res) => {
  try {
    const url =
      process.env.MONGO_URL || "mongodb://localhost:27017/learn-redis";
    await mongoose.connect(url);
    res.json({
      mongo: "Connected to MongoDB",
      database: mongoose.connection.name,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})