let express = require('express')
let router = express.Router()
let models = require('./db')
let mysql = require('mysql')
let moment = require('moment')

// 引入请求body解析中间件
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
// 创建mysql数据库连接
let connection = mysql.createConnection(models.mysql)

// 连接数据库
connection.connect()

// 获取博客列表数据
router.get('/getAchievementData/:page', function (req, res){
    let sql = "select achievement.id, achievement.name, type1, type2, get_time, user.name as user_name, update_time " +
        "from achievement " +
        "left join user on achievement.user_id = user.id " +
        "limit " + ((req.params.page-1) * 10) + ", 10"
    connection.query('select count(*) as pageTotal from achievement', function (err, result1){
        if (err) throw err
        let pageTotal = result1[0].pageTotal
        connection.query(sql, function (err, result2) {
            if (err) throw err
            console.log('已获取第',req.params.page, '页的成果')
            res.send(JSON.stringify({"pageTotal": pageTotal, "achievementData": result2}))
        })
    })
})

// 新增博客
router.post('/createNewAchievement', jsonParser, (req, res) => {
    let achievement = req.body
    let sql = "insert into " +
        "achievement(name, type1, type2, get_time, detail, user_id, update_time) " +
        "value(?, ?, ?, ?, ?, ?, ?)"
    let datetime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    let params = [achievement.name, achievement.type1, achievement.type2,
        achievement.get_time, achievement.detail, achievement.editor_id, datetime]
    connection.query(sql, params, function (err) {
        if (err) throw err
        console.log('已新增标题为',achievement.name, '的成果')
        res.sendStatus(200)
    })
})

// 获取指定id博客详情
router.get('/getAchievementDetail/:id', (req, res) => {
    let sql = "select id, name, type1, type2, get_time, detail " +
        "from achievement " +
        "where id = " + req.params.id
    connection.query(sql, function (err, result) {
        if (err) throw err
        console.log('已获取id为',req.params.id, '的成果详情')
        res.send(JSON.stringify(result))
    })
})

// 更新指定id博客详情
router.post('/updateAchievement/:id', jsonParser, (req, res) => {
    let achievement = req.body
    let datetime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    let sql = "update achievement set name='" + achievement.name +
        "', type1='" + achievement.type1 +
        "', type2='" + achievement.type2 +
        "', get_time='" + achievement.get_time +
        "', detail='" + achievement.detail +
        "', update_time='" + datetime +
        "' where id = " + req.params.id
    connection.query(sql, function (err) {
        if (err) throw err
        console.log('已更新id为',req.params.id, '的成果')
        res.sendStatus(200)
    })
})

// 删除指定id的博客
router.post('/deleteAchievement', jsonParser, (req, res) => {
    let achieve = req.body
    let sql = "delete from achievement where id in (" + achieve.achieve_ids.toString() + ')'
    connection.query(sql, function (err){
        if (err) throw err
        console.log('已删除id为',achieve.achieve_ids.toString(), '的成果')
        res.sendStatus(200)
    })
})

module.exports = router