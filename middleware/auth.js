const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["authorisation"];

    if(!token){
        return res.status(403).send("A token is required for authentication");
    }
    try{
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.register = decoded;
    }catch(err){
        return res.status(401).send("invalid token");
    }
    return next();
};



module.exports = verifyToken;