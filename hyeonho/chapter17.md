# 17장 생성자 함수에 의한 객체 생성

## 17.1 `Object` 생성자 함수

`new` 연산자와 함께 `Object` 생성자 함수를 호출하면 **빈 객체**를 생성하여 반환한다. 이후 프로퍼티나 메서드 추가 가능. 처음부터 넣어서는 생성할 수 없다.
따라서 객체는 객체 리터럴로 생성하는 게 훨씬 더 효율적인 방법이다. 특별한 이유가 없다면 `Object` 생성자 함수를 사용해 객체를 생성할 필요가 없다.

```js
new Object(); // {}

// 빈 객체의 생성
const user = new Object(); // const user = {};

// 프로퍼티 추가
user.age = 10;
user.name = 'Ryan';
user.values = function() { console.log(`${this.age}살 ${this.name}이야.`) };

user.values(); // 10살 Ryan이야.

// 프로퍼티를 넣어서 생성할 수 없음!
const user2 = new Object(age : 10, name : 'kim');
user2; // SyntaxError: missing ) after argument list

// Object 생성자 함수로 생성할수 있는 다양한 객체들

// String 생성자 함수에 의한 String 객체 생성
// new Object('1');
const str = new String('1'); // String {'1'}

// Number 생성자 함수에 의한 Number 객체 생성
// new Object(1);
const num = new Number(1); // Number {1}

// Boolean 생성자 함수에 의한 Boolean 객체 생성
// new Object(true);
const bool = new Boolean(true); // Boolean {true}

// Function 생성자 함수에 의한 Function 객체(함수) 생성
// new Object(() => console.log('함수'));
const func = new Function(() => console.log('함수'));
typeof func; // 'function'

// Date 생성자 함수에 의한 Date 객체 생성
const date = new Date();
date; // Thu Jun 16 2022 21:33:13 GMT+0900 (Korean Standard Time)
```

## 17.2 생성자 함수

### 17.2.1 객체 리터럴에 의한 객체 생성 방식의 문제점

한번에 하나의 객체만 생성할 수 있다. 따라서 회원정보나 상품정보 같은 동일한 프로퍼티 키를 갖고 프로퍼티 값만 다른 여러 객체를 생성해야 할 때 매우 비효율적이다.
이럴 경우엔 생성자 함수로 인스턴스(생성자 함수로 만든 객체)를 생성하는게 훨씬 더 효율적이다.

```js
// 객체 리터럴로 동일한 프로퍼티 구조의 객체 생성
const user1 = {
  id: 'qwer123',
  username: '광명이케아빵도둑',
  level: 1,
};

const user2 = {
  id: 'qwer235',
  username: '배고파',
  level: 3,
};

console.log(user1); // {id: 'qwer123', username: '광명이케아빵도둑', level: 1}
console.log(user2); // {id: 'qwer235', username: '배고파', level: 3}
```

### 17.2.2 생성자 함수에 의한 객체 생성 방식의 장점

붕어빵틀에 재료를 넣어 붕어빵을 만들듯이 생성자 함수가 정의한 대로 만들어진 템플릿(클래스)에 다양한 값을 넣어 프로퍼티 구조가 같은 여러개의 객체(인스턴스)를 간편하게 생성할 수 있음.
자바스크립트는 클래스가 아닌 프로토타입 기반 언어이며 자바스크립트에는 클래스가 없다. 즉 자바스크립트의 클래스는 클래스 기반 객체지향 언어의 모양만 따라한 프로토타입의 문법적 설탕이다.
따라서 클래스 기반 객체지향 언어처럼 명확하게 형식이 정해진 생성자가 없기 때문에 자바스크립트의 생성자 함수는 따로 생성자 함수로 정해져 있는게 아니라 일반 함수를 정의하고 **new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다.**
그래서 일반 함수와 생성자 함수가 모양이 같기 때문에 생성자 함수는 관습적으로 함수명 첫 글자를 대문자로 하여 구분짓는다. 만약 new 연산자와 함께 생성자 함수를 호출하지 않으면 생성자 함수가 아니라 일반 함수로 동작한다.

```js
// 생성자 함수에 의한 인스턴스 생성
function User(id, username, level) {
  // 생성자 함수의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.id = id;
  this.username = username;
  this.level = level;
}

const user3 = new User('dsaf213', '길동이', 2);
const user4 = new User('ytjrg78', '둘리', 1);

console.log(user3); // User {id: 'dsaf213', username: '길동이', level: 2}
console.log(user4); // User {id: 'ytjrg78', username: '둘리', level: 1}
```

### this

`this`란 객체 자신의 프로퍼티나 메서드를 **참조**하기 위한 자기 참조 변수를 말한다.
this 바인딩(this가 가리키는 값)은 대부분 **함수 호출 방식에 따라 동적으로 결정**되나 콜백함수와 화살표 함수에서는 **다르게** 결정된다.
바인딩: 식별자와 값을 연결하는 과정.
this 바인딩: this는 키워드로 분류되지만 식별자 역할을 하므로 this가 가리킬 객체를 this가 가리키는 값으로 바인딩 하는 것.

| 함수 호출 방식       | this가 가리키는 값(this 바인딩)        |
| -------------------- | -------------------------------------- |
| 일반 함수로서 호출   | 전역 객체                              |
| 메서드로서 호출      | 메서드를 호출한 객체(마침표 앞의 객체) |
| 생성자 함수로서 호출 | 생성자 함수가 (미래에) 생성할 인스턴스 |

```js
// 1. 전역 스코프에서의 this = 전역 객체(window or global)
let user1 = {
    name: 'Ryan',
    age: 10,
    printThis () {
          console.log(this);
      console.log(user1 === this);
            console.log(window === this);
    },
};
let printThis = user1.printThis;
printThis();
// Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// false
// true

// 2. 메서드에서의 this = 자신을 호출한 객체
let user1 = {
    name: 'Ryan',
    age: 10,
    printThis () {
          console.log(this);
      console.log(user1 === this);
            console.log(this.name);
            console.log(this.age);
    },
};
user1.printThis();
// {name: 'Ryan', age: 10, printThis: ƒ}
// true
// Ryan
// 10

// 3. 생성자 함수 안에서의 this = 인스턴스
function User (name) {
    this.name = name; // 인스턴스.프로퍼티(key) = 매개변수(value);
}
const user1 = new User('ryan');

console.log(user1.name); // ryan

// 4. 이벤트 리스너 안에서의 this = 현재 이벤트가 동작하는 태그
<body>
    <button>버튼</button>
    <script>
      document.querySelector('button').addEventListener('click', function () {
        console.log(this); // <button>버튼</button>
      });
    </script>
  </body>

// 5.  event listener 내에서 콜백함수 사용시의 this = window
<body>
    <button>버튼</button>
    <script>
      document.querySelector('button').addEventListener('click', function () {
        const arr = [1, 2, 3];
        arr.forEach(function (num) {
          console.log(this);
          // 이 경우 this는 window이고 forEach하여 배열의 요소만큼 window가 출력되는 코드이다.
        });
      });
    </script>
  </body>

// 6. 객체 내에서 콜백함수 사용시의 this = window
let obj = {
    names: ['김', '나', '박', '이'],
  func: function () {
      obj.names.forEach(function () {
        console.log(this);
    });
  },
};
obj.func();
// Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// Window {window: Window, self: Window, document: document, name: '', location: Location, …}

// 7.  콜백함수를 화살표 함수로 할 경우 this = 상위 스코프
let obj = {
    names: ['김', '나', '박', '이'],
  func: function () {
      obj.names.forEach(() => {
        console.log(this);
    });
  },
};
obj.func();
// this = obj 이므로
// {names: Array(4), func: ƒ}
// {names: Array(4), func: ƒ}
// {names: Array(4), func: ƒ}
// {names: Array(4), func: ƒ} 이렇게 출력됨.
```

### 17.2.3 생성자 함수의 인스턴스 생성 과정

- 생성자 함수의 역할
  1. 인스턴스 생성(필수)
  2. 생성된 인스턴스 초기화(옵션): 인스턴스 프로퍼티 추가 및 초기값 할당

```js
// 생성자 함수
function Circle(radius) {
  // 인스턴스 초기화
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 인스턴스 생성
const circle1 = new Circle(3); // 반지름이 3인 Circle 객체를 생성. (this: circle1)
```

상기 예제에서 생성자 함수 내부의 코드에는 인스턴스의 초기화 부분은 존재하지만 인스턴스를 생성하고 반환하는 코드는 보이지 않는다.
new 연산자와 함께 생성자 함수를 호출하면 자바스크립트는 아래의 3가지 단계를 거쳐 암묵적으로 인스턴스를 생성하고 인스턴스를 초기화한 후 암묵적으로 인스턴스를 반환한다.

#### 1. 인스턴스 생성과 this 바인딩

**런타임 이전에** 생성자 함수 내부에서 암묵적으로 빈 객체가 생성되고 이 빈 객체가 this에 바인딩된다. 이 빈 객체가 생성자 함수가 생성한 인스턴스다. 따라서 빈 객체인 이 인스턴스가 this에 바인딩 되었기 때문에 생성자 함수 내부의 this가 생성자 함수가 생성할 인스턴스를 가리키는 것이다.

```js
function User(name) {
  // 1. 암묵적으로 this가 생성되고 this에 바인딩된다.
  console.log(this); // User {}
  this.name = name;
  this.sayHi = function () {
    return `Hi, ${this.name}!`;
  };
}
```

#### 2. 인스턴스 초기화

생성자 함수 내부의 코드가 한 줄씩 실행되어 this에 바인딩되어 있는 인스턴스(빈 객체)를 초기화한다.
즉 this에 바인딩 되어 있는 인스턴스에 프로퍼티나 메서드를 추가하고 생성자 함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화하거나 고정값을 할당한다. 이 처리는 개발자가 기술한다.

```js
function User(name) {
  // 1. 암묵적으로 this가 생성되고 this에 바인딩된다.
  console.log(this); // User {}

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.name = name;
  // this.name = ""
  this.sayHi = function () {
    return `Hi, ${this.name}!`;
  };
  // this.sayHi = ƒ ()
}
```

#### 3. 인스턴스 반환

생성자 함수 내부의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

```js
function User(name) {
  // 1. 암묵적으로 this가 생성되고 this에 바인딩된다.
  console.log(this); // User {}

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.name = name;
  // this.name = ""
  this.sayHi = function () {
    // this.sayHi = ƒ ()
    return `Hi, ${this.name}!`;
  };
  // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
}

// 인스턴스 생성. User 생성자 함수는 암묵적으로 this를 반환한다.
// 생성자 함수 호출시 this = 생성자 함수가 미래에 생성할 인스턴스
const user1 = new User('Ryan');
console.log(user1); // User {name: 'Ryan', sayHi: ƒ}
```

1. 만약 this가 아닌 다른 객체를 명시적으로 반환하면(리턴값으로 this 대신 다른 객체를 주면) return문에 명사한 객체가 반환된다.
2. 만약 this가 아닌 **원시 값**을 명시적으로 반환하려고 하면 해당 반환문은 무시되고 암묵적으로 this가 반환됨.

```js
// 1. this 가 아닌 다른 객체를 명시적으로 반환하면 해당 객체를 반환.
function User(name) {
  this.name = name;
  this.sayHi = function () {
    return `Hi, ${this.name}!`;
  };
  return {};
}

const user1 = new User('Ryan');
console.log(user1); // {}

// 2. this 가 아닌 원시 값을 명시적으로 반환하려고 하면 원시값 반환은 무시되고 암묵적으로 this가 반환됨.
function User(name) {
  this.name = name;
  this.sayHi = function () {
    return `Hi, ${this.name}!`;
  };
  return 123;
}

const user1 = new User('Ryan');
console.log(user1); // User {name: 'Ryan', sayHi: ƒ}
```

### 17.2.4 내부 메서드 `[[Call]]` 과 `[[Construct]]`

일반 함수와 생성자 함수는 사실상 형태가 같기 때문에 함수 선언문이나 함수 표현식으로 정의한 함수도 new 연산자와 함께 호출하여 객체를 생성하는 생성자 함수로서 호출할 수 있다.
함수는 객체이기 때문에 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드를 모두 가지고 있다. 따라서 일반 객체와 동일하게 동작할 수 있다.

```js
// 함수는 객체다.
function func() {}

// 함수는 객체이므로 프로퍼티를 소유할 수 있다.
func.str = '함수의 프로퍼티';

// 함수는 객체이므로 메서드를 소유할 수 있다.
func.log = function () {
  console.log(this.str);
};

func.log(); // 함수의 프로퍼티
```

**일반 객체는 호출할 수 없지만 함수는 호출할 수 있다**는 점이 함수와 일반 객체의 차이점이다.
따라서 함수 객체는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드에 더해 함수 객체만을 위한 `[[Environment]]`, `[[FormalParameters]]` 등의 내부 슬롯과 `[[Call]]`, `[[Construct]]` 내부 메서드를 추가로 가지고 있다.

- `foo();` -> 함수가 일반 함수로서 호출된 경우: 함수 객체의 내부 메서드 `[[Call]]` 이 호출됨.
- `new foo();` -> 함수가 생성자 함수로서 호출된 경우: 내부 메서드 `[[Construct]]` 가 호출됨.
- calable: 내부 메서드 `[[Call]]` 을 갖는 함수 객체
- constructor: 내부 메서드 `[[Construct]]`를 갖는 함수 객체
- non-constructor: `[[Construct]]`를 갖지 않는 함수 객체
- 일반 함수는 반드시 호출할 수 있는 (함수)객체여야 하므로 함수 객체는 반드시 callable 이어야 한다.
- 모든 함수 객체는 callable 이지만 모든 함수 객체가 constructor인 것은 아니다.

```js
function func() {}

// 함수는 객체이므로 프로퍼티를 소유할 수 있다.
func.str = '함수의 프로퍼티';

// 함수는 객체이므로 메서드를 소유할 수 있다.
func.log = function () {
  console.log(this.str);
};

Object.getOwnPropertyDescriptors(func);
// {length: {…}, name: {…}, arguments: {…}, caller: {…}, prototype: {…}, …}
// arguments: {value: null, writable: false, enumerable: false, configurable: false}
// caller: {value: null, writable: false, enumerable: false, configurable: false}
// length: {value: 0, writable: false, enumerable: false, configurable: true}
// log: {writable: true, enumerable: true, configurable: true, value: ƒ}
// name: {value: 'func', writable: false, enumerable: false, configurable: true}
// prototype: {value: {…}, writable: true, enumerable: false, configurable: false}
// str: {value: '함수의 프로퍼티', writable: true, enumerable: true, configurable: true}
// [[Prototype]]: Object
```

### 17.2.5 constructor와 non-constructor의 구분

자바스크립트 엔진은 함수 정의를 평가하여 함수 객체를 생성할 때 함수 정의 방식에 따라 함수를 constructor와 non-constructor로 구분한다.

- constructor: 함수 선언문, 함수 표현식, 클래스(클래스도 함수다.)
- non-constructor: 메서드 **축약 표현**, 화살표 함수

일반적으로 함수를 프로퍼티 값으로 사용하면 메서드로 통칭하지만 엄밀히 따지자면, ECMAScript 사양에서 **메서드란 ES6의 메서드 축약 표현 만을 의미한다.**

```js
// 일반 함수 정의: 함수 선언문, 함수 표현식
function foo() {}
const bar = function () {};
// 프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수다. 이는 메서드로 인정하지 않는다.
const func = {
  x: function () {},
};

// ECMAScript 사양에서 메서드란 ES6의 메서드 축약 표현 만을 의미한다.
const obj = {
  x() {},
};
```

### 17.2.6 new 연산자

생성자 함수로서 일반 함수를 호출하면(new 연산자와 함께 호출) 해당 함수는 생성자 함수로 동작하며, 함수 객체의 내부 메서드 `[[Call]]` 이 호출되는 것이 아니라 `[[Construct]]`가 호출된다.
단 new 연산자와 함께 호출하는 함수는 non-constructor가 아닌 constructor이어야 한다. (함수 선언문, 함수 표현식, 클래스)

```js
// 생성자 함수로서 정의하지 않은 일반 함수
function add(x, y) {
  return x + y;
}

// 생성자 함수로서 정의하지 않은 일반 함수를 new 연산자와 함께 호출
let inst = new add();

// 함수가 객체를 반환하지 않았으므로 반환문이 무시되어 빈 객체가 생성되어 반환됨.
console.log(inst); // {}

// 객체를 반환하는 일반 함수
function createUser(name, role) {
  return { name, role };
}

// 일반 함수를 new 연산자와 함께 호출
inst = new createUser('Lee', 'admin');
// 함수가 생성한 객체를 반환한다.
console.log(inst); // {name: "Lee", role: "admin"}
```

반대로 new 연산자 없이 생성자 함수를 호출하면 일반 함수로 호출되므로 내부 메서드는 `[[Constructor]]` 가 아닌 `[[Call]]` 이 호출됨.

```js
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출 시 일반 함수로서 호출됨.
const circle = Circle(5);
console.log(circle); // undefined

// 일반 함수 내부의 this는 전역 객체 window를 가리킨다.
console.log(radius); // 5
console.log(getDiameter()); // 10

circle.getDiameter(); // TypeError: Cannot read property 'getDiameter' of undefined
```

### 17.2.7 `new.target`

생성자 함수 이름을 파스칼 컨벤션으로 짓는다 하더라도 어떤 문법적인 효과가 있는 것이 아니기 때문에생성자 함수가 new 연산자 없이 호출되는 것을 방지하기 위해 ES6에서는 `new.target`을 지원한다.
`new.target`은 `this`와 유사하게 constructor인 모든 함수 내부에서 암묵적인 지역 변수와 같이 사용되며 **메타 프로퍼티** 라고 부른다. IE에선 지원하지 않는다.

- 생성자 함수로서 호출된 함수 내부에서의 `new.target`: 함수 자신
- 일반 함수로서 호출된 함수 내부에서의 `new.target`: `undefined`

```js
// 생성자 함수
function Circle(radius) {
  // 이 함수가 new 연산자와 함께 호출되지 않았다면 new.target은 undefined다.
  if (!new.target) {
    // new 연산자와 함께 생성자 함수를 재귀 호출하여 생성된 인스턴스를 반환한다.
    return new Circle(radius);
  }
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출하여도 new.target을 통해 생성자 함수로서 호출된다.
const circle = Circle(5);
console.log(circle.getDiameter()); // 10
```
