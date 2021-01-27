let express = require('express')
let router = express.Router()

// 引入请求body解析中间件
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()

// 引入DAO层
let userDAO = require('../DAO/userDAO')
// 引入Response层
let response = require('../untils/response')

// 登录
router.use('/', require('./login'))

// 查询用户
router.get('/', (req, res) => {
    const {page, uid, keyword} = req.query
    if (page) {
        // 查询总数
        userDAO.selectTotal().then(result => {
            let pageTotal = result[0].pageTotal
            // 查询指定页数
            userDAO.selectByPage(page).then(result => {
                console.log('已获取第', page, '页的用户')
                response.success0(res,
                    '查询成功，已获取第' + page + '页的用户',
                    {pageTotal: pageTotal, userData: result})
            })
        })
    }
    else if (uid) {
        // 查询指定ID
        userDAO.selectById(uid).then(result => {
            console.log('已获取id为', uid, '的用户')
            if (result.length===0)
                response.success4(res, '查询成功, 但未查到相关数据')
            else
                response.success0(res, '查询成功', result[0])
        })
    }
    else if (keyword) {
        // 按姓名搜索
        userDAO.selectByName(keyword).then(result => {
            console.log('已完成对姓名包含', keyword, '用户的搜索')
            if (result.length === 0)
                response.success4(res, '查询成功, 但未查到相关数据')
            else
                response.success0(res, '查询成功', result)
        })
    }
    else res.status(404).send('查询字符串出错')
})

// 新增用户
router.post('/', jsonParser, (req, res) => {
    const {username, name, team_id, email, telephone, job, role} = req.body

    // 引入uuid模块生成用户id
    const { v4: uuid } = require('uuid')
    let uid = uuid().replace(/-/,'-').slice(0, 8)

    // console.log(uid)
    // for (let j = 0; j < 200;  j++) {
    //     let set3 = new Set()
    //
    //     for(let i = 0; i < 100000; i ++) {
    //         const uuid = uuid1().replace(/-/,'-').slice(0, 8)
    //         console.log(uuid)
    //         set3.add(uuid)
    //     }
    //     console.log(j, 100000-set3.size)
    // }

    let userinfo = [uid, username, '123456', name, team_id, email, telephone, job, '未激活', role]
    userDAO.insert(userinfo).then(result => {
        if (result){
            console.log('已新增姓名为', name, '的用户')
            response.success1(res, '用户 ' + name + ' 已添加')
        }
    }).catch(err => {
        // errno===1062错误为Unique字段存入了相同的值
        if (err.errno === 1062) {
            console.log('用户名', username, '已存在')
            response.success2(res, '用户名已存在，请更换用户名')
        }
    })
})

// 更新指定id用户信息
router.put('/', jsonParser, (req, res) => {
    const {uid} = req.query
    const {username, name, email, telephone, team_id, job, role, status} = req.body
    const userinfo = [username, name, email, telephone, team_id, job, role, uid]
    // 如果status不为undefined即该请求为更改用户状态
    if (status) {
        userDAO.updateStatus(uid, status==='activated'?'已激活':'未激活').then(result => {
            if (result && result.affectedRows!==0) {
                console.log('已完成ID为', uid, '用户状态的变更')
                response.success1(res, '已完成状态变更')
            }else {
                console.log('ID为', uid, '用户状态的变更未完成')
                response.success4(res, '找不到该用户')
            }
        })
    }
    // status为undefined即更新用户其他信息
    else {
        userDAO.update(userinfo).then(result => {
            if (result) {
                console.log('已更新id为', uid, '的用户信息')
                response.success1(res, '更新用户信息成功')
            }else {
                console.log('id为', uid, '的用户不存在')
                response.success4(res, '更新用户信息失败，用户不存在')
            }
        }).catch(err => {
            if(err.errno === 1062) {
                console.log('将要更新的用户名', username, '已存在')
                response.success2(res, '用户名已存在，请重试')
            }
        })
    }
})

// 删除指定id的用户
router.delete('/', (req, res) => {
    let uids = req.query["uids"].split(',')
    userDAO.delete(uids).then(result => {
        if (result) {
            console.log('已删除id为', uids, '的用户')
            response.success1(res, '删除成功')
        }else {
            console.log('删除id为', uids, '的用户失败')
            response.success4(res, '删除失败，未找到该用户')
        }
    })
})

module.exports = router