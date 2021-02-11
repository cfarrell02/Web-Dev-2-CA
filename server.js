// use javascript in strict mode
'use strict';

// import all required modules
const logger = require('./utils/logger');
const express = require("express");
const exphbs = require('express-handlebars');

// initialise project
const app = express();

// static files output to public folder
app.use(express.static("public"));

// use handlebars as view engine
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
}));
app.set('view engine', '.hbs');

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  logger.info("Your app is listening on port " + listener.address().port);
});