import userRoutes from '../routes/user.routes.js'
import authRoutes from '../routes/auth.routes.js'
import quoteRoutes from '../routes/quote.routes.js'
import ratesRoutes from '../routes/rates.routes.js'
import config from './config.js'

const router = function(app){
  
    // Redirecting path requests to routes and allowing CORS
    app.use('/', authRoutes);
    app.use('/', userRoutes);
    app.use("/api/users", function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:" + config.port); 
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    });
    app.use('/', quoteRoutes);
    app.use("/api/quote", function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:" + config.port); 
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    });
    app.use('/', ratesRoutes);
    app.use("/api/rates", function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:" + config.port); 
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    });
    
  }

  export default router; 