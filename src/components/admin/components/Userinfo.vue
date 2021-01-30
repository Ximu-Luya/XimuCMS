<template>
    <div class="admin-page-container" id="user-info">
        <div class="avatar-box">
            <el-avatar :size="150" shape="square"></el-avatar>
        </div>
        <div class="info-box">
            <div class="info-item"><label class="label">用户账号：</label>{{ user.username }}</div>
            <div class="info-item"><label class="label">姓名：</label>{{ user.name }}</div>
            <div class="info-item"><label class="label">邮箱：</label>{{ user.email }}</div>
            <div class="info-item"><label class="label">联系电话：</label>{{ user.telephone }}</div>
            <div class="info-item"><label class="label">团队名称：</label>{{ user.team_name }}</div>
            <div class="info-item"><label class="label">职务：</label>{{ user.job }}</div>
            <div class="info-item"><label class="label">角色：</label>{{ user.role }}</div>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit">修改信息</el-button>
        </div>
        
        <el-dialog
            :visible.sync="dialogVisible"
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
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    name: "Userinfo",
    data() {
        return {
            dialogVisible: false,
            userDetails: {}
        }
    },
    computed: mapState('userinfo', {
        user: 'user'
    }),
    mounted() {
        this.getUserInfo();
    },
    methods: {
        getUserInfo(){
            const _this = this;
            _this.$axios.get(`/user?uid=${_this.user.uid}`).then(res => {
                _this.setUserInfo(res.data)
            })
        },
        handleEdit() {
            const _this = this;
            this.userDetails = {
                order: 'edit',
                dialogTitle: '更改信息',
                id: _this.user.id,
                username: _this.user.username,
                password: '',
                name: _this.user.name,
                team_id: _this.user.team_id,
                teamOption: [{"id": _this.user.team_id, "team_name": _this.user.team_name}],
                email: _this.user.email,
                telephone: _this.user.telephone,
                job: _this.user.job,
                role: _this.user.role
            }
            _this.dialogVisible = true;
        },
        // 处理用户编辑对话框内团队选择框远程搜索
        filterTeam(teamname) {
            const _this = this;
            _this.userDetails.teamOption = [];
            if (teamname) _this.$axios.get('/teamlike/' + teamname).then(res => {
                for (let item of res.data) _this.userDetails.teamOption.push(item)
            })
        },
        // 处理用户编辑对话框保存
        handleSave() {
            const _this = this;
            _this.$axios.post(_this.userDetails.order === 'new'
                ? '/createNewUser'
                : ('/updateUser/' + _this.userDetails.id), _this.$refs['userDetails'].model)
            .then(res => {
                if (res.status === 200) {
                    _this.$message.success('保存成功');
                    _this.getUserInfo();
                    _this.dialogVisible = false;
                }
            })
        },
        ...mapActions('userinfo', [
            'setUserInfo'
        ])
    }
}
</script>

<style lang="scss" scoped>
#user-info {
    width: 400px;
    
    .avatar-box {
        text-align: center;
        margin-bottom: 12px;
    }
    
    .info-box {
        display: flex;
        flex-direction: column;
        color: #999aaa;
        line-height: 32px;
        
        .label {
            display: inline-block;
            width: 80px;
            color: #000000;
            margin-left: 8px;
            margin-right: 12px;
        }
    }
}
</style>