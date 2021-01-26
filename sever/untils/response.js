/**
 * 使用情况：请求完全完成，并返回数据 | 状态码：200
 * @function
 * @param {Object} res response对象
 * @param {string} message 返回给前端的消息
 * @param {Object, Array} data 返回给前端的数据
 */
exports = module.exports.success0 = function (res, message, data) {
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
    res.json({
        code: 204,
        message,
        data: []
    })
}