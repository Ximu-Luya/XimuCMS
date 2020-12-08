<template>
  <div class="admin-page-container">
    <el-form class="handle-box">
      <el-select
          v-model="filter.author"
          :loading="filterLoading"
          :remote-method="filterAuthor"
          class="handle-select mr10"
          clearable
          filterable
          placeholder="作者"
          remote>
        <el-option
            v-for="item in authorOptions"
            :key="item.value"
            :value="item.value">
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
      <el-table-column align="center" label="博客类型" min-width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === '转载'" :type="'success'">
            {{ scope.row.type }}
          </el-tag>
          <el-tag v-if="scope.row.type === '原创'" :type="'danger'">
            {{ scope.row.type }}
          </el-tag>
          <el-tag v-if="scope.row.type === '活动'" :type="'warning'">
            {{ scope.row.type }}
          </el-tag>
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
              @click="handleEdit(scope.$index, scope.row)"
          >编辑
          </el-button
          >
          <el-button
              class="red"
              icon="el-icon-delete"
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
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
        title="博客详情"
        top="5vh"
        width="80%"
    >
      <el-form :model="blogDetails" ref="blogDetails" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="24" :md="12">
            <el-form-item label="博客标题" prop="title">
              <el-input v-model="blogDetails.title" placeholder="请填写博客标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :md="6">
            <el-form-item label="博客类型" prop="type">
              <el-select v-model="blogDetails.type" placeholder="请选择博客类型">
                <el-option value="原创"></el-option>
                <el-option value="转载"></el-option>
                <el-option value="活动"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :md="6">
            <el-form-item label="博客作者" prop="author_id">
              <el-input v-model="blogDetails.author" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="content" label-width="0px">
              <mavon-editor v-model="blogDetails.content" style="width: 100%"></mavon-editor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogBlogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave('blogDetails')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
let mavonEditor = require('mavon-editor')
import 'mavon-editor/dist/css/index.css'

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
      blogDetails: {
        title: '',
        type: '',
        author: '',
        author_id: '',
        content: ''
      },
    };
  },
  computed: {
    userInfo(){
      return this.$store.getters.getUserinfo;
    }
  },
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
          const {blog_id, blog_title, blog_type, user_name, update_time} = item;
          _this.tableData.push({
            id: blog_id,
            title: blog_title,
            type: blog_type,
            author: user_name,
            updatetime: update_time,
          });
        }
      });
    },
    // TODO 筛选-作者选择框远程搜索方法
    filterAuthor(author) {
      const _this = this;
      console.log(author);
      _this.filterLoading = true;
      _this.filterLoading = false;
    },
    // TODO 筛选搜索
    handleSearch() {
    },
    // TODO 重置筛选搜索
    handleResetSearch() {
    },
    // 批量删除
    delAllSelection() {
      let blogs = [];
      for (let item of this.multipleSelection) blogs.push(item.id)
      this.handleDelete('multiple', blogs);
    },
    // 多选操作
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    // 处理表格内编辑操作
    handleEdit(row) {
      const _this = this;
      _this.$axios.get('/getBlogDetail/' + row.id).then(res => {
        const {blog_id, blog_title, blog_type, user_name, blog_content} = res.data[0];
        _this.blogDetails = {
          order: 'edit',
          id: blog_id,
          title: blog_title,
          type: blog_type,
          author: user_name,
          content: blog_content
        }
      })
      _this.dialogBlogVisible = true;
    },
    // 处理表格内删除操作
    handleDelete(index, row) {
      const _this = this;
      // 二次确认删除
      console.log(row);
      _this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      }).then(() => {
        _this.$axios.post('/deleteBlog/',
        Object.prototype.toString.call(row) === '[object Array]'
            ? {"blog_ids": row}
            : {"blog_ids": [row.id]})
      .then(res => {
          if(res.data.status === 1) {
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
    handleNew(){
      const _this = this;
      _this.dialogBlogVisible = true
      _this.blogDetails.order = 'new';
      _this.blogDetails.author = _this.userInfo.name;
      _this.blogDetails.author_id = _this.userInfo.id;
    },
    // 处理博客编辑保存
    handleSave(formName) {
      const _this = this;
      // 判断博客信息是否填写完整
      for (let item in _this.blogDetails)
        if (_this.blogDetails[item] === '') {
          this.$message({
            type: 'error',
            message: '请检查信息是否填写完整'
          });
          return
        }
      
      _this.$axios.post(_this.blogDetails.order === 'new'
          ? '/createNewBlog'
          : ('/updateBlog/' + _this.blogDetails.id), _this.$refs[formName].model)
      .then(res => {
        console.log(res)
        if(res.data.status === 1){
          _this.$refs[formName].resetFields();
          _this.$message({
            type: 'success',
            message: '保存成功'
          });
          _this.dialogBlogVisible = false;
          _this.getBlogData(_this.pagination.pageCurrent);
        }
      })
    },
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
