const path = require('path');
const resolve = (dir) => path.join(__dirname, dir); // 给public路径添加别名

module.exports = {
    publicPath: './', // base目录，等同于router.js的base字段
    assetsDir: '', // 打包后静态资源目录，注意public文件下目录（别名）配置，index.html的icon路径
    outputDir: './dist',
    devServer: {
        open: true, //告诉 dev-server 在服务器启动后是否立即打开浏览器
        host: 'localhost',
        port: 8086,
        https: false,
        // proxy: {
        //     "/router": {
        //         target: "http://localhost:8085/api/", //目标主机
        //         ws: true, //代理的WebSockets
        //         changeOrigin: true, //需要虚拟主机站点
        //         pathRewrite: {
        //             "^/router": ""
        //         }
        //     }
        // },
    },
    productionSourceMap: false, // 生产环境map文件
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
}