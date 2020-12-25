const path = require('path');
const resolve = (dir) => path.join(__dirname, dir); // 给public路径添加别名

module.exports = {
    resolve: {
        alias: {
            '@': resolve('src')
        }
    }
}