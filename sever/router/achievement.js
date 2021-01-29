let express = require('express')
let router = express.Router()
let moment = require('moment')

// 引入请求body解析中间件
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()

// 引入DAO层
let achievementDAO = require('../DAO/achievementDAO')
// 引入Response层
let response = require('../untils/response')

// 获取成果列表数据
router.get('/', function (req, res){
    const {page, id, type1} = req.query

    if(page){
        // 查询总数
        console.log(`正在获取第 ${page} 页的${type1?type1:''}成果...`)
        achievementDAO.selectTotal(type1).then(result => {
            let pageTotal = result[0].pageTotal
            // 查询指定页数
            achievementDAO.selectByPage(page, type1).then(result => {
                return response.success0(res,
                    `查询成功，已获取第 ${page} 页的 ${type1?type1:``} 成果`,
                    {pageTotal: pageTotal, achievements: result})
            })
        })
    }
    else if (id) {
        console.log('正在获取id为', id, '的成果...')
        // 查询指定ID
        achievementDAO.selectById(id).then(result => {
            if (result.length===0)
                return response.success4(res, '查询成功, 但未查到相关数据')
            else
                return response.success0(res, '查询成功', result[0])
        })
    }
    else return response.error0(res)
})

// 新增成果
router.post('/', jsonParser, (req, res) => {
    const currentTeamId = req["user"].team_id
    const {name, type1, type2, detail, get_time} = req.body
    const datetime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    const achievementItem = [name, type1, type2, get_time, detail, currentTeamId, datetime]

    // 检查是否为贡献者用户
    if(response.contributorForbiddenCheck(req, res)) return

    console.log('正在添加名称为', name, '的成果...')
    achievementDAO.insert(achievementItem).then(result => {
        if (result) return response.success1(res, '成果已创建')
        return response.error5(res)
    })
})

// 更新指定id成果详情
router.put('/', jsonParser, (req, res) => {
    const id = req.query.id
    const currentTeamId = req["user"].team_id
    const {name, type1, type2, detail, team_id, get_time} = req.body
    const datetime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    const achievementItem = [name, type1, type2, get_time, detail, datetime, id]

    // 检查是否为贡献者用户
    if(response.contributorForbiddenCheck(req, res)) return
    // 检查是否为该成果所属团队
    if(team_id !== currentTeamId) return res.status(403).send('您不是该成果所属团队的成员，无法更改')

    console.log('正在更新id为', id, '的成果')
    achievementDAO.update(achievementItem).then(result => {
        if (result) return response.success1(res, '成果已更新')
        return response.success4(res, '该成果不存在')
    })
})

// 删除指定id的成果
router.delete('/', jsonParser, (req, res) => {
    const currentTeamId = req["user"].team_id
    // const authorIDSet = new Set(req.body["author_ids"])
    const ids = req.query["ids"].split(',')

    // 检查是否为贡献者用户
    if(response.contributorForbiddenCheck(req, res)) return
    // 检测是否是博客作者
    // if(authorIDSet.size !== 1 && !authorIDSet.has(currentUID))
    //     res.status(403).send('您不能删除作者不是您自己的博客，请确保您要删除的博客的作者是您自己')

    console.log('正在删除id为', ids, '的成果')
    achievementDAO.delete(ids, req['user'].role==="管理员"?null:currentTeamId).then(result =>{
        if (result) return response.success1(res, '删除成功')
        return response.success4(res, '删除失败，只有该成果所属团队的成员才能删除')
    })
})

module.exports = router