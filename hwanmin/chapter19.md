# 19. 프로토타입

1탄 블로그로 정리했습니다.
https://ghksals0904.tistory.com/117

2탄

## 19.8 오버라이딩 프로퍼티 섀도잉

```js
const Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  // 생성자 함수를 반환
  return Person;
})();

const me = new Person('Lee');

// 인스턴스 메서드
me.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};

// 인스턴스 메서드가 호출된다. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
me.sayHello(); // Hey! My name is Lee
```

위 예시의 경우 이미 Person에 sayHello라는 메서드가 있지만 자식에서 재 정의해서 사용하기 때문에 Hi가 아니라 Hey가 나오게 된다.

- 오버라이딩 : 부모 클래스에 있는 메서드를 자식에서 재 정의해서 사용하는 방식

하위객체에서 인스턴스 메서드를 삭제하는 것은 가능하지만 , 부모 프로토타입에 있는 메서드를 삭제하는 것은 불가능하다.

## 19.9 프로토타입의 교체

생성자 함수가 생성할 객체의 프로토타입을 객체 리터럴로 교체

```js
// 19-41
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  // ① 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
  Person.prototype = {
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    },
  };

  return Person;
})();

const me = new Person('Lee');

console.log(me.constructor === Person); // false
// 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색된다.
console.log(me.constructor === Object); // true
```

Person 프로토타입을 객체 리터럴로 교체하면 constructor가 사라진다.
그래서 Person을 건너뛰고 Object로 가게된다.

## 프로퍼티 존재 확인하는 방법

![image](https://user-images.githubusercontent.com/65848374/177062416-71dbf0b5-7b8b-45d9-8317-15b14caa4c61.png)

1. in 연산자

```js
const hwanMin = {
  name: 'HwanMin',
  age: 31,
};

console.log(Object.prototype);
console.log('name' in hwanMin);
console.log('toString' in hwanMin);
console.log('valueOf' in hwanMin);
```

2. Reflect.has(obj,property)
   in 연산자랑 동일하게 작동한다.

```js
const hwanMin = {
  name: 'HwanMin',
  age: 31,
};

console.log(Reflect.has(hwanMin, 'name')); //true
console.log(Reflect.has(hwanMin, 'toString')); //true
```

3. .hasOwnProperty(property)
   상속받은 프로퍼티 키인 경우에는 false를 반환해준다.

```js
const hwanMin = {
  name: 'HwanMin',
  age: 31,
};

console.log(hwanMin.hasOwnProperty('name')); //true
console.log(hwanMin.hasOwnProperty('toString')); //false
```

### 요약

1. 프로퍼티 확인하는 메서드는 3개가 있다.
2. 그중 2개는 객체 상속받은 프로퍼티까지 나타난다.(Reflect , in)
3. hasOwnProperty()는 객체 본인의 프로퍼티만 나타낸다.

### 프로퍼티 열거

1. for in 문

```js
const hwanMin = {
  name: 'HwanMin',
  age: 31,
};

for (let key in hwanMin) {
  console.log(key, hwanMin[key]);
}
```

주의할 점 , 상속받은 프로토타입 프로퍼티까지 열거한다.

하지만 프로퍼티 어트리뷰트 값이 [[Enumerable]] 값이 false면 열거되지 않는다.
또한 키값이 심벌값이면 열거하지 않는다.

```js
const hwanMin = {
  name: 'HwanMin',
  age: 31,
};

Object.prototype.hwans = function () {
  return `I'm Hwans`;
};

for (let key in hwanMin) {
  console.log(key, hwanMin[key]);
}

// name HwanMin
// age 31
// hwans [Function (anonymous)]
```

객체 자신의 프로퍼티인지 확인하려면 hasWonProperty(key) 메서드를 사용해야한다.

```js
const hwanMin = {
  name: 'HwanMin',
  age: 31,
};

Object.prototype.hwans = function () {
  return `I'm Hwans`;
};

for (let key in hwanMin) {
  if (!hwanMin.hasOwnProperty(key)) continue;
  console.log(key, hwanMin[key]);
}
```

for in 문은 객체에 한정된게 아니라 배열에서도 사용 가능

```js
let a = [1, 2, 3, 4, 5];

for (let key in a) {
  console.log(key, a[key]);
}
```

배열에 인덱스랑 값이 출력된다.

## Object.keys/values/entries 메서드

열거가능한 프로퍼티들을 나열할 수 있다.

```js
const hwanMin = {
  name: 'HwanMin',
  age: 31,
};

Object.prototype.hwans = function () {
  return `I'm Hwans`;
};

console.log(Object.keys(hwanMin));
console.log(Object.values(hwanMin));
console.log(Object.entries(hwanMin));

// 구조분해 할당을 사용한 키와, 벨류 받기
for (let [key, value] of Object.entries(hwanMin)) {
  console.log(key, value);
}
```

객체 갯수를 알고 싶을때 주로 사용했었다.
