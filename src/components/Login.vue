<template>
    <div class="login-container">
        <div class="login-card">
            <div class="card-title">后台管理登录</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="card-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="请输入用户名">
                        <i slot="prepend" class="el-icon-user-solid"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="param.password"
                        show-password
                        @keyup.enter.native="submitForm()"
                    >
                        <i slot="prepend" class="el-icon-lock"></i>
                    </el-input>
                </el-form-item>
                <el-button type="primary" @click="submitForm()" id="login-button">登录</el-button>
                <el-button type="text" style="float: right">忘记密码</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data: function () {
        return {
            param: {
                username: '',
                password: ''
            },
            // 登录表单验证规则
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
        };
    },
    methods: {
        submitForm() {
            const _this = this
            _this.$refs.login.validate((valid) => {
                if (valid) {
                    _this.$axios.post('/login', _this.param).then(res => {
                        if(res.status === 200) {
                            _this.setUserId(res.data.id)
                            _this.$message.success('登录成功');
                            localStorage.setItem('user_id', res.data.id);
                            console.log(localStorage);
                            _this.$router.push('/admin/index');
                        }
                    })
                } else {
                    _this.$message.error('请输入账号和密码');
                    return false;
                }
            });
        },
        ...mapActions('userinfo', [
            'setUserId'
        ])
    }
};
</script>

<style scoped>
.login-container {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/banner1.png);
    background-size: 100%;
}
.login-card {
    position: absolute;
    top: 25%;
    width: 350px;
    border-radius: 5px;
    /*background: rgba(255, 255, 255, 0.3);*/
    background: rgba(0, 0, 0, 0.3);
}
.card-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
}
.card-content {
    padding: 30px 30px;
}
#login-button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
</style>