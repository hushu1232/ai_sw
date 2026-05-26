# 数组去重
## 手写代码、业务场景题目
[1,2,3,2,5]

##注释
- 有利于协作
代码的开发者和使用者不是一个人
忘记
注释是代码的一部分
注释提高代码的可读性
- 一个函数一个功能
- 封装 复杂功能
- 健壮性  校验参数 

## 形式
- 完成功能的函数

## 数组API
- Array.isArray 是否是数组 静态
- arr.indexOf(item)  值在数组中出现的下标  
- filter 过滤 (arr, function(item,index) {
    // true item 留下
    // false item 离开 
    return true|false 
})
- sort()  排序 

## 时间复杂度和空间复杂度 
O(n^2) 两重循环、filter、indexOf
O(nlogn) 排序 相邻
O(n) 空间换时间 对象字面量|HashMap
 
