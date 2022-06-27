# 18 함수와 일급 객체

## 18.1 일급 객체

- 무명의 리터럴로 생성 가능
- 변수나 자료구조(객체,배열) 저장 가능
- 함수의 매개변수에 전달 가능
- 함수의 반환값으로 사용 가능

```js
// 1. 무명 리터럴로 생성
// 2. 변수에 저장
const increase = function (num) {
  return ++num;
};
const decrease = function (num) {
  return --num;
};
// 객체에 저장
const predicates = { increase, decrease };
// 함수 매개변수로 함수 전달
function makeCounter(predicate.increase) {
  let num = 0;
  // 함수 리턴값으로 함수 리턴
  return function () {
    num = predicate(num);
    return num;
  };
}
```

위 예시를 보면 함수를 무명으로 생성하고 , 변수에 저장하고 , 객체에 저장하고 , 함수 매개변수 값으로 사용하고 , 리턴값으로도 사용하기 때문에 함수는 일급객체 특성을 다 충족한다.

### 18.2 함수 객체의 프로퍼티

```js
function PrintName() {}

console.dir(PrintName);
/*
arguments: null
caller: null
length: 0
name: "PrintName"
prototype: {constructor: ƒ}
[[FunctionLocation]]: VM164:1
[[Prototype]]: ƒ ()
[[Scopes]]: Scopes[1]
*/
```

- arguments : 함수 호출시 전달된 인수 들의 정보를 담고 있는 순회 가능한 유사 배열 객체

```js
function PrintName(a, b, c) {
  console.log(arguments);
  console.log(arguments[2]);
  return a + b + c;
}

console.log(PrintName(1, 2, 3));
// [Arguments] { '0': 1, '1': 2, '2': 3 }
// 3
// 6
```

아래 예시는 함수 매개변수가 몇개 들어올지 모르는 상황에서 쓸 수 있는 arguments 활용

```js
function PrintName(a, b, c) {
  console.log(arguments);
  console.log(arguments[2]);
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum = sum + argumetns[i];
  }
  return sum;
}

console.log(PrintName(1, 2, 3));
// [Arguments] { '0': 1, '1': 2, '2': 3 }
// 3
// 6
```

유사배열객체 ? -> 실제 배열이 아니라 length 프로퍼티를 가진 객체로 for문 순회가 가능하다.

유사배열객체는 객체이기 떄문에 배열 메서드 사용이 불가능 하다. 사용하려면 aplly/call/bind 메서드로 간접호출 사용해야한다.

위와 같은 번거로움을 없애기 위해서 ES6 부터는 rest 호출이 가능해 졌다.

```js
function PrintName(...args) {
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum = sum + args[i];
  }
  return sum;
}
```

- caller : 비표준 프로퍼티 , 표준화될 예정도 없는 프로퍼티 이다. 함수 자신을 호출한 함수를 가리킨다.

즉 나를 호출한 함수가 누구인지 ? 확인하는 메서드

- length : 매개변수의 개수를 가르킨다.

```js
function PrintName(x, y) {}
console.log(PrintName.length);
// 2
```

- name : 함수 이름을 나타낸다.

```js
function PrintName(x, y) {}
console.log(PrintName.name);
// PrintName
```

ES6 기준으로는 name프로퍼티는 변수에 할당된 함수도 가르키지만 , ES6 전으로는 변수에 할당된 기명함수를 나타내지 않는다.

\_**\_proto\_\_** 접근자 프로퍼티 : 상속받은 프로토타입을 가르키는 접근제어 프로퍼티 이다.
