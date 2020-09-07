const redis = require("redis");
const client = redis.createClient();

function checkCache(req, res, next) {
  let { location } = req.body;

  if (!location) {
    location = 'nyc';
  }

  location = location.toLowerCase();
  // client.flushdb();

  console.log(location);
  client.lrange(location, 0, -1, (err, results) => {
    if (results.length == 0) {
      req.location = location;
      console.log("call api");
      next();
    } else {
      console.log("access cache");
      return res.json(results);
    }
  })
}

module.exports = checkCache;