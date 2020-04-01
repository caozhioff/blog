var MongoClient = require('mongodb').MongoClient

const {dbConfig} = require('../config.js')

class Db {
    static getInstance(){
        if (!Db.instance) {
            Db.instance = new Db()
        }

        return Db.instance
    }

    constructor() {
        this.dbClient = ''//db对象
        this.connect()
    }

    connect() {//连接数据库
        let that = this;
        return new Promise((resolve, reject) => {
            if (!that.dbClient) {//单例
                MongoClient.connect(dbConfig.connectUrl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, (err, client) => {
                    if (err) {
                        reject(err)
                    } else {
                        that.dbClient = client.db(dbConfig.database)
                        resolve(that.dbClient)
                    }
                })
            } else {
                resolve(that.dbClient)
            }
        })
    }

    find(collectionName) {//findAll
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).find().toArray((err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            })
        })
    }

    findWhere(collectionName,where) {//findbyconditioon
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).find(where).limit(1).toArray((err, result) => {
                    if (err) {
                        reject(err)
                    } else {console.log(result);
                        resolve(result)
                    }
                })
            })
        })
    }

    insert(collectionName, data) {//新增
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).insertOne(data, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            })
        })
    }

    update(collectionName,whereOptions,data) {//编辑
        return new Promise((resolve) => {
            this.connect().then((db) => {
                let r = db.collection(collectionName).updateOne(whereOptions,{$set:data});
                resolve(r);
            })
        })
    }
}

module.exports = Db.getInstance()