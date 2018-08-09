var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 3000;

//middleware that parses results
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//we need these routes!
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//start server
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});