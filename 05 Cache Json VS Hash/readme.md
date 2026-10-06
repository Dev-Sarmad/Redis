# Cache JSON vs Hash

There are the methods we have mentioned earlier for saving a certain value inside Redis, i.e. `redis.set()` in the form of `key:value`. But the problem is that `set()` stores a single variable, and in `set()` we cannot update the value once we have saved it—we can only replace it. There comes a new method called `hSet()`.

`hSet()` stores the object, and we can update that later, whereas in `set()` we cannot.

```text
Key
user:1

Fields

name -> Sarmad
age  -> 24
city -> Karachi
```

Each field is stored separately instead of as one value.

* `hGet()` gets a single value (field).
* `hDel()` deletes a single value (field).
* `hGetAll()` gets the entire object.

The data stored in Redis by the `set()` method is a string. Inside Redis, we cannot update the string—we can only replace it.

```text
Key
user:1

Value

{"name":"Sarmad","age":22,"city":"Karachi"}
```

To get/read it:

```javascript
JSON.parse(await redis.get("user:1"));
```

Everything is stored as one string.
