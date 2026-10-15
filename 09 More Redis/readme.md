There are some other commands which are also usefull and are used in a production application based on a use case. 

INCR
This command increments the value by one. It increments the value based on a key, let suppose you have a key called views. When you do INCR views it automatically increases the value by one. It inly works on integers. This is a better approach beacause innstead we have to do something like this.

Imagin a secanrio in which a user visit the page and each time someone visit we have to update or increment the count.

get visit
10
set visit 1
visit = visit + 1
get visit
11

Here if we have thousands of users visit at the same time. 2 users reads same 10 visits value then inrement by one. so the result could be 11 instead of 12.

Practical use case would be:
counting of site views, downloads, api usage, login attemps.

Redis Sorted sets
Redis stores the member as well as a score in a sorted order. Let suppose you are building a leaderboard of the game and inside that board the score is unsorted so you have to manually sort them filter them and re rank them so redis comes up with a solution called sorted sets in which we just insert the member+score the redis automaticallly will sort the memebers based upon the score we dont have to do things manually via array

ZADD leaderboard 12 sarmad
ZADD leaderboard 17 kazakh
ZADD leaderboard 19 ingush

SO redis automatically sort them we just have to insert the member+score

ZINCRBY 
It updated the member's score and sort it without it we have to find the user update score sort the array again find new rank and return players with updated leaderboard 

ZINCRBY <leaderboard> <points_to_add> <player>
ZINCRBY leaderboard 250 Ali

If we do manually then 
Request comes
      |
      ↓
Application server
      |
      ↓
Database query
      |
      ↓
Find user score
      |
      ↓
Update score
      |
      ↓
Commit transaction
      |
      ↓
Sort leaderboard
      |
      ↓
Return result

Database writes become heavy: one million users and 50,000 score updates every seconds your database does UPDATE players SET score = score + 10 constantly.

Sorting is expensive: Every time the score updates you have to sort score.  ORDER BY score DESC
LIMIT 100

ZREVRANK
Suppose the player want to know about the rank. Player gets 
ZREVRANK leaderbaord ali. It returns the index because redis uses zero based indexing. 

ZREVRANGE
It is used for geting the top results on a sorted set
ZREVRANGE 0 2 it will give us top 3 players
