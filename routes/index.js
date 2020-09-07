const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("config");

const redis = require("redis");
const client = redis.createClient();

const checkCache = require("../middleware/cache");

router.post('/get_businesses', checkCache, (req, res) => {
  let location = req.location;

  let locationURL = location.replace(' ', '+');

  let yelpURL = 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=' + locationURL 

  axios({
    method: 'GET', 
    url: yelpURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + config.get('yelpKey') 
    } 
  })
    .then(result => {
      names = result.data.businesses.map(business => business["name"]);
      client.rpush(location, names);
      client.expire(location, 5);
      res.json(names);
    })
    .catch(e => {
      res.status(400).json({
        errorMessage: 'API call failed'
      })
    })
})

module.exports = router