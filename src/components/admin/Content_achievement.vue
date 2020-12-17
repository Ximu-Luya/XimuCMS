<template>
    <div class="admin-page-container">
        <el-form class="handle-box">
            <el-input v-model="filter.name" placeholder="成果名称" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <el-button icon="el-icon-refresh" @click="handleResetSearch">重置</el-button>
        </el-form>
        <el-form class="handle-box">
            <el-button type="primary" icon="el-icon-plus" class="mr10" @click="handleNew">新增成果</el-button>
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
            <el-table-column prop="name" min-width="300" label="成果名称"></el-table-column>
            <el-table-column prop="type1" width="80" label="一级类型"></el-table-column>
            <el-table-column prop="type2" width="100" label="二级类型"></el-table-column>
            <el-table-column prop="get_time" width="100" label="取得时间"></el-table-column>
            <el-table-column prop="editor" min-width="80" label="最后编辑者"></el-table-column>
            <el-table-column prop="update_time" width="160" label="最后编辑时间"></el-table-column>
            <el-table-column width="180" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        icon="el-icon-edit"
                        @click="handleEdit(scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        type="text"
                        icon="el-icon-delete"
                        class="red"
                        @click="handleDelete(scope.row)"
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
            :visible.sync="dialogAchievementVisible"
            custom-class="blog-dialog"
            destroy-on-close
            :title="achievementDetails.dialogTitle"
            top="5vh"
            width="80%"
            @close="$refs['achievementDetails'].resetFields()"
        >
            <el-form
                :model="achievementDetails"
                :rules="rules"
                ref="achievementDetails"
                label-width="80px"
                hide-required-asterisk
            >
                <el-row :gutter="20">
                    <el-col :span="24" :md="24">
                        <el-form-item label="成果名称" prop="name">
                            <el-input v-model="achievementDetails.name" placeholder="请填写成果名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="一级类型" prop="type1">
                            <el-select v-model="achievementDetails.type1" placeholder="请选择一级类型">
                                <el-option value="教学"></el-option>
                                <el-option value="科研"></el-option>
                                <el-option value="学生指导"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="二级类型" prop="type2">
                            <el-select v-model="achievementDetails.type2" placeholder="请选择二级类型">
                                <el-option value="论文"></el-option>
                                <el-option value="专利"></el-option>
                                <el-option value="软件著作权"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="取得日期" prop="get_time">
                            <el-date-picker
                                v-model="achievementDetails.get_time"
                                type="date"
                                placeholder="请选择取得日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item prop="content" label-width="0px">
                            <mavon-editor v-model="achievementDetails.detail" style="width: 100%"></mavon-editor>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAchievementVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
let mavonEditor = require('mavon-editor')
import 'mavon-editor/dist/css/index.css'

export default {
    data() {
        return {
            // 筛选搜索
            filter: {
                name: ''
            },
            // 表格数据
            tableData: [],
            // 多选
            multipleSelection: [],
            // 页数
            pagination: {
                pageCurrent: 1,
                pageTotal: 0
            },
            // 成果编辑对话框
            dialogAchievementVisible: false,
            // 成果细节
            achievementDetails: {
                order: '',
                dialogTitle: '',
                editor_id: '',
                id: '',
                name: '',
                detail: '',
                type1: '',
                type2: '',
                get_time: '',
            },
            rules: {
                name: [{required: true, message: '请填写成果名称', trigger: 'blur'}],
                type1: [{required: true, message: '请选择一级类型', trigger: 'change'}],
                type2: [{required: true, message: '请选择二级类型', trigger: 'change'}],
                get_time: [{required: true, message: '请选择取得日期', trigger: 'change'}],
            }
        };
    },
    components: {
        'mavon-editor': mavonEditor.mavonEditor
    },
    mounted() {
        this.getAchievementData(1);
    },
    methods: {
        // 获取表格内容
        getAchievementData(page) {
            const _this = this;
            _this.tableData = [];
            _this.$axios.get("/getAchievementData/" + page).then((res) => {
                _this.pagination.pageTotal = res.data.pageTotal;
                for (let item of res.data.achievementData) {
                    const {id, name, type1, type2, get_time, user_name, update_time} = item;
                    _this.tableData.push({
                        id: id,
                        name: name,
                        type1: type1,
                        type2: type2,
                        get_time: get_time,
                        editor: user_name,
                        update_time: update_time
                    });
                }
            });
        },
        // todo 筛选搜索
        handleSearch(){

        },
        // todo 重置筛选搜索
        handleResetSearch(){

        },
        // 批量删除
        delAllSelection(){
            let achieves = [];
            for (let item of this.multipleSelection) achieves.push(item.id)
            this.handleDelete(achieves);
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 处理表格内编辑操作
        handleEdit(row) {
            const _this = this;
            _this.$axios.get('/getAchievementDetail/' + row.id).then(res => {
                const {id, name, type1, type2, get_time, detail} = res.data[0];
                _this.$nextTick(() => {
                    _this.achievementDetails = {
                        order: 'edit',
                        dialogTitle: '编辑博客',
                        id: id,
                        name: name,
                        type1: type1,
                        type2: type2,
                        get_time: get_time,
                        detail: detail,
                        editor_id: _this.$store.getters.getUserinfo.editor_id
                    }
                })
            })
            _this.dialogAchievementVisible = true;
        },
        // 处理表格内删除操作
        handleDelete(row) {
            const _this = this;
            // 二次确认删除
            _this.$confirm("确定要删除吗？", "提示", {
                type: "warning",
            }).then(() => {
                _this.$axios.post('/deleteAchievement',
                    Object.prototype.toString.call(row) === '[object Array]'
                        ? {"achieve_ids": row}
                        : {"achieve_ids": [row.id]})
                    .then(res => {
                        if (res.status === 200) {
                            _this.$message.success("删除成功");
                            _this.getAchievementData(_this.pagination.pageCurrent);
                        }
                    })
            });
        },
        // 分页导航-处理页码变更
        handlePageChange(val) {
            this.getAchievementData(val)
        },
        // 处理新增成果
        handleNew() {
            const _this = this;
            _this.dialogAchievementVisible = true;
            _this.achievementDetails.dialogTitle = '新增博客';
            _this.achievementDetails.order = 'new';
            _this.achievementDetails.editor_id = _this.$store.getters.getUserinfo.id;
        },
        // 处理成果编辑保存
        handleSave(){
            const _this = this;
            _this.$refs['achievementDetails'].validate((valid) => {
                if (valid) {
                    // 向后端发送请求
                    _this.$axios.post(_this.achievementDetails.order === 'new'
                        ? '/createNewAchievement'
                        : ('/updateAchievement/' + _this.achievementDetails.id), _this.$refs['achievementDetails'].model)
                        .then(res => {
                            if (res.status === 200) {
                                _this.$message.success('保存成功');
                                _this.dialogAchievementVisible = false;
                                _this.getAchievementData(_this.pagination.pageCurrent);
                            }
                        })
                } else {
                    _this.$message.error('请检查填写内容')
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped></style>
