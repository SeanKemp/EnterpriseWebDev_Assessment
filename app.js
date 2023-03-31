import express from 'express'
import bodyParser from 'body-parser'
import settings from './config/settings.js'
import router from './config/routes.js'
import database from './modules/database.js'

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
router(app);

app.use(express.static('public'));

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

app.listen(settings.port, () => {
  console.log(`Example app listening on port ${settings.port}`)
});
