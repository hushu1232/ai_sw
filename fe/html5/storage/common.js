"use strict";
// 启用严格模式 
const oForm = document.querySelector('.add-items');
// JS 事件驱动的
// 异步？ 
let obj = {
  name: "赖庆庆",
  say: function() {
    console.log(this);
    console.log(`${this.name}`)
  },
  speak: function(a, b) {
    console.log(a, b);
    console.log(this);
  }
}
const addItemBind = addItem.bind(obj); // 全新函数， 不立即运行
console.log(addItemBind, '////')
// 事件 一定要有一个事件处理**函数** this 默认指向事件触发对象
// 如果我想手动指定this ? call, apply, bind 都可以
// call apply 立即运行， 但是我们要的函数是异步运行的， bind  
oForm.addEventListener('submit', addItemBind);

function addItem(e) {
  console.log(e);
  console.log(this);
  // 阻止提交默认行为 刷新页面
  e.preventDefault();
}

document
  .querySelector('.lnk')
  .addEventListener('click', goBaidu);

function goBaidu(e) {
  // 函数运行时一定会有的一个对象 
  console.log(this); //指向？ 
  e.preventDefault();
}


let obj2 = {
  name: "甜总"
}
var name = "佳明";
obj.say(); // 函数作为对象的方法调用 this指向调用对象
const fn = obj.say;// 引用式赋值
// fn();// 普通函数被调用， this指向全局的window 
obj.say.call(obj2);// 手动指定 this 指向 obj2
obj.say.apply(obj2);
obj.speak.call(obj2, '你好', '我是甜总');
obj.speak.apply(obj2, ['你好', '我是甜总']);
const fn2 = obj.speak.bind(obj2); // 不立马执行， 返回新函数
console.log(fn2);
fn2('你好', '我是甜总');