const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Credentials', true);
    }
    //another way to do this is to use a regex to match the origin
    // if(origin && origin.match(/localhost/)){
    //     res.header('Access-Control-Allow-Credentials', true);
    // }
    next();
}

module.exports = credentials;