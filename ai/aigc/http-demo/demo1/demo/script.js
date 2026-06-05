// url + method + http 版本号 请求行 
const endpoint = 
    'https://api.deepseek.com/chat/completions';
// headers 请求头
const headers = {
    'Content-Type': 'application/json',
    // api key 通过 带上
    Authorization: `Bearer sk-1db9d163e32d42a09cca29dec461fa78`
}

// 请求体
const payload = {
    //便宜点
    model: 'deepseek-v4-flash',
    messages: [
        { role: 'system', 
            content: 'You are a helpful assistant' },
        { role: 'user', content: '你好， Deepseek'}
        
    ]
}

try {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        // http 请求里面 传输的不可以是对象 
        // 只能传输字符串
        body: JSON.stringify(payload)
    })
    const data = await response.json();
    console.log(data);
    document.getElementById('replay').innerHTML = 
        data.choices[0].message.content;
} catch(err) {

}