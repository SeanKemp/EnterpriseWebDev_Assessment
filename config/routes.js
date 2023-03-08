const { log } = require('util');

module.exports = function(app){
    // Declaring and assigning routers
    var indexRouter = require('../routes/index');
    var loginRouter = require('../routes/login');
    var quotesRouter = require('../routes/quotes');
    var createQRouter = require('../routes/createQuote');
  
    // Redirecting path requests to routes
    app.use('/', indexRouter);
    app.use('/login', loginRouter);
    app.use('/quotes', quotesRouter);
    app.use('/createQuote', createQRouter);
  }