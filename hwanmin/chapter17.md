# 17장 생성자 함수에 의한 객체 생성

## 17.1 Object 생성자 함수

new 연산자를 사용해서 빈객체를 생성해서 반환한다.

그 이후 프로퍼티 또는 메서드를 추가해서 객체를 완성한다.

```js
const hwanmin = new Object();
hwanmin.name = 'HwanMin';
hwanmin.age = 29;
console.log(hwanmin);
```

{ name: 'HwanMin', age: 29 }

이라는 값이 잘 찍힌다 !

생성자 함수로 만들어진 객체를 인스턴스라 지칭한다.

자바스크립트는 여러가지 빌트인 생성자 함수를 제공한다.

Ex (String , Number , Boolean , Function , Array , RegExp , Date)

## 17.2 생성자 함수

객체 리터럴

- 장점 : 생성 방식이 직관적이고 간편하다.
- 단점 : 객체를 여러번 만들어야 할때 하나하나 만들어줘야 하기때문에 비 효율 적이다.

```js
const hwanmin = {
  name: 'hwanmin',
  printName() {
    console.log('Hello ', this.name);
  },
};
const hwanmin2 = {
  name: 'hwanmin2',
  printName() {
    console.log('Hello ', this.name);
  },
};
```

구조가 같고 이름만 다르지만 매번 만들어 줘야 한다.

```js
function HwanMin(name) {
  this.name = name;
  this.printName = function () {
    console.log('Hello ', this.name);
  };
}

const _hwanmin = new HwanMin('_HwanMin');
_hwanmin.printName();
```

이렇게 만들면 구조가 동일한 여러 객체를 편하게 만드는게 가능하다.

## this

각각 this

- 일반 함수 : 전역객체
- 메서드 : 메서드를 호출한 객체
- 생성자 함수 : 생성자 함수를 통해 생성될 인스턴스

```js
function foo() {
  console.log(this);
}
foo();
const obj = {
  foo,
};
obj.foo();
const inst = new foo();
// global
//{ foo: [Function: foo] }
// foo {}
```

22장에서 자세히 고고

- new 연산자랑 함께 함수를 호출하면 해당 함수는 생성자 함수로 동작한다.

new 연산자를 사용하지 않고 호출하면 일반 함수로서 호출된다.

일반함수는 반환값이 없으면 undefined를 리턴한다.

### 생성자 함수의 인스턴스 생성 과정

```js
function HwanMin(name) {
  // 인스턴스 초기화
  this.name = name;
  this.printName = function () {
    console.log('Hello ', this.name);
  };
}

// 인스턴스 생성
const _hwanmin = new HwanMin('_HwanMin');
```

자바스크립트 코드는 암묵적으로 인스턴스를 반환한다.

1. 인스턴스 생성과 this 바인딩

- 1. 암묵적으로 빈 객체 생성
- 2. 빈 객체는 this에 바인딩 (바인딩 : 식별자와 값을 연결하는 과정 , 그래서 인스턴스 this 인스턴스를 가르키는 이유)

2. 인스턴스 초기화

생성자 함수에 있는 코드 한줄씩 실행되면서 this에 바인딩 되어있는 인스턴스 초기화 (옮기는 과정 ? 인거 같음)

3. 인스턴스 반환

암묵적으로 this 로 만들어진 객체가 반환된다 , 특정 객체를 지칭해서 리턴하면 그 객체가 반환됨 return {}

그렇기 때문에 생성자 함수 내에서 return 문은 무조건 생략해야 한다.

### 내부 메서드 [[Call]] 과 [[Construct]]

일반적으로 함수를 만들면 그냥 함수 호출도 가능하고 , 생성자 함수로서 호출도 할 수 있다. (생성자 함수 new)

함수는 객체이기 때문에 일반 객체랑 동일하게 동작 가능

일반 객체가 가지고 있는 내부 슬롯과 내부 메서드를 다 가지고 있다.

함수는 고로 객체다 !!

```js
function foo() {}

foo.prop = 10;

foo.PrintProp = function () {
  console.log(this.prop);
};

foo.PrintProp(); // 10
```

위 예제를 보면 객체처럼 잘 동작하는 것 을 볼 수 있음.

일반 객체처럼 동작하지만 차이점이 있다.

일반객체 : 호출 x

함수객체 : 호출 o

고로 함수 객체는 추가적으로 내부 슬롯과 내부 메서드를 추가로 가지고 있다. ([[Environment]] , [[FormalParameters]] , [[Call]] , [[Contruct]])

```js
foo(); // [[Call]]
new foo(); // [[Construct]]
```

각각 call , construct

call :호출할 수 있는 객체

construct : 생성자 함수로서 호출할 수 있는 함수

하지만 모든 함수가 [[Construct]]를 가지는 것이 아님

[[Call]] 을 가지면서 [[Construct]] , ![[Construct]] 수 있음

constructor : 함수 선언문 , 함수 표현식 , 클래스

non-construct : 메서드 축약표현 , 화살표 함수 경우

```js
const Name = () => {
  let value = 10;
};

const name1 = new Name();
console.log(name1);
```

위 코드는 실행전에는 에러가 안잡힘 하지만 실행하면 에러가 발생함

```
const name1 = new Name();
              ^
TypeError: Name is not a constructor
```

constructor 가 없다는 에러가 발생함

### new 연산자

_주의_

생성자 함수로서 만든 함수가 아닌데 new를 사용하면 무조건 생성자 함수처럼 동작함 !!

```js
// 생성자 함수로서 정의하지 않은 일반 함수
function add(x, y) {
  return x + y;
}

// 생성자 함수로서 정의하지 않은 일반 함수를 new 연산자와 함께 호출
let inst = new add();
// 함수가 객체를 반환하지 않았으므로 반환문이 무시된다. 따라서 빈 객체가 생성되어 반환된다.
console.log(inst); // {}

// 객체를 반환하는 일반 함수
function createUser(name, role) {
  return { name, role };
}

// 생성자 함수로서 정의하지 않은 일반 함수를 new 연산자와 함께 호출
inst = new createUser('Lee', 'admin');
// 함수가 생성한 객체를 반환한다.
console.log(inst); // {name: "Lee", role: "admin"}
```

```js
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수 호출하면 일반 함수로서 호출된다.
const circle = Circle(5);
console.log(circle); // undefined

// 일반 함수 내부의 this는 전역 객체 window를 가리킨다.
console.log(radius); // 5
console.log(getDiameter()); // 10

circle.getDiameter();
// TypeError: Cannot read property 'getDiameter' of undefined
```

위 예제를 보면 getDiameter() 에서 오류가 날 것으로 생각했는데 , this가 전역을 가르키기 때문에
전역에 getDiameter()를 정의한것과 똑같은 현상이 일어나서 오류가 발생하는게 아니라 성공적으로 실행됨

### new.Target

ES6 부터는 생성자 함수가 new 연산자 없이 생성되는것을 방지하기 위해서 new.target을 지원!

new.target을 사용하면 new 연산자랑 같이 사용되었는지 확인이 가능하다!

```js
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

// new.target을 통해 생성자 함수로서 호출된다.
const circle = Circle(5);
console.log(circle.getDiameter());
```

new.target이 없으면 자동적으로 new 연산자를 사용해서 생성자 함수를 사용한 인스턴스를 반환해준다.

IE new.target 사용 불가능 (IE 2022/6/15 생을 마감하다... 안봐도 될듯 ?! )

빌트인 생성자 함수는 new 연산자와 함께 호출되었는지 확인 해준다.

```js
let obj = new Object();
let obj1 = Object();

console.log(obj);
console.log(obj1);
```

그래서 그동안 왜 new 안붙여도 작동하지 ? 라고 생각했는데 , new 연산자를 사용하지 않고 생성자 함수를 만들면 내부적으로 붙은 인스턴스를 반환을 해 주는 것이였다 !!! (궁금증 해결)
