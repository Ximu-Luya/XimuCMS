<template>
    <div class="admin-page-container">
        <el-form class="handle-box">
            <el-select
                clearable
                v-model="filter.role"
                placeholder="用户角色"
                class="handle-select mr10"
            >
                <el-option value="管理员"></el-option>
                <el-option value="贡献者"></el-option>
            </el-select>
            <el-select
                clearable
                v-model="filter.status"
                placeholder="用户状态"
                class="handle-select mr10"
            >
                <el-option value="未激活"></el-option>
                <el-option value="已激活"></el-option>
                <el-option value="已禁用"></el-option>
                <el-option value="已删除"></el-option>
            </el-select>
            <el-input
                v-model="filter.name"
                placeholder="用户姓名"
                class="handle-input mr10"
            ></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <el-button icon="el-icon-refresh" @click="handleResetSearch">重置</el-button>
        </el-form>
        <el-form class="handle-box">
            <el-button type="primary" icon="el-icon-plus" class="mr10">新增用户</el-button>
            <el-button type="danger" icon="el-icon-delete" class="mr10" @click="delAllSelection"
                >批量删除</el-button
            >
            <el-button type="info" icon="el-icon-upload2" class="mr10">导入数据</el-button>
            <el-button type="warning" icon="el-icon-download" class="mr10">导出数据</el-button>
        </el-form>
        <el-table
            :data="tableData"
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column prop="username" min-width="80" label="用户账号"></el-table-column>
            <el-table-column prop="name" min-width="80" label="用户姓名"></el-table-column>
            <el-table-column prop="team" min-width="100" label="所属团队"></el-table-column>
            <el-table-column prop="email" min-width="80" label="邮件"></el-table-column>
            <el-table-column prop="role" min-width="60" label="角色"></el-table-column>
            <el-table-column width="80" label="用户状态" align="center">
                <template slot-scope="scope">
                    <el-tag :type="'success'" v-if="scope.row.status === '已激活'">{{scope.row.status}}</el-tag>
                    <el-tag :type="'warning'" v-if="scope.row.status === '未激活'">{{scope.row.status</el-tag>
                    <el-tag :type="'danger'" v-if="scope.row.status === '已禁用'">{{scope.row.status}}</el-tag>
                    <el-tag :type="'info'" v-if="scope.row.status === '已删除'">{{scope.row.status}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        icon="el-icon-edit"
                        @click="handleEdit(scope.$index, scope.row)"
                        v-if="scope.row.status !== '已删除'"
                        >编辑</el-button
                    >
                    <el-button
                        type="text"
                        icon="el-icon-circle-close"
                        class="yellow"
                        @click="handleEnable(scope.$index, scope.row)"
                        v-if="scope.row.status === '已激活'"
                        >禁用</el-button
                    >
                    <el-button
                        type="text"
                        icon="el-icon-circle-check"
                        class="green"
                        @click="handleEnable(scope.$index, scope.row)"
                        v-if="scope.row.status === '已禁用' || scope.row.status === '未激活'"
                        >激活</el-button
                    >
                    <el-button
                        type="text"
                        icon="el-icon-delete"
                        class="red"
                        @click="handleDelete(scope.$index, scope.row)"
                        v-if="scope.row.status !== '已删除'"
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
                    username: "Ximu",
                    name: "西木",
                    team: "西木工作室",
                    email: "Ximu@ximu.com",
                    role: "管理员",
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
    mounted(){
        this.getData();
    },
    methods: {
        // 获取数据
        getData(){
            const _this = this;
            _this.$axios.post('/user', _this.tableData[0]).then((res) => {
                console.log(res);
            });
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
