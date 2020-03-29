const db = require('./db');
module.exports = {
    //根据用户名查找用户
    findUserByName: username => {
        return new Promise((resolve, reject) => {
            db.dbClient.collection('user').find({username:username}).limit(1).toArray((err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            })
        })
    }
}