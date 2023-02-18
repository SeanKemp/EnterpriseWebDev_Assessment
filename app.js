var express = require('express');
const { MongoClient } = require("mongodb");
var indexRouter = require('./routes/index');
var settings = require('./config/settings');

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
require('./config/routes.js')(app);

app.use(express.static('public'));

app.use((req, res, next) => {
  res.status(404).send("Error 404: Can't find that page")
});

app.listen(settings.port, () => {
  console.log(`Example app listening on port ${settings.port}`)
});
