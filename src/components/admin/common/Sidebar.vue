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
                unique-opened
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
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页',
                    roleif: 'root admin custom CMI security IDC_FM'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: 'form',
                    title: '表单相关',
                    roleif: 'root custom',
                    subs: [
                        {
                            index: 'shipmentApplicationForm',
                            title: '入库表单'
                        },
                        {
                            index: 'moveInAndOutApplicationForm',
                            title: '出入数据大厅表单'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-roundcheck',
                    index: 'approval',
                    title: '审批管理',
                    roleif: 'root CMI security IDC_FM',
                    subs: [
                        {
                            index: 'history',
                            title: '历史任务'
                        },
                        {
                            index: 'todo',
                            title: '我的待办'
                        }
                    ]
                },
                {
                    icon: 'el-icon-s-order',
                    index: 'myapplication',
                    title: '我的申请',
                    roleif: 'root custom'
                },
                {
                    icon: 'el-icon-lx-people',
                    index: 'usermanagement',
                    title: '用户管理',
                    roleif: 'root admin'
                },
                {
                    icon: 'el-icon-lx-group',
                    index: 'rolemanagement',
                    title: '角色管理',
                    roleif: 'root admin'
                },
                {
                    icon: 'el-icon-s-platform',
                    index: 'orgmanagement',
                    title: '机构管理',
                    roleif: 'root admin'
                },
                {
                    icon: 'el-icon-s-operation',
                    index: 'departmentmanagement',
                    title: '部门管理',
                    roleif: 'root admin'
                },
                {
                    icon: 'el-icon-s-cooperation',
                    index: 'positionmanagement',
                    title: '职位管理',
                    roleif: 'root admin'
                },
                {
                    icon: 'el-icon-menu',
                    index: 'menumanagement',
                    title: '菜单管理',
                    roleif: 'root admin'
                }
            ]
        };
    },
    components: {
        logo
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        },
        collapse() {
            return this.$store.getters.getCollapse;
        }
    },
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