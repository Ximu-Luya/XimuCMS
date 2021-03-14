import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
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
                title: '云计算和并行计算'
            },
            children: [{
                    path: 'index',
                    component: () => import( /* webpackChunkName: "public" */ '../components/public/Index.vue'),
                    meta: {
                        title: '云计算和并行计算'
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
                    path: 'achievement/:id',
                    component: () => import( /* webpackChunkName: "public" */ '../components/public/Achievement_detail.vue'),
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
                {
                    path: 'blog/:id',
                    component: () => import( /* webpackChunkName: "public" */ '../components/public/Blog_detail.vue'),
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
            children: [
                {
                    path: 'index',
                    component: () => import( /* webpackChunkName: "admin" */ '../components/admin/Index.vue'),
                    meta: {
                        title: '首页'
                    }
                }, 
                {
                    path: 'content_achievement',
                    component: () => import( /* webpackChunkName: "admin" */ '../components/admin/Content_achievement.vue'),
                    meta: {
                        title: '团队成果'
                    }
                },
                {
                    path: 'content_blog',
                    component: () => import( /* webpackChunkName: "admin" */ '../components/admin/Content_blog.vue'),
                    meta: {
                        title: '博客'
                    }
                },
                {
                    path: 'users',
                    component: () => import( /* webpackChunkName: "admin" */ '../components/admin/UserManage.vue'),
                    meta: {
                        title: '用户管理'
                    }
                },
            ]
        },
        {
            path: '/login',
            component: () => import( /* webpackChunkName: "admin" */ '../components/Login'),
            meta: {
                title: '后台管理登录'
            }
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

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    if (to.path !== '/public/index') document.title = `${to.meta.title} | 云计算和并行计算`; //改变页面标题名称
    else document.title = `云计算和并行计算团队`;

    const noLoginPaths = ['public', 'login'];
    if (!noLoginPaths.some(p => {return to.path.indexOf(p) !== -1})) {
        const token = localStorage.getItem('token');

        if (token) {
            if (sessionStorage.getItem('verify') !== 'yes') {
                Vue.prototype.$axios.post('/user/verify').then(() => {
                    sessionStorage.setItem('verify', 'yes')
                    next()
                })
                .catch(err => {
                    console.log(err)
                    next('/login');
                })
            }
            else next()
        }
        else {
            next('/login');
            Vue.prototype.$message({
                message: '您还未登录，请先登录',
                type: 'warning'
            });
        }
    }
    next();
});

export default router