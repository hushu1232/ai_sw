// O(n) 遍历一次
// 空间换时间 
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error')
        return [];
    }
    let res = [],
    // js 是简单语言 
    // 早期js就是用来做点事件，交互的 没有hashMap 
    // HashMap 数据结构 
    obj = {};  // 对象字面量 
    for (let i = 0; i < arr.length; i++) {
        // get 读操作 动态看待 
        // arr[i] 当前项 作为key 变量
        // obj[variable] 变量作为key 
        // .name 常量
        if (!obj[arr[i]]) {
            res.push(arr[i]);
            obj[arr[i]] = 1;
        } else {
            obj[arr[i]]++;
        }
    }
    return res;
}