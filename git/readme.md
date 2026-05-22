# Git 开发必备技能

- ysw_ai 目录是什么？
项目开发目录
缺点？ 
    - 多人协作 
    单机版本
    中央仓库（remote） github/gitee/gitlab 
    团队(分布在每个人的机器上 local)共享仓库的代码 
    分布式  distribute
- 文件 硬盘坏了 、找到之前的修改
    版本的概念 
    一个文件 不同的版本（快照）
- 不够工程化 

## git init
- 初始化
- 本地的代码项目目录升级为带有版本控制能力的代码仓库。
- 目录下多了一个.git 文件夹（隐藏）
    - 不能乱改
        按git 要求来执行
    - windows 和linux shell 脚本不一样
    - 项目目录下 git bash   最简版本的linux 
- ls -all 

## git add 文件名 
- 将readme.md 添加进暂存区（stage） 
2 insertions   2行新增  严谨  中途休息、离场， 

## git commit -m "desc"
-m 说明 不能乱写 leader 主要看这个
最终添加到仓库中 

## 为什么要用两条命令把文件添加到仓库？
    - 完成某项功能， index.html, common.css  common.js
    stage 暂存区 多次添加， 不会带来仓库版本的改变  
    git add index.html
    git add common.css
    git add common.js 
    提前后悔一下 
    git commit -m '首页页面功能'

## git status 
任何你需要清楚当前仓库的状态的时候
任何关键时刻先git status 

## 文件状态
- untracted 未跟踪状态 
- to be commit 待提交
- add 多次， commit 一次 （开发任务）
要保证仓库的干净

- add a repo   远程仓库
- 