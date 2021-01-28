const {query} = require('../untils/db');

// 查询总数
exports = module.exports.selectTotal = function (){
    const sql = 'select count(*) as pageTotal from achievement'
    return query(sql)
}

// 按页查询
exports = module.exports.selectByPage = function (page) {
    const sql = `select achievement.id, achievement.name, type1, type2,
        team.name, detail, get_time, update_time
        from achievement 
        left join team on achievement.team_id = team.id limit ${(page - 1) * 10}, 10`
    return query(sql)
}

// 按ID查询
exports = module.exports.selectById = function (id) {
    const sql = `select achievement.id, achievement.name, type1, type2, 
        team.name, detail, get_time, update_time
        from achievement
        left join team on achievement.team_id = team.id
        where achievement.id = ${id}`
    return query(sql)
}

// 新增数据
exports = module.exports.insert = function (achievementItem) {
    const sql = `insert into achievement(name, type1, type2, get_time, detail, team_id, update_time)
        value(?, ?, ?, ?, ?, ?, ?)`
    return query(sql, achievementItem)
}

// 更新数据
exports = module.exports.update = function (achievementItem) {
    const sql = `update achievement set 
        name=?, type1=?, type2=?, get_time=?, detail=?, update_time=?
        where id=?`
    return query(sql, achievementItem)
}

// 删除数据
exports = module.exports.delete = function (ids, teamId) {
    const sql = `delete from achievement where id in (${ids}) ${teamId ? `and team_id =${teamId}` : ''}`
    return query(sql)
}