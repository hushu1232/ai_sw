/** 
* @func 数组去重
* @param {Array} arr - 输入数组
* @return {Array} - 去重后的数组
*@author xwb
*@data 2026-05-27
*/

function unique(arr) {
  // 参数校验 不是数组，返回空数组
  if (!Array.isArray(arr)) {
    console.log('参数必须是数组');
    return [];
  }
//双重循环去重
let res = [arr[0]];
for (let i = 1; i < arr.length; i++) {
    let flag=true
    for (let j = 0; j < res.length; j++) {
        if(res[j]=== arr[i]){
            flag=false
            break
        }
    }
    if(flag){
        res.push(arr[i]);
    }
}
   return res;
}
  
 Console.log(res);
