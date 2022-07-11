# 22장 this

## 22.1 this 키워드

this가 무엇인가 ? 자신이 속한 객체를 가르킨다 !!

this가 필요한 이유는 생성자 함수의 경우 인스턴스를 가르키는 자기참조변수 역할을 해서 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티 메서드를 참조할 수 있다.

this 바인딩은 함수호출방식 의해서 동적으로 결정된다.

각각 this는 누가 호출했냐에 따라서 다른 역할을 한다.

```js
// this는 어디서든지 참조 가능하다.
// 전역에서 this는 전역 객체 window를 가리킨다.
console.log(this); // window

function square(number) {
  // 일반 함수 내부에서 this는 전역 객체 window를 가리킨다.
  console.log(this); // window
  return number * number;
}
square(2);

const person = {
  name: 'Lee',
  getName() {
    // 메서드 내부에서 this는 메서드를 호출한 객체를 가리킨다.
    console.log(this); // {name: "Lee", getName: ƒ}
    return this.name;
  },
};
console.log(person.getName()); // Lee

function Person(name) {
  this.name = name;
  // 생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  console.log(this); // Person {name: "Lee"}
}

const me = new Person('Lee');
```

생성자 함수에서 객체는 미래에 생성될 인스턴스를 가르킨다 !

## 요약

1. 일반함수 : 전역객체 window , nodejs -> global
2. 객체 메서드 : this -> 그 객체를 가르킨다.
3. 생성자 함수 : 미래에 생성될 인스턴스

## 22.4 apply/call/bind 메서드 간접 호출

-> this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출한다.

```js
function Print() {
  return this;
}

const thisArg = { name: 'min' };

console.log(Print());
console.log(Print.apply(thisArg));
console.log(Print.call(thisArg));
```

일반함수에 this를 접목시키는 느낌

call , apply 다른점

```js
console.log(Print.apply(thisArg, [1, 2, 3]));
console.log(Print.call(thisArg, 1, 2, 3));
```

함수에 인자값을 넣어줄때 apply는 배열에 넣어서 넣어주고 call 은 쉼표로 구분해서 넣어준다.

둘 다 동작한는건 똑같다.

```js
function convertArgsToArray() {
  console.log(arguments);

  const arr = Array.prototype.slice.call(arguments);
  // const arr = Array.prototype.slice.apply(arguments);
  console.log(arr);

  return arr;
}

convertArgsToArray(1, 2, 3); // [1, 2, 3]
```

arguments -> 유사배열 객체 (배열 메서드 slice) 사용 불가능

하지만 slice 메서드에 call -> arguments를 접목시키면 사용 가능

### bind

bind : this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다.

```js
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// bind 메서드는 첫 번째 인수로 전달한 thisArg로 this 바인딩이 교체된
// getThisBinding 함수를 새롭게 생성해 반환한다.
console.log(getThisBinding.bind(thisArg)); // getThisBinding
// bind 메서드는 함수를 호출하지는 않으므로 명시적으로 호출해야 한다.
console.log(getThisBinding.bind(thisArg)()); // {a: 1}
```

bind는 apply , call과 다르게 한번 더 함수를 실행시켜 줘야 한다.

callback함수 this

```js
const hwanMin = {
  name: 'HwanMin',
  printName: function (callback) {
    setTimeout(callback, 3000);
  },
};

function HI() {
  console.log(this.name);
}

hwanMin.printName(HI);
```

저기 foo()가 받는 callback함수는 this가 윈도우 전역객체 이기 떄문에 undefined가 찍힌다.

```js
const person = {
  name: 'Lee',
  foo(callback) {
    // bind 메서드로 callback 함수 내부의 this 바인딩을 전달
    setTimeout(callback.bind(this), 100);
  },
};

person.foo(function () {
  console.log(`Hi! my name is ${this.name}.`); // Hi! my name is Lee.
});
```

bind로 this를 바인딩을 해줘야 그 이후부터 잘 this가 찍힌다.

## 예시코드로 실험을 해보장!!

```js
function a() {
  console.log(this);
}

a(); // 함수에서 this 글로벌

const hwanMin = {
  name: 'HwanMin',
  getPrint: () => {
    console.log(this);
  },

  getPrint2: function () {
    console.log(this);
  },
};
hwanMin.getPrint();
hwanMin.getPrint2();

const print = hwanMin.getPrint2;

print();
```

bind call apply

```js
function print() {
  console.log(this);
}
const hwanmin = {
  name: 'hwanMin',
};
console.log(print.bind(hwanmin)());
```

## 나만의 this 정리

this 는 brower 상에서는 window , nodejs에서는 global 이다.

this는 *호출하는 방식*에 따라서 달라진다.

apply , call , bind 는 일반함수의 this가 특정 객체를 가르키도록 바인딩 할 수 있다. (함수 내부 프로토타입 메서드 이다.)

- 일반함수에서 this는 window , global

- 생성자 함수에서 this는 미래에 생성될 인스턴스

- 컬백함수의 경우 this는 바인딩이 되지 않는다. (직접 바인드를 해줘야 한다.)

- 화살표 함수 (ArrowFuction)은 자신보다 상위 this를 가르킨다.

#### Example

```js
const hwanMin = {
  name: 'HwanMin',
  printName: function () {
    setTimeout(function () {
      console.log(this);
    });
  },

  printName2: function () {
    setTimeout(() => {
      console.log(this);
    });
  },
};

hwanMin.printName();
hwanMin.printName2();
```
