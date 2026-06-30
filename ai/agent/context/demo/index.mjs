import 'dotenv/config';
import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.DEEPSEEK_BASE_URL
});
// 通用性大模型 大而全， 可能在某些专业领域，还需要补充知识 RAG 
// 补充上下文 context  pre-trained api 订单服务AI客服 动态的
// 资料， 文档 静态的
// 上下文的结构化思想
// 构成上下文的，在不同的地方， 不同的形式
const context = {
    // 需求背景：你是谁？做这事的目的
    background: 
        "我是大学附近的奶茶店老板，客户多是17-22岁学生， 客单价15-20元",
    // 约束 相关事实， 限制条件
    constraints: "夏季要清爽， 成本控制在8元内 ",
    outputRequirements: `要颜值高（适合拍照发朋友圈）, 请输出JSON格式，包含
    饮料名、配料、成本、定价。
    `
}
// 工程角度
const systemPrompt = `
你是一个专业的饮品研发专家，请根据以下上下文信息完成任务。
【背景】 ${context.background}
【约束】 ${context.constraints}
【要求】${context.outputRequirements}
`
async function generateNewTea() {
    // 容错， 代码工程的重要部分
    try {
        console.log(`正在请求大模型，上下文工程已就绪...`);
        const completion = await client.chat.completions.create({
            model: "deepseek-v4-pro",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: "请开始你的研发设计"
                }                
            ],
            temerature: 0.7  // 创造 
        });
        const aiResponse = completion.choices[0].message.content;
        console.log("\n AI 研发成果:");
        console.log(aiResponse);
        try {
            const jsonData = JSON.parse(aiResponse);
            console.log("成功解析为JSON 对象", jsonData);
        } catch(err) {
            console.log("返回的格式不是JSON, ")
        }

    } catch(err) {
        console.error(err.message);
    }
}

generateNewTea();