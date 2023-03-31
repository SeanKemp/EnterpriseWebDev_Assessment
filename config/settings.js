const config={
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
    jwtSecret: process.env.JWT_SECRET || 'KEY_HERE',
    mongoUri: process.env.MONGO_HOST || 
        'mongodb://' + (process.env.IP || 'localhost') + ':' + 
        (process.env.MONGO_PORT || '27017')+'/' + 
        (process.env.NODE_ENV || 'development'),
    fudgeFactor: 1.15,
    userType: process.env.USER_TYPE || 'user'
    
}

//module.exports.port = 8080;
//module.exports.dbAdmin = "mongodb://dbAdmin:admin@127.0.0.1:27017";
//module.exports.testDBUser = "mongodb://RWUser:user98@127.0.0.1:27017/testDB";
//module.exports.prodDBUser = "mongodb://RWUser:user98@127.0.0.1:27017/prodDB";
//module.exports.fudgeFactor = 1.15; // Maybe shouldnt do this and should somehow do it as a random number

export default config; 