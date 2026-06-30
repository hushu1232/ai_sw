let o = {
    name: "邰老板",
    say: function() {
        console.log(`${this.name}`)
    }
}

let obj = {
    name: "甜总"
}
// this 指针 
o.say();
console.log(o.say);
// js 函数也是对象
o.say.call(obj); // 函数会运行，指定函数运行时this 的指向 第一个参数
// js 底层玩了一手
// str str2
// str.length 本来是不可以的， str 简单数据类型
// len(str) python  js 不这么干， 代码里混入函数+面向对象两种写法
// js 为了统一面向对象写法， 
// str string 简单类型
// 类 String 
// 包装类 让简单数据类型也可以像对象一样来调用属性方法，开发简单，好读
// str  在底层  new String(str) 包装一下 就是一个string 实例， 有.length 属性
// 用完后， 还要打扫战场， 自动把str 又改回原有的简单数据类型（灰姑娘的玻璃鞋）
