<template>
    <div class="header" :class="{'header-collapse':collapse}">
        <div class="header-left">
            <!-- 折叠按钮 -->
            <div class="collapse-btn" @click="collapseChage">
                <i v-if="!collapse" class="el-icon-s-fold"></i>
                <i v-else class="el-icon-s-unfold"></i>
            </div>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i style="transform: rotate(45deg);" class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip
                        effect="dark"
                        :content="message?`有${message}条未读消息`:`消息中心`"
                        placement="bottom"
                    >
                        <i class="el-icon-bell"></i>
                        <!-- <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link> -->
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="@/assets/img/teacher头像.jpg" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <a
                            href="https://github.com/Ximu-Luya/XimuCMS"
                            target="_blank"
                        >
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a>
                        <el-dropdown-item divided command="person">个人中心</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!-- 版权信息 -->
                <div id="btn-copyright" @click="copyrightdrawer =true">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="版权信息"
                        placement="bottom"
                        :hide-after="2000"
                    >
                        <i class="el-icon-more" style="transform: rotate(90deg);"></i>
                    </el-tooltip>
                </div>
                <el-drawer
                    :visible.sync="copyrightdrawer"
                    :with-header="false"
                    append-to-body
                    size="300px"
                    custom-class="copyright"
                >
                    <div class="title">版权信息</div>
                    <div class="body">
                        <p class="version">当前版本: v{{version}}</p>
                        <p class="frame">基于框架: Vue、ElementUI</p>
                        <p>航空港校区 | 四川省成都市西南航空港经济开发区学府路一段24号</p>
                        <p>邮编：610225 | 电话：028-85966502</p>
                        <p class="copyright-info">© 2020 成都信息工程大学 版权所有</p>
                    </div>
                </el-drawer>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            collapse: false,
            fullscreen: false,
            name: 'linxin',
            message: 0,
            copyrightdrawer: false,
            version: '0.1.1',
            codeRequire: Boolean,
            screenWidth: Number
        };
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    mounted() {
        // 获取开启时浏览器窗口宽度
        this.screenWidth = document.body.clientWidth;
        if (this.screenWidth < 1100) {
            if (!this.collapse) this.collapseChage();
        }
        // 监听浏览器窗口宽度并决定左侧菜单是否收缩
        window.onresize = () => {
            return (() => {
                this.screenWidth = document.body.clientWidth;
                if (document.body.clientWidth < 1100) {
                    if (!this.collapse) this.collapseChage();
                } else {
                    if (this.collapse) this.collapseChage();
                }
            })();
        };
    },
    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username');
                this.$router.push('/login');
            }

            if (command == 'person') {
                this.$router.push('/person');
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            this.$store.commit('collapseChange', this.collapse)
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    }
};
</script>
<style scoped>
.header {
    position: absolute;
    box-sizing: border-box;
    left: 200px;
    right: 0;
    height: 50px;
    font-size: 22px;
    color: #000;
    -webkit-transition: left 0.3s ease-in-out;
    transition: left 0.3s ease-in-out;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.header * {
    display: flex;
    justify-content: center;
    align-items: center;
}
.header-collapse {
    left: 64px;
}
.collapse-btn {
    height: 50px;
    padding: 0 20px;
    line-height: 30px;
    cursor: pointer;
}
.header-right {
    padding-right: 20px;
}
.header-user-con {
    display: flex;
    align-items: center;
}
.btn-fullscreen {
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #000;
}
.btn-bell .el-icon-bell {
    color: #000;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #000;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
#btn-copyright {
    margin-left: 20px;
    cursor: pointer;
}
.copyright .title {
    height: 42px;
    line-height: 42px;
    padding: 0 15px;
    border-bottom: 1px solid #f6f6f6;
    color: #333;
}
.copyright .body {
    padding: 10px 15px;
    color: #666;
}
.copyright p {
    margin-bottom: 10px;
}
:focus {
    outline: none;
}
</style>
