<template>
    <div id="public-container">
        <xm-header></xm-header>
        <xm-sidebar></xm-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <xm-tags></xm-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import xmHeader from "./admin/common/Header.vue";
import xmSidebar from "./admin/common/Sidebar.vue";
import xmTags from "./admin/common/Tag.vue";

export default {
    name: "AdminContainer",
    data() {
        return {
            // tagsList: [],
            // collapse: false
        };
    },
    components: {
        xmHeader,
        xmSidebar,
        xmTags
    },
    computed: {
        collapse() {
            return this.$store.getters.getCollapse;
        },
        tagsList() {
            return this.$store.getters.gettagsList;
        }
    },
    // created() {
        // bus.$on('collapse-content', msg => {
        //     this.collapse = msg;
        // });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        // bus.$on('tags', msg => {
        //     let arr = [];
        //     for (let i = 0, len = msg.length; i < len; i++) {
        //         msg[i].name && arr.push(msg[i].name);
        //     }
        //     this.tagsList = arr;
        // });
    // }
}
</script>

<style lang="scss" scoped>
.content-box {
    position: absolute;
    left: 200px;
    right: 0;
    top: 50px;
    bottom: 0;
    padding-bottom: 30px;
    transition: left .3s ease-in-out;
    background: #f0f0f0;

    &.content-collapse {
        left: 65px;
    }
    .content {
        position: absolute;
        top: 30px; bottom: 0;
        left: 0;right: 0;
        padding: 10px;
        overflow: auto;
        box-sizing: border-box;
    }
}
</style>