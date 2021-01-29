let express = require('express')
let router = express.Router()
let models = require('../db')
let mysql = require('mysql')

// 引入请求body解析中间件
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()

// 引入DAO层
let teamDAO = require('../DAO/teamDAO')
// 引入Response层
let response = require('../untils/response')
// 创建mysql数据库连接
let connection = mysql.createConnection(models.mysql)

// 连接数据库
connection.connect()

// 按页数查询团队成员用户
router.get('/', (req, res) => {
    let sql = "select user.id, name, email, job, status " +
        "from user " +
        "left join team on user.team_id = team.id " +
        "where team.id=" + req.params.team_id +
        " limit " + ((req.params.page - 1) * 10) + ", 10"
    connection.query('select count(*) as pageTotal from user', function (err, result1) {
        if (err) throw err
        let pageTotal = result1[0].pageTotal
        connection.query(sql, function (err, result2) {
            if (err) throw err
            console.log('已获取团队id为',req.params.team_id, '的第', req.params.page, '页的用户')
            res.end(JSON.stringify({"pageTotal": pageTotal, "userData": result2}))
        })
    })
})

// 按id将用户移出团队
router.post('/', jsonParser, (req, res) => {
    let team = req.body
    let sql = "update user set team_id=0, job='无' where id in (" + team.user_ids.toString() + ")"
    connection.query(sql, function (err){
        if (err) throw err
        console.log('已将id为',team.user_ids.toString(), '的用户移出团队')
        res.sendStatus(200)
    })
})

// 更新指定id用户的团队
router.post('/updateUserTeam/:team_id', jsonParser, (req, res) => {
    let user = req.body
    let sql = "update user set team_id=" + req.params.team_id +
        ", job='" + user.job +
        "' where id = " + user.name
    connection.query("select team_id from user where id=" + user.name, function (err, result){
        if (err) throw err
        if (result[0].team_id === 0) {
            connection.query(sql, function (err) {
                if (err) throw err
                console.log('已将id为',user.name, '的用户的团队id更改为', req.params.team_id)
                res.sendStatus(200)
            })
        } else {
            console.log('id为',user.name, '的用户的团队id为', result[0].team_id, '无法加入其他团队')
            res.sendStatus(202)
        }
    })
})

// 按名称搜索团队
router.get('/teamlike/:name', (req, res) => {
    let sql = "select id, team_name " +
        "from team " +
        "where team_name like '" + req.params.name + "%'"
    connection.query(sql, function (err, result) {
        if (err) throw err
        console.log('正在搜索名为',req.params.name, '的团队')
        res.end(JSON.stringify(result))
    })
})

module.exports = router