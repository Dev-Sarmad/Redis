# Setup Locally Redis 

Inorder to run redis locally we have to setup redis via  a docker container 
so we spin up the redis container by providing the config inside the docker compose file. 

1- For redis we pull the alpine redis which is a light weight image of redis have minimum but essential features to work with.

2- Redis runs on port 6379 so we have mapped it on same as container one.

3- We also have setup volumes for persistent of data when we stop or remove the containers


We have done the same things for setup mongodb database.