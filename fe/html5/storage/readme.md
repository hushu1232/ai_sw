# 存储 
- mysql 关系型数据库 
- 浏览器缓存 打开之前打开过的页面 很快
- 本地存储 文件 json csv excel ....
- 云盘
- redis 缓存 
  KV 第一次走mysql 读取文章列表 ， 每次没有必要实时的去mysql里查，mysql 性能有瓶颈（相对于代码）， 把结果放到redis 里，
  以后走redis. 
- llm 大型的embedding存储  数据智能 

## 前端八股
- form 表单收集用户的输入，点击submit按钮，向action 
地址提交， 
  一般不用这种默认提交， 体验不好，它会刷新页面
  fetch/ajax, 由js 来提交

## this 
函数运行时指定 （不是申明时候）
this 指向函数的调用者
- 普通函数被调用 this指向全局window  也没有必要 启用严格模式
var 申明的变量， 挂载在window 上  污染了window 对象 
let 就不会 污染window 对象

- 作为对象的方法调用 
  this 指向调用对象
  对象的方法， 引用式赋值给变量

- 作为构造函数调用
this 指向实例对象

- 作为事件处理函数  
  this 指向事件触发元素

- 手动的指定this 指向 
  call apply 都可以手动指定 this
  区别是 call 是一个个传参数， apply 是传数组对象
  bind  手动指定this, 返回一个新的函数
- 箭头函数 没有this 指向
  简化的函数，