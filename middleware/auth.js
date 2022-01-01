const jwt = require('jsonwebtoken');
JWT_SECRET = 'd8cd5cd30af19bcf07b59d5661a0690db51d5c95167a94d60e286d38ac05907fa';




const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if(!token){
        return res.status(403).send("A token is required for authentication");
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded;

    }catch(err){
        return res.status(401).send("invalid token");
    }
    return next();
};



module.exports = verifyToken;

/*
try{
    var  { token } = req.body;

    const user = jwt.verify(token, JWT_SECRET);

    console.log(user);
}catch(err){
    console.log(err)
}
*/