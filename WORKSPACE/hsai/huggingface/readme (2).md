# Model Scope
魔搭，前辈是huggingface,抱抱脸
Hugging Face 是全球顶尖 AI 开源社区，2016 年成立，被称为 “AI 界 GitHub”。汇聚海量预训练模型与数据集，覆盖 NLP、CV 等多模态领域，提供 Transformers 库等工具，助力开发者协作创新、快速部署 AI 应用。
- model
开源大模型平台、训练及发布自己的模型
- scope
社区

## 数据服务

## Note Book
如果我们有NLP实验、算法，Python note book随时编写，随时运行

python 简介，特别适合数学运算、NLP,AI,爬虫，
- JS  不太适合做计算
Web 前端脚本，交互（幻灯片、滚动加载更多）用户体验
JS数据类型Number 
人生苦短，我用python

复合语句结尾必须加 :，表示下一行是从属代码块,缩进来

## LLM api 调用
- 安装openai sdk
- 实例化client
    api_key
    base_url
    遵守同样的接口标准
- client.chat.completion.creat()
    aigc文本生成的接口
    model d
    prompt
## Prompt 高级设计模式
- 详细且准确的指令
- 一步步，分条列点去引导llm工作
- 对返回结果的格式做约束
    json 格式
    - 清晰正确
    - json适合接下来继续运行
    