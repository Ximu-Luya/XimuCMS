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
                    v-for="item in achieves"
                    :key="item.id"
                >
                    <router-link :to="item.id.toString()" append>
                        <h4 class="title">
                            <el-tag type="primary">{{ item.type1 }}</el-tag>
                            <el-tag type="danger">{{ item.type2 }}</el-tag>
                            {{ item.name }}
                        </h4>
                    </router-link>
                    <div class="info">
                        <p>
                            <span class="date">{{ item.get_time }}</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="pagination">
            <!-- 分页组件 -->
            <el-pagination
                :current-page="pagination.pageCurrent"
                :page-size="6"
                :total="pagination.pageTotal"
                background
                layout="total, prev, pager, next"
                @current-change="handlePageChange"
            ></el-pagination>
        </section>
    </div>
</template>

<script>
export default {
    name: 'Achievement',
    data() {
        return {
            achieves: [],
            // 页数
            pagination: {
                pageCurrent: 1,
                pageTotal: 0,
            },
        }
    },
    mounted() {
        this.getAchieveData(1);
    },
    methods: {
        getAchieveData(page) {
            const _this = this;
            _this.$axios.get("/getAchievementData/" + page).then(res => {
                _this.pagination.pageTotal = res.data.pageTotal;
                _this.achieves = res.data.achievementData;
            });
        },
        // 分页导航-处理页码变更
        handlePageChange(val) {
            this.getAchieveData(val);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/childPages.scss";
</style>