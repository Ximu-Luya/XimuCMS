<template>
    <div id="achievement_index">
        <section class="page_header">
            <div class="title_container">
                <h1>团队成果</h1>
                <p>团队获得的各类成果，由专利，软件著作权与学生竞赛成果组成。</p>
                <div class="hr-logo"><i class="el-icon-trophy"></i></div>
            </div>
        </section>
        <section class="page_content">
            <div class="content_container">
                <div
                    class="article_item"
                    v-for="item in achievements"
                    :key="item.title"
                    @click="item.toggle?item.toggle=false:item.toggle=true"
                >
                    <div>
                        <div class="box-top">
                            <h4 class="title">{{ item.title }}</h4>
                        </div>
                        <div class="box-bottom">
                            <div class="left">
                                <div class="content-num">
                                    <i class="el-icon-document"></i>
                                    <span>{{item.pagination.pageTotal}} 项成果</span>
                                </div>
                                <div v-if="item.pagination.pageTotal!==0">
                                    <div class="toggle" v-show="!item.toggle">
                                        <span>展开</span>
                                        <i class="el-icon-arrow-down"></i>
                                    </div>
                                    <div class="toggle" v-show="item.toggle">
                                        <span>收起</span>
                                        <i class="el-icon-arrow-up"></i>
                                    </div>
                                </div>
                            </div>
                            <!--<div class="right">-->
                            <!--    最近更新&nbsp;2 月前-->
                            <!--</div>-->
                        </div>
                        <div class="box-content-list" v-show="item.toggle" v-if="item.pagination.pageTotal!==0">
                            <div
                                class="list-item"
                                v-for="list_item in item.data"
                                :key="list_item.id"
                            >
                                <el-tag class="tag" type="success" v-if="list_item.type2==='论文'">论文</el-tag>
                                <el-tag class="tag" v-if="list_item.type2==='专利'">专利</el-tag>
                                <el-tag class="tag" type="warning" v-if="list_item.type2==='软件著作权'">软件著作权</el-tag>
                                <el-tag class="tag" type="danger" v-if="list_item.type2==='奖项'">奖项</el-tag>
                                <router-link :to="list_item.id.toString()" append>{{ list_item.name }}</router-link>
                            </div>
                            
                            <section class="pagination" v-if="item.pagination.pageTotal>6">
                                <!-- 分页组件 -->
                                <el-pagination
                                    :current-page="item.pagination.pageCurrent"
                                    :page-size="6"
                                    :total="item.pagination.pageTotal"
                                    background
                                    layout="total, prev, pager, next"
                                    @current-change="handlePageChange(item.title, item.pagination.pageCurrent)"
                                ></el-pagination>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'Achievement',
    data() {
        return {
            achievements: [
                {
                    title: '教学',
                    data: [],
                    toggle: true,
                    pagination: {
                        pageCurrent: 1,
                        pageTotal: 0,
                    },
                },
                {
                    title: '科研',
                    data: [],
                    toggle: true,
                    pagination: {
                        pageCurrent: 1,
                        pageTotal: 0,
                    },
                },
                {
                    title: '学生指导',
                    data: [],
                    toggle: true,
                    pagination: {
                        pageCurrent: 1,
                        pageTotal: 0,
                    },
                },
            ],
        }
    },
    mounted() {
        for (let item of this.achievements) {
            this.getData(item.title, 1)
        }
    },
    methods: {
        getData(title, page) {
            const _this = this;
            _this.$axios.get(`/achievement?page=${page}&type1=${title}`).then(({data}) => {
                for (let i=0; i<_this.achievements.length; i++){
                    if (_this.achievements[i].title === title){
                        _this.achievements[i].data = data.achievements
                        _this.achievements[i].pagination.pageTotal = data.pageTotal
                    }
                }
            });
        },
        // 分页导航-处理页码变更
        handlePageChange(title, page) {
            this.getData(title, page);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/childPages.scss";
</style>