import Vue from 'vue'
import App from './App.vue'
import router from './router' // 引入目录下自定义的router API
import ElementUI from 'element-ui'; //引入element-ui
import 'element-ui/lib/theme-chalk/index.css'; //引入element-ui样式
import axios from 'axios';


Vue.use(ElementUI, {
    size: 'small'
}); //使用element-ui并修改组件内置大小

// axios基础配置并定义axios全局变量
Vue.prototype.$axios = process.env.NODE_ENV === 'development' ? axios.create({
    // baseURL: 'https://www.easy-mock.com/mock/5fb0accea12a7e2dea86f430/grapes',
    timeout: 5000
}) :  axios.create({
    // 此处填入生产环境请求baseURL
    // baseURL: 'https://www.easy-mock.com/mock/5fb0accea12a7e2dea86f430/grapes',
    timeout: 5000
});

// 定义axios响应拦截器
Vue.prototype.$axios.interceptors.response.use((config) => {
    // 在收到数据之前做些什么
    // console.log(config)
    return config;
}, (err) => {
    // 对响应错误做些什么
    console.log(err.response.status)
    Vue.prototype.$message({
        message: '网络连接失败',
        type: 'error'
    });
    return Promise.reject(err);
});

Vue.config.productionTip = false;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | XimuCMS`; //改变页面标题名称
    next();
    // const role = localStorage.getItem('username');
    // const noLoginPaths = ['/login', '/register', '/forgetpassword'];
    // // if(to.path == '/login'){
    // //     let updates = '<ul>' + 
    // //         '<li>引入echarts主题</li>' + 
    // //         '<li>绘图部分组件化</li>' + 
    // //         '<li>登录页对Enter键响应</li>' + 
    // //         '<li>增加模块设置一键绘制按钮</li>' + 
    // //         '<li>实现图表绘制组件动态添加</li>' + 
    // //         '<li>完善页面变化时重置图表</li>' + 
    // //         '<li>新增更新内容提示框</li>' + 
    // //         '<li>监听窗口变化重新绘制图表</li>' + 
    // //         '<li>新增工具栏 - 切换数据类型</li>' + 
    // //         '<li>图表对宽屏响应式变化</li>' + 
    // //         '</ul>';
    // //     Vue.prototype.$alert(updates, '此次更新内容', {
    // //         confirmButtonText: '确定',
    // //         dangerouslyUseHTMLString: true,
    // //         callback: action => {
    // //           this.$message({
    // //             type: 'info',
    // //             message: `action: ${ action }`
    // //           });
    // //         }
    // //       });
    // // }
    // // if (!(role || noLoginPaths.some(p => p === to.path))) {  //对未登录用户设置全局路由拦截
    // //     next('/login');
    // //     Vue.prototype.$message({
    // //         message: '您还未登录，请先登录',
    // //         type: 'warning'
    // //     });
    // // }
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')