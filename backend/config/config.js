const config={
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    jwtSecret: process.env.JWT_SECRET || 'KEY_HERE',
    mongoUri: process.env.MONGO_HOST || 
        'mongodb://' + (process.env.IP || 'localhost') + ':' + 
        (process.env.MONGO_PORT || '27017')+'/' + 
        (process.env.NODE_ENV || 'development'),
    fudgeFactor: 1.15,
    webAuth: process.env.WEB_AUTH || 'user'
    
}


export default config; 