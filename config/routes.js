import indexRouter from '../routes/index.js'
import loginRouter from '../routes/login.js'
import quotesRouter from '../routes/quotes.js'
import createQRouter from '../routes/createQuote.js'
import userRoutes from './user.routes.js'
import authRoutes from './auth.routes.js'

const router = function(app){
    // Declaring and assigning routers

  
    // Redirecting path requests to routes
    app.use('/', userRoutes);
    app.use('/', authRoutes);
    app.use('/', indexRouter);
    app.use('/login', loginRouter);
    app.use('/quotes', quotesRouter);
    app.use('/createQuote', createQRouter);
  }

  export default router; 