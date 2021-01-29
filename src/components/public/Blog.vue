<!--suppress JSDeprecatedSymbols -->
<template>
    <div id="blog_index">
        <section class="page_header">
            <div class="title_container">
                <h1>博客</h1>
                <p>
                    这里是由团队成员创作的博客，记录一些开发时遇到的问题与其解决方法，在此分享开发心得与经验，共同进步。
                </p>
                <div class="hr-logo"><i class="el-icon-notebook-2"></i></div>
            </div>
        </section>
        <section class="page_content">
            <div class="content_container">
                <div
                    class="article_item"
                    v-for="item in blogs"
                    :key="item.id"
                >
                    <router-link :to="item.id.toString()" append>
                        <div class="box-top">
                            <h4 class="title">{{ item.title }}</h4>
                        </div>
                        <div class="box-content">{{ item.summary }}</div>
                        <div class="box-bottom">
                            <el-tag type="danger">{{ item.tag_list }}</el-tag>
                            <span class="release_time">发布于 {{ item.release_time }}</span>
                        </div>
                    </router-link>
                </div>
    
                <section class="pagination">
                    <!-- 分页组件 -->
                    <el-pagination
                        :current-page="pagination.pageCurrent"
                        :page-size="6"
                        :total="pagination.pageTotal"
                        background
                        layout="total, prev, pager, next"
                        @current-change="handlePageChange"
                    ></el-pagination>
                </section>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "Blog",
    data() {
        return {
            blogs: [],
            // 页数
            pagination: {
                pageCurrent: 1,
                pageTotal: 0,
            },
        };
    },
    mounted() {
        this.getBlogData(1);
    },
    methods: {
        getBlogData(page) {
            const _this = this;
            _this.$axios.get(`/blog?page=${page}`).then(({data}) => {
                _this.pagination.pageTotal = data.pageTotal;
                _this.blogs = data.blogs;
            });
        },
        // 分页导航-处理页码变更
        handlePageChange(val) {
            this.getBlogData(val);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/childPages.scss";
</style>