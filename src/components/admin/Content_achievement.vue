<template>
    <div class="admin-page-container">
        <el-form class="handle-box">
            <el-input v-model="filter.name" placeholder="成果名称" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <el-button icon="el-icon-refresh" @click="handleResetSearch">重置</el-button>
        </el-form>
        <el-form class="handle-box">
            <el-button type="primary" icon="el-icon-plus" class="mr10">新增成果</el-button>
            <el-button type="danger" icon="el-icon-delete" class="mr10" @click="delAllSelection">批量删除</el-button>
        </el-form>
        <el-table
            :data="tableData"
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column prop="name" min-width="200" label="成果名称"></el-table-column>
            <el-table-column prop="editer" min-width="80" label="最后编辑者"></el-table-column>
            <el-table-column prop="updatetime" min-width="100" label="最后编辑时间"></el-table-column>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 筛选搜索
            filter: {
                name: ''
            },
            // 表格数据
            tableData: [
                {
                    name: '国家重点研发计划“重大自然灾害监测预警与防范”专项',
                    editer: '西木',
                    updatetime: '2020-12-12 17:27:22',
                }
            ],
            // 多选
            multipleSelection: [],
            // 页数
            pagination: {
                pageCurrent: 1,
                pageTotal: 0
            },
        };
    },
    methods: {
        // 筛选搜索
        handleSearch(){

        },
        // 重置筛选搜索
        handleResetSearch(){

        },
        // 批量删除
        delAllSelection(){

        },
        // 多选操作
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val;
        },
        // 处理表格内编辑操作
        handleEdit(index, row) {
            console.log(index, row);
            // this.editVisible = true;
        },
        // 处理表格内删除操作
        handleDelete(index, row) {
            // 二次确认删除
            console.log(row);
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                this.$message.success('删除成功');
                this.tableData.splice(index, 1);
            });
        },
        // 分页导航-处理页码变更
        handlePageChange(val) {
            console.log("当前是第" + val + "页");
            // this.getData();
        }
    }
};
</script>

<style lang="scss" scoped></style>
