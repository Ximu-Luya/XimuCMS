<template>
    <div id="blog_index">
        <section class="page_content">
            <div class="content_container">
                <div class="content-box">
                    <div class="header-box">
                        <div class="title-box">
                            <h1>{{ blog.title }}</h1>
                        </div>
                        <div class="info-box">
                            <div class="info-bar">
                                <div class="bar-content">
                                    <span id="author">{{ blog.author_name }}</span>
                                    <span class="label">
                                        <i class="el-icon-time"></i>
                                        {{ blog.release_time }}
                                    </span>
                                </div>
                            </div>
                            <div class="info-tags">
                                <div class="tag-box">
                                    <span class="label">分类专栏：</span>
                                    <el-tag type="info" effect="plain">{{ blog.section }}</el-tag>
                                    <span class="label">博客标签：</span>
                                    <el-tag type="info" effect="plain">{{ blog.tag_list }}</el-tag>
                                </div>
                            </div>
                        </div>
                    </div>
                    <article class="content-box">
                        <mavon-editor
                            v-model="blog.content"
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
    name: "Blog_detail",
    data() {
        return {
            blog: {
                id: '',
                title: '',
                author_name: '',
                section: '',
                tag_list: '',
                content: '',
                release_time: ''
            },
        };
    },
    components: {
        'mavon-editor': mavonEditor.mavonEditor
    },
    computed: {
        path(){
            return this.$route.path.split('/').slice(-1);
        }
    },
    watch: {
        // 若地址栏路径id发生变化，重新获取博客内容
        path: function (){
            this.getData(this.path);
        }
    },
    mounted() {
        this.getData(this.path);
    },
    methods: {
        getData(id) {
            const _this = this;
            _this.$axios.get(`/blog?id=${id}`).then(res => {
                _this.blog = res.data;
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/childPages.scss";

#blog_index {
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