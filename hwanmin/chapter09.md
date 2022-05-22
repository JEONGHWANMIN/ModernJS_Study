# 09장 타입 변환과 단축 평가

> 9.1 타입변환이란 ?

자바스크립트 모든 값은 타입이 있다.

그 값들은 개발자 의도에 따라서 다른 타입으로 바꿀 수 있다.

이를 <strong>명시적 타입 변환 , 타입 캐스팅</strong> 이라고 한다.

```javascript
let x = 10;

let str = x.toString();
console.log(typeof str, str);
// string 10
console.log(typeof x, x);
// number 10
```

개발자 의도와는 상관없이 자바스크립트 엔진에 의해서 암묵적으로 값이 바뀌는 것을 <strong>암묵적 타입 변환 , 타입 강제 변환</strong> 이라고 한다.

```javascript
let x = 10;

let str = x + '';
console.log(typeof str, str);
// string 10
console.log(typeof x, x);
// number 10
```

> 9.2 암묵적 타입 변환

```javascript
'10' + 2;
// 102
5 * '10';
// 50
!0;
// true
```

문자열 + 숫자인 경우 문자열로 결괏값을 반환한다.

```javascript
// 숫자 타입
0 + ''         // -> "0"
-0 + ''        // -> "0"
1 + ''         // -> "1"
-1 + ''        // -> "-1"
NaN + ''       // -> "NaN"
Infinity + ''  // -> "Infinity"
-Infinity + '' // -> "-Infinity"

// 불리언 타입
true + ''  // -> "true"
false + '' // -> "false"

// null 타입
null + '' // -> "null"

// undefined 타입
undefined + '' // -> "undefined"

// 심벌 타입
(Symbol()) + '' // -> TypeError: Cannot convert a Symbol value to a string

// 객체 타입
({}) + ''           // -> "[object Object]"
Math + ''           // -> "[object Math]"
[] + ''             // -> ""
[10, 20] + ''       // -> "10,20"
(function(){}) + '' // -> "function(){}"
Array + ''          // -> "function Array() { [native code] }"
```

위 결과는 모두 숫자로 타입변환이 되어서 연산이 된다.

하지만 숫자타입으로 변환이 안되는 경우 NaN을 나타낸다.

```javascript
// 문자열 타입
+''; // -> 0
+'0'; // -> 0
+'1'; // -> 1
+'string'; // -> NaN

// 불리언 타입
+true; // -> 1
+false; // -> 0

// null 타입
+null; // -> 0

// undefined 타입
+undefined; // -> NaN

// 심벌 타입
+Symbol(); // -> ypeError: Cannot convert a Symbol value to a number

// 객체 타입
+{}; // -> NaN
+[]; // -> 0
+[10, 20]; // -> NaN
+function () {}; // -> NaN
```

위와같이 암묵적 타입변환이 될 수도있다.

불리언 암묵적 타입 변환인 경우 보기에 좋지 않으므로 안쓰는게 좋을 것 같다.

불리언 타입 변환

```javascript
if ('') console.log('1');
if (true) console.log('2');
if (0) console.log('3');
if ('str') console.log('4');
if (null) console.log('5');

// 2 4
```

-> 빈 문자열 , 0 , null false로 판단.

> 명시적 타입 변환

```javascript
// 1. String 생성자 함수를 new 연산자 없이 호출하는 방법
// 숫자 타입 => 문자열 타입
String(1); // -> "1"
String(NaN); // -> "NaN"
String(Infinity); // -> "Infinity"
// 불리언 타입 => 문자열 타입
String(true); // -> "true"
String(false); // -> "false"

// 2. Object.prototype.toString 메서드를 사용하는 방법
// 숫자 타입 => 문자열 타입
(1).toString(); // -> "1"
NaN.toString(); // -> "NaN"
Infinity.toString(); // -> "Infinity"
// 불리언 타입 => 문자열 타입
true.toString(); // -> "true"
false.toString(); // -> "false"

// 3. 문자열 연결 연산자를 이용하는 방법
// 숫자 타입 => 문자열 타입
1 + ''; // -> "1"
NaN + ''; // -> "NaN"
Infinity + ''; // -> "Infinity"
// 불리언 타입 => 문자열 타입
true + ''; // -> "true"
false + ''; // -> "false"
```

1. String 생성자 함수를 new 연산자 없이 호출
2. Object.prototype.toString()
3. 문자열 연결 연산자 (암묵적 타입 변환)

```javascript
// 1. Number 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 숫자 타입
Number('0'); // -> 0
Number('-1'); // -> -1
Number('10.53'); // -> 10.53
// 불리언 타입 => 숫자 타입
Number(true); // -> 1
Number(false); // -> 0

// 2. parseInt, parseFloat 함수를 사용하는 방법(문자열만 변환 가능)
// 문자열 타입 => 숫자 타입
parseInt('0'); // -> 0
parseInt('-1'); // -> -1
parseFloat('10.53'); // -> 10.53

// 3. + 단항 산술 연산자를 이용하는 방법
// 문자열 타입 => 숫자 타입
+'0'; // -> 0
+'-1'; // -> -1
+'10.53'; // -> 10.53
// 불리언 타입 => 숫자 타입
+true; // -> 1
+false; // -> 0

// 4. * 산술 연산자를 이용하는 방법
// 문자열 타입 => 숫자 타입
'0' * 1; // -> 0
'-1' * 1; // -> -1
'10.53' * 1; // -> 10.53
// 불리언 타입 => 숫자 타입
true * 1; // -> 1
false * 1; // -> 0
```

1. Number() 함수 사용
2. ParseInt() , parseFloat() 사용
3. +단항 연산자 사용 (암묵적 타입 변환 )
4. \*산술 연산자 사용 (암묵적 타입 변환)

> 9.4 단축 평가

논리곱 : 둘다 참이여야 하기 때문에 Dog
논리합 : 하나만 참이여도 참이기 때문에

```javascript
'Cat' && 'Dog';
// Dog

'Cat' || 'Dog';
// Cat
```

```javascript
var done = true;
var message = '';

// if...else 문
if (done) message = '완료';
else message = '미완료';
console.log(message); // 완료

// if...else 문은 삼항 조건 연산자로 대체 가능하다.
message = done ? '완료' : '미완료';
console.log(message); // 완료
```

앞에 null인 요소에 바로 프로퍼티 값에 접근하게 되면 참조 에러를 발생 시킨다.

```javascript
var elem = null;
var value = elem.value; // TypeError: Cannot read property 'value' of null
```

단축 평가를 사용하면 에러를 발생시키지 않는다.

```javascript
var elem = null;
// elem이 null이나 undefined와 같은 Falsy 값이면 elem으로 평가되고
// elem이 Truthy 값이면 elem.value로 평가된다.
var value = elem && elem.value; // -> null
```

위 같은 경우는 elem이 null값 이기 때문에 바로 평가가 종료되고 value 값에 null이 할당

### 함수 매개변수 값 나타내기

```javascript
// 단축 평가를 사용한 매개변수의 기본값 설정
function getStringLength(str) {
  str = str || '';
  return str.length;
}

getStringLength(); // -> 0
getStringLength('hi'); // -> 2

// ES6의 매개변수의 기본값 설정
function getStringLength(str = '') {
  return str.length;
}

getStringLength(); // -> 0
getStringLength('hi'); // -> 2
```

위에꺼는 매개변수값이 들어오면 그 매개변수 값을 받고 , 아니면 빈 문자열을 할당한다.

빈 문자열이 할당되었으므로 리턴값은 0

### 옵셔널 체이닝 ?.

```javascript
var elem = null;

// elem이 null 또는 undefined이면 undefined를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.
var value = elem?.value;
console.log(value); // undefined
// ==**==
var elem = null;

// elem이 Falsy 값이면 elem으로 평가되고 elem이 Truthy 값이면 elem.value로 평가된다.
var value = elem && elem.value;
console.log(value); // null
```

좌항이 언디파인이나 , 널값이면 undefined를 반환하고 , 아니면 오른쪽 프로퍼티 값을 참조한다.
(결국 참조에러가 발생하지 않음)

### 널 병합 연산자 ??

```javascript
// 좌항의 피연산자가 null 또는 undefined이면 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.
var foo = null ?? 'default string';
console.log(foo); // "default string"

// Falsy 값인 0이나 ''도 기본값으로서 유효하다면 예기치 않은 동작이 발생할 수 있다.
var foo = '' || 'default string';
console.log(foo); // "default string"

// 좌항의 피연산자가 Falsy 값이라도 null 또는 undefined이 아니면 좌항의 피연산자를 반환한다.
var foo = '' ?? 'default string';
console.log(foo); // ""
```

위 결괏값을 보면 논리합 연산일 경우에는 0 , 빈문자열을 false값으로 판단해서 오른쪽 값이 들어가게 되지만 ,
널 병합 연산자는 null 이나 undefined가 아니면 좌항을 반환한다.
