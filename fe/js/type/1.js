// 表示空， 没有
// null 
// primitive 原始 内存空间固定， 
// 拷贝式赋值
let a = null;
let b = a;// 拷贝， 复印机
b = 2;
let obj1 = {name: "谢鲁立"}
let obj2 = obj1; // 引用式 
obj2.company = "快手"
console.log(obj1, obj2);
console.log(a, b);
console.log(a); 

let obj = {
    name: "Alice",
    address: null
}

console.log(obj.address); // null
console.log(obj.age); // undefined

let largeObject = {
    data: new Array(100000000).fill("hgh")
}
// 手动回收内存？ 
largeObject = null;