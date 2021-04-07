// use javascript in strict mode
'use strict';

// import all required modules
const logger = require('./utils/logger');
const express = require("express");
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

// initialise project
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(cookieParser());

// static files output to public folder
app.use(express.static("public"));

// use handlebars as view engine
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
}));
app.set('view engine', '.hbs');

// import routes file and use this for routing
const routes = require('./routes');
app.use('/', routes);

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  logger.info("Your app is listening on port " + listener.address().port);
});