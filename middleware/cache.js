const redis = require("redis");
const client = redis.createClient();

function checkCache(req, res, next) {
  let { location } = req.body;

  if (!location) {
    location = 'nyc';
  }

  location = location.toLowerCase();

  req.location = location;
  next();
}

module.exports = checkCache;