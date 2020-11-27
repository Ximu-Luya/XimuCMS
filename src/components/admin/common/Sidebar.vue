<template>
    <div class="sidebar" :class="{'sidebar-collapse':collapse}">
        <logo :collapse="collapse"></logo>
        <div class="menu-container">
            <el-menu
                class="sidebar-el-menu"
                :default-active="onRoutes"
                :collapse="collapse"
                background-color="#324157"
                text-color="#bfcbd9"
                active-text-color="#20a0ff"
                :collapse-transition="false"
                router
            >
                <template v-for="item in items">
                    <template v-if="item.roleif.search(role) != -1">
                        <template v-if="item.subs">
                            <el-submenu :index="item.index" :key="item.index">
                                <template slot="title">
                                    <i :class="item.icon"></i>
                                    <span slot="title">{{ item.title }}</span>
                                </template>
                                <template v-for="subItem in item.subs">
                                    <el-submenu
                                        v-if="subItem.subs"
                                        :index="subItem.index"
                                        :key="subItem.index"
                                    >
                                        <template slot="title">{{ subItem.title }}</template>
                                        <el-menu-item
                                            v-for="(threeItem,i) in subItem.subs"
                                            :key="i"
                                            :index="threeItem.index"
                                        >{{ threeItem.title }}</el-menu-item>
                                    </el-submenu>
                                    <el-menu-item
                                        v-else
                                        :index="subItem.index"
                                        :key="subItem.index"
                                    >{{ subItem.title }}</el-menu-item>
                                </template>
                            </el-submenu>
                        </template>
                        <template v-else>
                            <el-menu-item :index="item.index" :key="item.index">
                                <i :class="item.icon"></i>
                                <span slot="title">{{ item.title }}</span>
                            </el-menu-item>
                        </template>
                    </template>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
import logo from './Logo';

export default {
    name: 'Sidebar',
    data(){
        return {
            // 左侧菜单栏折叠
            // collapse: false,
            // 角色信息
            role: '',
            // 菜单内容
            items: [
                {
                    icon: 'el-icon-monitor',
                    index: 'dashboard',
                    title: '首页',
                    roleif: 'root admin custom',
                    subs: [
                        {
                            index: 'index',
                            title: '仪表盘'
                        },
                        {
                            index: 'task',
                            title: '工作流任务'
                        },
                    ]
                },
                {
                    icon: 'el-icon-document-copy',
                    index: 'content',
                    title: '内容创作',
                    roleif: 'root custom',
                    subs: [
                        {
                            index: 'content_index',
                            title: '主页'
                        },
                        {
                            index: 'content_achievement',
                            title: '团队成果'
                        },
                        {
                            index: 'content_blog',
                            title: '博客'
                        }
                    ]
                },
                {
                    icon: 'el-icon-user',
                    index: 'setting_pannel',
                    title: '设置面板',
                    roleif: 'root admin',
                    subs: [
                        {
                            index: 'users',
                            title: '用户管理'
                        },
                        {
                            index: 'roles',
                            title: '角色管理'
                        },
                        {
                            index: 'menus',
                            title: '菜单管理',
                        }
                    ]
                }
            ]
        };
    },
    components: {
        logo
    },
    computed: {
        onRoutes() {
            return this.$route.path.split('/')[2];
        },
        collapse() {
            return this.$store.getters.getCollapse;
        }
    },
    mounted(){
        this.$nextTick(() => {
            console.log(this.onRoutes)
        })
    }
}
</script>

<style>
.sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 200px;
    transition: all 0.3s ease-in-out;
    overflow-x: hidden;
}
.sidebar-collapse {
    width: 64px;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.menu-container{
    background-color: #324157;
    height: 100%;
}
.sidebar-el-menu {
    border: none;
}
.sidebar > ul {
    height: 100%;
    border: none;
}
</style>