import Vue from 'vue'
import axios from "axios";

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
    Vue.prototype.$message({
        message: '请求失败',
        type: 'error'
    });
    return Promise.reject(err);
});

// 定义axios响应拦截器
Vue.prototype.$axios.interceptors.response.use(config => {
    // 在收到数据之前做些什么
    console.log('响应url为：' + config.config.url, config)
    Vue.prototype.$message.success(config.data.message)
    config.data = config.data.data
    return config;
}, (err) => {
    // 对响应错误做些什么
    console.log(err.response)
    if (err.response) Vue.prototype.$message.error(err.response.data)
    else Vue.prototype.$message.error('网络连接错误')
    return Promise.reject(err);
});