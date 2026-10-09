# Redis as Queue

User
   |
Upload Video
   |
Express API
   |
Save Video Info
   |
Redis Queue
   |
-----------------------------
|          |               |
Worker 1   Worker 2      Worker 3
   |          |              |
Compress   Generate      AI Moderation
Thumbnail

The API returns immediately.

Redis stores jobs.

Workers process jobs one by one.

This is exactly why Redis queues exist.

Redis can be used as a background queue. Redis have a list architecture which can be used as a queue. From the left side of the list job is entered and on a right side it would be pop out the job. These tasks are done manually inside the redis. 

The job can be any i.e send email/images/files, video/audio processing it can be anything useful.

There are some drawbacks here
There is a job loss and no retry mechanism which means that if the worker takes the job and job is removed from the queue then let suppose there was a internal server error which cause the problem to no execute job so how can we retry the job although untill here is job poped out from the  list queue.
