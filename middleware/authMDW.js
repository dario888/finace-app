const jwt = require('jsonwebtoken');
require('dotenv').config();



module.exports = (req, res, next) => {
    //get token from header
    const token = req.header('x-auth-token') 

    if(!token)return res.status(401).json({msg: 'No token, authorization denied'});

    try {
        const decoded = jwt.verify(token, process.env.JWT);
        req.user = decoded.user; // payload {user: {id: user.id} }
        next();

    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}