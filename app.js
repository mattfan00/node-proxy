const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const indexRoutes = require("./routes/index");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(indexRoutes);

app.listen(3000, () => {
  console.log("started node-proxy server");
})
