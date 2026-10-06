# OTP with Redis (Node.js)
One-Time Passwords (OTPs) are short-lived codes, typically valid for **30–60 seconds**.

Instead of storing them in a database, we store OTPs in **Redis** because it is fast and supports automatic expiration (TTL).

The typical OTP flow is:
1. Generate an OTP.
2. Store it in Redis with an expiration time.
3. Verify the OTP when the user submits it.
4. Delete or let Redis automatically expire the OTP.
---

## Setup Redis

```js
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
```

---

## Generate a Redis Key

Store each OTP with a unique key.

```js
function otpKey(phone) {
  return `otp:${phone}`;
}
```

Example:

```text
otp:03001234567
```

---

## Send OTP

Generate a 6-digit OTP and store it in Redis with a **30-second expiration**.

```js
app.post("/send-otp", async (req, res) => {
  const { phone } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await redis.set(otpKey(phone), otp, "EX", 30);

  res.json({
    message: "OTP sent successfully",
    otp,
  });
});
```

Redis command:

```text
SET otp:03001234567 123456 EX 30
```

---

## Verify OTP

Retrieve the OTP from Redis and compare it with the user's input.

```js
app.post("/verify-otp", async (req, res) => {
  const { phone, otp } = req.body;

  const savedOtp = await redis.get(otpKey(phone));

  if (!savedOtp) {
    return res.status(400).json({
      message: "OTP expired or not found",
    });
  }

  if (savedOtp !== otp) {
    return res.status(400).json({
      message: "Invalid OTP",
    });
  }

  await redis.del(otpKey(phone));

  res.json({
    message: "OTP verified successfully",
  });
});
```

After successful verification, the OTP is deleted so it cannot be reused.

---

## Check Remaining Time (TTL)

Redis can tell us how many seconds are left before the OTP expires.

```js
app.get("/otp/:phone/ttl", async (req, res) => {
  const { phone } = req.params;

  const ttl = await redis.ttl(otpKey(phone));

  res.json({ ttl });
});
```

Example response:

```json
{
  "ttl": 18
}
```

---

## Flow

```text
User requests OTP
        │
        ▼
Generate 6-digit OTP
        │
        ▼
Store in Redis (TTL = 30 sec)
        │
        ▼
User enters OTP
        │
        ▼
Get OTP from Redis
        │
   ┌────┴────┐
   │         │
Match?      No Match
   │         │
Delete OTP  Return Error
   │
Success
```

---

## Redis Commands Used

| Command | Purpose |
|---------|---------|
| `SET key value EX 30` | Store OTP with expiration |
| `GET key` | Retrieve OTP |
| `DEL key` | Delete OTP after verification |
| `TTL key` | Check remaining expiration time |

---