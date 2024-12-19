# var

1. 没有块级作用域概念

```js
{
  var a = 1;
}
console.log(a); // 1
```

2. 有全局作用域、函数作用域概念

```js
var a = 1;
function foo() {
  var b = 2;
  console.log(a); // 1
  console.log(b); // 2
}
foo();
console.log(b); // ReferenceError: b is not defined
```

3. 不初始化默认为 undefined

```js
var a;
console.log(a); // undefined
```

4. 存在变量提升

```js
console.log(a); // undefined
var a = 1;

foo();
function foo() {
  console.log(a);
  var a;
}
```

js 需要经历编译和执行阶段，在编译阶段会搜集所有变量声明并提前声明变量  
在这个过程所有声明变量会被移动到各自作用域最顶端

5. 全局作用域用 var 声明的会挂载到 window 对象上

```js
var a = 1;
console.log(window.a); // 1
```

6. 同一作用域允许重复声明

```js
var a = 1;
var a = 2;
console.log(a); // 2

function foo() {
  var b = 3;
  var b = 4;
  console.log(b);
}
```

# let
1. 块作用域 
```js
{
  let a = 1;
}
console.log(a); // ReferenceError: a is not defined
```
2. let 声明的变量不会被提升
```js
console.log(a); // ReferenceError: a is not defined
let a = 1;
```
3. 暂时性死区
```js
{
  // Block Scope
  console.log(a); // ReferenceError: Cannot access 'a' before initialization
  let a = 1;
}
if(true) {
  console.log(a); // ReferenceError: Cannot access 'a' before initialization

  let a;
  console.log(a); // undefined

  a = 123;
  console.log(a); // 123
}
```
上面代码中，使用let声明变量a，导致绑定这个块级作用域，所以在let声明变量前，打印变量a报错，这是因为使用let/const所声明的变量会存在暂时性死区  
使用let和const声明变量之前，该变量都是不可用的，称为暂时性死区

4. 不能重复声明
```js
let a = 1;
let a = 2; // SyntaxError: Identifier 'a' has already been declared
```

# const
1. 必须初始化
2. 常量不可改变

总结： 
var 声明的变量，没有块级作用域概念,有全局作用域、函数作用域概念，不初始化默认为undefined，全局作用域会挂载到window对象上，存在变量提升，同一作用域允许重复声明，  
let 有块级作用域，不存在变量提升，暂时性死区，不存在全局作用域概率，同一作用域中不允许重复声明  
const 与let一样，但是必须立即初始化，常量的值不可改变