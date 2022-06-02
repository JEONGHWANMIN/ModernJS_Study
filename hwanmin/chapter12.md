# 함수

프로그래밍 언어 함수는 일련의 과정을 문으로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것

```js
function HwanMin(name, age) {
  return `${name} , ${age}`;
}

// function HwanMin(name, age) 파라미터 , 매개변수
// return `${name} , ${age}`; 반환값

HwanMin('hwan', 21);

// 위 코드에서 HwanMin(인수 , 인수)
```

함수는 2가지로 정의되고 호출된다 .

1. 함수 정의
2. 함수 호출

즉 함수 하나를 만들면 그 함수를 호출해서 사용하는 형태로 사용된다.

### 함수를 사용하는 이유

1. 함수는 한번 만들어 놓으면 여러번 재 사용이 가능하다. (중복제거가 가능!)
2. 유지보수 편의성 증가
3. 코드의 신뢰성 증가
4. 코드의 가독성 향상

```js
function PrintName(name) {
  console.log(name);
}

PrintName('환민');
PrintName('환민1');
PrintName('환민2');
```

### 함수 리터럴

자바스크립트 에서 함수는 객체 타입의 값 즉 함수도 함수 리터럴로 생성이 가능하다.

```js

let f = fucntion (name) {
  return name
}

```

위 코드에서 function {} 으로 함수를 만드는데 이게 함수 리터럴이다 .

### 함수 정의

1. 함수 선언문
2. 함수 표현식
3. Function 생성자 함수
4. 화살표 함수(ES6)

예시

```js

// 선언문
// 1. 함수 선언문은 함수 이름을 생략할 수 없다 !
// 2. 함수 선언문은 표현식이 아닌 문이다 !
function add(x,y) {
  reutrn x+y
}

// 표현식
let add  = fuction(x,y) {
  return  x + y
}

// 생성자 함수
let add = new Fuction('x','y','return x+y')

// 화살표 함수
var add = (x,y) => x + y

```

```js
var add = function add(x, y) {
  return x + y;
};

console.log(add(2, 5));
```

위 코드는 함수 선언문을 표현식처럼 대입한 예제이다.

선언문은 문인데 어떻게 표현식 처럼 add에 넣어질까 ??

자바스크립트 엔진은 위에 중의적인 코드를 값을 보고 평가 하는데 ,

함수 리터럴이 단독으로 사용되면 함수 선언문 , 단독이 아니라 표현식으로 사용하면 자체적으로

함수 표현식으로 이해한다.

```js
// 기명 함수 리터럴을 단독으로 사용하면 함수 선언문으로 해석된다.
// 함수 선언문에서는 함수 이름을 생략할 수 없다.
function foo() {
  console.log('foo');
}
foo(); // foo

// 함수 리터럴을 피연산자로 사용하면 함수 선언문이 아니라 함수 리터럴 표현식으로 해석된다.
// 함수 리터럴에서는 함수 이름을 생략할 수 있다.
(function bar() {
  console.log('bar');
});
(function bar() {
  console.log('bar');
})(); // 실행
bar(); // ReferenceError: bar is not defined
```

위 코드에서 bar 예시 첫번째를 바로 실행시키면

위 함수를 ()로 감싸면 함수 표현식으로 이해하는데 값으로 평가될 수 있는 표현식이 아니기 때문에 에러가 난다.

즉 함수를 참조할 수 있는 식별자가 있어야 하는데 참조하는 식별자가 없기 때문에 실행될 수 없다.

foo가 실행되는 이유는 자바스크립트 엔진이 암묵적으로 식별자를 생성하기 때문이다.

즉 함수 선언문을 만들면 , 그 선언문 이름에 맞는 함수 식별자를 새로 만들어 준다.

### 함수 표현식

값의 성질을 갖는 객체를 일급 객체라고 지칭한다 .

함수도 값처럼 사용이 가능하기 때문에 자바스크립트 에서는 함수도 일급 객체 이다.

함수가 일급 객체라는 것은 함수도 값처럼 자유롭게 사용이 가능하다.

```js
// 함수 표현식
var add = function (x, y) {
  return x + y;
};

console.log(add(2, 5)); // 7
```

함수 표현식에서는 함수 이름을 생략해서 사용해 준다.

결국 함수 선언문은 "문" 이고 , 함수 표현식은 "식" 이다.

### 함수 생성 시점과 함수 호이스팅

```js
// 함수 참조
console.dir(add); // ƒ add(x, y)
console.dir(sub); // undefined

// 함수 호출
console.log(add(2, 5)); // 7
console.log(sub(2, 5)); // TypeError: sub is not a function

// 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 표현식
var sub = function (x, y) {
  return x - y;
};
```

함수 선언문은 호이스팅이 일어나지만 , 함수 표현식은 자바스크립트 엔진이 한줄한줄 읽으면서 그 식을 만났을때 값에 함수를 할당해 주기

때문에 호이스팅이 일어나지 않는다.

#### 함수 호이스팅 vs 변수 호이스팅

변수로 호이스팅이 일어났을 경우 console.log() 찍으면 undefined가 찍히지만 ,

함수같은 경우는 함수 객체로 초기화 되기때문에 정상적으로 호출이 가능하다.

고로 초기화 되는것에 차이가 발생 한다.

정리 : var 는 undefined가 찍힘 , var 만 불쌍함 ...

JSON 만든 사람이 함수 표현식 사용을 권장한다고함 .... 나는 무슨 인생을 산 것 인가 ...

### Function 생성자 함수

ex

```js
var add = new Function('x', 'y', 'return x + y');

console.log(add(2, 5)); // 7
```

클로저는 나중에 알아보자 !!

### 화살표 함수

ES6에 나온 개념으로 기존 function 키워드로 만드는 대신 화살표를 사용해서 더 간략한 방법으로 함수를 선언할 수 있다.

```js
// 화살표 함수
const add = (x, y) => x + y;
console.log(add(2, 5)); // 7
```

표현만 간략한 것이 아니라 내부 동작 또한 간략화 되어 있다.

### 함수 호출

#### 매개변수와 인수

```js
// 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 호출
// 인수 1과 2는 매개변수 x와 y에 순서대로 할당되고 함수 몸체의 문들이 실행된다.
var result = add(1, 2);
```

함수 내부로 필요한 전달 인자가 필요한 경우 매개변수를 통해서 인수로 전달해 준다.

매개변수는 함수 내부에서만 참조할 수 있고 , 밖에서는 참조할 수 없다.

매개변수를 다 넣어주지 않을 경우 undefined를 반환해 준다.

```js
function add(x, y) {
  return x + y;
}

console.log(add(2)); // NaN
```

매개변수가 더 많이 들어오면 그것은 무시 된다.

```js
function add(x, y) {
  return x + y;
}

console.log(add(2, 5, 10)); // 7
```

하지만 암묵적으로는 arguments 내부에 보관된다.

```js
function add(x, y) {
  console.log(arguments);
  // Arguments(3) [2, 5, 10, callee: ƒ, Symbol(Symbol.iterator): ƒ]

  return x + y;
}

add(2, 5, 10);
```

#### 매개변수의 최대 개수

이상적인 함수는 한가지 일만 해야 하며 매개변수는 3개 이상을 넘지 않아야 한다.

### 반환문

함수에 리턴값이 있으면 함수를 호출하면 리턴값이 반환된다.

밑에 코드는 result 에 15가 담긴다.

리턴문 밑에 코드는 실행되지 않는다.

```js
function multiply(x, y) {
  return x * y; // 반환문
}

// 함수 호출은 반환값으로 평가된다.
var result = multiply(3, 5);
console.log(result); // 15
```

반환문은 함수 몸체 내부에서만 사용 가능하다.

### 참조에 의한 전달과 외부 상태의 변경

```js
// 매개변수 primitive는 원시값을 전달받고, 매개변수 obj는 객체를 전달받는다.
function changeVal(primitive, obj) {
  primitive += 100;
  obj.name = 'Kim';
}

// 외부 상태
var num = 100;
var person = { name: 'Lee' };

console.log(num); // 100
console.log(person); // {name: "Lee"}

// 원시값은 값 자체가 복사되어 전달되고 객체는 참조값이 복사되어 전달된다.
changeVal(num, person);

// 원시값은 원본이 훼손되지 않는다.
console.log(num); // 100

// 객체는 원본이 훼손된다.
console.log(person); // {name: "Kim"}
```

함수로 매개변수를 전달 하는 것 또한 원시 값은 값이 복사되어서 들어가지만 ,

참조 값 같은 경우는 주소값을 공유하기 때문에 원본이 훼손된 경우를 볼 수 있다.

해결하는 방법 -> 객체를 불변 객체로 만든다 (깊은 복사)

## 다양한 함수의 형태

### 즉시 실행 함수

```js
// 익명 즉시 실행 함수
(function () {
  var a = 3;
  var b = 5;
  return a * b;
})();
```

함수를 소괄호 () 로 감싸이후 ()로 실행시켜주면 바로 실행이 가능하다. (await은 무조건 async 함수 안에서만 돌아가니까 이때 필요한 건가 ... ?)

### 재귀 함수

재귀함수는 함수가 자기 자신을 호출하는 경우를 말한다.

재귀함수는 자기 자신을 계속해서 호출하기 때문에 , 종료 조건이 필수로 필요하다 !

### 중첩 함수

함수 내부에 정의된 함수를 중첩 함수라고 부른다.

보통 스코프랑 연관지어서 많이 나오는 개념이다.

```js
function outer() {
  var x = 1;

  // 중첩 함수
  function inner() {
    var y = 2;
    // 외부 함수의 변수를 참조할 수 있다.
    console.log(x + y); // 3
  }

  inner();
}

outer();
```

### 콜백 함수

함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수를 콜백 함수 라고 부른다.

변수를 통해 함수의 외부에서 콜백 함수를 전달 받은 함수를 고차 함수 라고 한다.

```js
setTimeout(() => {
  // TODO
}, wait);
```

### 순수 함수와 비순수 함수

```js
var count = 0; // 현재 카운트를 나타내는 상태

// 순수 함수 increase는 동일한 인수가 전달되면 언제나 동일한 값을 반환한다.
function increase(n) {
  return ++n;
}

// 순수 함수가 반환한 결과값을 변수에 재할당해서 상태를 변경
count = increase(count);
console.log(count); // 1

count = increase(count);
console.log(count); // 2

var count = 0; // 현재 카운트를 나타내는 상태: increase 함수에 의해 변화한다.

// 비순수 함수
function increase() {
  return ++count; // 외부 상태에 의존하며 외부 상태를 변경한다.
}

// 비순수 함수는 외부 상태(count)를 변경하므로 상태 변화를 추적하기 어려워진다.
increase();
console.log(count); // 1

increase();
console.log(count); // 2
```

순수 함수와 비 순수 함수의 차이점은 외부 상태를 참조해서 변경하냐 안하냐의 차이가 있다.

순수 함수를 사용해서 최대한 오류 발생의 근본적인 오류가 발생하지 않게 해야한다.
