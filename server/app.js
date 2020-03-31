const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const userRouter = require('./routers/user.js')
const blogRouter = require('./routers/blog.js')
var cors = require('koa2-cors');

const app = new Koa();

const checkLogin = require('./middleware/checkLogin');

let {appPort} = require('./config.js')

app.use(cors({
    origin: function(ctx) {
      if (ctx.url === '/test') {
        return false;
      }
      return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }));

app.use(checkLogin)

app.listen(appPort, () => {
    console.log(`服务器运行在${appPort}端口`)
})

app.use(bodyParser())
app.use(userRouter.routes())
app.use(blogRouter.routes())

app.use(userRouter.allowedMethods())
