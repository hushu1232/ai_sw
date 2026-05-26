#Users Chat AI 全栈项目

-后端+前端目录创建
    目录-》全栈项目->协作形式（前后端分离 古法编程）-》

## 模块化 module
-一个函数只做一个功能
-一个文件只写一个模块/类
-一个文件夹只负责一个模块或一个架构
### 优势
-好维护
-高质量
   可读性，简单可靠

## js
前端，后端，ai，嵌入式...

## users 项目需求
-后端 相关数据接口 API applistion Interface 
http server
url 全称 universal resource location 统一资源定位符
http://localhost:3000/users 用户列表资源
http://localhost:3000/users/：id 动态路由 某个用户的详情
### restful 设计模式 暴露资源
web 开发的根基 阿里巴巴Java代码规范
-设计url 的范式
协议：//域名+端口 某台服务器的某个服务  资源
http://localhost:3000/users
http://localhost:3000/books
http://localhost:3000/posts
http://localhost:3000/posts/：id 动态路由 某个帖子的详情

-http的动作 crud
get  Read https：//localhost：3000/posts/：id
post creat 创建 https：//localhost：3000/posts
put update  https：//localhost：3000/posts/：id
delete delete https：//localhost：3000/posts/：id

-js node 后端初始化
    npm init -y
    package.json 项目描述文件
    npm node package management
    node 包管理器
    npm i json-server

## 数据存储
-数组，对象，内存中的数据容器
-长期存储
    -数据库 mysql
    json文件 Javascript Object Notation
    {key:val...}
    excel csv pdf 文本

## 前端
html
css
js
### html
盒子
    块级能力 宽高
    PC业务 固定宽度 左右留白
    container 设备 电脑屏幕尺寸
    不要div 满天飞 nav/main 拒绝用div
    语义化的标签 出来盒子功能功能外，自带语义，好处是
        代码可读性高 ， 代码可维护性高
        搜索引擎优化 seo 爬虫看的
             百度/Google 爬虫 爬取网页 分析dom元素
             dom树
             html是根节点
             body 可视区的开始节点
             headr
             .container
                nav 
                main 
                aside
            footer
            

内容
    行内
## prompt 
-加上模块化约束
-请你帮我设计users 用户数据接口，请遵守restful 机制
-请帮我编写首页，使用bootstrap css框架，使用语义化标签
dom模型
Document Object Model
    -Document
    html 
    text/plain
    html 标签 a img hi http 传输的超文本传输协议的一种文本格式
    text/html
    <!DOCTYPE html>
    ！ html5 版本标记
    -