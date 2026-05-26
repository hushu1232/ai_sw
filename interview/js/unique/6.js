// Set 是什么？ES6 新增的数据结构
// HashMap O(1)时间复杂度 key 查值
// Set  不重复的数据容器

function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error')
        return [];
    }
    return [...new Set(arr)];
}