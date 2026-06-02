//.env 文件中apikey 读取进来
//dotenv
import dotenv from 'dotenv'
dotenv.config()
//process ？ 进程对象
//操作系统的核心概念
//node index.mjs 本质是启动进程
//进程是分配资源（内存、cpu、IO）的最小单位
//node 就是process 这个全局对象
//process.env 是一个对象，包含环境变量
//console.log(process.env.DEEPSEEK_API_KEY)
//函数表达式
//async 修饰符
//函数内部可以使用使用await 关键字 等待异步操作完成
//省略function 关键字，箭头函数
   const client = new OpenAI({
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: process.env.DEEPSEEK_BASE_URL,
    });
const main = async function() {
    console.log('程序开始运行');
    const reslut = await client.chat.completions.create({
        model: "deepseek-3.5",
        messages: [
            { role: "user", content: "你好" },
        ],
    })
    console.log(reslut.choices[0].message.content);
    setTimeout(() => {
        console.log('1秒后运行');
    },1000);
        console.log('程序结束');
    
}
main();

