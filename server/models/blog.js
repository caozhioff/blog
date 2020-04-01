const db = require('./db');

module.exports = {
    blogList : (search, username) => {console.log(username)
        return new Promise((resolve, reject) => {
            var reg = new RegExp(search, "i");
            var _filter = {
                $and:[
                    {
                        $or: [
                            {title: {$regex: reg}},
                            {tags: {$regex: reg}}
                        ],
                    },
                    {
                        username:username,
                    }
                ]
                //多字段匹配
            }
            //跳过指定数量的数据
            //skip(skipNums).
            //指定从MongoDB中读取的记录条数。
            //limit(limitNums).
            //sort({createTime:-1}).
            db.dbClient.collection('blog').find(_filter).project({"content":0}).sort({time:-1}).toArray((err,docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            })
        })
    },
    blogByTitle: title => {
        return new Promise((resolve, reject) => {
            db.dbClient.collection('blog').find({title:title}).limit(1).toArray((err,doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    blogNew: (username) => {
        return new Promise((resolve, reject) => {
            db.dbClient.collection('blog').find({username}).sort({time:-1}).limit(1).toArray((err,doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    //上一篇，下一篇
    blogNext: (time,str,username) => {
        var filter = str == 1 ? {$gt:time} : {$lt:time};
        var sort = str == 1 ? {time:1} : {time:-1};
        return new Promise((resolve, reject) => {
            db.dbClient.collection('blog').find({"time":filter,username:username}).project({"content":0})
            .sort(sort).limit(1).toArray((err,doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            })
        })
    },
    //tags
    blogTags:(username) => {
        return new Promise((resolve, reject) => {
            db.dbClient.collection('blog').find({username:username}).project({"tags":1,_id:0}).toArray((err,tags) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(tags);
                }
            })
        })
    }
}