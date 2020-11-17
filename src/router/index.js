import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [{
            path: '/',
            redirect: '/index'
        },
        // {
        //     path: '/login',
        //     component: () => import( /* webpackChunkName: "login" */ '../components/pages/Login.vue'),
        //     // component: login,
        //     meta: {
        //         title: '登录'
        //     }
        // },
        {
            path: '/index',
            component: () => import( /* webpackChunkName: "login" */ '../components/Index.vue'),
            meta: {
                title: '首页'
            }
        },
        {
            path: '/blog',
            component: () => import( /* webpackChunkName: "login" */ '../components/pages/public/Blog.vue'),
            meta: {
                title: '博客'
            }
        },
        {
            path: '/404',
            component: () => import(/* webpackChunkName: "404" */ '../components/pages/404.vue'),
            meta: {
                title: '404'
            }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});