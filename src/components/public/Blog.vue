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
            <div class="blog_container">
                <div
                    class="blog_item"
                    v-for="item in blogs"
                    :key="item.blog_title"
                >
                    <router-link to="">
                        <h4 class="blog_title">
                            <el-tag type="danger">{{ item.blog_type }}</el-tag>
                            {{ item.blog_title }}
                        </h4>
                    </router-link>
                    <p class="blog_content">{{ item.blog_summary }}</p>
                    <div class="blog_info">
                        <p>
                            <span class="date">{{ item.date }}</span>
                            <span class="read-num">
                                <i class="el-icon-view"></i>
                                {{ item.view_num }}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="pagination">
            <el-pagination
                :hide-on-single-page="true"
                :page-size="6"
                :total="blogs.length"
                layout="prev, pager, next"
            >
            </el-pagination>
        </section>
    </div>
</template>

<script>
export default {
    name: "Blog",
    data() {
        return {
            blogs: [],
        };
    },
    mounted() {
        this.getBlogData();
    },
    methods: {
        getBlogData() {
            const _this = this;
            _this.$axios.get("blogs.json").then((res) => {
                console.log(res.data);
                _this.blogs = res.data.blogs;
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/childPages.scss";
#blog_index {
    .blog_container {
        display: flex;
        flex-direction: column;
        max-width: 1200px;
        width: 50%;

        .blog_item {
            padding: 15px 10px;
            p,
            h4 {
                margin: 0;
            }
            .blog_title {
                color: #222226;
                cursor: pointer;
                &:hover {
                    color: #5094d5;
                }
            }
            .blog_content {
                color: #999aaa;
                line-height: 22px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                margin-top: 5px;
            }
            .blog_info {
                color: #5f6471;
                margin-top: 5px;
                align-content: center !important;
                font-size: 14px;
                .read-num {
                    margin-left: 10px;
                }
            }
        }
    }
    .pagination{
        display: flex;
        justify-content: center;
        padding-bottom: 20px;
        ::v-deep *{
            background-color: rgb(0, 0, 0, 0) !important;
        }
    }
}
</style>