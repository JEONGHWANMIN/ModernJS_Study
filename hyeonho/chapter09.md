# 9장 - 타입 변환과 단축 평가

## 9.1 타입 변환이란?

- 타입 변환: 기존 **원시 값**을 사용해 다른 타입의 새로운 **원시 값**을 생성하는 것.
- 명시적 타입 변환: 개발자가 의도적으로 메소드 또는 표현식을 사용하여 형변환 한 경우
- 암시적 타입 변환: 자바스크립트 엔진이 표현식을 평가하며 자동으로 타입이 변환되는 경우
- 명시적이든, 암시적이든 형변환이 변수의 값을 직접 변경하는 것은 아니다. 형변환된 값은 기존 값과 별개로 새로 생성된다. 따라서 직접적으로 재할당하며 형변환시키지 않는 한 기존 값의 타입은 그대로 유지된다.
(원시 값: 변경 불가능한 값)

```jsx
// 형변환은 값 자체를 변경시키지 못한다.
// 형변환: 원시 값을 사용하여 다른 타입의 새로운 원시값을 생성.
let x = 5;
typeof x.toString(); // 'string'
x; // 5 

// 명시적 타입 변환
let x = 10;
let str = x.toString();
str; // '10'
typeof str; // 'string'
x; // 10
typeof x; // 'number'

// 암시적 타입 변환
// +, - 연산자: 피연산자를 숫자타입으로 변환하여 반환.(p 77)
let x = '10';
let toNum = +x;
toNum; // 10
typeof toNum; // 'number'
x; // '10'
```

## 9.2 암묵적 타입 변환

- 자바스크립트 엔진이 **코드의 문맥**을 고려해 표현식을 평가하면서 강제로 타입을 변환하는 경우.
- 코드의 문맥: 
문자열 연결 연산자의 피연산자는 문맥상 모두 문자 타입이어야 하므로 문자 타입으로 암묵적 타입 변환이 된다.
산술 연산자의 모든 피연산자는 문맥상 모두 숫자 타입이어야 하므로 숫자 타입으로 암묵적 타입 변환이 된다.
또한, 제어문의 조건식과 같은 위치에서는 문맥상 값이 불리언 값으로 평가되어야 하므로 Truthy 값은 true, Falsy 값은 false로 암묵적 타입 변환이 된다.
비교 연산자는 피연산자의 크기를 비교하여 불리언 값을 만들어야 하므로 숫자 타입이 아닌 피연산자는 숫자 타입으로 암묵적 타입 변환이 된다. 
- 암묵적 타입 변환은 **원시 값 에서 다른 원시 값** 으로만 형변환 된다.

```jsx
// 피연산자가 모두 문자열 타입이어야 하는 문맥
'11' + 2; // '112'

// 피연산자가 모두 숫자 타입이어야 하는 문맥
5 * '10'; // 50

// 피연산자 또는 표현식이 불리언 타입이어야 하는 문맥
!0; // true
```

- `+` 연산자를 제외한 나머지 단항 연산자들(사칙연산, 나머지)은 '문자'를 '숫자'로 형변환시킨다.

### 9.2.1 문자열 타입으로 변환

```jsx
1 + '2'; '12'

// 템플릿 리터럴의 표현식 삽입
`3 * 4 = ${3 * 4}`; // '3 * 4 = 12'
```

- `+`연산자는 피연산자 중에 문자열이 있는 경우 **문자열 연결 연산자**로 동작하며, 문자열 연결 연산자의 역할은 **문자열 값**을 만드는 것이다.
- 템플릿 리터럴 내에서의 표현식 삽입의 경우, 표현식의 평가 결과를 문자열 타입으로 암묵적 타입 변환됨.

### 문자열 타입으로 암묵적 형변환 되는 예시

```jsx
// 숫자 -> 문자
0 + ''         // '0'
-0 + ''        // '0'
1 + ''         // '1'
-1 + ''        // '-1'
NaN + ''       // 'NaN'
Infinity + ''  // 'Infinity'
-Infinity + '' // '-Infinity'

// 불리언 -> 문자
true + ''  // 'true'
false + '' // 'false'

// null -> 문자
null + '' // 'null'

// undefined
undefined + '' // 'undefined'

// 심벌 -> 문자
(Symbol()) + '' // TypeError: Cannot convert a Symbol value to a string

// 객체 -> 문자
({}) + ''           // '[object Object]'
Math + ''           // '[object Math]'
[] + ''             // ''
[10, 20] + ''       // '10, 20'
(function(){}) + '' // 'function(){}'
Array + ''          // 'function Array() { [native code] }'

// 객체 타입도 암묵적 형변환시 원본의 데이터타입은 변하지 않음.
let arr = [10, 20];
arr + ''; // '10, 20'
arr; // [10, 20]
```

### 특이 케이스

```jsx
// 심벌 -> 문자
(Symbol()) + '' // TypeError: Cannot convert a Symbol value to a string

// 빈 객체 -> 문자
{} + ''   // 0
typeof {} // 'object'
```

- 심벌 타입을 공백 문자를 더해 암묵적 형변환 시킬 경우 문법 오류가 발생한다.
- 빈 배열에 공백 문자를 더하면 문자 타입이 되는데, 빈 객체에 공백 문자를 더하면 숫자 타입 0이 반환된다.

### 9.2.2 숫자 타입으로 변환

```jsx
// 문자열 타입
+''       // 0
+'0'      // 0
+'1'      // 1
+'string' // NaN

// 불리언 타입
+true  // 1
+false // 0

// null 타입
+null // 0

// undefined 타입
+undefined // NaN

// 객체 타입
+{} // NaN
+[] // 0
+[1, 2] // NaN
+(function(){}) // NaN
```

- null 타입은 숫자 타입으로 변환 시 0이 된다.
- undefined 타입은 숫자 타입으로 변환 시 NaN이 된다.

### NaN, 또는 문법 오류의 특이 케이스

- NaN: 빈 객체, 함수, 요소가 2개 이상인 배열, undefined
- 문법 오류: 심벌 타입

```jsx
+Symbol() // TypeError: Cannot convert a Symbol value to a number
+{} // NaN
+[1, 2] // NaN - 배열의 요소가 2개 이상인 경우
+(function(){}) // NaN
```

### 9.2.3 불리언 타입으로 변환

- if문, for문, 삼항 조건 연산자의 조건식은 불리언 값으로 평가되어야 하는 표현식이므로, 불리언 값이 아닐 시 불리언 값으로 암묵적 타입 변환이 일어난다. 이 때, Truthy 값은 `true`로, Falsy 값은 `false`로 변환된다.
- Falsy: `NaN`, `null`, `undefined`, `''`, `+0` 또는 `-0`, `false`
- Truthy: Falsy 값을 제외한 나머지 모든 값. 빈 객체와`{}` 빈 배열도`[]` Truthy 값이다.

## 9.3 명시적 타입 변환

### 9.3.1 문자열 타입으로 변환

문자열 타입이 아닌 값을 문자열 타입으로 변환하는 방법
1. String 생성자 함수를 new 연산자 없이 호출
2. `Object.prototype.toString()` 메서드 사용
3. 문자열 연결 연산자를 이용한 암묵적 타입 변환
```jsx
// 1. String 생성자 함수를 new 연산자 없이 호출하는 방법
// 숫자 -> 문자
String(1); // '1'
String(NaN); // 'NaN'
String(Infinity); // 'Infinity'
// 불리언 -> 문자
String(true);  // 'true'
String(false); // 'false'

// 2. toString 메서드 사용하기
// 숫자 -> 문자
(1).toString(); // '1'
(NaN).toString(); // 'NaN
(Infinity).toString(); // 'Infinity'
// 불리언 -> 문자
(true).toString();  // 'true;
(false).toString(); // 'false'

// 3. 문자열 연결 연산자
// 숫자 -> 문자
1 + ''; // '1'
NaN + ''; // 'NaN'
Infinity  // 'Infinity'
// 불리언 -> 문자
true + '';  // 'true'
false + ''; // 'false'
```

### 9.3.2 숫자 타입으로 변환

숫자 타입이 아닌 값을 숫자 타입으로 변환하는 방법
1. `Number` 생성자 함수를 `new` 연산자 없이 호출하는 방법
2. `parseInt`, `parseFloat` 함수를 사용하는 방법(**문자열에만 적용 가능**)
3. `+` 단항 산술 연산자를 이용하는 방법
4. `*` 산술 연산자를 이용하는 방법

```jsx
// 1. Number 생성자 함수를 new 연산자 없이 호출
// 문자열 -> 숫자
Number('0'); // 0
Number('-1'); // -1
Number('10.53'); // 10.53
// 불리언 -> 숫자
Number(true);  // 1
Number(false); // 0

// 2. parseInt, parseFloat 함수 사용(문자열만 변환 가능)
parseInt('0'); // 0
parseInt('-1'); // -1
parseFloat('10.53'); // 10.53

// 3. 단항 산술 연산자 이용
// 문자열 -> 숫자
+'0';    // 0
+'-1';   // -1
+'10.53' // 10.53
// 불리언 -> 숫자
+true;  // 1
-true;  // -1
+false; // 0
-false; // -0 

// 4. * 산술 연산자 이용
// 문자열 -> 숫자
'0' * 1; // 0
'-1' * 1; // -1
'10.53' * 1; // 10.53
// 불리언 -> 숫자
true * 1;  // 1
false * 1; // 0
```

### 9.3.3 불리언 타입으로 변환

불리언 타입이 아닌 값을 불리언 타입으로 변환하는 방법
1. `Boolean` 생성자 함수를 `new` 연산자 없이 호출하는 방법
2. `!`부정 논리 연산자를 두번 사용하는 방법`!!`

```jsx
// 1. Boolean 생성자 함수 사용
Boolean('false');   // true
Boolean(Infinity);  // true
Boolean(NaN);       // false
Boolean(null);      // false
Boolean(undefined); // false
Boolean({});        // true
Boolean([]);        // true

// 2. 부정 논리 연산자 두번 사용
!!{};        // true
!![];        // true
!!NaN;       // false
!!null;      // false
!!undefined; // false
!!'';        // false
```

## 9.4 단축 평가(short-circuit evaluation)

- 단축 평가를 통해 if문의 분기를 줄일 수 있다.

### 9.4.1 논리 연산자를 사용한 단축 평가

```jsx
function fetchData () {
    if (state.data) {
        return state.data;
    } else {
        return 'Fetching...';
    }
}
// if...else문을 삼항 연산자로 바꾸면
function fetchData () {
    return state.data ? state.data : 'Fetching...';
}
// 상기 함수의 if문을 아래와 같이 단축 평가로 작성할 수 있다
function fetchData () {
    return state.data || 'Fetching...';
}
```
### 함수 매개변수에 기본값을 설정할 때

- 함수를 호출할 때 인수를 전달하지 않으면 매개변수에는 `undefined`가 할당된다. 이 때 false의 경우에 return값을 주어(기본값을 설정) `undefined`로 발생할 수 있는 에러를 방지할 수 있다.

### 단축평가로 코드 길이를 줄인 예시들

- Poco 님의 유데미 '클린코드 자바스크립트' 강의의 단축평가 파트 예제코드를 참조하였습니다.
[강의 링크](https://www.udemy.com/course/clean-code-js/)

```jsx
function favoriteDog (someDog) {
    let favoriteDog;
    if  (someDog) {
        favoriteDog = someDog;
    } else {
        favoriteDog = '냐옹';
    }
    return favoriteDog + ' 입니다';
}
favoriteDog(); // 냐옹 입니다
favoriteDog('진돗개'); // 진돗개 입니다

// 상기 함수를 아래와 같이 단축평가로 축약 가능
// favoriteDog란 임시변수를 쓰지 않아도 됨.
// if...else문을 한 줄로 축약함.
function favoriteDog (someDog) {
    return (someDog || '냐옹') + '입니다';
}
```

```jsx
const getActiveUserName = (user, isLogin) => {
    if (isLogin && user) {
        if (user.name) {
            return user.name;
        } else {
            return '이름없음';
        }
    }
};

// 상기 함수를 단축 평가로 아래와 같이 축약 가능.
const getActiveUserName = (user, isLogin) => {
   if (user && isLogin) {
       return user.name || '이름없음';
   }
};
```
