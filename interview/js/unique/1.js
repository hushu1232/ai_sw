/**
 * @func 数组去重
 * @param {Array} arr 数组
 * @return {Array} 去重后的数组
 * @author ysw 
 * @date 2026-05-25
 */
function unique(arr) {
    // 参数校验
    // JS 没有类， 只有对象
    // 数组的静态方法 没有实例化
    // Array.isArray 判断是否是数组
    if (!Array.isArray(arr)) {
        console.log('type error')
        return [];
    }
    let res = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        let flag = true;    // 是否重复
        for (let j = 0; j < res.length; j++) {
            // === 恒等， 全等 值相等，类型相等
            // 1 === “1” 弱类型  
            if (arr[i] === res[j] ) {
                flag = false;
                break;
            }
        }
        if (flag) {
            res.push(arr[i]);
        }
    }
    return res;
}

console.log(unique([1,2,3,2,5]));