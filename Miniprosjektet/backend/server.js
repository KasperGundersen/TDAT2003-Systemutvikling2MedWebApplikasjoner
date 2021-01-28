//@flow
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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods"
  );
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
  next();
});

require("./router")(app, pool);

app.listen(8080, () => console.log("Server is running"));
