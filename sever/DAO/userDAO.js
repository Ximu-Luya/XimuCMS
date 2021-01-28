const {query} = require('../untils/db')

// 登录检查查询密码
exports = module.exports.LoginCheck = function (username) {
    const sql = "select uid, name, password, role from user where username= ?"
    return query(sql, username)
}

// 查询总数
exports = module.exports.selectTotal = function (){
    const sql = 'select count(*) as pageTotal from user'
    return query(sql)
}

// 按页查询
exports = module.exports.selectByPage = function (page) {
    const sql = "select user.uid, username, name, team.team_name, email, telephone, role, status " +
        "from user " +
        "left join team on user.team_id = team.id " +
        "limit ?, 10"
    return query(sql, ((page - 1) * 10))
}

// 按ID查询
exports = module.exports.selectById = function (uid) {
    const sql = "select user.uid, username, name, email, telephone, team.id as team_id, team.team_name, job, role " +
        "from user " +
        "left join team on user.team_id = team.id " +
        "where user.uid = ?"
    return query(sql, uid)
}

// 按姓名查询
exports = module.exports.selectByName = function (name) {
    const sql = "select uid, name from user " +
        "where name like ?"
    const match = '%' + name + '%'
    return query(sql, match)
}

// 新增数据
exports = module.exports.insert = function (userinfo) {
    const sql = "insert into user(uid, username, password, name, team_id, email, telephone, job, status, role) " +
        "value(?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
        ""
    return query(sql, userinfo)
}

// 更新数据
exports = module.exports.update = function (userinfo) {
    const sql = "update user set username=?, name=?, email=?, telephone=?" +
        ", team_id=?, job=?, role=? where uid=?"
    return query(sql, userinfo)
}

// 更新用户状态
exports = module.exports.updateStatus = function (uid, status) {
    const sql = "update user set status=? where uid=?"
    return query(sql, [status, uid])
}

// 删除数据
exports = module.exports.delete = function (uids) {
    const sql = "delete from user where uid in (?)"
    return query(sql, [uids])
}