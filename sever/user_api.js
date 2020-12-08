let express = require('express')
let router = express.Router()
let models = require('./db')
let mysql = require('mysql')

// 引入请求body解析中间件
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
// 创建mysql数据库连接
let connection = mysql.createConnection(models.mysql)

// 连接数据库
connection.connect()

router.post('/user', jsonParser, function (req, res) {
    let users = []
    // todo 查询用户
    connection.query('select * from user', function (err, result) {
        if (err) throw err
        users = result
        res.end(JSON.stringify(users))
    })
})

module.exports = router