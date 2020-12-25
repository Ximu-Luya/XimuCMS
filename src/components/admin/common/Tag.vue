<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li
                class="tags-li"
                v-for="(item,index) in tagsList"
                :class="{'active': isActive(item.path)}"
                :key="index"
            >
                <router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
                <span class="tags-li-icon" @click="closeTags(index)">
                    <i class="el-icon-close"></i>
                </span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
// import bus from './bus';
export default {
    data() {
        return {
            tagsList: []
        };
    },
    computed: {
        showTags() {
            return this.tagsList.length > 0;
        }
    },
    watch: {
        $route(newValue) {
            // console.log(newValue, oldValue);
            this.setTags(newValue);
        }
    },
    created() {
        this.setTags(this.$route);
    },
    methods: {
        isActive(path) {
            return path === this.$route.fullPath;
        },
        // 关闭单个标签
        closeTags(index) {
            const delItem = this.tagsList.splice(index, 1)[0];
            const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
            if (item) {
                delItem.path === this.$route.fullPath && this.$router.push(item.path);
            } else {
                this.$router.push('/');
            }
        },
        // 关闭全部标签
        closeAll() {
            if(this.$route.path != '/admin/index'){
                this.tagsList = [];
                this.$router.push('/');
            }
            else{
                this.closeOther();
            }
        },
        // 关闭其他标签
        closeOther() {
            const curItem = this.tagsList.filter((item) => {
                return item.path === this.$route.fullPath;
            });
            this.tagsList = curItem;
        },
        // 设置标签
        setTags(route) {
            const isExist = this.tagsList.some((item) => {
                return item.path === route.fullPath;
            });
            if (!isExist) {
                if (this.tagsList.length >= 8) {
                    this.tagsList.shift();
                }
                this.tagsList.push({
                    title: route.meta.title,
                    path: route.fullPath,
                    name: route.matched[1].components.default.name
                });
            }
            
            this.$store.commit('setTags', this.tagsList);
        },
        handleTags(command) {
            command === 'other' ? this.closeOther() : this.closeAll();
        }
    },
};
</script>


<style lang="scss" scoped>
.tags {
    position: relative;
    height: 30px;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
    box-shadow: 0 5px 10px #ddd;

    ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;

        .tags-li {
            float: left;
            margin: 5px;
            border-radius: 3px;
            font-size: 12px;
            overflow: hidden;
            cursor: pointer;
            height: 23px;
            line-height: 23px;
            border: 1px solid #e9eaec;
            background: #fff;
            padding-right: 5px;
            vertical-align: middle;
            color: #666;
            -webkit-transition: all 0.3s ease-in;
            -moz-transition: all 0.3s ease-in;
            transition: all 0.3s ease-in;
            .tags-li-title {
                padding: 0 12px;
            }

            &:not(.active):hover {
                background: #f8f8f8;
            }
            &.active{
                color: #fff;
                border: 1px solid #409EFF;
                background-color: #409EFF;
            }
        }
    }

    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
        z-index: 10;
    }
}
</style>
