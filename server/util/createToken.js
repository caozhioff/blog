const jwt = require('jsonwebtoken')

const secret = 'cz1314xm'

const expire = 60*60*24;

module.exports = {
    getToken: payload => {//生成token
        return jwt.sign(payload, secret, {expiresIn:expire})
    },
    verifyToken: token => {//解码token
        try {
            return jwt.verify(token, secret);
        } catch (e) {
            return null;
        }
    }
}