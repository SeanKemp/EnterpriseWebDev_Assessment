import userRoutes from '../routes/user.routes.js'
import authRoutes from '../routes/auth.routes.js'
import quoteRoutes from '../routes/quote.routes.js'
import config from './config.js'

const router = function(app){
  
    // Redirecting path requests to routes
    

    app.use('/', authRoutes);
    app.use('/', userRoutes);
    app.use("/api/users", function(req, res, next) {
      //res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Origin", "http://localhost:" + config.port); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    });
    app.use('/', quoteRoutes);
    app.use("/api/quote", function(req, res, next) {
      //res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Origin", "http://localhost:" + config.port); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    });
    
  }

  export default router; 