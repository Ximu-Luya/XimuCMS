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

        ::v-deep.admin-page-container{
            background-color: #fff;
            border-radius: 5px;
            padding: 20px;

            .handle-box {
                margin-bottom: 15px;
                .handle-select {
                    width: 120px;
                }

                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
            }

            .table {
                width: 100%;
                font-size: 14px;

                .overlength {
                    white-space: nowrap; /*设置不换行*/
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }

            .pagination {
                margin-top: 20px;
                text-align: right;
            }

            .red {
                color: #ff0000;
            }
            .yellow {
                color: #ffc832;
            }
            .green {
                color: #1ef050;
            }
            .mr10 {
                margin-right: 10px;
            }
        }
    }
}
</style>