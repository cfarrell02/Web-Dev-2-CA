// use javascript in strict mode
"use strict";

// import all required modules
const express = require("express");
const logger = require("./utils/logger");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const about = require("./controllers/about.js")

// initialise project
const app = express();

// static files output to public folder
app.use(express.static("public"));

// use bodyParser, cookieParser, fileUpload
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

// use handlebars as view engine
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main",
    helpers: {
      //helpers go here
      formatDate: function(date) {
        let dateCreated = new Date(date);
        let day = dateCreated.getDay();
        let dateNum = dateCreated.getDate();
        let month = dateCreated.getMonth();
        let year = dateCreated.getFullYear();
        let hour = dateCreated.getHours() + 1;
        let minute = dateCreated.getMinutes();
        
        let days = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"]
        let months = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]
        let monthName = months[month];
        let dayName = days[day];
        
        return `${dayName}, ${dateNum} ${monthName}, ${year} at ${hour}:${minute}`
        
      },
      ifEquals: function(arg1, options) {
        
    return (arg1 == about.loggedInUser.id) ? options.fn(this) : options.inverse(this);
      },
      renderPartial: function(partialName, options) {
    if (!partialName) {
        console.error('No partial name given.');
        return '';
    }
    var partial = exphbs.partials[partialName];
    if (!partial) {
        console.error('Couldnt find the compiled partial: ' + partialName);
        return '';
    }
    return new exphbs.SafeString( partial(options.hash) );
}
    }
  }))

app.set("view engine", ".hbs");

// import routes file and use this for routing
const routes = require("./routes");
app.use("/", routes);

// listen for requests :)
const listener = app.listen(process.env.PORT || 4000, function() {
  logger.info("Your app is listening on port " + listener.address().port);
});