<template>
    <div class="admin-page-container">
        <el-form class="handle-box">
            <el-select
                v-model="filter.author"
                filterable
                remote
                clearable
                :remote-method="filterAuthor"
                :loading="filterLoading"
                placeholder="作者"
                class="handle-select mr10">
                <el-option
                    v-for="item in authorOptions"
                    :key="item.value"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-select
                v-model="filter.type"
                clearable
                placeholder="博客类型"
                class="handle-select mr10"
            >
                <el-option value="原创"></el-option>
                <el-option value="转载"></el-option>
                <el-option value="活动博客"></el-option>
            </el-select>
            <el-input
                v-model="filter.name"
                placeholder="博客标题"
                class="handle-input mr10"
            ></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <el-button icon="el-icon-refresh" @click="handleResetSearch">重置</el-button>
        </el-form>
        <el-form class="handle-box">
            <el-button type="primary" icon="el-icon-plus" class="mr10">新增成果</el-button>
            <el-button type="danger" icon="el-icon-delete" class="mr10" @click="delAllSelection"
                >批量删除</el-button
            >
        </el-form>
        <el-table
            :data="tableData"
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column prop="title" min-width="200" label="博客标题"></el-table-column>
            <el-table-column min-width="80" label="博客类型" align="center">
                <template slot-scope="scope">
                    <el-tag :type="'success'" v-if="scope.row.type === '转载'">{{
                        scope.row.type
                    }}</el-tag>
                    <el-tag :type="'danger'" v-if="scope.row.type === '原创'">{{
                        scope.row.type
                    }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="author" min-width="80" label="作者"></el-table-column>
            <el-table-column
                prop="updatetime"
                min-width="100"
                label="最后编辑时间"
            ></el-table-column>
            <el-table-column width="180" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        icon="el-icon-edit"
                        @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        type="text"
                        icon="el-icon-delete"
                        class="red"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next"
                :current-page="pagination.pageCurrent"
                :page-size="10"
                :total="pagination.pageTotal"
                @current-change="handlePageChange"
            ></el-pagination>
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
                <el-form-item label="博客标题" :label-width="BlogDetails.formLabelWidth">
                    <el-input v-model="BlogDetails.blog_title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="博客类型" :label-width="BlogDetails.formLabelWidth">
                    <el-select v-model="BlogDetails.author" placeholder="请选择博客类型">
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
            // 筛选器
            filter: {
                author: "",
                type: "",
                name: "",
            },
            // 作者远程搜索选项
            authorOptions: [],
            // 作者远程搜做Loading动画
            filterLoading: false,
            tableData: [],
            // 多选
            multipleSelection: [],
            // 页数
            pagination: {
                pageCurrent: 1,
                pageTotal: 0,
            },
            // 博客编辑对话框
            dialogBlogVisible: false,
            // 博客细节
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
                // _this.tableData = res.data.blogs;
                for (let item of res.data.blogs) {
                    _this.tableData.push({
                        title: item.blog_title,
                        type: item.blog_type,
                        author: item.author,
                        updatetime: item.date,
                    });
                }
            });
        },
        // 筛选-作者选择框远程搜索方法
        filterAuthor(author) {
            const _this = this;
            console.log(author);
            _this.filterLoading = true;
            _this.filterLoading = false;
        },
        // 筛选搜索
        handleSearch() {},
        // 重置筛选搜索
        handleResetSearch() {},
        // 批量删除
        delAllSelection() {},
        // 多选操作
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val;
        },
        // 处理表格内编辑操作
        handleEdit(index, row) {
            console.log(index, row);
            // this.editVisible = true;
            const _this = this;
            _this.dialogBlogVisible = true;
        },
        // 处理表格内删除操作
        handleDelete(index, row) {
            // 二次确认删除
            console.log(row);
            this.$confirm("确定要删除吗？", "提示", {
                type: "warning",
            }).then(() => {
                this.$message.success("删除成功");
                this.tableData.splice(index, 1);
            });
        },
        // 分页导航-处理页码变更
        handlePageChange(val) {
            console.log("当前是第" + val + "页");
            // this.getData();
        },
    },
};
</script>

<style lang="scss" scoped>
.admin-page-container {
    .blog-table {
        .blog-title-button {
            padding: 0;
            color: #000;
        }
    }
}
</style>
