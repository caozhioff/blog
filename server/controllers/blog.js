const Db = require('../models/db')

const blogModel = require('../models/blog')

const Util = require('../util/util')

module.exports = {
    //新增
    add: async (ctx) => {
        let {username,title, tags, content} = ctx.request.body;
        let time = parseInt(new Date().getTime() / 1000);
        let data = {
            username,
            title,
            tags,
            content,
            time
        }

        let result = await Db.insert('blog',data);
        if (result.result.ok) {
            ctx.response.body = { code: '001',msg:'添加成功'}
            return;
        } 

        ctx.response.body = { code:'002' , msg:result.message };
    },

    //列表
    list: async (ctx) => {
        let list = await blogModel.blogList(ctx.request.query.search, ctx.request.query.username);
        if (list) {
            for(let i=0;i<list.length;i++) {
                list[i].time = Util.timeToDate(list[i].time)
            }
        }
        ctx.response.body = {code:'001', msg:'', data:list}
    },

    //详情
    detail: async (ctx) => {
        var detail = await blogModel.blogByTitle(ctx.request.query.title);

        if (detail.length == 0) {
            ctx.response.body = {code:'002', msg:'博文不存在或被删掉拉拉'}
            return;
        }

        detail = detail[0];

        let nextBlog = await blogModel.blogNext(detail.time,1);
        let preBlog = await blogModel.blogNext(detail.time,-1);

        detail.time = Util.timeToDate(detail.time);
        ctx.response.body = {code:'001',msg:'',data:[
            detail,
            nextBlog[0],
            preBlog[0]
        ]}
    },
    //获取标签列表
    getTags: async (ctx) => {
        var tags = [];
        var result = await blogModel.blogTags(ctx.request.query.username);
        if (result) {
            for(let i=0;i<result.length;i++) {
                let tagsStr = result[i].tags;
                let tagsArr = tagsStr.split(',');
                tagsArr.forEach((item) => {
                    tags.push(item);
                })
            }
            tags = Util.unique(tags)
        }

        ctx.response.body = {code:'001',msg:'',data:tags}
    },
    //获取最新的一篇博文，首页展示
    new: async (ctx) => {
        let username = ctx.request.query.username;
        var detail = await blogModel.blogNew(username);
        if (detail.length == 0) {
            ctx.response.body = {code:'001',msg:'',data:[]}
            return
        }
        detail = detail[0];

        let preBlog = await blogModel.blogNext(detail.time,-1,username);

        detail.time = Util.timeToDate(detail.time);
        ctx.response.body = {code:'001',msg:'',data:[
            detail,
            preBlog[0]
        ]}
    },
}