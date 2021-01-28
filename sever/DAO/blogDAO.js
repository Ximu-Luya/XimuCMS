const {query} = require('../untils/db');

// 查询总数
exports = module.exports.selectTotal = function (){
    const sql = 'select count(*) as pageTotal from blog'
    return query(sql)
}

// 按页查询
exports = module.exports.selectByPage = function (page) {
    const sql = `select blog.id, title, tag_list, section,
        (
            case when length(content)>200 
            then concat(substring(content,1,200), '...') 
            else content end
        ) as content, 
        user.name as author_name, author as author_id, release_time, update_time 
        from blog 
        left join user on blog.author = user.uid limit ?, 10`
    return query(sql, ((page - 1) * 10))
}

// 按ID查询
exports = module.exports.selectById = function (id) {
    const sql = `select blog.id, title, tag_list, section, 
        user.name as author_name, author as author_id, content, release_time, update_time
        from blog
        left join user on blog.author = user.uid
        where blog.id = ?`
    return query(sql, id)
}

// 新增数据
exports = module.exports.insert = function (blogItem) {
    const sql = "insert into blog(title, tag_list, section, author, content, release_time, update_time) " +
        "value(?, ?, ?, ?, ?, ?, ?)"
    return query(sql, blogItem)
}

// 更新数据
exports = module.exports.update = function (blogItem) {
    const sql = `update blog set 
        title=?, tag_list=?, section=?, content=?, update_time=? 
        where id=?`
    return query(sql, blogItem)
}

// 删除数据
exports = module.exports.delete = function (ids, author) {
    const sql = "delete from blog where id in (?)" + (author ? "and author =?": "")
    return query(sql, [ids, author])
}