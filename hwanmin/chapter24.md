# 클로저

클로저 -> 자바스크립트 개념이 아니다.

함수를 일급 객체로 취급하는 함수형 프로그래밍 언어에서 사용되는 특성이다.

## 24.1 렉시컬 스코프

함수는 렉시컬 스코프다.

렉시컬 스코프 -> 함수를 어디서 호출했는지가 아니라 어디서 선언되었는지에 따라서 상위 스코프를 결정한다. 이게 렉시컬 스코프 이다.

```js
const x = 1;

function foo() {
  const x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo();
bar();
```

bar() 함수가 전역에 선언되어 있기 때문에 아무리 foo() 내에서 bar()를 실행시켰어도 ,
bar() 함수는 x = 1 이라는 값을 찍어준다.

즉 , 함수의 상위 스코프는 함수가 어디서 선언되었는지가 결정한다.

## 24.2 함수 객체의 내부 슬롯[[Environment]]

함수는 자신이 호출되는 환경과는 상관없이 자신이 정의된 환경 , 즉 상위 스코프(함수 정의가 위치하는 스코프가 바로 상위 스코프)를 기억해야 한다.

함수는 자신의 내부 슬롯 [[Environment]]에 자신이 정의 된 환경 , 즉 상위 스코프의 참조를 저장한다.

-> 그니까 함수가 생성 되면 [[Environment]] 라는 내부 슬롯이 생기는데 이떄 코드 평가 단계에서 스코프가 결정되는데 이거를 Environment 슬롯에 담아 뒀다가 나중에 함수 실행 단계에서

기억한 스코프를 꺼내서 쓰는 ? 이런 원리로 돌아가는 거 같다.

->

1. 코드 평가 단계에서 bar()함수가 등록이 되고 , 이때 Environment에 스코프가 등록이 됨,
2. 실행될때는 평가해놓은 것을 실행만 시키는 것이기 떄문에 foo()함수라는 스코프를 인식자체가 되지 않음.

### 24.3 클로저와 렉시컬 환경

```js
const x = 1;

function outer() {
  const x = 10;
  const inner = function () {
    console.log(x);
  };
  return inner;
}

const innerFunc = outer();
innerFunc();
```

위 코드에서 outer() 를 실행하면 inner() 함수를 리턴해고 outer 함수 가 종료된다.

inner 함수가 실행될 시점에는 outer함수는 종료되어있지만 , outer 함수의 10이 콘솔에 찍힌다.

외부함수 보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다.

-> 자바스크립트 모든 함수는 자신의 상위 함수를 기억함 <-

outer 함수가 종료될 때 실행 컨텍스트는 종료가 되지만 렉시컬 환경까지 종료가 되지는 않는다.

inner [[Environment]] -> outer함수 렉시컬 환경을 참조하고 있다. 그렇기에 outer함수는 누군가가 참조하고 있기 때문에 가비지컬렉터 대상이 되지 않는다.

클로저 성립 성질

1. 외부 함수 렉시컬 환경을 참조하고 있어야 한다.
2. 외부 함수보다 중첩 함수가 더 오래 생존을 해야 한다.

근데 이때 브라우저는 최적화를 통해서 상위 렉시컬 환경를 다 기억하는게 아니라 참조하고 있는 식별자(변수)만을 기억한다.

### 24.4 클로저의 활용

클로저는 상태가 의도치 않게 변경되지 않도록 안전하게 은닉하고 , 특정 함수에게만 상태 변경을 허용하여 상태를 안전하게 변경하고 유지하기 위해 사용합니다.

```js
const counter = (function () {
  // 카운트 상태 변수
  let num = 0;

  // 클로저인 메서드를 갖는 객체를 반환한다.
  // 객체 리터럴은 스코프를 만들지 않는다.
  // 따라서 아래 메서드들의 상위 스코프는 즉시 실행 함수의 렉시컬 환경이다.
  return {
    // num: 0, // 프로퍼티는 public하므로 은닉되지 않는다.
    increase() {
      return ++num;
    },
    decrease() {
      return num > 0 ? --num : 0;
    },
  };
})();

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2

console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
```

위 예제와 같이 중첩함수 위에 상위 함수는 리턴되어 소멸되어도 counter 렉시컬 스코프에 등록되어 있기 때문에 num 변수에 안전하게 접근이 가능하다. !

클로저 -> 외부 상태 변경이나 가변 데이터를 피하고 불변셩을 지향하는 함수형 프로그래밍에서 부수 효과를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이기 위해 클로저는 적극적으로 사용된다.

클로저를 사용하면 클로저가 반환하는 함수만의 독자적인 렉시컬 환경을 가질 수 있다.

# 캡슐화와 정보은닉

캡슐화 -> 프로퍼티와 , 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 의미

근데 이 때 메서드랑 프로퍼티를 숨길 목적으로 사용하는 것이면 이것은 정보은닉 이라고 합니다.

객체지향 -> public private protected 같은 접근 제한자를 선언하여 공개 범위를 한정할 수 있다.

private 외부 에서 클래스에 접근이 불가능 하도록 설정해준다.

하지만 자바스크립트는 위 접근 제한자를 제공하지 않는다.

그래서 기본 디폴트 값이 퍼블릭인 상태이다.

```js
const Person = (function () {
  let _age = 0; // private

  // 생성자 함수
  function Person(name, age) {
    this.name = name; // public
    _age = age;
  }

  // 프로토타입 메서드
  Person.prototype.sayHi = function () {
    console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
  };

  // 생성자 함수를 반환
  return Person;
})();

const me = new Person('Lee', 20);
me.sayHi(); // Hi! My name is Lee. I am 20.
console.log(me.name); // Lee
console.log(me._age); // undefined

const you = new Person('Kim', 30);
you.sayHi(); // Hi! My name is Kim. I am 30.
console.log(you.name); // Kim
console.log(you._age); // undefined
```

위 와 같이 즉시 실행함수로 생성자 함수를 만들고 , 프로토 타입 메서스도 넣어주고 return 으로 이 생성자 함수를 반환하면 그 위에 있는 변수들은 생명주기가 다 되었지만

클로저를 사용해서 접근이 가능하다.

```js
const me = new Person('Lee', 20);
me.sayHi(); // Hi! My name is Lee. I am 20.

const you = new Person('Kim', 30);
you.sayHi(); // Hi! My name is Kim. I am 30.

// _age 변수 값이 변경된다!
me.sayHi(); // Hi! My name is Lee. I am 30.
```

하지만 , 새로 인스턴스를 만들면 값이 초기화 되는 문제가 있다. 결국 근본적인 해결책이 되지 않는다.

# 자주 발생하는 실수

```js
var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = function () {
    return i;
  }; // ①
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]()); // ②
}

// 3,3,3
```

각각 함수는 전역변수 Environment 인 i 변수를 을 기억하고 있다.

위 포문이 끝났을 때 i 값은 3이다.

```js
var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = (function (id) {
    // ①
    return function () {
      return id;
    };
  })(i);
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]());
}
```

위 코드의 경우는 상위 스코프를 한번 더 지정해줘서 리턴되는 함수가 id 값을 클로저로 기억할 수 있도록 하는 예제이다.

```js
const funcs = [];

for (let i = 0; i < 3; i++) {
  funcs[i] = function () {
    return i;
  };
}

for (let i = 0; i < funcs.length; i++) {
  console.log(funcs[i]()); // 0 1 2
}
```

하지만 위 예제처럼 처음부터 블록레벨 스코프인 let을 사용한다면 편하게 사용이 가능합니다.

for 문이 처음 실행되면 실행 컨텍스트 렉시컬 환경이 for문으로 교체되고

각각 반복문을 돌 때 마다 , 새로운 렉시컬 환경으로 교체된다.

let , const 를 사용하는 반복문은 코드블록을 반복 실핼할 때 마다 새로운 렉시컬 환경을 생성

```js
// 요소가 3개인 배열을 생성하고 배열의 인덱스를 반환하는 함수를 요소로 추가한다.
// 배열의 요소로 추가된 함수들은 모두 클로저다.
const funcs = Array.from(new Array(3), (\_, i) => () => i); // (3) [ƒ, ƒ, ƒ]

// 배열의 요소로 추가된 함수 들을 순차적으로 호출한다.
funcs.forEach(f => console.log(f())); // 0 1 2
```

위와 같은 방법도 있지만

27장 ,26장에서 알아 보도록 하자 !!
