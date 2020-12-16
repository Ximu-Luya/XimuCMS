CREATE TABLE blog(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '博客ID' ,
    title VARCHAR(64)    COMMENT '标题' ,
    tag_list VARCHAR(128)    COMMENT '标签列表 原创、转载、活动' ,
    blog_content TEXT    COMMENT '博客内容 markdown文本' ,
    user_id INT    COMMENT '作者ID' ,
    update_time DATETIME    COMMENT '最后更新时间' ,
    release_time DATETIME    COMMENT '发表时间' ,
    section VARCHAR(64)    COMMENT '版块 公示板块、内部公示板块' ,
    PRIMARY KEY (id)
) COMMENT = '博客详情 ';;

ALTER TABLE blog COMMENT '博客详情';;
CREATE TABLE achievement(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '成果ID' ,
    name VARCHAR(128)    COMMENT '名称' ,
    detail TEXT    COMMENT '成果细节' ,
    type1 VARCHAR(32)    COMMENT '一级类型 教学、科研、学生指导' ,
    type2 VARCHAR(32)    COMMENT '二级类型 论文、专利、软件著作权、奖项' ,
    get_time DATETIME    COMMENT '取得时间' ,
    user_id INT    COMMENT '最后编辑者' ,
    update_time DATETIME    COMMENT '最后更新时间' ,
    PRIMARY KEY (id)
) COMMENT = '成果详情 ';;

ALTER TABLE achievement COMMENT '成果详情';;
CREATE TABLE team(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '团队ID' ,
    team_name VARCHAR(64)    COMMENT '团队名称' ,
    type VARCHAR(64)    COMMENT '团队类型 学生团队、教师团队' ,
    teacher_id INT    COMMENT '指导老师ID' ,
    leader_id INT    COMMENT '负责人ID' ,
    introduction VARCHAR(1024)    COMMENT '介绍' ,
    PRIMARY KEY (id)
) COMMENT = '团队信息 ';;

ALTER TABLE team COMMENT '团队信息';;
CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '用户ID' ,
    username VARCHAR(64)    COMMENT '用户账号' ,
    password VARCHAR(64)    COMMENT '密码' ,
    name VARCHAR(64)    COMMENT '用户姓名' ,
    email VARCHAR(64)    COMMENT '邮件' ,
    team_id INT    COMMENT '团队ID' ,
    job VARCHAR(64)    COMMENT '团队担任工作 自填' ,
    status VARCHAR(32)    COMMENT '用户状态 已激活、未激活' ,
    role VARCHAR(64)    COMMENT '角色 超级管理员、管理员、贡献者' ,
    telephone VARCHAR(32)    COMMENT '电话' ,
    PRIMARY KEY (id)
) COMMENT = '用户信息 ';;

ALTER TABLE user COMMENT '用户信息';;

INSERT INTO `blog` VALUES (15, '2', '原创', '1', 1, '2020-12-09 00:39:23');
INSERT INTO `blog` VALUES (16, '1', '活动', '1', 1, '2020-12-09 00:39:28');
INSERT INTO `team` VALUES (1, '无归属团队', '');
INSERT INTO `team` VALUES (2, '西木工作室', '学生团队');
INSERT INTO `user` VALUES (1, 'ximu', '123456', '西木', 'ximu@ximu.com', 2, '前端', '已激活', '管理员');
INSERT INTO `user` VALUES (4, 'wangsuning2', '123456', '王苏宁', 'sn@ximu.com', 2, '后端man', '已激活', '管理员');