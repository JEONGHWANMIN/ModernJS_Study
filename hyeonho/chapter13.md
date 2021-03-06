# 13장 - 스코프

## 13.1 스코프란?

- 스코프: 식별자의 유효 범위
- 식별자: 변수명, 함수명, (객체의)속성명, (객체의)메소드명, 클래스명 등
- 다른 언어와의 스코프 범위 차이점: es5까지의 자바스크립트의 스코프는 함수 스코프였다. 다른 언어들의 스코프는 블록 스코프이다.
- 전역 공간: 코드의 가장 바깥 영역.
  - 브라우저: window 객체 내부
  - nodejs: global 객체 내부

### 13.1.1 함수의 매개변수의 스코프

함수의 매개변수는 함수 몸체 내부에서만 참조할 수 있다.
매개변수의 스코프: 함수 몸체 내부

```js
var multiply = function (x, y) {
  return x * y;
};

var result = multiply(3, 7);
result; // 21
console.log(x); // ReferenceError: x is not defined
```

### 13.1.2 선언된 위치에 따라 달라지는 변수의 스코프 범위

```js
// 전역 변수
var globalVar1 = '난 전역변수야.';

// 전역 변수( var 만 해당 )
if (true) {
  var globalVar2 =
    'var 키워드는 함수 스코프라 if문 안에 있어도 나는 전역변수야.';
  if (true) {
    var globalVar3 =
      '중첩 if문 안이더라도 var 키워드로 선언하면 함수 스코프라 나도 전역변수야.';
  }
}

// 지역 변수( var: 함수 스코프, let/const: 블록 스코프 )
function localVars() {
  var localVar1 = '난 함수 안에 있어서 지역변수야.';
  console.log(localVar1);
  //   console.log(localVar2); -> 참조 에러

  function inner() {
    var localVar2 = '난 내부함수 안에서만 접근할 수 있는 지역변수야.';
    console.log(localVar1);
    console.log(localVar2);
  }
  inner();
}

console.log(globalVar1); // 난 전역변수야.
console.log(globalVar2); // var 키워드는 함수 스코프라 if문 안에 있어도 나는 전역변수야.
console.log(globalVar3); // 중첩 if문 안이더라도 var 키워드로 선언하면 함수 스코프라 나도 전역변수야.
console.log(localVar1); // ReferenceError: localVar1 is not defined
console.log(localVar2); // ReferenceError: localVar2 is not defined

localVars();
// 난 함수 안에 있어서 지역변수야.
// 난 함수 안에 있어서 지역변수야.
// 난 내부함수 안에서만 접근할 수 있는 지역변수야.
```

### 13.1.3 코드의 문맥과 환경

```js
// 전역 변수 text와 지역변수 text는 스코프가 다른 별개의 변수다.
var text = '전역변수';

function func1() {
  var text = '지역변수';
  console.log(text);
}

func1(); // 지역변수
console.log(text); // 전역변수
```

- 렉시컬 환경: 코드가 어디서 실행되며 주변에 어떤 코드가 있는지를 렉시컬 환경이라 칭한다.
- 실행 컨텍스트: 코드의 문맥(context)은 렉시컬 환경으로 이뤄지며, 이를 구현한 것이 실행 컨텍스트이다.
  모든 코드는 실행 컨텍스트에서 평가되고 실행된다.
- 스코프의 개념이 없다면 같은 이름을 갖는 변수가 여러 개 있는 경우 충돌을 일으키기 때문에 하나밖에 사용할 수 없다.
- 같은 이름의 변수더라도 스코프가 다르면 충돌하지 않는다. 즉 식별자는 스코프 내에서는 유일해야 하지만 다른 스코프를 가진다면 같은 이름의 변수를 선언하는 것이 가능하다. 이를 **'스코프는 네임스페이스다.'** 라고 설명한다.

### 13.1.4 var 키워드로 선언한 변수의 중복 선언

```js
function func() {
  var num = 1;
  var num = 2;
  console.log(num); // 2
}
func();

// var 키워드로 선언된 변수는 같은 스코프에서도 중복 선언이 가능함.
// 따라서 재할당이 되어 버리기 때문에 let 또는 const로 선언하는게 옳다.
// let과 const는 같은 스코프의 경우 중복 선언이 불가능하다.
```

## 13.2 스코프의 종류 + 13.3 지역과 지역 스코프

스코프는 전역 스코프와 지역 스코프 2가지로 분류된다.

- 전역과 전역 스코프: 코드의 가장 바깥 영역. 전역 변수는 어디서든지 참조 가능.
- 지역과 지역 스코프: **var** 키워드 - **함수 몸체 내부**/ **let, const** 키워드 - **코드블록 내부**

```js
// 전역 스코프
var x = '전역변수 x';
var y = '전역변수 y';

function outer() {
  // 외부함수의 지역 스코프
  var z = '외부함수의 지역변수 z';

  console.log(x); // 전역변수 x
  console.log(y); // 전역변수 y
  console.log(z); // 외부함수의 지역변수 z

  function inner() {
    // 내부함수의 지역 스코프
    var x = '내부함수의 지역변수 x';

    console.log(x); // 내부함수의 지역변수 x
    console.log(y); // 전역변수 y
    console.log(z); // 외부함수의 지역변수 z
  }

  inner();
}

outer();
console.log(z); // ReferenceError: z is not defined
```

상기 예제의 var 키워드를 let 또는 const로 전부 바꿔도 동일하게 동작한다.

## 13.3 스코프 체인

스코프는 **함수의 중첩**에 의해 **계층적 구조**를 갖는다.
즉, 함수 내부에서 정의한 외부함수의 중첩 함수는 외부 함수의 지역 스코프를 상위 스코프로 하며
외부 함수의 상위 스코프는 전역 공간이 된다.
이렇게 상위 스코프로 올라가는 스코프가 계층적으로 연결된 모양을 **스코프 체인**이라고 칭한다.
자바스크립트 엔진은 변수를 참조할 때, 현재 위치(변수를 참조하는 코드)의 스코프에서부터 상위 스코프 방향으로 이동하며
선언된 변수를 검색한다. 즉 **스코프 체인**을 따라 이동하며 변수를 검색한다.

### 13.3.1 + 13.3.2 스코프 체인에 의한 변수와 함수의 검색

- 검색의 방향은 반드시 상위 스코프로 향한다. 하위 스코프로 가는 일은 없다.
- 하위 스코프에서는 상위 스코프를 참조할 수 있지만, 상위 스코프에서 하위 스코프를 참조할 수는 없다.

## 13.4 함수 레벨 스코프

대부분의 프로그래밍 언어는 함수를 포함하여 모든 코드 블록이 지역 스코프를 만든다.
하지만 자바스크립트의 경우 var 키워드로 선언된 변수의 경우 함수 몸체 내부에서만 지역 스코프를 가진다.
즉 함수 내부가 아닌 조건문 등의 코드블록 내에서 선언된 경우 전역변수가 되어 코드 어디서든 접근 가능하다.
이러한 특성을 **함수 레벨 스코프**라 한다.
따라서 es6에서 추가된 let과 const 키워드는 **블록 레벨 스코프**의 특성을 가지므로 이를 사용하는게 좋다.

## 13.5 렉시컬 스코프

- 함수의 상위 스코프를 결정하는 두가지 방법
  1. 동적 스코프: 함수를 어디서 호출했는지에 따라서
  2. 정적 스코프: 함수를 어디서 정의했는지에 따라서(렉시컬 스코프)

자바스크립트는 2번째 방식을 따른다. 따라서 함수가 호출된 위치는 상위 스코프 결정에 어떠한 영향도 주지 않는다.

```js
// func1과 func2의 상위 스코프는 전역 스코프로 동일하다.

var num = 10;

function func1() {
  var num = 100;
  func2();
}

function func2() {
  console.log(num);
}

func1(); // 10
func2(); // 10
// func1 안에서 func2를 호출하여도,
// func2가 매개변수로 func1의 지역변수를 받지 않기 때문에
// func2에서 num 변수가 없어 상위 스코프인 전역 공간의 num 변수에 접근함.
// 따라서 전역 변수 num의 값이 콘솔에 출력됨.
```

### 스코프 면접 예시 문제

어떤 값이 출력될까요?

```js
// 코드 출처: 신입 웹 프론트엔드 개발자 되는 구체적인 방법들 - 라매개발자
var a = 5;

function test() {
  console.log('1', a);
  var a = 4;
  console.log('2', a);
  a = 3;
  return function () {
    console.log('3', a);
  };
}

test()();
```
