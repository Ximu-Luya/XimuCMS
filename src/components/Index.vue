<template>
    <div class="index">
        <!-- 封面 -->
        <div class="banner" :style="{ backgroundImage: 'url(' + Img + ')' }">
            <div class="slogan">
                <p>西木工作室</p>
                <p>青春永无止境</p>
            </div>

            <i class="el-icon-d-arrow-right" id="slip" />
        </div>

        <!-- 团队介绍 -->
        <div class="introductions" id="summary">
            <span id="we">We Are</span>
            <span id="studio">西木工作室</span>
        </div>

        <!-- 研究方向 -->
        <div class="introductions" id="research">
            <div class="introduction_title">
                <p>研究方向</p>
                <hr />
            </div>
            <div class="research_item_container">
                <div class="research_item">
                    <div class="research_icon_box">
                        <i class="el-icon-more-outline" />
                    </div>
                    <h1>人工智能</h1>
                    <p>
                        Improving the usability，accessibility and pleasure
                        provided during the using process of product.
                    </p>
                </div>
                <div class="research_item">
                    <div class="research_icon_box">
                        <i class="el-icon-more-outline" />
                    </div>
                    <h1>人工智能</h1>
                    <p>
                        Improving the usability，accessibility and pleasure
                        provided during the using process of product.
                    </p>
                </div>
                <div class="research_item">
                    <div class="research_icon_box">
                        <i class="el-icon-more-outline" />
                    </div>
                    <h1>人工智能</h1>
                    <p>
                        Improving the usability，accessibility and pleasure
                        provided during the using process of product.
                    </p>
                </div>
            </div>
        </div>

        <!-- 项目成果 -->
        <div class="introductions" id="project">
            <div class="introduction_title">
                <p>项目成果</p>
                <hr />
            </div>
        </div>

        <!-- 重大事件 -->
        <div class="introductions" id="events">
            <div class="introduction_title">
                <p>重大事件</p>
                <hr />
            </div>
        </div>

        <!-- 团队成员 -->
        <div class="introductions" id="team">
            <div class="introduction_title">
                <p>团队成员</p>
                <hr />
            </div>

            <div class="team_container">
                <div class="leader">
                    <div class="leader_img">
                        <img width="600px" :src="teacherImg" />
                        <div class="name"><span>王铁军</span></div>
                    </div>

                    <div class="leader_introduction">
                        <h1>指导老师</h1>
                        <p>
                            received the M.F.A. degree in information arts and
                            design from the Tsinghua University, Beijing, China,
                            in 2016. She is currently a Lecturer at the
                            Department of Computer Science, Chengdu University
                            of Information Technology, China. Her research
                            interests include human-computer interaction, user
                            experience, and interaction design.
                        </p>
                        <a href="" class="view_more">View More</a>
                    </div>
                </div>

                <div class="members">
                    <div class="member">
                        <div class="member_img">
                            <img width="300px" :src="teacherImg" />
                            <div class="name"><span>卢奇</span></div>
                        </div>
                    </div>
                    <div class="member">
                        <div class="member_img">
                            <img width="300px" :src="teacherImg" />
                            <div class="name"><span>王苏宁</span></div>
                        </div>
                    </div>
                    <div class="member">
                        <div class="member_img">
                            <img width="300px" :src="teacherImg" />
                            <div class="name"><span>郑煜</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Img from "@/assets/img/banner1.png";
import teacherImg from "@/assets/img/teacher头像.jpg";

export default {
    name: "index",
    data() {
        return {
            Img,
            teacherImg,
        };
    },
};
</script>

<style lang="scss" scoped>
.index {
    > .banner {
        width: 100vw;
        height: 100vh;
        position: relative;
        background-color: rgba(0, 0, 0, 0.5);
        background-size: cover;
        display: flex;
        justify-content: center;
        // filter: blur(3px);
        // z-index: -1;

        .slogan {
            top: 35%;
            position: absolute;
            // transform: translate(-50%, -50%);
            font-size: 34px;
            color: #fff;
            text-align: center;
            line-height: 60px;
            // z-index: 10;

            p:first-child {
                font-size: 3rem;
                color: #ffffff;
                font-weight: 600;
            }
            p:last-child {
                font-size: 2rem;
                color: #ffffff9c;
            }
        }

        #slip {
            position: absolute;
            top: 85%;
            color: #fff;
            font-size: 3rem;
            transform: rotate(90deg);
        }
    }

    .introductions {
        // min-height: 500px;
        padding: 0 10% 50px 10%;
        .introduction_title {
            text-align: center;
            > p {
                font-size: 3rem;
                padding: 30px 0 0 0;
                margin: 0;
            }
            hr {
                width: 150px;
                font-size: 3rem;
            }
        }
        &:nth-child(odd) {
            background: #e7e7e7;
        }
    }
    #summary {
        span {
            display: block;
            width: 300px;
        }
        #we {
            font-size: 3rem;
            font-weight: 600;
        }
        #studio {
            font-size: 3.5rem;
            font-weight: 300;
            padding-left: 50px;
            box-sizing: content-box;
        }
    }
    #research {
        .research_item_container {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .research_item {
                background: #fff;
                width: 30%;
                padding: 40px 30px 15px;
                position: relative;
                transition: 0.5s;
                border-bottom: 2px solid rgba(0, 0, 0, 0);

                h1 {
                    font-size: 19px;
                    position: relative;
                }
                .research_icon_box {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    top: 32px;
                    right: 25px;
                    border-radius: 40px;
                    padding: 10px;
                    box-shadow: 0px 1px 25px 5px #8080805c;
                    font-size: 1rem;
                    text-align: center;
                }
                p {
                    margin: 35px 0;
                    color: #989696;
                    font-size: 14px;
                    line-height: 24px;
                }
            }
        }
    }
    #team {
        // height: ;
        .team_container {
            
            .name{
                background: #ffffff96;
                height: 65px;
                padding: 20px;
                position: absolute;
                width: 100%;
                bottom: 65px;
                text-align: center;
                transition: 0.5s;

                span{
                    line-height: 25px;
                    font-size: 22px;
                    letter-spacing: 5px;
                }
                &{position: relative;}
            }

            .leader {
                width: 100%;
                display: flex;
                justify-content: space-between;

                .leader_introduction{
                    padding: 20px 30px;
                    h1{
                        margin-top: 0;
                    }
                    p{
                        color: #868686;
                        letter-spacing: 1px;
                        line-height: 22px;
                        font-weight: 600;
                    }
                    a{
                        color: #000;
                        text-decoration: #000;
                        border-bottom: 2px #000 solid;
                    }
                }
            }

            .members{
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>