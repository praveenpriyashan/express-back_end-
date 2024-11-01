const jwt = require('jsonwebtoken')
const secretKey = 'mysecretkey123456789';
const bcrypt = require('bcrypt')


//generateJwtToken
const generateJwtToken = (payload) => {
    return jwt.sign(payload, secretKey, {expiresIn: '12h'})
}


//validateJwtToken
const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('unauthorized req not include in the token')
    }
    token = token.replace('Bearer ', '');
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(401).send('unauthorized token not verified')
        }
        req.user = user;
        next();
    })
}

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}
const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash)
}
module.exports = {generateJwtToken, verifyToken, hashPassword, comparePassword}

