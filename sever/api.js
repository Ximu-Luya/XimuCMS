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

router.get('/getBlogData', function (req, res){
    let fs = require('fs')
    let path = require('path')

    let file = path.join(__dirname, 'blogs.json')
    console.info(req.headers.referer + '正在请求')
    fs.readFile(file, 'utf-8', function (err, data){
        if (err) {
            console.info(err)
        } else {
            res.send(data)
        }
    })
})

router.post('/user', jsonParser, function (req, res) {
    let users = []
    // todo
    connection.query('select * from user', function (err, result) {
        if (err) throw err
        users = result
        res.end(JSON.stringify(users))
    })
})

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
