import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [{
            path: '/',
            redirect: '/public'
        },
        {
            path: '/public',
            component: () => import( /* webpackChunkName: "public" */ '../components/PublicContainer.vue'),
            redirect: '/public/index',
            meta: {
                title: '首页'
            },
            children: [{
                    path: 'index',
                    component: () => import( /* webpackChunkName: "public" */ '../components/public/Index.vue'),
                    meta: {
                        title: '首页'
                    }
                },
                {
                    path: 'achievement',
                    component: () => import( /* webpackChunkName: "public" */ '../components/public/Achievement.vue'),
                    meta: {
                        title: '团队成果'
                    }
                },
                {
                    path: 'blog',
                    component: () => import( /* webpackChunkName: "public" */ '../components/public/Blog.vue'),
                    meta: {
                        title: '博客'
                    }
                },
            ]
        },
        {
            path: '/admin',
            component: () => import( /* webpackChunkName: "admin" */ '../components/AdminContainer.vue'),
            redirect: '/admin/index',
            children: [{
                    path: 'index',
                    component: () => import( /* webpackChunkName: "admin" */ '../components/admin/Index.vue'),
                    meta: {
                        title: '管理首页'
                    }
                }, 
            ]
        },
        {
            path: '/404',
            component: () => import( /* webpackChunkName: "404" */ '../components/404.vue'),
            meta: {
                title: '404'
            }
        },
        // {
        //     path: '*',
        //     redirect: '/404'
        // }
    ]
});