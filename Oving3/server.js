var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
app.use(bodyParser.json());


var pool = mysql.createPool({
  connectionLimit: 2,
  host: "host",
  user: "username",
  password: "password",
  database: "database",
  debug: false
});

require('./router')(app, pool);
app.listen(8080, () => console.log('Server is running'))
