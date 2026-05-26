function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error')
        return [];
    }
    // filter 方法 过滤 
    // 结果是过滤后的数组
    return arr.filter(function(item, index) {
        console.log(item, index);
        // boolean true 保留， false 过滤
        return arr.indexOf(item) === index;
    })
}

console.log(unique([1,2,3,2,5]));