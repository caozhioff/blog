const Router = require('koa-router')
const userController = require('../controllers/user')

let userRouter = new Router()

userRouter.post('/user/do-register', userController.register)
.get('/user/getCaptcha', userController.getCaptcha)
.post('/user/userExist', userController.userExist)
.get('/my/my', userController.getMyInfo)
.post('/my/addMy', userController.addMyInfo)
.post('/user/login', userController.userLogin)
module.exports = userRouter