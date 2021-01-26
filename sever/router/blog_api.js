let express = require('express')
let router = express.Router()
let models = require('../db')
let mysql = require('mysql')
let moment = require('moment')

// 图片上传
let upload = require('../untils/upload')
router.use('/', upload)

// 引入请求body解析中间件
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
// 创建mysql数据库连接
let connection = mysql.createConnection(models.mysql)

// 连接数据库
connection.connect()

// 获取博客列表数据
router.get('/getBlogData/:page', function (req, res){
    let sql = "select blog.id, title, tag_list, section, user.name, update_time " +
        "from blog " +
        "left join user on blog.user_id = user.id " +
        "limit " + ((req.params.page-1) * 10) + ", 10"
    connection.query('select count(*) as pageTotal from blog', function (err, result1){
        if (err) throw err
        let pageTotal = result1[0].pageTotal
        connection.query(sql, function (err, result2) {
            if (err) throw err
            console.log('已获取第',req.params.page, '页的博客')
            res.send(JSON.stringify({"pageTotal": pageTotal, "blogData": result2}))
        })
    })
})

// 新增博客
router.post('/createNewBlog', jsonParser, (req, res) => {
    let blog = req.body
    let sql = "insert into " +
        "blog(title, tag_list, section, user_id, blog_content, release_time, update_time) " +
        "value(?, ?, ?, ?, ?, ?, ?)"
    let datetime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    let params = [blog.title, blog.tag_list, blog.section, blog.author_id, blog.content, datetime, datetime]
    connection.query(sql, params, function (err) {
        if (err) throw err
        console.log('已新增标题为',blog.title, '的博客')
        res.sendStatus(200)
    })
})

// 获取指定id博客详情
router.get('/getBlogDetail/:id', (req, res) => {
    let sql = "select blog.id, title, tag_list, section, user.name, blog_content, update_time " +
        "from blog " +
        "left join user on blog.user_id = user.id " +
        "where blog.id = " + req.params.id
    connection.query(sql, function (err, result) {
        if (err) throw err
        console.log('已获取id为',req.params.id, '的博客详情')
        res.send(JSON.stringify(result))
    })
})

// 更新指定id博客详情
router.post('/updateBlog/:id', jsonParser, (req, res) => {
    let blog = req.body
    let datetime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    let sql = "update blog set title='" + blog.title +
        "', tag_list='" + blog.tag_list +
        "', section='" + blog.section +
        "', blog_content='" + blog.content +
        "', update_time='" + datetime +
        "' where id = " + req.params.id
    connection.query(sql, function (err) {
        if (err) throw err
        console.log('已更新id为',req.params.id, '的博客')
        res.sendStatus(200)
    })
})

// 删除指定id的博客
router.post('/deleteBlog', jsonParser, (req, res) => {
    let blog = req.body
    let sql = "delete from blog where id in (" + blog.blog_ids.toString() + ')'
    connection.query(sql, function (err){
        if (err) throw err
        console.log('已删除id为',blog.blog_ids.toString(), '的博客')
        res.sendStatus(200)
    })
})

module.exports = router