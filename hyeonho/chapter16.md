# 16장 - 프로퍼티 어트리뷰트

- 참고: `Object.prototype`(프로토타입 객체)의 `__proto__` 속성은 Deprecated.
  - 최신 브라우저에서는 `__proto__` 속성 없이도 `prototype` 객체에 접근할 수 있다.
  - 대신 `Object.getPrototypeOf()` 사용이 권장된다. 자세한 내용은 프로토타입 챕터에서 알아본다.

## 16.1 내부 슬롯과 내부 메서드

내부 슬롯과 내부 메서드는 **자바스크립트 엔진의 구현 알고리즘을 설명하기 위해** ECMAScript 사양에서 사용하는 의사 프로퍼티와 의사 메서드로, ECMAScript 문서에서 이중 대괄호(`[[ ... ]]`)로 감싼 이름들이 내부 슬롯과 내부 메서드이다.
개념을 설명하기 위한 용어이기 때문에 **_실제 자바스크립트에서는 접근할 수 없다._** 자바스크립트 엔진에서 ECMAScript 문서에 기술한 대로 실제로 동작은 하지만 직접 접근할 수 있는 외부로 공개된 객체의 프로퍼티가 아니다.
[참고](https://ibocon.tistory.com/252)

- 단 일부 내부 슬롯과 내부 메서드에 간접적으로 접근할 수 있다.
  - 모든 객체는 `[[Prototype]]` 이라는 내부 슬롯을 갖는데 원칙적으로는 이러한 자바스크립트 엔진의 내부 로직에 직접 접근할 수 없지만 `[[Prototype]]` 의 경우 `__proto__`를 통해 간접적으로 접근할 수 있다.

```js
const obj = {};

obj.[[Prototype]]; // SyntaxError: Unexpected token '['

obj.__proto__;     // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
```

## 16.2 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

> 자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다. (p 220)

- 프로퍼티의 상태: 프로퍼티의 값, 갱신 가능 여부, 열거 가능 여부, 재정의 가능 여부
  ( value, writable, enumerable, configurable )
- 프로퍼티 어트리뷰트: 자바스크립트 엔진이 관리하는 내부 상태 값인 내부 슬롯 `[[Value]]`, `[[Writable]]`, `[[Enumerable]]`, `[[Configurable]]` 이다.
- 프로퍼티 어트리뷰트에 접근하는 방법
  - 직접 접근할 수는 없다.
  - 하지만 간접적으로 `Object.getOwnPropertyDescriptor` 메서드로 확인이 가능하다.

```js
const user = {
  name: 'Kim',
};

const user1 = user;
const user2 = { ...user };
const user3 = JSON.parse(JSON.stringify(user));

console.log(Object.getOwnPropertyDescriptor(user, 'name'));
console.log(Object.getOwnPropertyDescriptor(user1, 'name'));
console.log(Object.getOwnPropertyDescriptor(user2, 'name'));
console.log(Object.getOwnPropertyDescriptor(user3, 'name'));
// {value: 'Kim', writable: true, enumerable: true, configurable: true}
// {value: 'Kim', writable: true, enumerable: true, configurable: true}
// {value: 'Kim', writable: true, enumerable: true, configurable: true}
// {value: 'Kim', writable: true, enumerable: true, configurable: true}
```

- `Object.getOwnPropertyDescriptor` 메서드 설명
  - 첫번째 매개변수: 참조할 객체
  - 두번째 매개변수: 프로퍼티 키를 문자열로 전달.
  - 반환값: 프로퍼티 어트리뷰트 정보를 제공하는 **프로퍼티 디스크립터 객체**(PropertyDescriptor) 를 반환.
  - 존재하지 않는 프로퍼티나 상속받은 프로퍼티를 호출 시 매개변수로 넣으면(프로퍼티 디스크립터를 요구하면) `undefined`를 반환.
- ES8 에서 도입된 `Object.getOwnPropertyDescriptors` 메서드는 모든 프로퍼티의 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환.

```js
const user = {
  name: 'Kim',
};

console.log(Object.getOwnPropertyDescriptor(user, 'age')); // undefined
console.log(Object.getOwnPropertyDescriptors(user, 'age'));
// {name: {…}}
// name:
// configurable: true
// enumerable: true
// value: "Kim"
// writable: true
// [[Prototype]]: Object
// [[Prototype]]: Object
```

## 16.3 데이터 프로퍼티와 접근자 프로퍼티

프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분할 수 있다.

- 데이터 프로퍼티(data property):
  -> 키와 값으로 구성된 일반적인 프로퍼티. 객체 리터럴에서 사용한 모든 프로퍼티는 데이터 프로퍼티다.
- 접근자 프로퍼티(accessor property):
  -> 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 **접근자 함수** 로 구성된 프로퍼티다.

### 16.3.1 데이터 프로퍼티

데이터 프로퍼티는 아래와 같은 프로퍼티 어트리뷰트를 갖는다. 이 프로퍼티 어트리뷰트는 자바스크립트 엔진이 프로퍼티를 생성할 때 기본값으로 자동 정의된다.

---

- 프로퍼티 어트리뷰트 `[[Value]]` 의 기본값인 디스크립터 객체의 프로퍼티 `value`:
  - 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 **값**.
  - 프로퍼티 키를 통해 프로퍼티 값 변경 시 `[[Value]]`에 값을 재할당하거나 없는 프로퍼티라면 동적 생성하고 `[[Value]]`에 값을 저장.

---

- 프로퍼티 어트리뷰트 `[[Writable]]` 의 기본값인 디스크립터 객체의 프로퍼티 `writable`:
  - 프로퍼티 값의 변경 가능 여부를 나타내는 불리언 값.
  - `false` 일 경우 해당 프로퍼티 `[[Value]]`의 값을 변경할 수 없는 읽기 전용 프로퍼티가 된다.

---

- 프로퍼티 어트리뷰트 `[[Enumerable]]` 의 기본값인 디스크립터 객체의 프로퍼티 `enumerable`:
  - 프로퍼티의 열거 가능 여부를 나타내는 불리언 값.
  - `false` 일 경우 해당 프로퍼티는 `for...in` 문이나 `Object.keys` 메서드 등으로 열거

---

- 프로퍼티 어트리뷰트 `[[Configurable]]` 의 기본값인 디스크립터 객체의 프로퍼티 `configurable`:
  - 프로퍼티의 재정의 가능 여부를 나타내는 불리언 값.
  - `false` 일 경우 해당 프로퍼티의 값 삭제, 변경이 금지된다. 단 `[[Writable]]` 이 `true`일 경우 `[[Value]]`의 변경과 `[[Writable]]` 을 `false` 로 값을 변경하는 것은 허용됨.

```js
const user = {
  name: 'Kim',
};
user.age = 10;

console.log(Object.getOwnPropertyDescriptors(user));
// {name: {…}, age: {…}}
// age: {value: 10, writable: true, enumerable: true, configurable: true}
// name: {value: 'Kim', writable: true, enumerable: true, configurable: true}
// [[Prototype]]: Object
```

### 16.3.2 접근자 프로퍼티

- 접근자 프로퍼티: 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티.

---

- 프로퍼티 어트리뷰트 `[[Get]]` 의 기본값 디스크립터 객체의 프로퍼티 `get`:
  - 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 프로퍼티 어트리뷰트 `[[Get]]` 의 값인 getter 함수가 호출되고 그 결과가 프로퍼티 값으로 반환된다.
  - 반환값: getter 함수 호출의 반환값.

---

- 프로퍼티 어트리뷰트 `[[Set]]` 의 기본값 디스크립터 객체의 프로퍼티 `set`:
  - 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수. 접근자 프로퍼티 키로 프로퍼티 값을 저장하면 프로퍼티 어트리뷰트 `[[Set]]` 의 값인 setter 함수가 호출되고 그 결과가 프로퍼티 값으로 저장됨.

---

- 프로퍼티 어트리뷰트 `[[Enumerable]]` 의 기본값 디스크립터 객체의 프로퍼티 `enumerable`:
  - 데이터 프로퍼티의 `[[Enumerable]]` 과 같다.
  - 프로퍼티의 열거 가능 여부를 나타내는 불리언 값.
  - `false` 일 경우 해당 프로퍼티는 `for...in` 문이나 `Object.keys` 메서드 등으로 열거

---

- 프로퍼티 어트리뷰트 `[[Configurable]]` 의 기본값 디스크립터 객체의 프로퍼티 `configurable`:
  - 데이터 프로퍼티의 `[[Configurable]]` 과 같다.
  - 프로퍼티의 재정의 가능 여부를 나타내는 불리언 값.
  - `false` 일 경우 해당 프로퍼티의 값 삭제, 변경이 금지된다. 단 `[[Writable]]` 이 `true`일 경우 `[[Value]]`의 변경과 `[[Writable]]` 을 `false` 로 값을 변경하는 것은 허용됨.

---

```js
const person = {
  // 데이터 프로퍼티
  firstName: 'Ryan',
  lastName: 'Kim',

  // fullName : 접근자 함수(getter, setter)로 구성된 접근자 프로퍼티.
  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }, // 세미콜론 필수
  // setter 함수
  set fullName(name) {
    // 배열 디스트럭쳐링 할당: 31장 1절 참고
    [this.firstName, this.lastName] = name.split(' ');
  },
};

// 데이터 프로퍼티 값을 통한 프로퍼티 값의 참조
console.log(person.firstName + ' ' + person.lastName); // Ryan Kim

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName 에 값을 저장하면 setter 함수가 호출된다.

// 1. getter 함수 호출
person.fullName; // 'Ryan Kim'

// 2. setter 함수 호출(접근자 프로퍼티에 값 저장하기)
person.fullName = 'hyeonho Park';
console.log(person); // {firstName: "hyeonho", lastName: "Park"}
console.log(person.firstName, person.lastName); // hyeonho Park

// fullName은 person 객체에 실제로는 없는 프로퍼티이다.
// 하지만 getter 함수에 접근하면 그 때 값이 setter를 통해 반환가능.
console.dir(person);
// Object
// firstName: "hyeonho"
// fullName: (...)          => (...) 안에 getter 함수가 담겨있다.
// lastName: "Park"
// get fullName: ƒ fullName()
// set fullName: ƒ fullName(name)
// [[Prototype]]: Object

// firstName은 데이터 프로퍼티다.
// 데이터 프로퍼티는 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]
// 프로퍼티 어트리뷰트를 갖는다.
let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);
// {value: 'hyeonho', writable: true, enumerable: true, configurable: true}
// configurable: true
// enumerable: true
// value: "hyeonho"
// writable: true
// [[Prototype]]: Object

// fullName은 접근자 프로퍼티다.
// 접근자 프로퍼티는 [[Get]], [[Set]], [[Enumerable]], [[Configurable]]
// 프로퍼티 어트리뷰트를 갖는다. value 와 writable 값이 없음.
descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
// {enumerable: true, configurable: true, get: ƒ, set: ƒ}
// configurable: true
// enumerable: true
// get: ƒ fullName()
// set: ƒ fullName(name)
// [[Prototype]]: Object
```

- get, set 메서드: getter 와 setter 함수
- 함수명 fullName: 접근자 프로퍼티
  - 접근자 프로퍼티는 자체적으로 값(`[[Value]]`)을 가지지 않으며 오직 데이터 프로퍼티의 값을 읽거나 저장할 때 관여함.

## 16.4 프로퍼티 정의

- 프로퍼티 정의 란: 새로운 프로퍼티 추가 시 프로퍼티 어트리뷰트를 명시적으로 정의 또는 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의 하는 것. 값의 갱신 가능 여부(writable), 프로퍼티 열거 가능 여부(enumerable), 프로퍼티의 재정의 가능 여부(configureable) 등을 정의, 또는 재정의 함을 말한다.
- 프로퍼티 정의를 통해 객체의 프로퍼티가 어떻게 동작해야 하는지를 명확히 정의할 수 있다.
- `Object.defineProperty` 메서드를 사용하여 프로퍼티 어트리뷰트를 정의할 수 있다. (한 번에 한개의 프로퍼티만)
  - 인수: 1. 객체의 참조 2. 데이터 프로퍼티 키(문자열) 3. 프로퍼티 디스크립터 객체

```js
const person = {};

Object.defineProperty(person, 'firstName', {
  // 데이터 프로퍼티 정의
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
// firstName {value: 'Ungmo', writable: true, enumerable: true, configurable: true}

// 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false 가 기본값이다.
descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// lastName {value: 'Lee', writable: false, enumerable: false, configurable: false}

// [[Enumerable]]의 값이 false인 경우
// 해당 프로퍼티는 for...in 문이나 Object.keys 등으로 열거할 수 없다.
// lastName 프로퍼티는 [[Enumerable]]의 값이 false이므로 열거되지 않는다.
console.log(Object.keys(person)); // ['firstName']

// [[Writable]]의 값이 false인 경우 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없다.
// lastName 프로퍼티는 [[Writable]]의 값이 false 이므로 값을 변경할 수 없다.
// 이 때 값을 변경하면 에러는 발생하지 않고 무시된다.
person.lastName = 'Kim';
// 에러는 없지만 변경 안됨.

// [[Configurable]]의 값이 false인 경우 해당 프로퍼티를 삭제할 수 없다.
// lastName 프로퍼티는 [[Configurable]]의 값이 false이므로 삭제할 수 없다.
// 이 때 프로퍼티를 삭제하면 에러는 발생하지 않고 무시된다.
delete person.lastName;
// 에러는 발생하지 않으나 삭제되지 않음.

// [[Configurable]]의 값이 false인 경우 해당 프로퍼티를 재정의할 수 없다.
// Object.defineProperty(person, 'lastName', { enumerable: true });
// TypeError: Cannot redefine property: lastName

descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// lastName {value: "Lee", writable: false, enumerable: false, configurable: false}

// 접근자 프로퍼티 정의
const person = {};
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
// fullName {enumerable: true, configurable: true, get: ƒ, set: ƒ}

person.fullName = 'Coding Kim';
console.log(person); // {firstName: 'Coding', lastName: 'Kim'}
```

- `Object.defineProperty` 메서드로 프로퍼티를 정의할 때 프로퍼티 디스크립터 객체의 프로퍼티를 일부 생략할 수 있다.
- 생략 시 기본값

  - value: `undefined`
  - get: `undefined`
  - set: `undefined`
  - writable: `false`
  - enumerable: `false`
  - configurable: `false`

- `Object.defineProperties` 는 여러 개의 프로퍼티를 한 번에 정의할 수 있다.

```js
const person = {};

Object.defineProperties(person, {
  // 데이터 프로퍼티 정의
  firstName: {
    value: 'Ungmo',
    writable: true,
    enumerable: true,
    configurable: true,
  },
  lasttName: {
    value: 'Lee',
    writable: true,
    enumerable: true,
    configurable: true,
  },
  // 접근자 프로퍼티 정의
  fullName: {
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
  },
});

person.fullName = 'Hyeonho Kim';
console.log(person); // {firstName: 'Hyeonho', lasttName: 'Lee', lastName: 'Kim'}
```

- 번외: `Object.defineProperties` 메서드로 객체의 깊은복사가 가능함. (직속 프로퍼티 까지만. 하위객체는 얕은복사)

```js
// Object.defineProperties 메서드로 객체 깊은복사 하기.

const person = { name: 'Kim', age: 30, firstName: 'hyeon' };
Object.getOwnPropertyDescriptors(person);
// {name: {…}, age: {…}, firstName: {…}}

const copy = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(person)
);
copy === person; // false
copy.name = 'Park'; // 'Park'
person.name; // 'Kim'
```

## 16.5 객체 변경 방지

객체는 변경 가능한 값이다. 재할당 없이 값을 변경 가능하다.

- 값의 변경의 종류

  - 프로퍼티의 추가/삭제
  - 프로퍼티 값 갱신
  - 프로퍼티 어트리뷰트 재정의(`Object.defineProperty`, `Object.defineProperties` 메서드 사용)

자바스크립트는 객체의 변경을 방지하는 다양한 메서드를 제공하며, 메서드마다 금지하는 강도가 다르다.
|구분|메서드|프로퍼티 추가|프로퍼티 삭제|프로퍼티 값 읽기|프로퍼티 값 쓰기|프로퍼티 어트리뷰트 재정의|
|---|------|:---:|:---:|:---:|:---:|:---:|
|객체 확장 금지|`Object.preventExtensions`|X|O|O|O|O|
|객체 밀봉|`Object.seal`|X|X|O|O|X|
|객체 동결|`Object.freeze`|X|X|O|X|X|

### 16.5.1 객체 확장 금지

`Object.preventExtensions` 메서드는 객체의 확장을 금지한다.
확장이 가능한 객체인지 여부는 `Object.isExtensible` 메서드로 확인 가능.

- 프로퍼티 동적 추가 금지
- `Object.defineProperty` 메서드로 프로퍼티 추가 금지

```js
const person = { name: 'Lee' };

// person 객체는 확장이 금지된 객체가 아니다.
console.log(Object.isExtensible(person)); // true

// person 객체의 확장을 금지하여 프로퍼티 추가를 금지한다.
Object.preventExtensions(person);

// 위에서 확장을 금지하는 메서드를 사용하여 현재 person 객체는 확장이 금지된 객체다.
console.log(Object.isExtensible(person)); // false

// 프로퍼티 추가가 금지됨.
person.age = 20; // 이 코드는 무시된다. strict mode 인 경우 에러 발생
console.log(person); // { name: 'Lee' }

// 프로퍼티 추가는 금지되지만 삭제는 가능하다.
delete person.name;
console.log(person); // {}

// 프로퍼티 정의에 의한 프로퍼티 추가도 금지된다.
Object.defineProperty(person, 'age', { value: 20 });
// TypeError: Cannot define property age, object is not extensible
```

### 16.5.2 객체 밀봉

`Object.seal` 메서드는 객체를 밀봉한다. 즉 읽기와 쓰기만 허용한다. (프로퍼티 추가/삭제, 프로퍼티 어트리뷰트 재정의 금지)
값의 갱신이나 값을 읽기만 가능하다.

```js
const person = { name: 'Lee' };

// person 객체는  밀봉된 객체가 아니다.
console.log(Object.isSealed(person)); // false

// person 객체를 밀봉하여 프로퍼티 추가, 삭제, 재정의 금지.
Object.seal(person);

// 위에서 객체를 밀봉하는 메서드를 사용하여 현재 person 객체는 밀봉된 객체다.
console.log(Object.isSealed(person)); // false

// 밀봉된 객체는 configurable이 false다.
console.log(Object.getOwnPropertyDescriptors(person));
// name: {value: 'Lee', writable: true, enumerable: true, configurable: false}

// 프로퍼티 추가가 금지된다.
person.age = 20; // 무시됨. strict mode에선 에러.
console.log(person); // {name: 'Lee'}

// 프로퍼티 삭제가 금지된다.
delete person.name; // 무시. strict mode에선 에러.

// 프로퍼티 값 갱신은 가능하다.
person.name = 'Kim';
console.log(person); // {name: 'Kim'}

// 프로퍼티 어트리뷰트 재정의가 금지된다.
Object.defineProperty(person, 'name', { configurable: true });
// TypeError: Cannot redefine property: name
```

### 16.5.3 객체 동결

`Object.freeze` 메서드는 객체를 동결한다. 객체 동결이란 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지, 프로퍼티 값 갱신 금지를 의미한다. 즉 **읽기만 가능하다.**
동결된 객체인지 여부는 `Object.isFrozen` 메서드로 확인 가능.

```js
const person = { name: 'Lee' };

// person 객체는 동결된 객체가 아니다.
console.log(Object.isFrozen(person)); // false

// person 객체를 동결하여 프로퍼티 추가, 삭제, 재정의, 쓰기를 금지한다.
Object.freeze(person);

// person 객체는 동결된 객체다.
console.log(Object.isFrozen(person)); // true

// 동결된 객체는 writable과 configurable이 false다. enumerable은 true.
console.log(Object.getOwnPropertyDescriptors(person));
// name: {value: 'Lee', writable: false, enumerable: true, configurable: false}

// 프로퍼티 추가가 금지된다.
person.age = 20; // 무시. strict mode 에선 에러.
console.log(person); // {name: 'Lee'}

// 프로퍼티 값 갱신이 금지된다.
person.name = 'Kim'; // 무시. strict mode 에선 에러.
console.log(person); // {name: 'Lee'}

// 프로퍼티 어트리뷰트 재정의가 금지된다.
Object.defineProperty(person, 'name', { configurable: true });
// TypeError: Cannot redefine property: name
```

### 16.5.4 불변 객체

지금까지 살펴본 변경 방지 메서드들은 **얕은 변경 방지**(shallow only)로 직속 프로퍼티만 변경이 방지되고 중첩 객체까지는 영향을 주지는 못한다.

```js
const person = {
  name: 'Lee',
  address: { city: 'Seoul' },
};

// 일반 객체 동결
Object.freeze(person);

// 직속 프로퍼티만 동결한다.
console.log(Object.isFrozen(person)); // true
// 중첩 객체까지 동결하지 못한다.
console.log(Object.isFrozen(person.address)); // false

person.address.city = 'Busan';
console.log(person);
// address: {city: 'Busan'}
// name: "Lee"
```

중첩 객체까지 동결하여 변경이 불가능한 읽기 전용의 불변 객체를 구현하려면 객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 `Object.freeze` 메서드를 호출해야 한다.

```js
function deepFreeze(target) {
  // 객체가 아니거나 동결된 객체는 무시하고 객체이고 동결되지 않은 객체만 동결한다.
  if (target && typeof target === 'object' && !Object.isFrozen(target)) {
    Object.freeze(target);
    /*
      모든 프로퍼티를 순회하며 재귀적으로 동결한다.
      Object.keys 메서드는 객체 자신의 열거 가능한 프로퍼티 키를 배열로 반환한다.
      19.14.2절 참고
      forEach 메서드는 배열을 순회하며 각 요소에 대하여 콜백함수를 실행.
      27.9.2절 참고
    */
    Object.keys(target).forEach(key => deepFreeze(target[key]));
  }
  return target;
}

const person = {
  name: 'Lee',
  address: { city: 'Seoul' },
};

// 깊은 객체 동결
deepFreeze(person);

console.log(Object.isFrozen(person)); // true
// 중첩 객체까지 동결한다.
console.log(Object.isFrozen(person.address)); // true

person.address.city = 'Busan';
console.log(person);
// address: {city: 'Seoul'}
// name: "Lee"
```

### 참고자료

- 모던 자바스크립트 딥 다이브 16장
- [정재남님 딥다이브 스터디 유튜브 녹화강의](https://www.youtube.com/watch?v=SQAhFwxqlJY&t=398s)
