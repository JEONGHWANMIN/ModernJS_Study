# 5. 표현식과 문

## 학습목표

- 표현식으로 인정되는 다양한 경우에 대해 이해하기
- 문(statement)과 표현식(expression)의 명확한 정의와 서로의 차이에 대해 이해하기
- 표현식인 문과 표현식이 아닌 문 이해하기

## 들어가기에 앞서

### Node.js REPL(27쪽)

- REPL이란: Read-Eval-Print-loop
1. **입력 - 사용자 입력을 판독하는 자바 스크립트는 입력 데이터의 구조를 분석하고 메모리에 저장된다.**
2. **평가 - 파싱(분석)된 자바스크립트 자료구조는 결괏값을 내기 위해 평가된다.**
3. **출력 - 결괏값이 평가 후 출력된다.**
4. **반복 - 입력 과정부터 반복한다.**

**Read**

: It reads the inputs from users and parses it into JavaScript data structure. It is then stored to memory.

**Eval**

: The parsed JavaScript data structure is evaluated for the results.

**Print**

: The result is printed after the evaluation.

**Loop**

: Loops the input command. To come out of NODE REPL, press **ctrl+c** twice

## 5.1 값

---

- **값: 표현식이 평가되어 생성된 결과.**

```jsx
5 * 4; // 정수 리터럴과 연산자로 이루어짐. 평가되어 20이란 숫자 값을 생성한다.
```

- 모든 값은 데이터 타입을 가진다.
- 값은 메모리에 저장될 때 2진수(bit의 나열)로 저장된다.
- 값은 데이터 타입에 따라 다른 값을 가진다.
    - 메모리에 저장된 값 0100 0001은 숫자로는 65, 문자로는 ‘A’로 해석된다.
- 의문점: 식별자에 할당 없이 값만 있는 경우 값은 메모리에 저장되었지만 name binding이 이루어지지 않아 재사용 불가능?

## 5.2 리터럴

---

- 정의: 사람이 이해할 수 있는 문자나 미리 약속된 기호로 **값을 생성하는** **표기법**. (자바스크립트 엔진에게 해당 데이터타입의 값을 만들라고 명령)
- 리터럴은 런타임에 평가되어 **값을 생성한다.**
- **리터럴도 표현식이다.** 값으로 평가될수 있는 모든 문은 표현식이므로!

```jsx
// 불리언 값, null, undefined는 문자열이 아니라 각각의 리터럴이다.

// 불리언 리터럴
true
false

// null 리터럴
null

// undefined 리터럴
undefined

// 함수 선언문은 함수 리터럴이다.
function () {}
```

## 5.3 표현식

---

- 정의: **값으로 평가될 수 있는 문(statement). 즉 값을 담고 있는 코드(문)는 표현식이다.**
- 표현식은 평가되어 값을 생성한다.
- 값을 가지면 모두 표현식이다!
    
    

### 리터럴 === 표현식

```jsx
var score = 100; 

// 코드 실행 시 score변수에 100을 할당하기 직전에 자바스크립트 엔진이 정수 리터럴 100을 값으로 평가함. 따라서 100 단독으로 정수 리터럴이기 때문에 값을 생성하므로 리터럴은 표현식이다.
```

### 다양한 표현식의 종류

유의사항

- 연산자 단독으로는 피연산자가 없으므로 표현식이 될 수 없다. 단항 또는 좌항과 우항에 숫자 값이 위치해야 값으로 평가되어 표현식이 된다.
- 함수를 호출하면 반환값을 가지므로 표현식이다.
- 할당문도 표현식이다.

```jsx
// 표현식은 리터럴, 식별자, 연산자, 함수 호출 등 다양한 조합으로도 이루어질 수 있다.

// 리터럴과 연산자로 이루어진 표현식
var score = 50 + 50; // 50 + 50을 평가하여 숫자 값 100을 생성

// 식별자를 표현식으로 볼 수 있는 경우 - 식별자를 참조 시 값을 담고 있는 경우
score; // --> 100
// score 변수에 100이란 숫자 값이 할당된 상태이므로 값으로 평가될 수 있기 때문에 표현식이다.

// 식별자 표현식(기존에 선언되었음을 전제함)
sum; // sum 변수에 값이 담겨있으므로 표현식

user.age; // user객체의 age프로퍼티의 값을 참조하므로 표현식

arr[1]; // arr배열의 [1]번 인덱스 요소의 값을 참조하므로 표현식

// 연산자 표현식
10 + 20; // 30으로 평가.

sum = 10; // 할당문도 표현식이다. 할당문에서 값으로 평가되는 부분은 할당하는 값 부분인 10.

sum !== 10; // true 또는 false의 불린값을 가지므로 표현식이다.

// 함수, 메서드 호출 표현식 (기존에 선언되었음을 전제함.)
myPart(); // 함수 호출시 반환값을 가지므로 표현식.
user.getName(); // user객체의 getName메서드를 함수 호출하고 있으므로 반환값을 가지므로 표현식.
```

### 표현식을 값처럼 사용하기

- 표현식과 표현식이 생성한 값은 서로 같다.(동치 관계)
    - 1 + 2 = 3 이므로 숫자값 ‘3’과 표현식 ‘1 + 2’는 같다.
- 따라서 문법적으로 값이 위치할 수 있는 자리에는 표현식도 위치할 수 있다.

```jsx
// 산술 연산자의 좌항과 우항에는 숫자 값이 위치해야 한다.
// 이 때, 숫자 값이 위치해야 할 자리에 숫자 값으로 평가되는 표현식(변수)을 값 대신 사용
let sum = 10;
5 + sum; // --> 15

//  값이 올 수 있는 위치인 우항에 표현식이 위치한 경우
let sum = 5 + 5;
```

## 5.4 문

---

### 문: 수행할 동작의 구문 단위.(최소 실행 단위)

- 정의: 컴퓨터에 내리는 명령(문).
- 문은 여러 토큰들로 구성된다.
    - 토큰: 문법적으로 더 이상 나눌 수 없는 코드의 기본 요소.(키워드, 식별자, 연산자, 리터럴, 세미콜론, 마침표 등)

```jsx
1 + 1; // --> 2
const a = 1; // --> undefined 반환.(사이드이펙트)

```

- '식'이 평가를 통해 새로운 값을 낼 뿐 사이드이펙트를 발생시키지 않았던 것과 달리, '문'은 실행 시 사이드이펙트를 발생시킨다.

### 문의 종류: 선언문, 할당문, 조건문, 반복문 등

```jsx
// 변수 선언문
let num; // 변수 선언문: 표현식x

// 할당문
num = 5;

// 함수 선언문
function myPart () {}

// 조건문
if (num > 19) { console.log('성인입니다'); }

// 반복문
for (let i = 0; i < str.length; i++) { console.log(i); }
```

- 문은 세미콜론으로 끝나야 한다. 그러나 여러 문들을 하나의 실행단위로 묶은 코드블럭 뒤에는 세미콜론을 생략한다.

## 5.5 세미콜론과 세미콜론 자동 삽입 기능

---

- 세미콜론은 문의 종료를 나타낸다.

세미콜론을 생략하여도, 자바스크립트 엔진이 소스코드를 해석할 때 문의 끝이라고 예측되는 지점에 세미콜론을 자동으로 삽입(ASI)하므로, 세미콜론을 생략 가능하다.

하지만 아래와 같이 ASI와 개발자의 예측이 일치하지 않는 경우가 있으므로 일반적으로 세미콜론 사용이 더 권장된다.

```jsx
function foo () {
	return
	{}
}

// ASI 동작 결과: return; {};
// 개발자의 예측: return {};

console.log(foo()); // return; 이므로 undefined 반환
```

## 5.6 표현식과 표현식이 아닌 문(식 vs 문)

---

- 변수 선언문과 조건문은 값으로 평가될 수 없으므로 표현식이 아니다.
- 변수 할당문은 표현식이다.

```jsx
// 변수 선언문: 표현식이 아님.
let num;
// 변수 할당문: 표현식
	num = 2 + 4; // num = 2 + 4; 는 표현식이면서 동시에 완전한 문이다.(할당문)
// 숫자 리터럴 2
// 숫자 리터럴 4
// 산술 연산자 2 + 4
// num = 2 + 4; 이 네가지가 모두 각각 표현식이다.
```

### 표현식인지 아닌지 판별하기: 변수에 할당시 문법 에러 여부

```jsx
var x;
x = 100; 

// 변수 선언문 할당시 에러 발생. 따라서 표현식이 아님.
var foo = var x; // Uncaught SyntaxError: Unexpected token 'var'

// 변수 할당문 할당시 값을 가지므로 표현식이다.
var foo = x = 100;
foo; // 100
x; // 100
```

### 완료 값(completion value)

- 완료 값 ≠ 평가된 값

```jsx
// 표현식이 아닌 문은 실행 시 완료 값 undefined를 출력한다.
// 변수 선언문
var foo = 10; // undefined (완료 값)

// 조건문
if (true) {} // undefined (완료 값)

// 표현식은 평가된 값을 반환한다.
var num = 10; // undefined (완료 값) --> 변수 선언문이므로 표현식 x
// 표현식 문
100 + num; // 110 (평가된 값) --> 평가된 값을 반환하므로 표현식이다.
// 할당문
num = 100; // 100 (평가된 값) --> 평가된 값을 반환하므로 표현식이다.
```

### 플래시카드

- 변수의 의미 2가지는?
- 값이란?
- 리터럴이란?
- 식과 표현식의 차이는?
- 변수 선언문은 표현식인가?
- 변수 할당문은 표현식인가?