# 10장 객체 리터럴

## 10.1 객체란 ?

자바스크립트는 객체 기반의 언어!
자바스크립트를 구성하는 원시값을 제외한 나머지는 모두 객체이다.

원시타입의 값은 변경 불가능 하지만 , 객체 타입의 값 은 변경이 가능하다.

객체는 키와 값으로 구성된다.

```javascript
let hwanmin = {
  name: 'HwanMin',
  printName: function () {
    console.log(`이름은 ${this.name} 입니다.`);
  },
};
```

위와 같은 경우 프로퍼티는 name이 될 것이고 , 메서드는 printName 이다.

## 10.2 객체 리터럴에 의한 객체 생성

자바스크립트는 프로토타입 기반 객체지향 언어로서 클래스 기반이랑 달리 여러가지를 지원 한다.

- 객체 리터럴
- Object 생성자 함수
- 생성장 함수
- Object.create 메서드
- 클래스(ES6)

```javascript
let hwanmin = {
  name: 'HwanMin',
  printName: function () {
    console.log(`이름은 ${this.name} 입니다.`);
  },
};

console.log(hwanmin); // {name: 'HwanMin' , printName: f}
console.log(typeof hwanmin); // object
```

객체 리터럴을 사용하면 클래스를 정의하고 new 연산자를 호출하는 방식과 다르게 숫자나 문자열을 만드는 것 처럼

편하게 리터럴로 객체를 생성 할 수 있다.

- 다시 알아보기 ! : 러터럴이란 ? 사람이 이해할 수 있는 문자 , 또는 약속된 기호

## 10.3 프로퍼티

객체는 프로퍼티로 이루어져 있으며 , 프로퍼티는 키와 값으로 이루어져 있다.

```javascript
let hwanmin = {
  name: 'HwanMin',
  printName: function () {
    console.log(`이름은 ${this.name} 입니다.`);
  },
};
```

위 코드에서 프로퍼티는 2개 (name: 'HwanMin' , printName : f)

ex) key name , value 'HwanMin'

키값으로 식별자 네이밍 규칙을 따르면 '' 문자열 표시를 없애도 된다.

하지만 식별자 네이밍 규칙을 따르지 않으면 '' 로 감싸줘야 한다.

- 식별자 네이밍 규칙 ?

  - 식별자는 특수문자를 제외한 문자, 숫자, 언더스코어(\_), 달러 기호($)를 포함할 수 있다.
  - 단, 식별자는 특수문자를 제외한 문자, 언더스코어(\_), 달러 기호($)시작해야한다.
  - (숫자 X) 예약어는 식별자로 사용할 수 없다.

```javascript
var person = {
  firstName: 'Ung-mo',
  last-name: 'Lee' // SyntaxError: Unexpected token -
};
```

자바스크립트는 프로퍼티 키 값으로 숫자를 사용하면 문자열은 안붙어도 내부적으로는 문자열로 동작한다.

```javascript
var foo = {
  0: 1,
  1: 2,
  2: 3,
};

console.log(foo); // {0: 1, 1: 2, 2: 3}
```

똑같은 프로퍼티가 있을때는 그 전 값이 나중에 작성한 프로퍼티 값에 의해서 덮어씌워진다.

## 10.4 메서드

자바스크립트에서 사용할수 있는 모든 값은 프로퍼티 값으로 사용이 가능하다 .

따라서 함수도 값으로 취급이 가능하기 때문에 객체 값으로 사용이 가능하다 .

```javascript
let hwanmin = {
  name: 'HwanMin',
  printName: function () {
    console.log(`이름은 ${this.name} 입니다.`);
  },
};
```

this는 객체 자신을 가리키는 참조변수 이다!

## 10.5 프로퍼티 접근

프로퍼티 값에 접근하는 방법은 두 가지 이다.

. , [] 를 사용

```javascript
let hwanmin = {
  name: 'HwanMin',
  printName: function () {
    console.log(`이름은 ${this.name} 입니다.`);
  },
};
```

hwanmin.name , hwanmin['name']

객체에 존재하지 않는 프로퍼티데 접근하면 undefined를 반환한다.

```javascript
var person = {
  'last-name': 'Lee',
  1: 10
};

person.'last-name';  // -> SyntaxError: Unexpected string
person.last-name;    // -> 브라우저 환경: NaN
                     // -> Node.js 환경: ReferenceError: name is not defined
person[last-name];   // -> ReferenceError: last is not defined
person['last-name']; // -> Lee

// 프로퍼티 키가 숫자로 이뤄진 문자열인 경우 따옴표를 생략할 수 있다.
person.1;     // -> SyntaxError: Unexpected number
person.'1';   // -> SyntaxError: Unexpected string
person[1];    // -> 10 : person[1] -> person['1']
person['1'];  // -> 10

```

## 10.6 프로퍼티 값 갱신

```javascript
let hwanmin = {
  name: 'HwanMin',
  printName: function () {
    console.log(`이름은 ${this.name} 입니다.`);
  },
};

hwanmin['name'] = 'Andrew Hwan';

console.log(hwanmin['name']);
```

## 10.7 프로퍼티 값 갱신

존재하지 않는 프로퍼티에 값을 할당하면 동적으로 값이 생성된다.

```javascript
let hwanmin = {
  name: 'HwanMin',
  printName: function () {
    console.log(`이름은 ${this.name} 입니다.`);
  },
};

hwanmin['age'] = 29;

console.log(hwanmin['age']);
```

## 10.8 프로퍼티 값 삭제

```javascript
let hwanmin = {
  name: 'HwanMin',
  printName: function () {
    console.log(`이름은 ${this.name} 입니다.`);
  },
};

hwanmin['age'] = 29;

delete hwanmin['age'];

console.log(hwanmin['age']);
```

## 10.9 ES6 객체 리터럴 확장 기능

키 값과 벨류 값이 같을 때는 생략이 가능하다.

```javascript
let name = 'hwanMin';
let age = 20;
let hwanmin = {
  name,
  age,
  printName() {
    console.log(`이름은 ${this.name} 입니다.`);
  },
};

console.log(hwanmin); //{name: 'hwanMin', age: 20}
```
