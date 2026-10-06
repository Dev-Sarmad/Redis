# Site Banner APIs 

Whenever you visit some ecommerce site, any other sites which have discounts, coupons or some short lived important information for their specific users which hardly changes for a specific period of time we try to serve that specific information from the redis instead of the database because if we have thousands of visitiors daily which get information which is of discounts each time the requests goes to the database to avail it so we use redis which serves from the in-memory store not from the database.

We can store multiple type of values inside the key i.e strings, arrays, JSON and objects. 

