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
router.get('/getBlogData/:current', function (req, res){
    let sql = "select blog_id, blog_title, blog_type, user.user_name, update_time " +
        "from blog " +
        "left join user on blog.user_id = user.user_id " +
        "limit " + ((req.params.current-1) * 10) + ", 10"
    connection.query('select count(*) as pageTotal from blog', function (err, result1){
        if (err) throw err
        let pageTotal = result1[0].pageTotal
        connection.query(sql, function (err, result2) {
            if (err) throw err
            console.log('已获取第',req.params.current, '页的博客')
            res.send(JSON.stringify({"pageTotal": pageTotal, "blogData": result2}))
        })
    })
})

// 新增博客
router.post('/createNewBlog', jsonParser, ((req, res) => {
    let blog = req.body
    let sql = "insert into blog(blog_title, blog_type, blog_content, user_id, update_time) value(?, ?, ?, ?, ?)"
    let datetime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    let params = [blog.title, blog.type, blog.content, blog.author_id, datetime]
    connection.query(sql, params, function (err) {
        if (err) throw err
        console.log('已新增标题为',blog.title, '的博客')
        res.send(JSON.stringify({"status": 1}))
    })
}))

// 获取指定id博客详情
router.get('/getBlogDetail/:id', ((req, res) => {
    let sql = "select blog_id, blog_title, blog_type, user.user_name, blog_content " +
        "from blog " +
        "left join user on blog.user_id = user.user_id " +
        "where blog_id = " + req.params.id
    connection.query(sql, function (err, result) {
        if (err) throw err
        res.send(JSON.stringify(result))
    })
}))

// 更新指定id博客详情
router.post('/updateBlog/:id', jsonParser, ((req, res) => {
    let blog = req.body
    let sql = "update blog set blog_title='" + blog.title +
        "', blog_type='" + blog.type +
        "', blog_content='" + blog.content +
        "' where blog_id = " + req.params.id
    connection.query(sql, function (err) {
        if (err) throw err
        console.log('已更新id为',req.params.id, '的博客')
        res.send(JSON.stringify({"status": 1}))
    })
}))

// 删除指定id的博客
router.post('/deleteBlog', jsonParser, (((req, res) => {
    let blog = req.body
    let sql = "delete from blog where blog_id in (" + blog.blog_ids.toString() + ')'
    connection.query(sql, function (err){
        if (err) throw err
        console.log('已删除id为',blog.blog_ids.toString(), '的博客')
        res.send(JSON.stringify({"status": 1}))
    })
})))

module.exports = router