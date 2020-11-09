<template>
    <div class="index">
        <!-- 封面 -->
        <div class="banner" :style="{backgroundImage: 'url(' + Img + ')'}">
            <div class="slogan">
                <p>西木工作室</p>
                <p>青春永无止境</p>
            </div>

            <i class="el-icon-d-arrow-right" id="slip" />
        </div>

        <!-- 团队介绍 -->
        <div class="introductions" id="summary">
            <p>团队介绍</p>
        </div>

        <!-- 研究方向 -->
        <div class="introductions" id="research">
            <p>研究方向</p>

        </div>

        <!-- 项目成果 -->
        <div class="introductions" id="project">
            <p>项目成果</p>
        </div>

        <!-- 重大事件 -->
        <div class="introductions" id="events">
            <p>重大事件</p>
        </div>

        <!-- 团队成员 -->
        <div class="introductions" id="team">
            <p>团队成员</p>
        </div>
    </div>
</template>

<script>
import Img from '@/assets/img/banner1.png'

export default {
    name: 'index',
    data(){
        return{
            Img
        }
    }
}
</script>

<style lang="scss" scoped>
.index{
    >.banner{
        width: 100vw; height: 100vh;
        position: relative;
        background-color: rgba(0,0,0,.5);
        background-size: cover;
        display: flex;
        justify-content: center;
        // filter: blur(3px);
        // z-index: -1;

        .slogan{
            top: 35%;
            position: absolute;
            // transform: translate(-50%, -50%);
            font-size: 34px;
            color: #fff;
            text-align: center;
            line-height: 60px;
            // z-index: 10;

            p:first-child{
                font-size: 3rem;
                color: #ffffff;
                font-weight: 600;
            }
            p:last-child{
                font-size: 2rem;
                color: #ffffff9c;
            }
        }

        #slip{
            position: absolute;
            top: 85%;
            color: #fff;
            font-size: 3rem;
            transform: rotate(90deg);
        }
    }

    .introductions{
        height: 300px;
        padding: 0 10%;
        p{
            font-size: 3rem;
        }
    }
}
</style>