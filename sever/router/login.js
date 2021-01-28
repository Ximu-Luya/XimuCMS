let express = require('express')
let router = express.Router()
let {setToken} = require('../untils/token_vertify')

// 引入请求body解析中间件
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()

// 引入DAO层
let userDAO = require('../DAO/userDAO')
// 引入Response层
let response = require('../untils/response')

// 登录
router.post('/login', jsonParser, (req, res) => {
    let user = req.body

    userDAO.LoginCheck(user.username).then(result => {
        if (result.length !== 0) {
            let correct = result[0].password
            if (correct === user.password) {
                console.log('用户', result[0].name, '登录成功')
                setToken(result[0]).then(data => {
                    response.success0(res,'登录成功', data)
                })
            } else {
                console.log('用户', user.username, '密码错误')
                response.success2(res, '密码错误')
            }
        } else {
            console.log('用户', user.username, '不存在')
            response.success4(res, '用户名不存在')
        }
    })
})

module.exports = router