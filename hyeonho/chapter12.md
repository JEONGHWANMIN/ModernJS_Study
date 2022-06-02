# 12장 함수

## 12.1 함수란?

- 수학에서의 함수와 같은 개념으로, 비유하자면 입력을 받아 출력을 내보내는 기계와 같다.
- 프로그래밍 언어에서의 함수는 수행할 동작을 각각의 문들로 구현하고 이들을 하나의 코드블럭으로 묶어 하나의 실행단위로 만든 것이다.
- 매개변수: 함수 내부로 입력을 전달받는 변수
- 인수: 함수 내부로 전달하는 입력값
- 반환값: 입력(input)을 받아서 일련의 동작을 수행하고 내보내는 출력(output), 즉 결과.

## 12.2 함수를 사용하는 이유

반복적으로 수행해야 할 작업이 있을 때 매번 코드를 새로 짜는 것이 아니라 미리 작성된 함수를 호출하여 간편하게 재사용 할 수 있다. **(중복 제거, 코드 재사용)**

## 12.3 함수 리터럴

- 함수 리터럴로 함수를 생성할 수 있다. 리터럴이므로 평가되어 값을 가지며 함수 리터럴의 값은 **'객체'** 다.
- 함수 리터럴 구성요소: 함수 이름(**생략 가능**), 매개변수 목록(**0개 이상**), 함수 몸체
- 일반 객체는 호출할수 없지만 함수는 호출할 수 있다.
- 함수 리터럴의 함수 이름은 **함수 몸체 내에서만 참조**가 가능하다.

```js
// 함수 리터럴을 변수에 할당하고 함수로 참조, 변수로 참조(호출) 시 결과.
let func = function addTwo(num) {
  return num + 2;
};

addTwo(2); // ReferenceError: addTwo is not defined
func(2); // 4
```

## 12.4 함수 정의

- 변수는 **선언** 하는 것.
- 함수는 **정의** 하는 것.
- 함수 정의 방식
  - 함수 선언문: 표현식이 아닌 **문** 이다. 즉 변수에 할당할 수 없다.
    하지만 변수에 할당이 가능한 것 처럼 보여지는데, 이는 기명 함수 리터럴과 함수 선언문의 형태가 사실상 동일하기 떄문이다.
    즉 이 경우의 함수는 기명 함수 리터럴이다.
  - 함수 표현식: 변수에 담아서 선언한 함수.
  - `Function` 생성자 함수
  - 화살표 함수

```js
// 1. 함수 선언문
// 함수 선언문은 함수 이름을 생략할 수 없다.(문법 에러 발생)
// 함수 선언문은 표현식이 아닌 문이다.
function multiply(x, y) {
  return x * y;
}

// 2. 함수 표현식
const divide = function (x, y) {
  return x / y;
};

// 3. Function 생성자 함수
const minus = new Function('x', 'y', 'return x - y');

// 4. 화살표 함수
const add = (x, y) => x + y;
```

### 12.4.1 함수 선언문

- 함수 선언문은 function 키워드로 선언한 기명 함수이다.
- 함수 선언문은 **함수 이름을 생략할 수 없다.** 함수 리터럴과 구별되는 확실한 차이점이다.
- 기명 함수 리터럴과 형태가 같기 때문에 값으로 평가되어 변수에 할당이 가능하다고 생각할 수 있으나,
  함수 선언문은 **문** 이므로, 값을 갖지 않으며 변수에 할당할 수 없다. 변수에 할당된 것처럼 보이는 함수 선언문은 함수 선언문이 아니라 **(기명) 함수 리터럴** 이다.

```js
// 함수 선언문은 사실상 기명 함수 리터럴과 형태가 동일하다.
// 따라서 함수 선언문이 변수에 할당이 가능한 것처럼 보여진다.
const adder = function add(x, y) {
  return x + y;
};
adder(2, 3); // 5
```

### 12.4.2 함수 표현식

- 함수는 객체 타입의 값이며, 자바스크립트의 함수는 **일급 객체** 이다.
  따라서 1. 변수의 값, 2. 프로퍼티 값 , 3. 배열의 요소 로 사용할 수 있다.
- 따라서 함수는 일급 객체이기 때문에, 함수 리터럴을 변수에 할당 가능하며 이를 함수 표현식이라고 한다.

```js
// ES5 함수 표현식
var multiply = function (x, y) {
  return x * y;
};

// ES6 화살표 함수 방식 함수 표현식
const add = (x, y) => {
  return x + y;
};
```

### 12.4.3 함수 생성 시점과 함수 호이스팅

```js
// func1: 함수 선언문
// func2: 함수 표현식

func1(); // declaration
func2(); // Uncaught ReferenceError: func2 is not defined

function func1() {
  return console.log('declaration');
}

const func2 = function () {
  return console.log('expression');
};
```

- 함수 선언문: function 키워드로 선언한 함수
- 함수 표현식: var, let, const 키워드로 변수에 초기화하여 선언한 함수
- 함수 표현식은 호이스팅에 영향을 받지 않는다.
  함수 선언문, 함수 표현식 둘 다 호이스팅은 일어나지만 함수 표현식의 경우 런타임 이전에 변수 선언된 것으로 본다.
  따라서 선언 이전에 함수 호출시 자바스크립트 엔진에선 함수 표현식을 함수가 아닌 변수로 인식하여 에러가 발생한다.
- `var` 키워드로 선언 시: `Uncauhgt TypeError: func2 is not a function` - `let`, `const` 키워드로 선언 시: `Uncaught ReferenceError: func2 is not defined`
- **즉 함수 표현식은 함수 호이스팅이 아닌 변수 호이스팅 된다.**
- 따라서, 함수를 선언한 후에 호출하도록 하여 호이스팅을 피하는 것이 좋다.

## 12.5 함수 호출

### 12.5.1 매개변수와 인수

- 함수를 호출하며 인수로 전달한 값을 매개변수를 통해 함수 내부로 전달한다.
- 매개변수는 함수 내부에서 변수와 동일하게 취급된다. 따라서 매개변수명과 같은 변수를 함수 내부에서 선언 할 수 없다.
- 인수는 개수와 타입에 제한이 없다.
- 매개변수가 인수보다 많을 경우 인수에 할당되지 않은 매개변수의 값: `undefined`
- 인수가 매개변수보다 많을 경우 초과된 인수: **무시됨.**
  (암묵적으로 arguments 객체에 보관됨.)

### 12.5.2 인수 확인

- 함수 몸체의 표현식에 알맞는 자료형의 값을 인수로 전달해야 한다.

```js
function add(x, y) {
  return x + y;
}
add('a', 'b'); // ab
add(2); // 2 + undefined = NaN
```

### 12.5.3 매개변수의 최대 개수

- 개수의 제한은 없다. 하지만 유지보수성이 좋은 함수를 작성하려면 매개변수의 개수는 **적을수록 좋다.** (0개가 이상적.)

### 12.5.4 반환문

- 함수 호출은 표현식이다. 따라서 함수 호출의 반환값이 값이 된다. 리턴값 미지정시 undefined 반환.
- 반환문은 함수를 종료시킨다. 따라서 반환문 아래에 존재하는 문은 무시된다.

## 12.6 참조에 의한 전달과 외부 상태의 변경

- 매개변수로 받은 원시 값은 변경 불가능한 값이므로 원본이 변경되지 않는다.
- 매개변수로 받은 참조 값은 변경 가능한 값이므로 원본이 변경될 수 있다.

```js
function isImmutable(primitive, obj) {
  primitive += 20;
  obj.age = 20;
}

let num = 100;
let user = { name: 'Ryan' };

isImmutable(num, user);

console.log(num); // 100
console.log(user); // {name: 'Ryan', age: 20}
```

## 12.7 다양한 함수의 형태

### 12.7.1 즉시 실행 함수(IIFE)

- 즉시 실행 함수: 함수 정의와 동시에 즉시 호출되는 함수.
- 익명함수를 정의하고 코드블럭 마지막에 호출`()`하며, 이 내용 전체를 그룹 연산자`( ... )`로 감싼다.
- 단 한번만 호출되며 다시 호출할 수 없다.
- 익명 함수로 사용한다.
  기명으로도 정의할 수 있으나, **그룹 연산자 내의 기명 함수는 함수 리터럴로 평가되며** 함수 리터럴의 함수 이름은 함수 몸체 내에서만 참조가 가능하므로 기명 즉시 실행 함수를 함수 외부에서 호출하면 참조 에러가 발생한다.

```js
// 익명 즉시 실행 함수
(function () {
  console.log('iife');
})();

// 기명 즉시 실행 함수: 참조 에러
(function logger() {
  console.log('iife');
})();

logger(); // ReferenceError: logger is not defined
```

### 12.7.2 재귀 함수

별도 문서로 자세히 정리하였음. [링크](https://ryan-kim-dev.tistory.com/78)

```js
function collectEvenNums(arr) {
  let result = [];

  function helper(changingInput) {
    if (changingInput.length === 0) return;

    if (changingInput[0] % 2 === 0) {
      result.push(changingInput[0]);
    }

    helper(changingInput.slice(1));
  }

  helper(arr);

  return result;
}

const arrInGlobal = [1, 2, 3, 4, 5, 6];

collectEvenNums(arrInGlobal); // [2, 4, 6]
```

상기 예제는 헬퍼 함수인 재귀 함수의 예시이다.
재귀 함수는 자기 자신을 호출(재귀 호출)하는 함수를 말한다.
재귀 함수는 탈출 조건이 없으면 무한반복 하므로 반드시 탈출 조건을 주어야 스택 오버플로우를 방지할 수 있다.

### 12.7.3 중첩 함수

- 중첩 함수: 외부 함수의 안에서 정의된 내부 함수.
  [별도 문서로 정리한 재귀 함수 설명](https://ryan-kim-dev.tistory.com/78)에서 함께 설명하였음.

### 12.7.4 콜백 함수

```js
// * 콜백함수 - 다른 함수의 매개변수(parameter)로 들어가는 함수.
// * 순차적으로 함수를 실행하기 위해 사용.

$input.addEventListener('input', function () {
  console.log(event.target.value); // input 이벤트 발생시 콜백함수가 실행되어 콘솔창에 입력내용(event.target.value)를 표시해줌
});
$button1.addEventListener('click', function () {
  $input.value = ''; // 버튼을 클릭하는 이벤트 발생시 input창을 비운다.
  $input.focus(); // input창 강조효과
});

// * 이벤트리스너에서의 콜백함수 사용 예제
const onInputOperator = () => {
  confirm($input2.value);
};

$input2.addEventListener('input', onInputOperator);

// * 고차함수
// * 1. 함수를 매개변수(parameter)로 전달받는 함수
// * 2. 함수를 반환하는 함수

function func1(callback) {
  console.log(1);
  return callback();
}
function func2() {
  console.log(2);
}

func1(func2); // func1 함수를 실행하는데 매개변수로 func2함수를 받아서 실행해라.
// 1
// 2

// * 비동기 처리에서의 고차함수와 콜백함수 사용 예제
const getDataFromFilePromise = (filePath) => {
  // return new Promise()
  // TODO: Promise 및 fs.readFile을 이용해 작성합니다.
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};
```

### 12.7.5 순수 함수와 비순수 함수

순수 함수

- 외부 상태로부터 인수를 전달받지만 오직 매개변수를 통해 함수 내부로 전달된 인수에게만 의존하여 반환값을 만든다.
- 즉 어떤 외부 상태에도 의존하지 않는다.
- 외부 상태를 변경시키지도 않는다. 인수로 전달한 외부 상태의 값을 변경시키지 않는다.
- 함수형 프로그래밍 패러다임에서는 순수 함수와 보조 함수의 조합을 통해 외부 상태를 변경하는 부수 효과를 최소화해서 불변성을 지향한다.

```js
const num = 3;

function double(x) {
  return x * 2;
}

double(num); // 6
console.log(num); // 3
```

비순수 함수

- 함수의 외부 상태에 따라 반환값이 달라지는, 즉 외부 상태에 의존하는 함수.
- 함수의 외부 상태를 변경하는 **부수 효과**가 있다. (인수로 들어간 외부의 변수의 값을 변경시킴.)
- 함수 내부에서 외부를 직접 참조하면 외부 상태에 의존하며 외부 상태를 변경 또한 가능해지므로 이는 비순수 함수가 된다.
- 함수가 외부 상태를 변경하면 상태 변화를 추적하기가 어려우므로 비순수 함수의 사용을 지양하는게 좋다.

```js
let count = 0;

// 비순수 함수
function increase() {
  return ++count; // 증감 연산자의 부수 효과: 값을 변경시킴.
}

increase();
console.log(count); // 1
```
