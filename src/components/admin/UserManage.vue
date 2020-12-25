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
            <el-button type="primary" icon="el-icon-plus" class="mr10" @click="handleNew">新增用户</el-button>
            <el-button type="danger" icon="el-icon-delete" class="mr10" @click="delAllSelection">批量删除</el-button>
            <!--<el-button type="info" icon="el-icon-upload2" class="mr10">导入数据</el-button>-->
            <!--<el-button type="warning" icon="el-icon-download" class="mr10">导出数据</el-button>-->
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
            <el-table-column prop="email" min-width="80" label="邮箱"></el-table-column>
            <el-table-column prop="telephone" min-width="80" label="电话"></el-table-column>
            <el-table-column prop="role" min-width="60" label="角色"></el-table-column>
            <el-table-column width="80" label="用户状态" align="center">
                <template slot-scope="scope">
                    <el-tag :type="'success'" v-if="scope.row.status === '已激活'">{{ scope.row.status }}</el-tag>
                    <el-tag :type="'warning'" v-if="scope.row.status === '未激活'">{{ scope.row.status}}</el-tag>
                    <el-tag :type="'danger'" v-if="scope.row.status === '已禁用'">{{ scope.row.status }}</el-tag>
                    <el-tag :type="'info'" v-if="scope.row.status === '已删除'">{{ scope.row.status }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        icon="el-icon-edit"
                        @click="handleEdit(scope.row)"
                        v-if="scope.row.status !== '已删除'"
                    >编辑
                    </el-button
                    >
                    <el-button
                        type="text"
                        icon="el-icon-circle-close"
                        class="yellow"
                        @click="handleEnable(scope.row)"
                        v-if="scope.row.status === '已激活'"
                    >禁用
                    </el-button
                    >
                    <el-button
                        type="text"
                        icon="el-icon-circle-check"
                        class="green"
                        @click="handleEnable(scope.row)"
                        v-if="scope.row.status === '已禁用' || scope.row.status === '未激活'"
                    >激活
                    </el-button
                    >
                    <el-button
                        type="text"
                        icon="el-icon-delete"
                        class="red"
                        @click="handleDelete(scope.row)"
                        v-if="scope.row.status !== '已删除'"
                    >删除
                    </el-button
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
            :visible.sync="dialogUserVisible"
            custom-class="user-dialog"
            destroy-on-close
            :close-on-click-modal="false"
            :title="userDetails.dialogTitle"
            width="500px"
            @close="$refs['userDetails'].resetFields()"
        >
            <el-form :model="userDetails" ref="userDetails" label-width="80px">
                <el-form-item label="用户账号" prop="username">
                    <el-input v-model="userDetails.username" placeholder="请填写用户账号"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input
                        v-model="userDetails.password"
                        placeholder="用户密码"
                        :show-password="userDetails.order === 'edit'"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" prop="name">
                    <el-input v-model="userDetails.name" placeholder="请填写用户姓名"></el-input>
                </el-form-item>
                <el-form-item label="所属团队" prop="team_id">
                    <el-select
                        v-model="userDetails.team_id"
                        placeholder="请选择团队"
                        clearable
                        filterable
                        :remote-method="filterTeam"
                        remote
                    >
                        <el-option
                            v-for="item in userDetails.teamOption"
                            :key="item['id']"
                            :value="item['id']"
                            :label="item['team_name']"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userDetails.email" placeholder="请填写邮箱"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="telephone">
                    <el-input v-model="userDetails.telephone" placeholder="请填写电话"></el-input>
                </el-form-item>
                <el-form-item label="担任职务" prop="job">
                    <el-input v-model="userDetails.job" placeholder="请填写担任职务"></el-input>
                </el-form-item>
                <el-form-item label="用户角色" prop="role">
                    <el-select v-model="userDetails.role" placeholder="请选择用户角色">
                        <el-option value="管理员"></el-option>
                        <el-option value="贡献者"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </span>
        </el-dialog>
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
            tableData: [],
            // 多选
            multipleSelection: [],
            // 页数
            pagination: {
                pageCurrent: 1,
                pageTotal: 0,
            },
            // 用户详情对话框
            dialogUserVisible: false,
            // 用户编辑详情
            userDetails: {
                order: '',
                dialogTitle: '',
                id: '',
                username: '',
                password: '123456（默认）',
                name: '',
                team_id: '',
                teamOption: [],
                email: '',
                telephone: '',
                job: '',
                role: '',
                status: ''
            }
        };
    },
    mounted() {
        this.getUserData(1);
    },
    methods: {
        // 获取数据
        getUserData(page) {
            const _this = this;
            _this.tableData = [];
            _this.$axios.get('/user/' + page, _this.tableData[0]).then((res) => {
                // console.log(res);
                _this.pagination.pageTotal = res.data.pageTotal;
                for (let item of res.data.userData) {
                    const {id, username, name, team_name, email, telephone, role, status} = item;
                    _this.tableData.push({
                        id: id,
                        username: username,
                        name: name,
                        team: team_name,
                        email: email,
                        telephone: telephone,
                        role: role,
                        status: status
                    });
                }
            });
        },
        // Todo 筛选搜索
        handleSearch() {
        },
        // Todo 重置筛选搜索
        handleResetSearch() {
        },
        // 处理新建用户
        handleNew() {
            const _this = this;
            _this.userDetails.dialogTitle = '新增用户';
            _this.dialogUserVisible = true;
            _this.userDetails.order = 'new';
        },
        // 批量删除
        delAllSelection() {
            let users = [];
            for (let item of this.multipleSelection) users.push(item.id)
            this.handleDelete(users);
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 处理表格内编辑操作
        handleEdit(row) {
            const _this = this;
            _this.$axios.get('/getUserDetail/' + row.id).then(res => {
                const {id, username, name, team_id, team_name, email, telephone, job,  role} = res.data;
                this.userDetails = {
                    order: 'edit',
                    dialogTitle: '编辑用户',
                    id: id,
                    username: username,
                    password: '******',
                    name: name,
                    team_id: team_id,
                    teamOption: [{"id": team_id, "team_name": team_name}],
                    email: email,
                    telephone: telephone,
                    job: job,
                    role: role
                }
            });
            _this.dialogUserVisible = true;
        },
        // 处理用户编辑对话框内团队选择框远程搜索
        filterTeam(teamname) {
            const _this = this;
            _this.userDetails.teamOption = [];
            if (teamname) _this.$axios.get('/teamlike/' + teamname).then(res => {
                for (let item of res.data) _this.userDetails.teamOption.push(item)
            })
        },
        // 处理表格内激活操作
        handleEnable(row) {
            console.log(row);
            const _this = this;
            _this.$axios.post('/activateUser/' + row.id).then(res =>{
                _this.$message.success('用户状态已切换为' + res.data.user_status);
                _this.getUserData(_this.pagination.pageCurrent);
            })
        },
        // 处理表格删除
        handleDelete(row) {
            const _this = this;
            // 二次确认删除
            _this.$confirm("确定要删除吗？", "提示", {
                type: "warning",
            }).then(() => {
                _this.$axios.post('/deleteUser',
                    Object.prototype.toString.call(row) === '[object Array]'
                        ? {"user_ids": row}
                        : {"user_ids": [row.id]})
                    .then(res => {
                        if (res.status === 200) {
                            _this.$message.success("删除成功");
                            _this.getUserData(_this.pagination.pageCurrent);
                        }
                    })
            });
        },
        // 分页导航-处理页码变更
        handlePageChange(val) {
            this.getUserData(val);
        },
        // 处理用户编辑对话框保存
        handleSave() {
            const _this = this;
            _this.$axios.post(_this.userDetails.order === 'new'
                ? '/createNewUser'
                : ('/updateUser/' + _this.userDetails.id), _this.$refs['userDetails'].model)
                .then(res => {
                    if (res.status === 200) {
                        _this.$message({
                            type: 'success',
                            message: '保存成功'
                        });
                        _this.dialogUserVisible = false;
                        _this.getUserData(_this.pagination.pageCurrent);
                    }
                })
        }
    },
};
</script>

<style lang="scss" scoped></style>
