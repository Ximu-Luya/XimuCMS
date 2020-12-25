<template>
    <div id="achievement_index">
        <section class="page_content">
            <div class="content_container">
                <div class="content-box">
                    <div class="header-box">
                        <div class="title-box">
                            <h1>{{ achievement.name }}</h1>
                        </div>
                        <div class="info-box">
                            <div class="info-bar">
                                <div class="bar-content">
                                    <!--<span id="author">{{ achievement.user_name }}</span>-->
                                    <span class="label">
                                        <i class="el-icon-time"></i>
                                        {{ achievement.get_time }}
                                    </span>
                                </div>
                            </div>
                            <div class="info-tags">
                                <div class="tag-box">
                                    <span class="label">一级类型：</span>
                                    <el-tag type="info" effect="plain">{{ achievement.type1 }}</el-tag>
                                    <span class="label">二级类型：</span>
                                    <el-tag type="info" effect="plain">{{ achievement.type2 }}</el-tag>
                                </div>
                            </div>
                        </div>
                    </div>
                    <article class="content-box">
                        <mavon-editor
                            v-model="achievement.detail"
                            ref="mavonEditor"
                            style="width: 100%"
                            :toolbarsFlag="false"
                            :subfield="false"
                            :defaultOpen="'preview'"
                            :boxShadow="false"
                        ></mavon-editor>
                    </article>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
let mavonEditor = require('mavon-editor')
import 'mavon-editor/dist/css/index.css'
export default {
    name: "Achievement_detail",
    data() {
        return {
            achievement: {
                id: '',
                name: '',
                type1: '',
                type2: '',
                detail: '',
                get_time: ''
            },
        };
    },
    components: {
        'mavon-editor': mavonEditor.mavonEditor
    },
    computed: {
        path(){
            return this.$route.path;
        }
    },
    mounted() {
        this.getAchievementData(this.path.split('/').slice(-1));
    },
    methods: {
        getAchievementData(id) {
            const _this = this;
            _this.$axios.get("/getAchievementDetail/" + id).then(res => {
                _this.achievement = res.data[0];
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/childPages.scss";

#achievement_index {
    .content_container {
        width: 1000px;
        .content-box {
            background-color: rgb(251, 251, 251);
            border: 1px solid #f2f6fc;
            
            .header-box {
                padding: 8px 25px;
                
                .title-box{
                    margin-bottom: 12px;
                    h1 {
                        margin: 0;
                    }
                }
                
                .info-box {
                    background: #f4f4f4;
                    border-radius: 4px;
                    
                    >*>* {
                        display: flex;
                        align-items: center;
                    }
                    
                    .label {
                        line-height: 32px;
                        margin-left: 10px;
                        color: #999aaa;
                    }
                    #author{
                        line-height: 32px;
                        margin-left: 10px;
                        margin-right: 15px;
                        color: #000000;
                    }
                }
            }
        }
    }
}
</style>