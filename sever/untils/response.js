/**
 * 使用情况：请求完全完成，并返回数据 | 状态码：200
 * @function
 * @param {Object} res response对象
 * @param {string} message 返回给前端的消息
 * @param {Object, Array} data 返回给前端的数据
 */
exports = module.exports.success0 = function (res, message, data) {
    console.log(message)
    res.json({
        code: 200,
        message,
        data
    })
}

/**
 * 使用情况：请求完全成功，不需返回数据 | 状态码：201
 * @function
 * @param {Object} res response对象
 * @param {string} message 返回给前端的消息
 */
exports = module.exports.success1 = function (res, message) {
    console.log(message)
    res.json({
        code: 201,
        message
    })
}

/**
 * 使用情况：请求未处理完成，客户端需更改提交的数据 | 状态码：202
 * @function
 * @param {Object} res response对象
 * @param {string} message 返回给前端的消息
 */
exports = module.exports.success2 = function (res, message) {
    console.log(message)
    res.json({
        code: 202,
        message
    })
}

/**
 * 使用情况：请求完成但未找到数据 | 状态码：204
 * @function
 * @param {Object} res response对象
 * @param {string} message 返回给前端的消息
 */
exports = module.exports.success4 = function (res, message){
    console.log(message)
    res.json({
        code: 204,
        message,
        data: []
    })
}

/**
 * 使用情况：若非管理员用户对客户端响应并返回true | 状态码：403
 * @function
 * @param {Object} req request对象
 * @param {Object} res response对象
 */
exports = module.exports.adminForbiddenCheck = function (req, res){
    if (req.user.role !== '管理员') {
        console.log('客户端权限不足，拒绝请求')
        res.status(403).end('对不起，您不是管理员用户')
        return true
    }else return false
}

/**
 * 使用情况：若非贡献者用户对客户端响应并返回true | 状态码：403
 * @function
 * @param {Object} req request对象
 * @param {Object} res response对象
 */
exports = module.exports.contributorForbiddenCheck = function (req, res){
    if (req.user.role !== '贡献者' && req.user.role !== '管理员') {
        console.log('客户端权限不足，拒绝请求')
        res.status(403).end('对不起，您是访客，无法进行该操作')
        return true
    }else return false
}

/**
 * 使用情况：无法理解客户端发来的请求，查询字符串出错 | 状态码：400
 * @function
 * @param {Object} res response对象
 */
exports = module.exports.error0 = function (res){
    console.log('客户端查询字符串出错')
    res.status(400).end('查询字符串出错')
}

/**
 * 使用情况：服务端出错 | 状态码：500
 * @function
 * @param {Object} res response对象
 */
exports = module.exports.error5 = function (res){
    console.log('服务端出错')
    res.status(500).end('服务端出错，请稍后再试')
}