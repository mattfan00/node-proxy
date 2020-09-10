# node-proxy

This is simple Node.js API proxy that uses caching (with redis) and rate limiting. 

It only has one POST endpoint `/get_businesses` which takes in the field `location` in its body and calls the Yelp API to return the names of restaurants near that location. By default, the location is "nyc".

## Setup

1. Use `npm install` to get the dependencies
1. This project utilizes a `config` file to store the Yelp API key, the rate limiting (in seconds), and cache expire time (in seconds). Create a directory called config and a file called default.json within it. Below is an example of the contents in default.json

      ```js
      {
        "yelpKey": "your_api_key",
        "rateLimit": 30,
        "expireTime": 5
      }
      ```

1. Start the redis server with `redis-server`
1. Start the proxy server with `nodemon` by using `npm run start`
