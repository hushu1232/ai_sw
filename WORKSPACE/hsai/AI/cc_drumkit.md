# Claude Code

-AIGC 代码生成
 豆包复制代码
 
-vscode + cc插件
 AI Coding Agent
 手和脚 直接干活，生成的代码直接写入文件夹

-cc 的命令行工具
基于node.js 实现
npm config set registry https://registry.npmmirror.com

npm node package management
包的来源设置为淘宝源 国内 速度快

npm install -g @anthropic-ai/claude-code
全局安装cc 命令行 npm 包

claude --version

## cc 开发网页 jima

-claude 
是否信任文件夹
就像请了一个程序员来帮你改项目，你得先把办公室门禁给他，才能做看代码、该文件、跑命令，但权限也只限于你授权的这个文件夹

体现了anthropic 在claude code里强调 最小权限+安全边界 思想

## Vibe Coding
-不要急于将任务交给llm
-先思考
 五个构建块
 llm擅长执行准确详细的任务 Prompt设计能力是关键

## cc 提供plan模式
 通过询问一系列问题，cc会根据你的回答，生成一个计划，帮助你完成任务

## plan模式
-不是直接执行任务
-先规划一下
   请了诸葛亮
   /plan模式（新的工作模式）
   不太了解行业或领域，/plan可以降低难度
   -claude code 非常智能（智能体） 可以进行思考、规划、执行（对新手友好）

## 使用cc维护一个已有的项目
-先思考，了解项目
 运行起来，看项目的行为
 按模块看代码
-cc
 -如果之前是cc开发的 直接查看根目录下的claude.md文件（项目描述）
 -如果不是呢
 /init 
 初始化项目，生成claude.md文件
 将项目都分析一遍

 
