---
title: this指向
---

## this 指向

### 1. 函数体中，非显式调用或隐式调用函数式，在严格模式下，函数的 this 会被绑定到 undefined，在非严格模式下，函数的 this 会被绑定到全局对象（window/global）。

#### 示例

```js
function fn1() {
  console.log(this); // window
}
function fn2() {
  // "use strict";
  console.log(this); // undefined
}

var foo = {
  bar: 10,
  func() {
    console.log(this);
    console.log(this.bar);
  },
};
var fn2 = foo.func;
fn2();
// window/global
// undefined

foo.func();
// 10
// { bar: 10, func: [Function: func] }
```

### 2. 使用 new 方法调用构造函数时，构造函数中的 this 会绑定到新创建的对象上。

### 3. 通过 call/apply/bind 方法调用函数时，函数的 this 会被绑定到指定的对象上。

### 4. 一般通过上下文对象调用对象，函数体内的 this 会被绑定到该对象上

#### 示例

```js
var foo = {
  bar: 10,
  func() {
    console.log(this);
    console.log(this.bar);
  },
};

foo.func();
// 10
// { bar: 10, func: [Function: func] }
console.log(stu.func() === stu); // true
```

```js
var stu = {
  name: "张三",
  son: {
    name: "小明",
    fn() {
      return this.name;
    },
  },
};
console.log(stu.son.fn()); // 小明
```

```js
var o1 = {
  text: "o1",
  fn() {
    return this.text;
  },
};

var o2 = {
  text: "o2",
  fn() {
    return o1.fn();
  },
};

var o3 = {
  text: "o3",
  fn() {
    var fn2 = o1.fn;
    return fn2();
  },
};
console.log(o1.fn()); // "o1"
console.log(o2.fn()); // "o1"
console.log(o3.fn()); // undefined
```

#### 5. 在箭头函数中，this 指向由外层（函数或者全局作用域）来决定

## 改变 this 指向

### 1. call、apply、bind

#### call

call 可以指定 this 指向（即函数执行时所在作用域的 this），然后在指定作用域中，执行函数

指定 this 指向对象，在对象作用域中运行函数

```js
var obj = {};
var f = function () {
  return this;
};

console.log(f() === window); // true this 指向全局对象
console.log(f.call(obj) === obj); // true this 指向 obj
```

##### call 方法的第一个参数应该是对象，如果参数为空或者 null、undefined，则默认传参全局对象

```js
var n = 123;
var obj = { n: 456 };

function foo() {
  return this.n;
}

foo.call(); // 123
foo.call(null); // 123
foo.call(undefined); // 123
foo.call(window); // 123
foo.call(obj); // 456
```

如果 call 传参不是以上类型，则会转化为对应的包装对象

```js
var f = function () {
  return this;
};
f.call(123); // Number: 123
```

##### call 之后的参数是参数列表

```js
function add(a, b) {
  return a + b;
}
console.log(add.call(null, 1, 2)); // 3
```

##### 实际应用

call 一个经常的应用就是调用原生方法，

```js
var obj = {};
// hasOwnProperty 方法查看一个对象上是否有摸一个属性或者方法
// 这个属性必须是自身就有的,而不是继承而来
console.log(obj.hasOwnProperty("toString")); // false
console.log(obj.toString()); // [object Object] toString 方法是继承自原型对象 Object 的

// obj 能够调用toString,但 toString 不是自身拥有,而是来自于原型对象

obj.hasOwnProperty = function () {
  return "aaaaa";
};
console.log(obj.hasOwnProperty("toString")); // aaaaa

// 上面对 hasOwnProperty 方法进行了覆盖
// 使用call可以调用原生的方法
Object.prototype.hasOwnProperty.call(obj, "toString"); // false
```

#### apply

apply 和 call 类似，但是参数不同，apply 传递的参数是数组

#### bind

用于将函数体内的 this 绑定到某个对象,然后返回一个新函数

```js
var d = new Date();
var fn = d.getTime.bind(d);
var fn1 = d.getTime;
// this指向d
console.log(fn()); // 1562359600000
// this指向window
console.log(fn1()); // Uncaught TypeError: this is not a Date object
```

示例 2

```js
var counter = {
  count: 0,
  add() {
    this.count++;
  },
};
var fn = counter.add.bind(counter);
fn();
console.log(counter.count); // 1

var obj = {
  count: 100,
};
var fn1 = counter.add.bind(obj);
fn1();
console.log(counter.count, obj.count); // 0 101
```

##### 注意

1. 每一次返回一个新函数: bind 方法每运行一次,就返回一个新函数. 监听事件时不能写成如下

```js
element.addEventListener("click", o.m.bind(o));
```

上面代码中,click 事件绑定 bind 方法生成一个匿名函数,这样会导致无法取消绑定, 所以下面代码无效。

```js
element.removeEventListener("click", o.m.bind(o));
```

2. 结合回调函数使用: 使用回调函数时常见错误是,将包含 this 的方法直接当作回调函数,解决方法就是使用 bind 方法

```js
var counter = {
  count: 0,
  inc: function () {
    this.count++;
  },
};

function callIt(callback) {
  callback();
}
callIt(counter.inc.bind(counter));
console.log(counter.count);
```

上面代码总,callIt 方法会调用回调函数,如果直接把 counter.inc 传入,this 会指向 window。

### 2. 箭头函数的 this 指向
