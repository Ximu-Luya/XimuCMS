let express = require('express')
let app = express()
let api = require('./api')

// 解决跨域问题
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', 'POST,GET')
    res.header('X-Powered-By', ' 3.2.1')
    res.header('Content-Type', 'application/json;charset=utf-8')
    console.info(req.headers.origin + ' 正在请求', req.method, req.url)
    next()
})

app.use('/', api)
app.get('/', function (req, res) {
    res.send('hello world!');
})

let server = app.listen(8085, 'localhost', function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("后端服务器已部署，请求baseURL为 http://%s:%s", host, port)
})