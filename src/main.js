import Vue from 'vue'
import App from './App.vue'
import router from './router/index' // 引入目录下自定义的router API
import ElementUI from 'element-ui' // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'; // 引入element-ui样式
import "./utils/axios"
import store from './store'

//使用element-ui并修改组件内置大小
Vue.use(ElementUI, {
    size: 'small'
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')