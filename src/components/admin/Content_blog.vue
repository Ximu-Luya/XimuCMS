<template>
    <div class="admin-page-container">
        <el-form class="handle-box">
            <el-select
                v-model="filter.author_id"
                :remote-method="filterAuthor"
                class="handle-select mr10"
                clearable
                filterable
                placeholder="作者"
                remote
            >
                <el-option
                    v-for="item in authorOptions"
                    :key="item['id']"
                    :value="item['id']"
                    :label="item['name']"
                >
                </el-option>
            </el-select>
            <el-select
                v-model="filter.type"
                class="handle-select mr10"
                clearable
                placeholder="博客类型"
            >
                <el-option value="原创"></el-option>
                <el-option value="转载"></el-option>
                <el-option value="活动博客"></el-option>
            </el-select>
            <el-input
                v-model="filter.name"
                class="handle-input mr10"
                placeholder="博客标题"
            ></el-input>
            <el-button icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
            <el-button icon="el-icon-refresh" @click="handleResetSearch">重置</el-button>
        </el-form>
        <el-form class="handle-box">
            <el-button class="mr10" icon="el-icon-plus" type="primary" @click="handleNew">新增博客</el-button>
            <el-button class="mr10" icon="el-icon-delete" type="danger" @click="delAllSelection">批量删除</el-button>
        </el-form>
        <el-table
            ref="multipleTable"
            :data="tableData"
            class="table"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
        >
            <el-table-column align="center" type="selection" width="50"></el-table-column>
            <el-table-column label="博客标题" min-width="200" prop="title"></el-table-column>
            <el-table-column align="center" label="博客标签" min-width="100">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.tag_list.indexOf('转载') !== -1" :type="'success'">转载</el-tag>
                    <el-tag v-if="scope.row.tag_list.indexOf('原创') !== -1" :type="'danger'">原创</el-tag>
                    <el-tag v-if="scope.row.tag_list.indexOf('活动') !== -1" :type="'warning'">活动</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="博客板块" min-width="100">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.section === '内部展示'" :type="'success'">内部展示</el-tag>
                    <el-tag v-if="scope.row.section === '外部公示'" :type="'warning'">外部公示</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="作者" min-width="80" prop="author"></el-table-column>
            <el-table-column
                label="最后编辑时间"
                min-width="100"
                prop="updatetime"
            ></el-table-column>
            <el-table-column align="center" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                        icon="el-icon-edit"
                        type="text"
                        @click="handleEdit(scope.row)"
                    >编辑
                    </el-button
                    >
                    <el-button
                        class="red"
                        icon="el-icon-delete"
                        type="text"
                        @click="handleDelete(scope.row)"
                    >删除
                    </el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div class="pagination">
            <el-pagination
                :current-page="pagination.pageCurrent"
                :page-size="10"
                :total="pagination.pageTotal"
                background
                layout="total, prev, pager, next"
                @current-change="handlePageChange"
            ></el-pagination>
        </div>

        <el-dialog
            :visible.sync="dialogBlogVisible"
            custom-class="blog-dialog"
            destroy-on-close
            :close-on-click-modal="false"
            :title="blogDetails.dialogTitle"
            top="5vh"
            width="80%"
            @close="$refs['blogDetails'].resetFields()"
        >
            <el-form :model="blogDetails" ref="blogDetails" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="24" :md="24">
                        <el-form-item label="博客标题" prop="title">
                            <el-input v-model="blogDetails.title" placeholder="请填写博客标题"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="博客类型" prop="tag_list">
                            <el-select v-model="blogDetails.tag_list" placeholder="请选择博客类型" multiple>
                                <el-option value="原创"></el-option>
                                <el-option value="转载"></el-option>
                                <el-option value="活动"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="博客板块" prop="section">
                            <el-select v-model="blogDetails.section" placeholder="请选择博客板块">
                                <el-option value="内部展示"></el-option>
                                <el-option value="外部公示"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="博客作者" prop="author_id">
                            <el-input v-model="blogDetails.author" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item prop="content" label-width="0px">
                            <mavon-editor
                                v-model="blogDetails.content"
                                ref="mavonEditor"
                                style="width: 100%"
                                @imgAdd="imgAdd"
                                @imgDel="imgDel"
                            ></mavon-editor>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogBlogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
let mavonEditor = require('mavon-editor')
import 'mavon-editor/dist/css/index.css'
import {mapState} from 'vuex'

export default {
    name: "Content_blog",
    data() {
        return {
            // 筛选器
            filter: {
                author_id: "",
                type: "",
                name: "",
            },
            // 作者远程搜索选项
            authorOptions: [],
            // 表格数据
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
            blogDetails: {
                order: '',
                dialogTitle: '',
                id: '',
                title: '',
                tag_list: [],
                section: '',
                author: '',
                author_id: '',
                content: ''
            },
        };
    },
    computed: mapState('userinfo', {
        user: 'user'
    }),
    components: {
        'mavon-editor': mavonEditor.mavonEditor
    },
    mounted() {
        this.getBlogData(1);
    },
    methods: {
        // 获取表格内容
        getBlogData(page) {
            const _this = this;
            _this.tableData = [];
            _this.$axios.get("/getBlogData/" + page).then((res) => {
                _this.pagination.pageTotal = res.data.pageTotal;
                for (let item of res.data.blogData) {
                    const {id, title, tag_list, section, name, update_time} = item;
                    _this.tableData.push({
                        id: id,
                        title: title,
                        tag_list: tag_list,
                        section: section,
                        author: name,
                        updatetime: update_time,
                    });
                }
            });
        },
        // 筛选-作者选择框远程搜索方法
        filterAuthor(author) {
            const _this = this;
            _this.authorOptions = [];
            if (author) _this.$axios.get('/userlike/' + author).then(res => {
                for (let item of res.data) {
                    _this.authorOptions.push(item)
                }
            })
        },
        // TODO 筛选搜索
        handleSearch() {
        },
        // 重置筛选搜索
        handleResetSearch() {
            this.filter = {
                author_id: "",
                type: "",
                name: "",
            }
            this.getBlogData(this.pagination.pageCurrent)
        },
        // 批量删除
        delAllSelection() {
            let blogs = [];
            for (let item of this.multipleSelection) blogs.push(item.id)
            this.handleDelete(blogs);
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 处理表格内编辑操作
        handleEdit(row) {
            const _this = this;
            _this.$axios.get('/getBlogDetail/' + row.id).then(res => {
                const {id, title, tag_list, section, user_id, name, blog_content} = res.data[0];
                _this.$nextTick(() => {
                    _this.blogDetails = {
                        order: 'edit',
                        dialogTitle: '编辑博客',
                        id: id,
                        title: title,
                        tag_list: tag_list.split(","),
                        section: section,
                        author: name,
                        author_id: user_id,
                        content: blog_content
                    }
                })
            })
            _this.dialogBlogVisible = true;
        },
        // 处理表格内删除操作
        handleDelete(row) {
            const _this = this;
            // 二次确认删除
            _this.$confirm("确定要删除吗？", "提示", {
                type: "warning",
            }).then(() => {
                _this.$axios.post('/deleteBlog',
                    Object.prototype.toString.call(row) === '[object Array]'
                        ? {"blog_ids": row}
                        : {"blog_ids": [row.id]})
                    .then(res => {
                        if (res.status === 200) {
                            _this.$message.success("删除成功");
                            _this.getBlogData(_this.pagination.pageCurrent);
                        }
                    })
            });
        },
        // 分页导航-处理页码变更
        handlePageChange(val) {
            this.getBlogData(val);
        },
        // 处理新增博客
        handleNew() {
            const _this = this;
            _this.dialogBlogVisible = true;
            _this.blogDetails.dialogTitle = '新增博客';
            _this.blogDetails.order = 'new';
            _this.blogDetails.author = _this.user.name;
            _this.blogDetails.author_id = _this.user.id;
        },
        // 处理博客编辑保存
        handleSave() {
            const _this = this;
            // 对标签列表的数组进行字符串转换
            const {title, tag_list, section, author_id, content} = _this.blogDetails;
            const blog = {
                title: title,
                tag_list: tag_list.toString(),
                section: section,
                author_id: author_id,
                content: content
            }
            // 判断博客信息是否填写完整
            for (let item in blog)
                if (blog[item] === '') {
                    this.$message({
                        type: 'error',
                        message: '请检查信息是否填写完整'
                    });
                    return
                }
            // 向后端发送请求
            _this.$axios.post(_this.blogDetails.order === 'new'
                ? '/createNewBlog'
                : ('/updateBlog/' + _this.blogDetails.id), blog)
                .then(res => {
                    if (res.status === 200) {
                        _this.$message.success('保存成功');
                        _this.dialogBlogVisible = false;
                        _this.getBlogData(_this.pagination.pageCurrent);
                    }
                })
        },
        // 处理图片上传
        imgAdd (pos, file) {
            let _this = this;
            let formdata = new FormData();
            formdata.append('imgFile', file)
            // console.log(formdata.getAll('imgFile'))
            _this.$axios.post('/uploadImg', formdata).then(res => {
                _this.$refs.mavonEditor.$img2Url(pos, res.data.url)
            })
        },
        // TODO
        imgDel (a, b, c, d){
            console.log(a,b,c,d)
        }
    },
};
</script>

<style lang="scss" scoped>
.admin-page-container {
    .blog-table {
        .blog-title-button {
            padding: 0;
            color: #000000;
        }
    }
}
</style>
