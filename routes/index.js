const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("config");

const checkCache = require("../middleware/cache");

router.post('/get_businesses', checkCache, (req, res) => {
  let location = req.location;

  console.log(location);

  location = location.replace(' ', '+');

  let yelpURL = 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=' + location

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
      res.json(names);
    })
    .catch(e => {
      res.status(400).json({
        errorMessage: 'API call failed'
      })
    })
})

module.exports = router