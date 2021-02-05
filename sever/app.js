let express = require('express')
let app = express()

// 解决跨域
const cors = require('cors')
app.use(cors())

// 控制台输出请求信息
app.all(/\/api.*/, function (req, res, next) {
    console.info(req.headers.referer + ' 正在请求', req.method, req.url)
    next()
})

// 引入JWT解析中间件
let expressJwt = require('express-jwt');
const {signkey} = require("./untils/token_vertify");

//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
    secret: signkey,
    algorithms: ['HS256']
}).unless({
    path: [
        {url: /\/.*/, methods: ['GET']},
        '/api/user/login',
        // {url: /\/api.*/, methods: ['POST', 'PUT', 'DELETE']},
    ] //除了这个地址，其他的URL都需要验证
}))

// 引入总路由
app.use('/api', require('./router'))
// app.use('/user', require('./router/login'))
app.use('/',express.static("dist"));

// 当token失效返回提示信息
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next){
    if (err["status"] === 401) {
        if (err["message"] === 'invalid signature') {
            console.log('客户端token失效')
            return res.status(401).send('token无效');
        }
        else if (err["message"] === 'jwt expired') {
            console.log('客户端登录已过期')
            return res.status(401).send('登录已过期，请重新登录');
        }
    }
});

// 导出app模块
module.exports = app