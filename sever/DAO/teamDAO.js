const {query} = require('../untils/db')

// 查询总数
exports = module.exports.selectTotal = function (){
    const sql = `select count(*) as pageTotal from team`
    return query(sql)
}

// 按页查询
exports = module.exports.selectByPage = function (page) {
    const sql = `
    select team.id, team.name, teacher.name, leader.name, introduction
    from team 
    left join user teacher on team.teacher_id = user.uid
    left join user leader on team.leader_id = user.uid
    limit ?, 10
    `
    return query(sql, ((page - 1) * 10))
}

// 按ID查询
exports = module.exports.selectById = function (uid) {
    const sql = "select team.id, username, name, email, telephone, team.id as team_id, team.team_name, job, role " +
        "from team " +
        "left join team on team.team_id = team.id " +
        "where team.uid = ?"
    return query(sql, uid)
}

// 按姓名查询
exports = module.exports.selectByName = function (name) {
    const sql = "select uid, name from team " +
        "where name like ?"
    const match = '%' + name + '%'
    return query(sql, match)
}

// 新增数据
exports = module.exports.insert = function (userinfo) {
    const sql = "insert into team(uid, username, password, name, team_id, email, telephone, job, status, role) " +
        "value(?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
        ""
    return query(sql, userinfo)
}

// 更新数据
exports = module.exports.update = function (userinfo) {
    const sql = "update team set username=?, name=?, email=?, telephone=?" +
        ", team_id=?, job=?, role=? where uid=?"
    return query(sql, userinfo)
}

// 更新用户状态
exports = module.exports.updateStatus = function (uid, status) {
    const sql = "update team set status=? where uid=?"
    return query(sql, [status, uid])
}

// 删除数据
exports = module.exports.delete = function (uids) {
    const sql = "delete from team where uid in (?)"
    return query(sql, [uids])
}