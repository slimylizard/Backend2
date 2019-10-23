const jwt = require('jsonwebtoken');
const secrets = require('../auth/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ message: 'You Shall Not Pass!'});
            } else {
                req.username = decodedToken.username
                next();
            }
        });
    } else {
        res.status(400).json({ error: 'No Authorization Token Provided' })
    }
};