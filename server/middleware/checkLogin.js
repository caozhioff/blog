const jwt = require('../util/createToken');

const userModel = require('../models/user');

module.exports = async (ctx, next) => {//检验token
    try {
        if (ctx.url.startsWith('/user')) {//直接放行url，登录注册接口等等..
            await next();
            return;
        }

        const token = ctx.headers['authorization'];
        const userInfo = jwt.verifyToken(token);

        if (!userInfo) {
            ctx.response.body = {code:'002', msg:'token有误'};
            return;
        }

        if (userInfo.exp < (Math.round(new Date().getTime())/1000)) {
            ctx.response.body = {code:'002', msg:'登录过期'};
            return;
        }

        let user = await userModel.findUserByName(userInfo.username);
        if (user.length == 0) {
            ctx.response.body = {code:'002', msg:'用户不存在'};
            return;
        }

        //放行
        await next();
    } catch (e) {
        ctx.throw(e);
    }
}