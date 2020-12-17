let express = require('express')
let app = express()
const cors = require('cors') // 解决跨域
app.use(cors())
let api = require('./sever/api')

// 解决跨域问题
app.all('*', function (req, res, next) {
    console.info(req.headers.origin + ' 正在请求', req.method, req.url)
    next()
})

app.use('/', api)
app.get('/', function (req, res) {
    res.send('hello world!');
})

let server = app.listen(8067, 'localhost', function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("后端服务器已部署，请求baseURL为 http://%s:%s", host, port)
})