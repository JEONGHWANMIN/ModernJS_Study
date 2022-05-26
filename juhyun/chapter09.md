# 9장 타입 변환과 단축 평가

## 9.1 타입 변환이란?

자바스크립트의 모든 값은 타입이 있다.

개발자가 의도적으로 값의 타입을 변환하는 것을 명시적 타입 변환 또는 타입 캐스팅이라 한다.

개발자의 의도와는 상관없이 자바스크립트 엔진에 의해 타입이 변환되는 것을 암묵적 타입 변환 또는 타입 강제 변환이라 한다.

타입 변환이 기존 원시 값을 직접 변경하는 것은 아니다.

원시 값은 변경 불가능한 값이므로 타입 변환이란 기존 원시 값을 사용해 다른 타입의 새로운 원시 값을 생성하는 것이다.

개발자는 자신이 작성한 코드에서 암묵적 타입 변환이 발생하는지, 어떤 타입의 어떤 값으로 변환되는지 등을 예측 가능해야 한다.

## 9.2 암묵적 타입 변환

자바스크립트 엔진은 표현식을 평가할 때 코드의 문맥을 고려해 암묵적으로 데이터 타입을 강제 변환한다.

### 9.2.1 문자열 타입으로 변환

```javascript
"10" + 2; // '102'
```

연산자 표현식의 피연산자만이 암묵적 타입 변환의 대상이 되는 것은 아니다.

템플릿 리터럴의 표현식 삽입은 표현식의 평가 결과를 문자열 타입으로 암묵적 타입 변환한다.

```javascript
`1 + 1 = ${1 + 1}`; // '1 + 1 = 2'
```

### 9.2.2 숫자 타입으로 변환

```javascript
2 * "10"; // 20
```

피연산자를 숫자 타입으로 변환할 수 없는 경우 표현식의 평가 결과는 NaN이 된다.

```javascript
1 / "one"; // NaN
```

산술 연산자 뿐만 아니라 비교 연산자도 암묵적 타입 변환이 일어난다.

```javascript
"1" > 0; // true
```

### 9.2.3 불리언 타입으로 변환

if 문이나 for 문과 같은 제어문 또는 삼항 조건 연산자의 조건식은 불리언 값, 즉 논리적 참/거짓으로 평가되어야 하는 표현식이며 암묵적 타입 변환이 일어난다.

이때 자바스크립트 엔진은 불리언 타입이 아닌 값을 Truthy 값 또는 Falsy 값으로 구분한다.

false, undefined, null, 0, -0, NaN, ''

위의 값들은 false로 평가되는 Falsy 값이다. Falsy 값 외의 모든 값은 true로 평가되는 Truthy 값이다.

## 9.3 명시적 타입 변환

개발자가 의도적으로 타입을 변경하는 방법에는 표준 빌트인 생성자 함수(String, Number, Boolean)를 new 연산자 없이 호출하는 방법과 빌트인 메서드를 사용하는 방법, 그리고 암묵적 타입 변환을 이용하는 방법이 있다.

### 9.3.1 문자열 타입으로 변환

```javascript
// String 생성자 함수를 new 연산자 없이 호출하는 방법
String(1); // '1'
String(NaN)(
  // 'NaN'

  // Object.prototype.toString 메서드를 사용하는 방법
  NaN
).toString(); // 'NaN'
true.toString(); // 'true'

// 문자열 연결 연산자를 이용하는 방법
Infinity + ""; // 'Infinity'
false + ""; // 'false'
```

### 9.3.2 숫자 타입으로 변환

```javascript
// Number 생성자 함수를 new 연산자 없이 호출하는 방법
Number("-2"); // -2
Number(true); // 1

// parseInt, parseFloat 함수를 사용하는 방법(문자열만 변환 가능)
parseInt("10.23"); // 10.23
parseInt(true); // NaN

// +, * 산술 연산자를 이용하는 방법
+"-1"; // -1
true * 1; // 1
```

### 9.3.3 불리언 타입으로 변환

```javascript
// Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
Boolean("x"); // true
Boolean(0); // false

// ! 부정 논리 연산자를 두 번 사용하는 방법
!!Infinity; // true
!!undefined; // false
```

## 9.4 단축 평가

### 9.4.1 논리 연산자를 사용한 단축 평가

논리합(||) 또는 논리곱(&&) 연산자 표현식의 평가 결과는 불리언 값이 아닐 수도 있다. 이 두 표현식은 언제나 2개의 피연산자 중 어느 한쪽으로 평가된다.

```javascript
"Cat" && "Dog"; // 'Dog'
"Cat" || "Dog"; // 'Cat'
```

논리 연산의 결과를 결정하는 피연산자를 그대로 반환한다.

단축 평가는 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것을 말한다.

단축 평가를 사용하면 if 문을 대체할 수 있으며 다음과 같은 상황에서 유용하게 사용된다.

1. 객체를 가리키기를 기대하는 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할 때

```javascript
let elem = null;
let value = elem && elem.value; // null
```

2. 함수 매개변수에 기본값을 설정할 때

```javascript
function getStringLength(str) {
  str = str || "";
  return str.length;
}

// 위의 방법은 아래와 같이 사용해도 된다.
function getStringLength(str = "") {
  return str.length;
}
```

### 9.4.2 옵셔널 체이닝 연산자

옵셔널 체이닝 연산자 ?.는 좌항의 피연산자가 null 또는 undefined인 경우 undefined를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.

```javascript
let elem = null;
let value = elem?.value;
console.log(value); // undefined
```

옵셔널 체이닝 연산자는 객체를 가리키기를 기대하는 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할 때 유용하다.

하지만 옵셔널 체이닝 연산자는 좌항 피연산자가 Falsy 값이라도 null 또는 undefined가 아니면 우항의 프로퍼티 참조를 이어간다.

### 9.4.3 null 병합 연산자

null 병합 연산자 ??는 좌항의 피연산자가 null 또는 undefined인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.

null 병합 연산자는 변수에 기본값을 설정할 때 유용하다.

```javascript
let foo = null ?? "default string"; // 'default string'
```

하지만 null 병합 연산자는 좌항의 피연산자가 Falsy 값이라도 null 또는 undefined가 아니면 좌항의 피연산자를 그대로 반환한다.
