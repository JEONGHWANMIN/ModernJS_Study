# 6장 데이터 타입

## 타입

자바스크립트의 모든 값은 데이터 타입을 가진다.

    원시 타입(primitive) - 숫자, 문자열, 불리언, undefined, null, symbol, BigInt(ES11)

    객체 타입(object/reference) - 객체, 함수, 배열

각 타입의 값은 생성한 목적과 용도가 다르며, 확보해야 할 메모리 공간의 크기도 다르고 그것을 읽고 해석하는 방법도 다르다.

## 6.1 숫자 타입

자바스크립트는 다른 언어와 달리 모든 수를 실수로 처리하며 별도의 데이터 타입이 존재하지 않는다.

```javascript
let binary = 0b01000001; // 2진수
let octal = 0o101; // 8진수
let hex = 0x41; // 16진수

// 위 값들은 표기법만 다를 뿐 모두 같은 값이다.
console.log(binary); // 65
console.log(octal); // 65
console.log(hex); // 65
console.log(binary === octal); // true
console.log(octal === hex); // true

console.log(1 === 1.0); // 모든 수를 실수로 처리한다.
```

#### 숫자 타입의 특별한 값

    Infinity : 양의 무한대
    -Infinity : 음의 무한대
    NaN : 산술 연산 불가(not-a-number)

## 6.2 문자열 타입

문자열은 16비트 유니코드 문자(UTF-16)의 집합으로 전 세계 대부분의 문자를 표현할 수 있다.

문자열은 키워드나 식별자 등의 토큰과 구분하기 위해 작은따옴표(‘’), 큰따옴표(“”), 백틱(``)을 이용해서 감싼다.

자바스크립트의 문자열은 원시 타입이며 변경 불가능한 값(immutable value)이다.

## 6.3 템플릿 리터럴

ES6부터 백틱(``)을 이용해서 템플릿 리터럴을 사용할 수 있다.

템플릿 리터럴은 멀티라인 문자열, 표현식 삽입, 태그드 템플릿 등의 문자열 처리 기능을 제공한다.

```javascript
// 멀티라인 문자열
let template = `Hello
	World`;
```

```javascript
// 표현식 삽입 (표현식 삽입을 위해서는 ${ }으로 표현식을 감싸야한다.)
console.log(`1 + 2 = ${1 + 2}`);
```

```javascript
// 중첩(Nesting) 템플릿 - 특정 조건을 만족하는 경우마다 다른 문자열을 변수에 저장하고 싶을 때 템플릿을 중첩해서 작성하는 것이 가독성이 더 좋은 경우가 있다.
//ES5
var classes = "header";
classes += isLargeScreen()
  ? ""
  : item.isCollapsed
  ? " icon-expander"
  : " icon-collapser";
//ES6, 중첩 템플릿을 사용하지 않음
const classes = `header ${
  isLargeScreen() ? "" : item.isCollapesd ? "icon-expander" : "icon-collapser"
}`;
//ES6, 중첩 템플릿을 사용한 경우
const classes = `header ${
  isLargeScreen() ? "" : `icon-${item.isCollapsed ? "expander" : "collapser"}`
}`;
```

```javascript
// 태그드 템플릿 - 템플릿 리터럴을 이용하여 함수의 인자를 파싱하여 넘겨줄 수 있다.
const meal = "dinner";
const taste = "good";
function getSnackTaste(string, eat, flavor) {
  let snack = "cookie";
  let feel = "bad";

  if (eat === "breakfast") {
    snack = "milk";
  }
  if (flavor === "bad") {
    feel = "good";
  }
  return string[0] + snack + string[1] + feel + "~~";
}
getSnackTaste`Today, ${meal} is ${taste}`;
```

```javascript
// Raw String - 이스케이프 문자를 해석하지 않은 원시 문자열에 액세스할 수 있다.
function tag(strings) {
  console.log(strings.raw[0]);
}
tag`string text line 1 \n string text line 2`;
```

## 6.4 불리언 타입

논리적 참과 거짓을 나타내는 true와 false가 있으며 조건문에서 자주 사용된다.

## 6.5 undefined 타입

변수 선언에 의해 확보된 메모리 공간은 처음 할당이 이뤄질 때까지 쓰레기 값이 들어있는데 자바스크립트 엔진이 그것을 undefined로 초기화한다.

개발자가 의도적으로 변수에 undefined를 할당하는 것은 본래 취지와 어긋나며 혼란스러울 수 있기 때문에 변수에 값이 없다는 것을 명시하고 싶을 때는 null을 할당하는 것이 좋다.

## 6.6 null 타입

변수에 null을 할당하는 것은 변수가 이전에 참조하던 값을 더 이상 참조하지 않겠다는 의미이며 자바스크립트 엔진은 누구도 참조하지 않는 메모리 공간에 대해 가비지 콜렉션을 수행한다.

함수가 유효한 값을 반환할 수 없는 경우 명시적으로 null을 반환하기도 한다.

```javascript
// null은 수학적으로 0으로 취급된다.
null + 10; // 10
```

## 6.7 symbol 타입

심벌 값은 다른 값과 중복되지 않는 변경 불가능한 원시 타입의 값이다.

주로 이름이 충돌할 위험이 없는 객체의 유일한 프로퍼티 키를 만들기 위해 사용한다.

```javascript
let key = Symbol(‘key’);
console.log(typeof(key));	// key

Symbol(‘abc’) === Symbol(‘abc’)	// false
```

## 6.8 객체 타입

자바스크립트는 객체 기반의 언어이며, 자바스크립트를 이루고 있는 거의 모든 것이 객체이다.

## 6.9 데이터 타입의 중요성

메모리 공간의 낭비와 손실 없이 값을 저장하기 위해 값의 종류에 따라 메모리 공간의 크기가 지정된 데이터 타입이 필요하다.

또한 데이터 타입은 메모리에 있는 2진수 값을 어떻게 해석할지 결정해준다.

```javascript
let a = 100;
let b = 100;
// 이렇게 할당했을 때 변수 a와 b가 저장된 주소는 다르지만 할당된 값 100의 주소는 동일하다.
// 즉 다른 주소의 변수가 같은 주소의 값을 가리키고 있는 것이다.
```

## 6.10 동적 타이핑

정적 타입 언어는 변수의 타입을 변경할 수 없으며, 변수에 선언한 타입에 맞는 값만 할당할 수 있다.

자바스크립트는 동적 타입 언어이기 때문에 변수를 선언할 때 타입을 선언하지 않는다.

자바스크립트의 변수는 선언이 아닌 할당에 의해 타입이 결정(타입 추론(type inference))된다.
그리고 재할당에 의해 변수의 타입은 언제든지 동적으로 변할 수 있다.

동적 타입 언어에서 변수 값은 언제든지 변경될 수 있기 때문에 복잡한 프로그램에서는 변화하는 변수 값을 추적하기 어려울 수 있다.

##### 변수를 사용할 때 주의할 사항

    변수는 꼭 필요한 경우에 한해 제한적으로 사용하며 임시 변수를 줄인다.

    변수의 유효 범위(scope)는 최대한 좁게 만들어야 한다.

    전역 변수는 최대한 사용하지 않는다.

    var, let 을 이용한 변수보다는 const 키워드로 상수를 사용해 값의 변경을 억제한다.

    변수 이름은 목적이나 의미를 파악할 수 있도록 네이밍한다.

---

#### 임시 변수 줄이기

```javascript
// 임시 변수의 예
function getObject() {
  const obj = {};

  obj.name = "james";
  obj.age = 17;

  return obj;
}

// 불필요한 임시 변수를 제거한 예
function getObject() {
  return {
    name: "james",
    age: 17,
  };
}
```
