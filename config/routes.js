const { log } = require('util');

module.exports = function(app){
    // Declaring and assigning routers
    var indexRouter = require('../routes/index');
    var loginRouter = require('../routes/login');
  
    // Redirecting path requests to routes
    app.use('/', indexRouter);
    app.use('/login', loginRouter);
  }