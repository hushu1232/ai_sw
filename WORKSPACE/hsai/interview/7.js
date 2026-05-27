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
//set去重
return [...new Set(arr)]
}
