<template>
    <div class="admin-page-container">
        <el-form class="handle-box">
            <el-button class="mr10" icon="el-icon-plus" type="primary" @click="handleNew">新增团队成员</el-button>
            <el-button type="danger" icon="el-icon-delete" class="mr10" @click="delAllSelection">批量移出团队</el-button>
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
                    <el-tag v-if="scope.row.status === '未激活'" :type="'warning'">{{ scope.row.status}}</el-tag>
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
                        @click="handleEdit(scope.row)"
                    >编辑
                    </el-button>
                    <el-button
                        v-if="scope.row.status !== '已删除'"
                        class="red"
                        icon="el-icon-delete"
                        type="text"
                        @click="handleDelete(scope.row)"
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

        <el-dialog
            :visible.sync="dialogUserVisible"
            custom-class="user-dialog"
            destroy-on-close
            :title="userDetails.dialogTitle"
            width="500px"
            @close="$refs['userDetails'].resetFields()"
        >
            <el-form :model="userDetails" ref="userDetails" label-width="80px">
                <el-form-item label="用户账号" prop="username" v-show="userDetails.order !== 'new'">
                    <el-input v-model="userDetails.username" placeholder="请填写用户账号" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password" v-show="userDetails.order !== 'new'">
                    <el-input
                        v-model="userDetails.password"
                        placeholder="用户密码"
                        :show-password="userDetails.order === 'edit'"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" prop="name">
                    <el-select
                        v-model="userDetails.name"
                        placeholder="请填写用户姓名"
                        :disabled="userDetails.order !== 'new'"
                        clearable
                        filterable
                        remote
                        :remote-method="filterAuthor"
                    >
                        <el-option
                            v-for="item in userOptions"
                            :key="item['id']"
                            :value="item['id']"
                            :label="item['name']">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属团队" prop="team_id" v-show="userDetails.order !== 'new'">
                    <el-select
                        v-model="userDetails.team_id"
                        placeholder="请选择团队"
                        disabled
                    >
                        <el-option
                            v-for="item in userDetails.teamOption"
                            :key="item['id']"
                            :value="item['id']"
                            :label="item['team_name']"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" v-show="userDetails.order !== 'new'">
                    <el-input v-model="userDetails.email" placeholder="请填写邮箱" disabled></el-input>
                </el-form-item>
                <el-form-item label="担任职务" prop="job">
                    <el-input v-model="userDetails.job" placeholder="请填写担任职务"></el-input>
                </el-form-item>
                <el-form-item label="用户角色" prop="role" v-show="userDetails.order !== 'new'">
                    <el-select v-model="userDetails.role" placeholder="请选择用户角色" disabled>
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
                password: '',
                name: '',
                team_id: '',
                teamOption: [],
                email: '',
                job: '',
                role: '',
                status: ''
            },
            // 用户远程筛选选项
            userOptions:[]
        };
    },
    computed: {
        userInfo() {
            return this.$store.getters.getUserinfo;
        }
    },
    mounted() {
        this.getTeamData(1);
    },
    methods: {
        // 获取数据
        getTeamData(page) {
            const _this = this;
            _this.tableData = [];
            _this.$axios.get('/userTeam/' + _this.userInfo['team_id'] + '/' + page).then((res) => {
                _this.pagination.pageTotal = res.data.pageTotal;
                for (let item of res.data.userData) {
                    const {id,  name, email, job, status} = item;
                    _this.tableData.push({
                        id: id,
                        name: name,
                        email: email,
                        job: job,
                        status: status
                    });
                }
            });
        },
        // 筛选搜索
        handleSearch() {
        },
        // 重置筛选搜索
        handleResetSearch() {
        },
        // 处理新建用户
        handleNew() {
            const _this = this;
            _this.userDetails.dialogTitle = '新增用户';
            _this.dialogUserVisible = true;
            _this.userDetails.order = 'new';
        },
        // 筛选-作者选择框远程搜索方法
        filterAuthor(author) {
            const _this = this;
            _this.userOptions = [];
            if (author) _this.$axios.get('/userlike/' + author).then(res => {
                for (let item of res.data){
                    _this.userOptions.push(item)
                }
            })
        },
        // 批量删除
        delAllSelection() {
            let members = [];
            for (let item of this.multipleSelection) members.push(item.id)
            this.handleDelete(members);
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 处理表格内编辑操作
        handleEdit(row) {
            const _this = this;
            _this.$axios.get('/getUserDetail/' + row.id).then(res => {
                const {id, username, name, team_id, team_name, email, job,  role} = res.data[0];
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
                    job: job,
                    role: role
                }
            });
            _this.dialogUserVisible = true;
        },
        // 处理表格内移除团队
        handleDelete(row) {
            const _this = this;
            // 二次确认删除
            _this.$confirm("确定要删除吗？", "提示", {
                type: "warning",
            }).then(() => {
                _this.$axios.post('/deleteTeamMember',
                    Object.prototype.toString.call(row) === '[object Array]'
                        ? {"user_ids": row}
                        : {"user_ids": [row.id]})
                    .then(res => {
                        if (res.status === 200) {
                            _this.$message.success("删除成功");
                            _this.getTeamData(_this.pagination.pageCurrent);
                        }
                    })
            });
        },
        // 分页导航-处理页码变更
        handlePageChange(val) {
            this.getTeamData(val);
        },
        // 处理团队成员用户编辑对话框保存
        handleSave() {
            const _this = this;
            _this.$axios.post(_this.userDetails.order === 'edit'
                ? ('/updateUser/' + _this.userDetails.id)
                : '/updateUserTeam/' + _this.userInfo['team_id']
                , _this.$refs['userDetails'].model)
            .then(res => {
                if (res.status === 200) {
                    _this.$message.success('保存成功');
                    _this.dialogUserVisible = false;
                    _this.getTeamData(_this.pagination.pageCurrent);
                } else {
                    _this.$message.error('该用户无法加入此团队');
                }
            })
        }
    }
};
</script>

<style lang="scss" scoped></style>
