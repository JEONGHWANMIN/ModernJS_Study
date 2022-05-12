# 자바스크립트

> 자바스크립트 타입
> 

자바스크립트는 7개의 원시타입과 객체타입으로 나누어진다.

| 구분 | 데이터 타입 | 설명  |
| --- | --- | --- |
| 원시 타입 | number | 숫자 , 정수와 실수 구분 없이 무조건 숫자 타입 |
|  | string | 문자열 |
|  | boolean | true , false |
|  | undefined | undefined |
|  | null | 값이 없다고 의도적으로 개발자가 넣은 값 |
|  | symbol | ES6 나온 다른 값과 중복되지 않는 고유의 값  |
| 객체타입 | reference | 객체 , 함수 , 배열  |

### 숫자 타입 (number)

자바스크립트 숫자는 그냥 숫자 그 자체이다. 

```jsx
let numa = 1;
let numb = 1.2;
let numc = -20;
console.log(numa, numb, numc); // 1 1.2 -20
console.log(1 === 1.0) true
```

float , duoble 같은 소수점 나타내는 타입 없이 그냥 숫자타입으로 동일하다.

파이썬이랑 동일 하다. 

추가로 알아야할 숫자 타입 

Infinity , -Infinity , NaN 

```jsx
console.log(10 / 0); // Infinity
console.log(10 / -0); // -Infinity
```

다른 언어는 에러를 일으킨다 .

**java**

Exception in thread "main" java.lang.ArithmeticException: / by zero
at MyClass.main(MyClass.java:4)

**python3**

ZeroDivisionError: division by zero

### 문자열 타입(string)

문자열 타입은 “” , ‘’ , `` 를 사용해서 나타내 준다.

```jsx
let hwanmin = "HwanMin"
hwanmin = 'hwanMin'
hwanmin = `hwanMin`
hwanmin = "'hwanmin'"
hwanmin = '"hwanmin"'
```

템플릿 리터럴 

→ 템플릿 리터럴을 사용하면 문자열 안에 변수값 등을 나타낼 수 있다.

사용은  `` 백틱과 , ${} 안에 변수를 넣어준다.

```jsx
let hwanMin_age = 31
let hwanMin = `hwanMin age is ${hwanMin_age} `;
```

### 불리언 타입(boolean)

불리언 타입은 논리 값으로 true or false 를 취급한다. 

### 언디파인드 타입(undefined)

영어 그대로 정의가 되지 않았단 소리인데 , 말만 들어도 무시무시한 녀석이다.

이녀석은 그러면 언제 나오는가 ??

1. var 변수 초기화 될때 할당 
2. 함수에서 return 값 안주면 자동 undefined 할당 
3. 개발자가 직접 undefined 할당 

```jsx
var a;
console.log(a);

function b() {}
console.log(b());
```

### 널 타입(null)

개발자가 의도적으로 넣은 값 

```jsx
let hwanmin_age = 30
console.log(hwanmin_age) // 30

```

→ 예외 : Dom 조작 시 querySelector 메소드는 null을 반환한다고 한다.  

→ 다른것들은 null을 안 던지나 ?? 

### 심벌 타입(symbol)

ES6에 새로나온 아주 따끈따끈 한 녀석 

→ 다른 값과 중복되지 않는 유일한 녀석 

```jsx
let key1 = Symbol('hwan');
let key2 = Symbol('hwan');

console.log(key1 === key2); //false 
```

진짜 유일무이한 값 맞는듯 인정 .. 

### 객체 타입(symbol)

원시타입 6개를 제외한 모든것은 객체 타입이다 ... 

객체 타입은 힙메모리에 저장이 되고 , 콜 스택 메모리에서 힙 메모리 주소를 저장해서 가지고 있다.

호출을 하면 콜스택 메모리 → 힙 메모레 접근 해서 값을 꺼내 쓰는 구조 

> 데이터 타입의 필요성
> 

- 메모리 공간의 크기를 결정하기 위해
- 2진수를 어떻게 해석할지 결정하기 위해

자바스크립트는 메모리 공간에 값을 저장 할때 그 값에 맞는 타입에 맞게끔 메모리 공간을 사용한다.

즉 최대한 메모리를 낭비 없이 사용하려고 타입을 체크하고 그 타입에 맞게끔 메모리를 생성하고 저장한다.

변수를 참조할 때는 변수의 타입을 체크하고 그 타입에 맞게끔 바이트를 끊어 읽어서 데이터를 손실없이 읽어들인다.

> 동적 타이핑 언어
> 

동적 타이핑 언어란 변수에 값을 처음부터 정해 놓는게 아닌 값을 할당에 의해서 타입이 결정되느 것을 말한다.

장-단점 : 동적 타이핑언어는 타입을 넣지 않기 때문에 유연성은 떨어지지만 , 안전성은 떨어진다. 

이러한 이유를 극복하기 위해 나온게 타입스크립트 !