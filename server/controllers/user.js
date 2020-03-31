const Db = require('../models/db.js')

const Captcha = require('captchapng2')

const userModel = require('../models/user')

const crypto = require('../util/crypto')

const createJwt = require('../util/createToken')

module.exports = {
    /**
     * 注册
     */
    register: async (ctx, next) => {
        let { username,password,email } = ctx.request.body;

        let res = await userModel.findUserByName(username);
    
        //验证用户名
        if (res.length > 0) {
            ctx.response.body = { code: '002',msg:'用户名已存在'}
            return;
        }

        //密码加密
        password = crypto.genPassword(password);
        try {
            let data = {
                username,
                password,
                email
            }
            let result = await Db.insert('user',data);
            if (result.result.ok) {
                ctx.response.body = { code: '001',msg:'注册用户成功'}
                return;
            } 

            ctx.response.body = { code:'002' , msg:result.message };
        } catch (e) {
            ctx.throw(e);
        }
    },

    getCaptcha(ctx, next) {
        let rand =  parseInt(Math.random()*9000 + 1000);
        //ctx.session.v_code = rand+'';

        let png = new Captcha(80, 30, rand); // width,height, numeric captcha
        ctx.body = png.getBuffer();
        next();
    },

    //检测用户是否存在
    userExist: async (ctx,next) => {
        let { username } = ctx.request.body;
        try {
            let result = await userModel.findUserByName(username);
            if (result.length == 0) {
                ctx.response.body = {code:'001', msg:'用户不存在'}
            } else {
                ctx.response.body = {code:'002', msg:'用户名已存在'}
            }

            await next();
        } catch (e) {
            ctx.throw(e);
        }
    },

    //获取关于我的信息
    getMyInfo: async (ctx) => {
        let { user_id } = ctx.request.query;
        let result = await Db.findWhere('my', {user_id});
        if (result.length > 0) {
            ctx.response.body = {
                code:'001',
                msg:'',
                data:{
                    info:result[0].info,
                }
            }
            return;
        }

        ctx.response.body = {code:'002',msg:'暂未填写个人信息'}
    },

    //添加关于我的信息
    addMyInfo: async (ctx) => {
        let { info, user_id, is_edit } = ctx.request.body;
        let data = {
            info,
            user_id
        }
        if (!is_edit) {
            var result = await Db.insert('my', data);//新增
        } else {
            result = await Db.update('my', {user_id}, {info})            
        }

        if (result.result.ok) {
            ctx.response.body = {code:'001', msg:'个人信息添加成功'}
            return;
        }
        

        ctx.response.body = {code:'002', msg:'个人信息添加失败'}
    },

    //用户登录
    userLogin: async ctx => {
        let {username, password, remember_me} = ctx.request.body;
        try {
            let user = await userModel.findUserByName(username);
            if (user.length > 0) {
                let pass = crypto.genPassword(password);
                if (pass == user[0].password) {
                    //登录操作
                    let token = createJwt.getToken({username});
                    ctx.response.body = {code: '001', msg:'登录成功',data:{token}}
                    return;
                }
            }

            ctx.response.body = {code: '002', msg:'用户名或密码错误'}
        } catch (e) {
            ctx.throw(e);
        }
    }
}