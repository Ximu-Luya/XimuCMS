/*
 Navicat Premium Data Transfer

 Source Server         : Local_MySQL
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : ximu_cms

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 05/02/2021 11:10:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for achievement
-- ----------------------------
DROP TABLE IF EXISTS `achievement`;
CREATE TABLE `achievement`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '成果ID',
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称',
  `detail` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '成果细节',
  `type1` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '一级类型 教学、科研、学生指导',
  `type2` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '二级类型 论文、专利、软件著作权、奖项',
  `get_time` date NULL DEFAULT NULL COMMENT '取得时间',
  `team_id` int NULL DEFAULT NULL COMMENT '最后编辑者',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '最后更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '成果详情' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of achievement
-- ----------------------------
INSERT INTO `achievement` VALUES (1, '国家重点研发计划“重大自然灾害监测预警与防范”专项', '无', '科研', '专利', '2020-12-17', 1, '2020-12-17 00:44:06');
INSERT INTO `achievement` VALUES (6, '测试成果', '![image.png](http://127.0.0.1:8067/uploads/1608742546988.png)', '科研', '专利', '2020-12-09', 1, '2020-12-24 00:55:48');
INSERT INTO `achievement` VALUES (8, '西木工作室门户', '![image.png](http://127.0.0.1:8067/uploads/1608742546988.png)', '教学', '专利', '2020-12-09', 1, '2021-01-28 23:31:09');
INSERT INTO `achievement` VALUES (9, '测试成果', '![image.png](http://127.0.0.1:8067/uploads/1608742546988.png)', '学生指导', '专利', '2020-12-09', 1, '2021-01-28 23:31:26');

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '博客ID',
  `title` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题',
  `tag_list` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签列表 原创、转载、活动',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '博客内容 markdown文本',
  `author` int UNSIGNED NULL DEFAULT NULL COMMENT '作者ID',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '最后更新时间',
  `release_time` datetime(0) NULL DEFAULT NULL COMMENT '发表时间',
  `section` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '版块 公示板块、内部公示板块',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '博客详情' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog
-- ----------------------------
INSERT INTO `blog` VALUES (4, '测试文章1', '原创,活动', '## asdasd\n#### asdasdasd\n[baidu](http://www.baidu.com)\n```html\n<template>\n    <div id=\"blog_index\">\n        <section class=\"page_content\">\n            <div class=\"content_container\">\n                <div class=\"content-box\">\n                    <div class=\"header-box\">\n                        <div class=\"title-box\">\n                            <h1>{{ blog.title }}</h1>\n                        </div>\n                        <div class=\"info-box\">\n                            <div class=\"info-bar\">\n                                <div class=\"bar-content\">\n                                    <span class=\"author\">{{ blog.name }}</span>\n                                    <span class=\"update-time\">{{ blog.update_time }}</span>\n                                </div>\n                            </div>\n                            <div class=\"info-tags\">\n                                <div class=\"tag-box\">\n                                    <span class=\"label\">分类专栏：</span>\n                                    <el-tag type=\"info\">{{ blog.section }}</el-tag>\n                                    <span class=\"label\">博客标签：</span>\n                                    <el-tag type=\"info\">{{ blog.tag_list }}</el-tag>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <article class=\"content-box\">\n                        <div v-html=\"article_content\"></div>\n                    </article>\n                </div>\n            </div>\n        </section>\n    </div>\n</template>\n```\n', 1, '2020-12-23 22:35:03', '2020-12-16 21:42:36', '内部展示');
INSERT INTO `blog` VALUES (5, '测试文章2', '转载,活动', '![提交证明.png](http://127.0.0.1:8067/uploads/1608736295526.png)\n\n# 一级标题', 1, '2020-12-23 23:11:38', '2020-12-16 21:42:50', '外部公示');
INSERT INTO `blog` VALUES (11, 'asd', '转载', 'asdasdasdasd\nasd1weqweq', 1, '2021-01-30 20:50:13', '2021-01-30 20:47:10', '内部展示');

-- ----------------------------
-- Table structure for team
-- ----------------------------
DROP TABLE IF EXISTS `team`;
CREATE TABLE `team`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '团队ID',
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '团队名称',
  `type` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '团队类型 学生团队、教师团队',
  `teacher_id` int UNSIGNED NULL DEFAULT NULL COMMENT '指导老师ID',
  `leader_id` int UNSIGNED NULL DEFAULT NULL COMMENT '负责人ID',
  `introduction` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '介绍',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '团队信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of team
-- ----------------------------
INSERT INTO `team` VALUES (1, '西木工作室', '学生团队', NULL, 1, '西木工作室');
INSERT INTO `team` VALUES (2, '1', '1', 1, 1, '1');
INSERT INTO `team` VALUES (4, '1', '1', 1, 1, NULL);
INSERT INTO `team` VALUES (5, '1', '11', 1, 1, '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `uid` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户UID',
  `username` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户账号',
  `password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户姓名',
  `email` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮件',
  `team_id` int NULL DEFAULT 0 COMMENT '团队ID',
  `job` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '团队担任工作 自填',
  `status` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户状态 已激活、未激活',
  `role` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色 超级管理员、管理员、贡献者',
  `telephone` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话',
  PRIMARY KEY (`uid`, `username`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  UNIQUE INDEX `uid`(`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'ximu', '123456', '西木', 'ximu@ximu.com', 1, '前端', 'activated', '管理员', '19988887778');

SET FOREIGN_KEY_CHECKS = 1;
