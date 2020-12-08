let express = require('express')
let router = express.Router()
let blog = require('./blog_api')
let user = require('./user_api')
let models = require('./db')
let mysql = require('mysql')

router.use('/', blog)
router.use('/', user)
// 引入请求body解析中间件
// let bodyParser = require('body-parser')
// let jsonParser = bodyParser.json()
// 创建mysql数据库连接
let connection = mysql.createConnection(models.mysql)

// 连接数据库
connection.connect()

router.get('/user/:id', function (req, res) {
    let user = {}
    connection.query('select * from users where id = ' + req.params.id, function (err, result) {
        if (err) throw err
        user = result
        res.end(JSON.stringify(user))
    })
})

router.get('/addUser/:name/:age/:email', function (req, res) {
    let sql = 'insert into users(name,age,email) values(?,?,?)'
    // let user = {
    //     name: 'Mike',
    //     age: 12,
    //     email: '1124245@qq,com'
    // }
    let params = [req.params.name, req.params.age, req.params.email]
    connection.query(sql, params, function (err, result) {
        if (err) throw err
        console.log(result)
        res.end(JSON.stringify(result))
    })
})

router.get('/delUser/:id', function (req, res) {
    connection.query('delete from users where id=' + req.params.id, function (err, result) {
        if (err) throw err
        res.end(JSON.stringify(result))
    })
})

router.get('/updateUser/:id', function (req, res) {
    connection.query('update users set name=? where id = ?', ['LiMing', req.params.id], function (err, result) {
        if (err) throw err
        res.end(JSON.stringify(result))
    })
})

module.exports = router
