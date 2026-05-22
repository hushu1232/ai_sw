# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 JavaScript 的鼓机应用（JavaScript Drum Kit），来自 JavaScript30 教程。用户通过键盘按键触发不同的鼓声音效。

## 项目结构

- `index-START.html` - 项目起始文件，包含 HTML 结构但缺少 JavaScript 功能
- `index-FINISHED.html` - 完整的最终版本，包含所有功能
- `style.css` - 样式文件，包含按键布局和动画效果
- `sounds/` - 包含 9 个 WAV 格式鼓声音效文件
- `background.jpg` - 背景图片

## 核心功能实现

### 数据绑定机制
- HTML 元素使用 `data-key` 属性关联键盘按键码（keyCode）
- 音频元素通过 `data-key` 属性映射到对应的按键
- 按键码映射：A(65)=clap, S(83)=hihat, D(68)=kick, F(70)=openhat, G(71)=boom, H(72)=ride, J(74)=snare, K(75)=tom, L(76)=tink

### 关键实现细节
1. **按键事件监听**：监听全局 `keydown` 事件
2. **音频播放**：重置 `audio.currentTime = 0` 允许快速重复播放
3. **视觉反馈**：通过添加/移除 `playing` class 实现按键动画
4. **过渡结束清理**：监听 `transitionend` 事件自动移除动画 class
5. **属性过滤**：在 `removeTransition` 中只处理 `transform` 属性的变化

## 运行方式

直接在浏览器中打开 `index-FINISHED.html` 或 `index-START.html` 即可运行。无需构建过程或依赖安装。

## 开发注意事项

- 所有 JavaScript 代码直接嵌入在 HTML 文件中的 `<script>` 标签内
- CSS 使用 rem 单位，基准字体大小为 10px
- 使用原生 JavaScript，不依赖任何框架
- 音频文件为 WAV 格式，需要浏览器支持