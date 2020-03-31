const Router = require('koa-router')
const blogController = require('../controllers/blog')

let blogRouter = new Router()

blogRouter.post('/blog/add',blogController.add)
.get('/blog/list', blogController.list)
.get('/blog/detail', blogController.detail)
.get('/blog/tags', blogController.getTags)
.get('/blog/new', blogController.new)

module.exports = blogRouter