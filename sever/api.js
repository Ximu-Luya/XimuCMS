var express = require('express')
var router = express.Router()
var models = require('./db')
var mysql = require('mysql')
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var connection = mysql.createConnection(models.mysql)

connection.connect()

router.post('/user', jsonParser, function (req, res) {
    console.log(req.body)
    var users = []
    connection.query('select * from user', function (err, result) {
        if (err) throw err
        users = result
        res.end(JSON.stringify(users))
    })
})
router.get('/user/:id', function (req, res) {
    var user = {}
    connection.query('select * from users where id = ' + req.params.id, function (err, result) {
        if (err) throw err
        user = result
        res.end(JSON.stringify(user))
    })
})
router.get('/addUser/:name/:age/:email', function (req, res) {
    var sql = 'insert into users(name,age,email) values(?,?,?)'
    var user = {
        name: 'Mike',
        age: 12,
        email: '1124245@qq,com'
    }
    var params = [req.params.name, req.params.age, req.params.email]
    connection.query(sql, params, function (err, result) {
        if (err) throw err
        console.log(result)
        res.end(JSON.stringify(result))
    })
})
router.get('/delUser/:id', function (req, res) {
    connection.query('delete  from users where id=' + req.params.id, function (err, result) {
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
