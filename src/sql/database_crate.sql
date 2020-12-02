CREATE TABLE blog(
    blog_id VARCHAR(32) NOT NULL   COMMENT '博客ID' ,
    blog_title VARCHAR(128)    COMMENT '标题' ,
    blog_type VARCHAR(32)    COMMENT '博客类型 原创、转载、活动事件博客' ,
    blog_content TEXT    COMMENT '博客内容 markdown文本' ,
    user_id VARCHAR(32)    COMMENT '作者ID' ,
    update_time DATETIME    COMMENT '最后更新时间' ,
    PRIMARY KEY (blog_id)
) COMMENT = '博客详情 ';;

ALTER TABLE blog COMMENT '博客详情';;
CREATE TABLE achievement(
    achievement_id VARCHAR(32) NOT NULL   COMMENT '成果ID' ,
    achievement_name VARCHAR(128)    COMMENT '名称' ,
    achievement_detail VARCHAR(1024)    COMMENT '成果细节' ,
    user_id VARCHAR(32)    COMMENT '最后编辑者' ,
    update_time DATETIME    COMMENT '最后更新时间' ,
    PRIMARY KEY (achievement_id)
) COMMENT = '成果详情 ';;

ALTER TABLE achievement COMMENT '成果详情';;
CREATE TABLE team(
    team_id VARCHAR(32) NOT NULL   COMMENT '团队ID' ,
    team_name VARCHAR(128)    COMMENT '团队名称' ,
    team_type VARCHAR(128)    COMMENT '团队类型' ,
    PRIMARY KEY (team_id)
) COMMENT = '团队信息 ';;

ALTER TABLE team COMMENT '团队信息';;
CREATE TABLE user(
    user_id VARCHAR(32) NOT NULL   COMMENT '用户ID' ,
    username VARCHAR(32)    COMMENT '用户名' ,
    password VARCHAR(32)    COMMENT '密码' ,
    user_name VARCHAR(128)    COMMENT '用户姓名' ,
    user_email VARCHAR(128)    COMMENT '邮件' ,
    team_id VARCHAR(32)    COMMENT '团队ID' ,
    user_status VARCHAR(32)    COMMENT '用户状态' ,
    role VARCHAR(128)    COMMENT '角色' ,
    PRIMARY KEY (user_id)
) COMMENT = '用户信息 ';;

ALTER TABLE user COMMENT '用户信息';;
