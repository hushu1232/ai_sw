const queue = []; // 空的队列
queue.push('许');
queue.push('叶');
queue.push('戴');
while(queue.length) {
    const top = queue[0]; 
    console.log(top, '取餐');
    queue.shift();
}

console.log(queue);