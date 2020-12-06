<template>
  <div class="admin-page-container">
    <el-form class="handle-box">
      <el-button class="mr10" icon="el-icon-plus" type="primary">新增团队成员</el-button>
    </el-form>
    <el-table
        ref="multipleTable"
        :data="tableData"
        class="table"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="50"></el-table-column>
      <el-table-column label="成员姓名" min-width="80" prop="name"></el-table-column>
      <el-table-column label="邮件" min-width="80" prop="email"></el-table-column>
      <el-table-column label="担任的职务" min-width="80" prop="job"></el-table-column>
      <el-table-column align="center" label="用户状态" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === '已激活'" :type="'success'">{{ scope.row.status }}</el-tag>
          <el-tag v-if="scope.row.status === '未激活'" :type="'warning'">{{ scope.row.status</el-tag>
          <el-tag v-if="scope.row.status === '已禁用'" :type="'danger'">{{ scope.row.status }}</el-tag>
          <el-tag v-if="scope.row.status === '已删除'" :type="'info'">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
              v-if="scope.row.status !== '已删除'"
              icon="el-icon-edit"
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
          >编辑
          </el-button>
          <el-button
              v-if="scope.row.status !== '已删除'"
              class="red"
              icon="el-icon-delete"
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
          >移出团队
          </el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 筛选搜索
      filter: {
        role: "",
        status: "",
        name: "",
      },
      // 表格数据
      tableData: [
        {
          name: "西木",
          email: "Ximu@ximu.com",
          job: "队长",
          status: "已激活",
        },
      ],
      // 多选
      multipleSelection: [],
      // 页数
      pagination: {
        pageCurrent: 1,
        pageTotal: 0,
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      const _this = this;
      _this.$axios.post('/user', _this.tableData[0]).then((res) => {
        console.log(res);
      });
    },
    // 筛选搜索
    handleSearch() {
    },
    // 重置筛选搜索
    handleResetSearch() {
    },
    // 批量删除
    delAllSelection() {
    },
    // 多选操作
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    // 处理表格内编辑操作
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
      // this.editVisible = true;
    },
    // 处理表格内激活操作
    handleEnable(index, row) {
      console.log(index);
      console.log(row);
    },
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

<style lang="scss" scoped></style>
