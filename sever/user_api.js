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

// 按页数查询用户
router.get('/user/:page', (req, res) => {
    let sql = "select user.id, username, name, team.team_name, email, telephone, role, status " +
        "from user " +
        "left join team on user.team_id = team.id " +
        "limit " + ((req.params.page - 1) * 10) + ", 10"
    connection.query('select count(*) as pageTotal from user', function (err, result1) {
        if (err) throw err
        let pageTotal = result1[0].pageTotal
        connection.query(sql, function (err, result2) {
            if (err) throw err
            console.log('已获取第',req.params.page, '页的用户')
            res.end(JSON.stringify({"pageTotal": pageTotal, "userData": result2}))
        })
    })
})

// 新增用户
router.post('/createNewUser', jsonParser, (req, res) => {
    let user = req.body
    let sql = "insert into user(username, password, name, team_id, email, telephone, job, status, role) " +
        "value(?, ?, ?, ?, ?, ?, ?, ?, ?)"
    let params = [user.username, '123456', user.name, user.team_id, user.email, user.telephone, user.job, '未激活', user.role]
    connection.query(sql, params, function (err) {
        if (err) throw err
        console.log('已新增用户姓名为',user.name, '的用户')
        res.sendStatus(200)
    })
})

// 获取指定id用户详情
router.get('/getUserDetail/:id', (req, res) => {
    let sql = "select user.id, username, name, email, telephone, team.id as team_id, team.team_name, job, role " +
        "from user " +
        "left join team on user.team_id = team.id " +
        "where user.id = " + req.params.id
    connection.query(sql, function (err, result) {
        if (err) throw err
        console.log('已获取id为',req.params.id, '的用户信息')
        res.send(JSON.stringify(result))
    })
})

// 更新指定id用户信息
router.post('/updateUser/:id', jsonParser, (req, res) => {
    let user = req.body
    let sql = "update user set username='" + user.username +
        "', name='" + user.name +
        "', email='" + user.email +
        "', telephone='" + user.telephone +
        "', team_id='" + user.team_id +
        "', job='" + user.job +
        "', role='" + user.role +
        "' where id = " + req.params.id
    connection.query(sql, function (err) {
        if (err) throw err
        console.log('已更新id为',req.params.id, '的用户信息')
        res.sendStatus(200)
    })
})

// 按姓名搜索用户
router.get('/userlike/:name', (req, res) => {
    let sql = "select id, name " +
        "from user " +
        "where name like '%" + req.params.name + "%'"
    connection.query(sql, function (err, result) {
        if (err) throw err
        console.log('正在搜索名包含',req.params.name, '的用户')
        res.end(JSON.stringify(result))
    })
})

// 切换指定id的用户的激活状态
router.post('/activateUser/:id', (req, res) => {
    connection.query("select status from user where id=" + req.params.id, function (err, result){
        if (err) throw err
        let status = (result[0].status === '已激活') ? '未激活' : '已激活'
        connection.query("update user set status='" + status + "' where id=" + req.params.id, function (err){
            if (err) throw err
            console.log('已切换id为', req.params.id, '用户的激活状态')
            res.send(JSON.stringify({"user_status": status}))
        })
    })
})

// 删除指定id的用户
router.post('/deleteUser', jsonParser, (req, res) => {
    let user = req.body
    let sql = "delete from user where id in (" + user.user_ids.toString() + ')'
    connection.query(sql, function (err){
        if (err) throw err
        console.log('已删除id为',user.user_ids.toString(), '的用户')
        res.sendStatus(200)
    })
})

module.exports = router