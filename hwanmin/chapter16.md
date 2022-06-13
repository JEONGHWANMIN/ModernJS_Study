# 16장 프로퍼티 어트리뷰트

## 16.1 내부 슬롯과 내부 메서드

자바스크립트의 [[...]] 로 감싼 녀석들이 내부슬롯 내부 메서드 이다.

자바스크립트는 내부슬롯에 직접적으로 접근할 수 있는 방법을 제공하지 않는다.

하지만 [[Prototype]] 같은 경우 **proto** 를 통해서 접근할 수 있다.

## 16.2프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의해준다 !

프로퍼티 어트리뷰트

1. [[Writable]]
2. [[Enumerable]]
3. [[Configurable]]
4. [[Value]]

```js
const person = {
  name: 'Lee',
};

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// {value: "Lee", writable: true, enumerable: true, configurable: true}
```

Object.getOwnPropertyDescriptor(obj , attribute) 라는 메서드를 사용하면 어트리뷰트 정보에 대해서 객체로
받아볼 수 있다.

존재하지 않는 프로퍼티에 접근하면 undefined가 반환된다.

## 16.3 데이터 프로퍼티와 접근자 프로퍼티

프로퍼티는 크게 두가지로 나누어 진다.

- 데이터 프로퍼티 - 키와 값으로 나누어진 평범한 객체
- 접근자 프로퍼티 - 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티 값을 읽거나 저장할 때 호출되는 접근자 함수

### 데이터 프로퍼티

1. [[Writable]]

- 값의 변경 여부를 알려준다.
- true , false

2. [[Enumerable]]

- 열거가능 여부를 나타내준다 .(for in , Object.keys)
- true , false

3. [[Configurable]]

- 프로퍼티 재정의 가능 여부를 나타내준다.
- false 면 삭제 , 속성 값 변경 불가능 (Writable === true [[Value]] 변경 , [[Writable]] false 로 변경은 가능)

4. [[Value]]

- 우리가 흔히 사용 하는 자바스크립트 객체 속성으로 접근해서 얻는 값
- 속성값을 변경하면 원래 값이 있으면 재 할당되고 없으면 생성한다. (HTTP PUT 메서드랑 비슷)

처음 프로퍼티가 생성될 때 데이터 프로퍼티 값들은 true로 초기화가 된다 !

```js
const person = {
name: 'Lee'
};

// 프로퍼티 동적 생성
person.age = 20;

console.log(Object.getOwnPropertyDescriptors(person));

{
name: {value: "Lee", writable: true, enumerable: true, configurable: true},
age: {value: 20, writable: true, enumerable: true, configurable: true}
}


```

### 접근자 프로퍼티

1. [[Get]]
2. [[Set]]
3. [[Configurable]]
4. [[Enumerable]]

접근자 함수 일반적으로 getter/setter라고 불리는 개념

```js
const person = {
  // 데이터 프로퍼티
  firstName: 'Ungmo',
  lastName: 'Lee',

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  // setter 함수
  set fullName(name) {
    // 배열 디스트럭처링 할당: "31.1 배열 디스트럭처링 할당" 참고
    [this.firstName, this.lastName] = name.split(' ');
  },
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(person.firstName + ' ' + person.lastName); // Ungmo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
person.fullName = 'Heegun Lee';
console.log(person); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(person.fullName); // Heegun Lee

// firstName은 데이터 프로퍼티다.
// 데이터 프로퍼티는 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖는다.
let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);
// {value: "Heegun", writable: true, enumerable: true, configurable: true}

// fullName은 접근자 프로퍼티다.
// 접근자 프로퍼티는 [[Get]], [[Set]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖는다.
descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
// {get: ƒ, set: ƒ, enumerable: true, configurable: true}
```

위 예시를 보면 fullName에 값을 할당하면 setter 함수가 실행이 된다.

setter함수는 공백을 기준으로 firstName , lastName을 정의한다.

그리고 fullName을 getter로 실행하면 firstName , lastName을 return 해준다.

!! 일반적인 객체 속성값들은 데이터 프로퍼티이고 , get , set으로 정의를하면 접근자 프로퍼티 이다 !!

```js
// 일반 객체의 __proto__는 접근자 프로퍼티다.
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 함수 객체의 prototype은 데이터 프로퍼티다.
Object.getOwnPropertyDescriptor(function () {}, 'prototype');
// {value: {...}, writable: true, enumerable: false, configurable: false}
```

일반객체는 접근자 프로퍼티 , 함수객체는 데이터 프로퍼티 !!

## 16.4 프로퍼티 정의

```js
const person = {};

// 데이터 프로퍼티 정의
Object.defineProperty(person, 'firstName', {
  value: 'Ungmo',
  writable: true,
  enumerable: true,
  configurable: true,
});

Object.defineProperty(person, 'lastName', {
  value: 'Lee',
});

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log('firstName', descriptor);
// firstName {value: "Ungmo", writable: true, enumerable: true, configurable: true}

// 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값이다.
descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// lastName {value: "Lee", writable: false, enumerable: false, configurable: false}

// [[Enumerable]]의 값이 false인 경우
// 해당 프로퍼티는 for...in 문이나 Object.keys 등으로 열거할 수 없다.
// lastName 프로퍼티는 [[Enumerable]]의 값이 false이므로 열거되지 않는다.
console.log(Object.keys(person)); // ["firstName"]

// [[Writable]]의 값이 false인 경우 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없다.
// lastName 프로퍼티는 [[Writable]]의 값이 false이므로 값을 변경할 수 없다.
// 이때 값을 변경하면 에러는 발생하지 않고 무시된다.
person.lastName = 'Kim';

// [[Configurable]]의 값이 false인 경우 해당 프로퍼티를 삭제할 수 없다.
// lastName 프로퍼티는 [[Configurable]]의 값이 false이므로 삭제할 수 없다.
// 이때 프로퍼티를 삭제하면 에러는 발생하지 않고 무시된다.
delete person.lastName;

// [[Configurable]]의 값이 false인 경우 해당 프로퍼티를 재정의할 수 없다.
// Object.defineProperty(person, 'lastName', { enumerable: true });
// Uncaught TypeError: Cannot redefine property: lastName

descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// lastName {value: "Lee", writable: false, enumerable: false, configurable: false}

// 접근자 프로퍼티 정의
Object.defineProperty(person, 'fullName', {
  // getter 함수
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  // setter 함수
  set(name) {
    [this.firstName, this.lastName] = name.split(' ');
  },
  enumerable: true,
  configurable: true,
});

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log('fullName', descriptor);
// fullName {get: ƒ, set: ƒ, enumerable: true, configurable: true}

person.fullName = 'Heegun Lee';
console.log(person); // {firstName: "Heegun", lastName: "Lee"}
```

Object.defineProperty() 를 사용할때 객체 프로퍼티를 누락하시면 자동 false값으로 들어간다.

그리고 각 값이 false면 당연히 그에 맞는 설정대로 열거나 , 재 정의 , 삭제 등이 불가능 하다.

## 16.5 객체 변경 방지

자바스크립트는 다양한 객체 변경 방지 메서드를 제공해 준다.

- Object.preventExtensions (객체확장금지) : 객체 프로퍼티 추가 금지 (삭제는 가능)
- Object.seal (객체밀봉) : 읽기와 쓰기만 가능 (값 갱신은 가능)
- Object.freeze (객체 동결) : 읽기만 가능 (추가 , 갱신 , 삭제 , 재정의) 금지

Object.freeze 는 중첩 객체까지는 동결 시키지 못한다.
