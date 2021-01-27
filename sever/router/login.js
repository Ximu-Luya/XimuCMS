let express = require('express')
let router = express.Router()
let {setToken} = require('../untils/token_vertify')

// 引入请求body解析中间件
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()

// 引入DAO层
let userDAO = require('../DAO/userDAO')

// 登录
router.post('/login', jsonParser, (req, res) => {
    let user = req.body

    userDAO.LoginCheck(user.username).then(result => {
        if (result.length !== 0) {
            let correct = result[0].password
            if (correct === user.password) {
                console.log('用户', result[0].name, '登录成功')
                setToken(result[0].name, result[0].uid).then((data) => {
                    return res.json({token: data})
                })
            } else {
                console.log('用户', user.username, '密码错误')
                res.status(401).send("用户密码错误")
            }
        } else {
            console.log('用户', user.username, '不存在')
            res.status(401).send("用户不存在")
        }
    })
})

module.exports = router