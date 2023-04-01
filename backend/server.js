import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import config from './config/config.js'
import router from './config/routes.js'
import database from './modules/database.js'

const app = express();

const __dirname = path.resolve('../');
console.log(__dirname);

var options = {
  index: "index.html"
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var dir = path.join(__dirname, '/frontend/build/');

/// Some other code with the api paths might go in here. 

app.use(express.static(dir, options));

router(app);
app.get('*', (req, res) => res.sendFile(path.join(dir, 'index.html')));

app.use((req, res, next) => {
  res.status(404).send("Error 404: Can't find that page")
});


app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  }else if (err) {
    res.status(400).json({"error" : err.name + ": " + err.message})
    console.log(err)
  }
})

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
});
