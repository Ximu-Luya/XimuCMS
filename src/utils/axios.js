import Vue from 'vue'
import axios from "axios";
import Router from '../router/index'

// axios基础配置并定义axios全局变量
Vue.prototype.$axios = process.env.NODE_ENV === 'development' ? axios.create({
    baseURL: 'http://127.0.0.1:8067/api',
    timeout: 5000
}) : axios.create({
    // 此处填入生产环境请求baseURL
    baseURL: 'http://127.0.0.1:8067/api',
    timeout: 5000
});

Vue.prototype.$axios.defaults.headers.post['Content-Type'] = false

// 定义axios请求拦截器
Vue.prototype.$axios.interceptors.request.use(config => {
    // 在发送数据之前做些什么
    if(config.method !== 'get'){
        // 在headers中新增authorization属性来携带token
        config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    }
    console.log('请求url为：' + config.url, config)
    return config;
}, err => {
    // 对响应错误做些什么
    Vue.prototype.$message.error('请求失败')
    return Promise.reject(err);
});

// 定义axios响应拦截器
Vue.prototype.$axios.interceptors.response.use(config => {
    // 在收到数据之前做些什么

    // 控制台输出接收到的响应全部数据
    console.log('响应url为：' + config.config.url, config)
    // 若返回的事件代码不为200（即不为数据响应而是状态响应）为用户提示后端传来的信息
    switch (config.data.code) {
        case 200:
            break;
        case 201:
        case 202:
        case 203:
            Vue.prototype.$message.success(config.data.message)
            break
        case 204:
            Vue.prototype.$message.warning(config.data.message)
            break
        default:
            Vue.prototype.$message.error("响应数据不是规范的数据")
    }
    // 替换响应数据，将具体数据替换到响应的data中
    config.data = config.data.data
    return config;
}, (err) => {
    // 对响应错误做些什么

    // 控制台输出错误信息
    console.log(err)
    // 若错误响应不为空即后台已响应并按规范返回了错误信息
    if (err.response) Vue.prototype.$message.error(err.response.data)
    // 若错误响应为空即后端未进行响应，识别为网络错误
    else Vue.prototype.$message.error('网络连接错误')

    if(err.response.status === 401) {
        console.log(Vue.prototype)
        Router.push('/login').catch()
        console.log(2)
    }
    return Promise.reject(err);
});