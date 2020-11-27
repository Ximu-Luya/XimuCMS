<template>
    <div class="admin-container">
        <div class="blog-table">
            <el-table :data="blogData" stripe style="width: 100%">
                <el-table-column label="博客标题" min-width="180">
                    <template slot-scope="scope">
                        <el-button
                            class="blog-title-button"
                            type="text"
                            @click="openBlogDetail(scope.row.blog_id)"
                        >
                            {{ scope.row.blog_title }}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="最后编辑时间" width="250">
                </el-table-column>
                <el-table-column prop="author" label="最后编辑者" width="180">
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
            title="博客详情"
            :visible.sync="dialogBlogVisible"
            width="80%"
            custom-class="blog-dialog"
            top="5vh"
            destroy-on-close
        >
            <el-form :model="BlogDetails">
                <el-form-item
                    label="博客标题"
                    :label-width="BlogDetails.formLabelWidth"
                >
                    <el-input
                        v-model="BlogDetails.blog_title"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="博客作者"
                    :label-width="BlogDetails.formLabelWidth"
                >
                    <el-select
                        v-model="BlogDetails.author"
                        placeholder="请选择活动区域"
                    >
                    </el-select>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Content_blog",
    data() {
        return {
            blogData: [],
            dialogBlogVisible: false,
            BlogDetails: {
                formLabelWidth: "120px",
            },
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
                _this.blogData = res.data.blogs;
            });
        },
        openBlogDetail(id) {
            const _this = this;
            console.log(id);
            _this.dialogBlogVisible = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.admin-container {
    .blog-table {
        .blog-title-button {
            padding: 0;
            color: #000;
        }
    }
}
// ::v-deep .blog-dialog {
//     height: 90vh;
// }
</style>