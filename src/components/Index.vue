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
            <div class="introduction_title" id="summary_title">
                <p>团队简介</p>
                <hr />
            </div>
            <div class="summary_container">
                <p style="width: 800px">
                    云计算与高性能计算团队长期致力于分布式系统、云计算与虚拟化技术、图像处理、
                    并行计算和高性能计算等相关领域前沿理论与技术的创新研究，先后承担了10余项国
                    家级、省部级和市厅级的科研项目，获得国家自然科学基金3项，发表科技论文50余篇
                    ，SCI和EI检索论文30余篇，获得软件著作权28项，申请发明专利5项，相关成果处于国
                    内领先地位。同时，团队积极推进相关技术成果的转化与应用，与多家企业和科研院校
                    合作，促进产学研联合，相关成果获得四川省科学技术进步二等奖。
                </p>
                <p style="width: 800px">
                    团队现有全职教师5名，同时聘请了国内外知名大学和科研机构教师3名。其中教授2人
                    、副教授2人、博士3人、硕士1人。团队教师讲授《云计算导论》、《并行程序设计》
                    、《数据库原理与应用》、《C语言程序设计》等课程，先后指导本科生和研究生百余
                    人，出版教材3部，相关教学成果获得四川省高等教育教学成果一等奖。此外，指导学
                    生参加“并行应用挑战赛”、“国产CPU并行应用挑战赛”、“云计算应用设计大赛”等全国
                    性大赛，获得优异成绩。
                </p>
            </div>
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

        <!-- 研究项目 -->
        <div class="introductions" id="project">
            <div class="introduction_title">
                <p>研究项目</p>
                <hr />
            </div>

            <div class="project_container">
                <div class="right">
                    <div class="content">
                        <h1>
                            采用多体素模式分析的多模态磁共振图像融合方法研究
                        </h1>
                        <p>
                            针对现有 MRI 临床预测研究中一般使用单一模态 MRI
                            且逐体素独立分析的缺陷，充分利用多模态 MRI
                            和局部体素区域，以及脑区之间的互相关信息，基于多体素模式分析理论逐步进行
                            3 项理论研究与应用技术开发...
                        </p>
                    </div>
                    <div class="num">
                        <p>01</p>
                        <hr />
                    </div>
                    <img src="@/assets/img/作业.jpg" />
                </div>
                <div class="left">
                    <img src="@/assets/img/作业.jpg" />
                    <div class="num">
                        <p>02</p>
                        <hr />
                    </div>
                    <div class="content">
                        <h1>
                            采用多体素模式分析的多模态磁共振图像融合方法研究
                        </h1>
                        <p>
                            针对现有 MRI 临床预测研究中一般使用单一模态 MRI
                            且逐体素独立分析的缺陷，充分利用多模态 MRI
                            和局部体素区域，以及脑区之间的互相关信息，基于多体素模式分析理论逐步进行
                            3 项理论研究与应用技术开发...
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 重大事件 -->
        <div class="introductions" id="events">
            <div class="introduction_title">
                <p>重大事件</p>
                <hr />
            </div>

            <div class="event_container">
                <el-carousel :interval="10000" type="card" height="400px">
                    <el-carousel-item v-for="item in 6" :key="item">
                        <h3 class="medium">{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
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
    // 封面
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

        // 标语
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
        // 滑动图表
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
    // 团队介绍
    #summary {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10% 0 10%;
        height: 400px;

        #summary_title {
            flex: none;
            width: 250px;
        }

        .summary_container {
        }
    }
    // 研究项目
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
    // 研究项目
    .project_container {
        width: 1200px;
        margin: 0 auto;
        .right,
        .left {
            height: 445px;
            position: relative;
            clear: both;
            .content {
                float: left;
                padding: 130px 115px 0 0;
                width: 50%;
                box-sizing: border-box;
            }

            .num {
                transition: all 0.2s ease-in-out;
                box-sizing: border-box;
                width: 100px;
                height: 95px;
                position: absolute;
                z-index: 20;
                padding-top: 25px;
                top: 50%;
                left: 50%;
                text-align: center;
                transform: translate3d(-50%, -50%, 0);
                background-color: #19759c;

                p {
                    color: #fff;
                    font-size: 16px;
                    line-height: 30px;
                    margin: 0;
                }
                hr {
                    width: 10px;
                    border: none;
                    margin-top: 0;
                    margin-bottom: 0;
                    border-bottom: 1px solid #ccc;
                    box-sizing: content-box;
                    height: 0;
                    overflow: visible;
                }
            }
            img {
                position: relative;
                z-index: 0;
                // filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
                opacity: 0.8;
                float: left;
                width: 50%;
                height: 445px;
                cursor: pointer;
                &:hover {
                    opacity: 1;
                }
            }
        }
        .left {
            .content {
                padding: 130px 0 0 115px;
            }
        }
    }
    // 重大事件
    .event_container {
        ::v-deep.el-carousel__item {
            h3 {
                color: #475669;
                font-size: 14px;
                opacity: 0.75;
                line-height: 200px;
                margin: 0;
            }
            &:nth-child(2n) {
                background-color: #99a9bf;
            }
            &:nth-child(2n + 1) {
                background-color: #d3dce6;
            }
        }
    }

    // 团队成员
    #team {
        .team_container {
            // 头像下姓名框
            .name {
                background: #ffffff96;
                height: 65px;
                padding: 20px;
                position: absolute;
                width: 100%;
                bottom: 65px;
                text-align: center;
                transition: 0.5s;

                span {
                    line-height: 25px;
                    font-size: 22px;
                    letter-spacing: 5px;
                }
                & {
                    position: relative;
                }
            }
            // 头像动效
            img {
                cursor: pointer;
                opacity: 0.8;
                &:hover {
                    opacity: 1;
                }
            }
            // 指导老师介绍
            .leader {
                width: 100%;
                display: flex;
                justify-content: space-between;

                .leader_introduction {
                    padding: 20px 30px;
                    h1 {
                        margin-top: 0;
                    }
                    p {
                        color: #868686;
                        letter-spacing: 1px;
                        line-height: 22px;
                        font-weight: 600;
                    }
                    a {
                        color: #000;
                        text-decoration: #000;
                        border-bottom: 2px #000 solid;
                    }
                }
            }

            .members {
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>