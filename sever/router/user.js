let express = require('express')
let router = express.Router()

// 引入请求body解析中间件
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()

// 引入DAO层
let userDAO = require('../DAO/userDAO')
// 引入Response层
let response = require('../untils/response')

// 登录模块引用
router.use('/', require('./login'))

// 查询用户
router.get('/', (req, res) => {
    const {page, uid, keyword} = req.query
    if (page) {
        // 查询总数
        userDAO.selectTotal().then(result => {
            console.log('正在获取第', page, '页的用户...')
            let pageTotal = result[0].pageTotal
            // 查询指定页数
            userDAO.selectByPage(page).then(result => {
                return response.success0(res,
                    '查询成功，已获取第' + page + '页的用户',
                    {pageTotal: pageTotal, userData: result})
            })
        })
    }
    else if (uid) {
        console.log('正在获取uid为', uid, '的用户...')
        // 查询指定ID
        userDAO.selectById(uid).then(result => {
            if (result.length===0)
                return response.success4(res, '查询成功, 但未查到相关数据')
            else
                return response.success0(res, '查询成功', result[0])
        })
    }
    else if (keyword) {
        console.log('正在对姓名包含', keyword, '用户进行搜索...')
        // 按姓名搜索
        userDAO.selectByName(keyword).then(result => {
            if (result.length === 0)
                return response.success4(res, '查询成功, 但未查到相关数据')
            else
                return response.success0(res, '查询成功', result)
        })
    }
    else return response.error0(res)
})

// 新增用户
router.post('/', jsonParser, (req, res) => {
    const {username, name, team_id, email, telephone, job, role} = req.body

    // 引入uuid模块生成用户id
    const { v4: uuid } = require('uuid')
    const uid = uuid().replace(/-/,'-').slice(0, 8)

    // 检查是否为管理员用户
    if(response.adminForbiddenCheck(req, res)) return

    // 测试uid随机性，10万个测试200次
    // console.log(uid)
    // for (let j = 0; j < 200;  j++) {
    //     let set3 = new Set()
    //
    //     for(let i = 0; i < 10000; i ++) {
    //         let testuid = uuid().replace(/-/,'-').slice(0, 8)
    //         // console.log(testuid)
    //         set3.add(testuid)
    //     }
    //     console.log(j, 10000-set3.size)
    // }

    // 封装用户信息
    const userinfo = [uid, username, '123456', name, team_id, email, telephone, job, '未激活', role]
    console.log('正在新增姓名为', name, '的用户')
    // 调用DAO层
    userDAO.insert(userinfo).then(result => {
        if (result) return response.success1(res, '用户 ' + name + ' 已添加')
        else return response.error5(res)
    }).catch(err => {
        // errno===1062错误为Unique字段存入了相同的值
        if (err.errno === 1062) return response.success2(res, '用户名已存在，请更换用户名')
    })
})

// 更新指定id用户信息
router.put('/', jsonParser, (req, res) => {
    const {uid} = req.query
    const {username, name, email, telephone, team_id, job, role, status} = req.body
    const userinfo = [username, name, email, telephone, team_id, job, role, uid]

    // 检查是否为管理员用户
    if(response.adminForbiddenCheck(req, res)) return

    // 如果status不为undefined即该请求为更改用户状态
    if (status) {
        console.log('正在对UID为', uid, '的用户状态进行变更')
        userDAO.updateStatus(uid, status==='activated'?'已激活':'未激活').then(result => {
            if (result) return response.success1(res, '已完成状态变更')
            else return  response.success4(res, '找不到该用户')
        })
    }
    // status为undefined即更新用户其他信息
    else {
        console.log('正在更新uid为', uid, '的用户信息')
        userDAO.update(userinfo).then(result => {
            if (result) return response.success1(res, '更新用户信息成功')
            else return  response.success4(res, '更新用户信息失败，用户不存在')
        }).catch(err => {
            if(err.errno === 1062) return response.success2(res, '用户名 ' + username + ' 已存在，请重试')
        })
    }
})

// 删除指定id的用户
router.delete('/', (req, res) => {
    const currentUser = req.user
    const uids = req.query["uids"].split(',')

    // 检查是否为管理员用户
    if(response.adminForbiddenCheck(req, res)) return
    // 检查是否删除自己
    if(uids.indexOf(currentUser._uid) !== -1) return res.status(403).send('您不能删除包含您自己的用户')

    console.log('正在删除uid为', uids, '的用户')
    userDAO.delete(uids).then(result => {
        if (result) return response.success1(res, '删除成功')
        return response.success4(res, '删除失败，未找到该用户')
    })
})

module.exports = router