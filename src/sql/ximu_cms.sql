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

 Date: 27/01/2021 23:28:40
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
  `user_id` int NULL DEFAULT NULL COMMENT '最后编辑者',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '最后更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '成果详情' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of achievement
-- ----------------------------
INSERT INTO `achievement` VALUES (1, '国家重点研发计划“重大自然灾害监测预警与防范”专项', '无', '科研', '专利', '2020-12-17', 1, '2020-12-17 00:44:06');
INSERT INTO `achievement` VALUES (6, '测试成果', '![image.png](http://127.0.0.1:8067/uploads/1608742546988.png)', '科研', '专利', '2020-12-09', 1, '2020-12-24 00:55:48');

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '博客ID',
  `title` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题',
  `tag_list` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签列表 原创、转载、活动',
  `blog_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '博客内容 markdown文本',
  `user_id` int NULL DEFAULT NULL COMMENT '作者ID',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '最后更新时间',
  `release_time` datetime(0) NULL DEFAULT NULL COMMENT '发表时间',
  `section` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '版块 公示板块、内部公示板块',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '博客详情' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog
-- ----------------------------
INSERT INTO `blog` VALUES (4, '测试文章1', '原创,活动', '## asdasd\n#### asdasdasd\n[baidu](http://www.baidu.com)\n```html\n<template>\n    <div id=\"blog_index\">\n        <section class=\"page_content\">\n            <div class=\"content_container\">\n                <div class=\"content-box\">\n                    <div class=\"header-box\">\n                        <div class=\"title-box\">\n                            <h1>{{ blog.title }}</h1>\n                        </div>\n                        <div class=\"info-box\">\n                            <div class=\"info-bar\">\n                                <div class=\"bar-content\">\n                                    <span class=\"author\">{{ blog.name }}</span>\n                                    <span class=\"update-time\">{{ blog.update_time }}</span>\n                                </div>\n                            </div>\n                            <div class=\"info-tags\">\n                                <div class=\"tag-box\">\n                                    <span class=\"label\">分类专栏：</span>\n                                    <el-tag type=\"info\">{{ blog.section }}</el-tag>\n                                    <span class=\"label\">博客标签：</span>\n                                    <el-tag type=\"info\">{{ blog.tag_list }}</el-tag>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <article class=\"content-box\">\n                        <div v-html=\"article_content\"></div>\n                    </article>\n                </div>\n            </div>\n        </section>\n    </div>\n</template>\n```\n', 1, '2020-12-23 22:35:03', '2020-12-16 21:42:36', '内部展示');
INSERT INTO `blog` VALUES (5, '测试文章2', '转载,活动', '![提交证明.png](http://127.0.0.1:8067/uploads/1608736295526.png)\n\n# 一级标题', 1, '2020-12-23 23:11:38', '2020-12-16 21:42:50', '外部公示');
INSERT INTO `blog` VALUES (6, 'c测试文章', '原创,活动', 'asd\n|name 方法名|params 参数|describe 描述|\n|-|-|-|\n|$vm.$refs.toolbar_left.$imgDelByFilename(>=2.1.6)|String: filename|主动删除对应图片文件, 如果成功返回TRUE，否则返回FALSE, (并将其从 md 源码中删除 (>=2.4.16))|\n', 1, '2020-12-17 21:11:38', '2020-12-17 13:03:38', '内部展示');
INSERT INTO `blog` VALUES (7, '测试文章2', '原创,转载', '![image.png](http://127.0.0.1:8067/uploads/1608872290653.png)\n\n**奥术大师多# 一级标题**\n```html\n<el-form class=\"handle-box\">\n            <el-button class=\"mr10\" icon=\"el-icon-plus\" type=\"primary\" @click=\"handleNew\">新增博客</el-button>\n            <el-button class=\"mr10\" icon=\"el-icon-delete\" type=\"danger\" @click=\"delAllSelection\">批量删除</el-button>\n        </el-form>\n        <el-table\n            ref=\"multipleTable\"\n            :data=\"tableData\"\n            class=\"table\"\n            header-cell-class-name=\"table-header\"\n            @selection-change=\"handleSelectionChange\"\n        >\n            <el-table-column align=\"center\" type=\"selection\" width=\"50\"></el-table-column>\n            <el-table-column label=\"博客标题\" min-width=\"200\" prop=\"title\"></el-table-column>\n            <el-table-column align=\"center\" label=\"博客标签\" min-width=\"100\">\n                <template slot-scope=\"scope\">\n                    <el-tag v-if=\"scope.row.tag_list.indexOf(\'转载\') !== -1\" :type=\"\'success\'\">转载</el-tag>\n                    <el-tag v-if=\"scope.row.tag_list.indexO\n```\n', 1, '2020-12-25 13:00:19', '2020-12-25 13:00:19', '外部公示');

-- ----------------------------
-- Table structure for team
-- ----------------------------
DROP TABLE IF EXISTS `team`;
CREATE TABLE `team`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '团队ID',
  `team_name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '团队名称',
  `type` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '团队类型 学生团队、教师团队',
  `teacher_id` int NULL DEFAULT NULL COMMENT '指导老师ID',
  `leader_id` int NULL DEFAULT NULL COMMENT '负责人ID',
  `introduction` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '介绍',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '团队信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of team
-- ----------------------------
INSERT INTO `team` VALUES (0, '无归属团队', NULL, NULL, NULL, '此团队为没有加入任何团队的成员的归属');
INSERT INTO `team` VALUES (1, '西木工作室', '学生团队', NULL, 1, '西木工作室');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `uid` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户UID（8位16进制）',
  `username` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户账号',
  `password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户姓名',
  `email` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮件',
  `team_id` int NULL DEFAULT NULL COMMENT '团队ID',
  `job` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '团队担任工作 自填',
  `status` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户状态 已激活、未激活',
  `role` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色 超级管理员、管理员、贡献者',
  `telephone` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话',
  PRIMARY KEY (`uid`, `username`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  UNIQUE INDEX `uid`(`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'ximu', '123456', '西木', 'ximu@ximu.com', 1, '前端', '已激活', '管理员', '19988887778');
INSERT INTO `user` VALUES ('3', 'ximu2', '123456', '西木2', 'ximu2@ximu.com', 0, '无', '已激活', '贡献者', '15848382444');
INSERT INTO `user` VALUES ('4', 'ximu3', '123456', '西木3', 'ximu3@ximu.com', 0, '前端设计', '未激活', '贡献者', '14455556666');

SET FOREIGN_KEY_CHECKS = 1;
