##### 현재 '모던 자바스크립트 Deep Dive'를 통해 자바스크립트를 학습하고 있습니다. 본 포스트는 해당 내용에 대한 정리를 목적으로 합니다.

연산자(operator)는 하나 이상의 표현식을 대상으로 산술, 할당, 비교, 논리, 타입, 지수 연산(operation)등을 수행해 하나의 값을 만든다.

이때 연산의 대상을 피연산자(operend)라 한다. 피연산자는 값으로 평가될 수 있는 표현식이어야 한다.

### 1. 산술 연산자
산술 연산자(arithmetic operator)는 피연산자를 대상으로 수학적 계산을 수행해 새로운 숫자 값을 만듭니다. 

1. 이항(binary) 산술 연산자
2개의 피연산자를 산술 연산하여 새로운 숫자 값을 만듭니다.

이항 산술 연산자 | 의미 | 부수 효과(피연산자의 값을 변경)
--|--|--
+ | 덧셈 | X
- | 뺄셈 | X
* | 곱셈 | X
/ | 나눗셈 | X
% | 나머지 | X

```javascript
4 + 2; // 6
4 - 2; // 2
4 * 2; // 8
4 / 2; // 2
4 % 2; // 0
```
2. 단항(unary) 산술 연산자
1개의 피연산자를 산술 연산하여 숫자 값을 만듭니다.

단항 산술 연산자 | 의미 | 부수효고(피연산자의 값을 변경)
--|--|--
++ | 증가 | O
-- | 감소 | O
+ | 어떠한 효과도 없다. 음수를 양수로 반전하지도 않는다. | X
- | 양수를 음수로, 음수를 양수로 반전한 값을 반환한다. | X

증가/감소(++/--)연산자(increment/decrement operator)는 위치에 의미가 있습니다.
> - 피연산자 앞에 위치한 전위(prefix) 증가/감소 연산자는 먼저 피연산자의 값을 증가/감소시킨 후, 다른 연산을 수행합니다.
- 피연산자 뒤에 위치한 후위(postfix) 증가/감소 연산자는 먼저 다른 연산을 수행한 후, 피연산자의 값을 증가/감소시킵니다.

```javascript
var x = 4, result;

// 선할당 후증가(postfix increment operator)
result = x++;
console.log(result, x); // 4, 5

// 선증가 후할당(prefix increment operator)
result = ++x;
console.log(result, x); // 6, 6

// 선할당 후감소(postfix decrement operator)
result = x--;
console.log(result, x) // 6, 5

// 선감소 후할당(prefix decrement operator)
result = --x;
console.log(result, x) // 4, 4
```

숫자 타입이 아닌 피연산자에 +/- 단항 연산자를 사용하면 숫자 타입으로 변환하여 반환한다. - 단항 연산자의 경우 피연산자의 부호를 반전한 값을 반환한다. 

```javascript
var x = '1';

// 문자열을 숫자로 타입 변환한다.
console.log(+x); // 1
console.log(-x); // -1
// 부수 효과는 없다.
console.log(x) // '1'

// 불리언 값을 숫자로 타입 변환한다.
x = true;
console.log(+x); // 1
console.log(-x); // -1
// 부수 효과는 없다.
console.log(x) // true

x = false;
console.log(+x); // 0
console.log(-x); // 0
// 부수 효과는 없다.
console.log(x) // false

x = 'hello';
console.log(+x); // NaN
console.log(-x); // -NaN
// 부수 효과는 없다.
console.log(x) // 'hello'
```
3. 문자열 연결 연산자
+ 연산자는 피연산자 중 하나 이상이 문자열인 경우 문자열 연결 연산자로 동작합니다.
```javascript
// 문자열 연결 연산자
'1' + 2; // '12'
2 + '1' // '21'

// 산술 연산자
1 + 2 // 3

// true는 1로 타입 변환된다
1 + true; // 2

// false는 0으로 타입 변환된다.
1 + false; // 1

// null은 0으로 타입 변환된다.
1 + null; // 1

// undefined는 숫자로 타입 변환되지 않는다.
+undefined; // NaN
a + undefined; // NaN
```
위 예제에서 1 + true의 연산시 자바스크립트 엔진이 암묵적으로 불리언 타입을 숫자 타입으로 변환하는데 이를 ** 암묵적 타입 변환(implicit coercion) ** 또는 ** 타입 강제 변환(type coercion) **이라고 합니다.

### 2. 할당 연산자(assignment operator)
할당 연산자(assignment operator)는 우항에 있는 피연산자의 평가 결과를 좌항에 있는 변수에 할당합니다.

할당 연산자 | 예 | 동일 표현 | 부수 효과(좌항의 변수 값이 변경)
--|--|--|--
= | x = 5 | x = 5 | O
+= | x += 5 | x = x + 5 | O
-= | x -= 5 | x = x - 5 | O
*= | x *= 5 | x = x * 5 | O
/= | x /= 5 | x = x / 5 | O
%= | x %= 5 | x = x % 5 | O

** 할당문은 값으로 평가되는 표현식인 문으로서 할당된 값으로 평가됩니다.**
```javascript
var x;
// 할당문은 표현식인 문이다.
console.log(x = 10); //10

// 이러한 특징을 황요해 여러 변수에 동일한 값을 연쇄 할당할 수 있습니다.
var a, b, c;
// 연쇄 할당. 오른쪽에서 왼쪽으로 진행
// c = 0 : 0으로 평가된다.
// b = 0 : 0으로 평가된다.
// a = 0 : 0으로 평가된다.
a = b = c = 0;

console.log(a, b, c); // 0 0 0
```
### 3. 비교 연산자
비교 연산자(comparison operator)는 좌항과 우항의 피연산자를 비교한 다음 그 결과를 불리언 값으로 반환합니다.

1. 동등/일치 비교 연산자
동등 비교 연산자(loose equality)와 일치 비교 연산자(strict equality)는 좌항과 우항의 피연산자가 같은 값으로 평가되는지 비교해 불리언 값을 반환합니다. 하지만 비교하는 엄격성의 정도가 다릅니다.

비교 연산자 | 의미 | 사례 | 설명 | 부수 효과
--|--|--|--|--
== | 동등 비교 | x == y | x와 y의 값이 같음 | X
=== | 일치 비교 | x === y | x와 y의 값과 타입이 같은 | X
!= | 부동등 비교 | x != y | x와 y의 값이 다름 | X
!== | 불일치 비교 | x !== y | x와 y의 값과 타입이 다름 | x

동등 비교(==) 연산자는 자바스크립트 엔진에 의해 피연산자들이 암묵적 타입 변환이 된 상태로 같은 값인지 비교되기 때문에 예측하기 어려운 결과를 만들어냅니다. 
따라서 일치 비교(===) 연산자를 사용합니다.
** 일치 비교(===) 연산자는 좌항과 우항의 피연산자가 타입도 같고 값도 같은 경우에 한하여 true를 반환합니다.**

이때, 주의할 것은 0과 NaN 입니다.
숫자가 NaN인지 조사하려면 빌트인 함수 Number.isNaN을 사용합니다.
양의 0과 음의 0의 값을 정확하게 비교하기 위해서 Object.is 메서드를 이용합니다.
```javascript
NaN === NaN; // false

Number.isNaN(NaN); // true
Number.isNaN(10); // false
NUmber.isNaN(1 + undefined); // true

0 === -0 // true
0 == -0  // true
-0 === +0 // true
Object.is(-0, +0) // false
Object.is(NaN, NaN) // true
```

2. 대소 관계 비교 연산자
대소 관계 비교 연산자는 피연산자의 크기를 비교하여 불리언 값을 반환합니다.

대소 관계 비교 연산자 | 예제 | 설명 | 부수 효과
--|--|--|--
> | x > y | x가 y보다 크다 | X
< | x < y | x가 y보다 작다 | X
>= | x >= y | x가 y보다 크거나 같다 | X
<= | x <= y | x가 y보다 작거나 같다 | X

### 4. 삼항 조건 연산자
삼항 조건 연산자(tenary operator)는 조건식의 평가 결과에 따라 반환할 값을 결정합니다.
`` 조건식 ? 조건식이 true일 때 반환할 값 : 조건식이 false일 때 반환할 값``
```javascript
var result = score >= 60 ? 'pass' : 'fail';
```
물음표(?) 앞의 첫 번째 피연산자는 불리언 타입의 값으로 평가될 표현식입니다. 만약 조건식의 평가 결과가 불리언 값이 아니면 불리언 값으로 암묵적 타입변환됩니다. 이때 조건식이 참이면 콜론(:) 앞의 두 번째 피연산자가 평가되어 반환되고, 거짓이면 콜론(:) 뒤의 세 번째 피연산자가 평가되어 반환됩니다.

삼항 조건 연산자 표현식이 ``if...else``문과 비슷하다고 생각할 수 있지만
``if...else``문은 표현식이 아닌 문입니다.. 
즉, 값으로 평가될 수 없기 때문에 아래와 같은 코드는 에러를 발생시킵니다.
```javascript
var x = 10;

var result = if(x % 2) { result = '홀수'; } else { result = '짝수'; };
// SyntaxError: Unexpected token if
```
따라서 조건에 따라 수행해야 할 문이 하나라면 삼항 조건 연산자 표현식을 사용하고 수행해야할 문이 여러 개라면 ``if...else``문의 가독성이 좋습니다.

### 5. 논리 연산자
논리 연산자(logical ooperator)는 우항과 좌항의 피연산자(부정 논리 연산자의 경우 우항의 피연산자)를 논리 연산합니다. 

```javascript
// 논리합(||) OR 연산자
true || true; // true
true || false; // true
false || true; // true
false || false; // false

// 논리곱(&&) AND 연산자
true && true; // true
true && false; // false
false && true; // false
false && false; // false

// 논리 부정(!) 연산자
!true; // false
!false; // true
```
논리 부정(!)연산자는 언제나 불리언 값을 반환합니다. 피연산자가 불리언 값이 아니어도 암묵적 타입 변환으로 불리언 값을 반환합니다.

논리합(||)과 논리곱(&&)연산자 표현식의 평가 결과는 불리언 값이 아닐 수도 있습니다. 언제나 2개의 피연산자 중 어느 한쪽으로 형가됩니다.
```단축 평가
'Cat' && 'Dog' // 'Dog'
```
<a href="https://ko.wikipedia.org/wiki/%EB%93%9C_%EB%AA%A8%EB%A5%B4%EA%B0%84%EC%9D%98_%EB%B2%95%EC%B9%99" target="_blank"> 드 모르간의 법칙</a>은 복잡한 표현식을 좀 더 가독성 좋은 표현식으로 변환시켜줄 수 있습니다.
> !(x || y) === (!x && !y)
!(x && y) === (!x || !y) 


### 6. 쉼표 연산자
쉼표(,) 연산자는 왼쪽 피연산자부터 차례대로 피연산자를 평가하고 마지막 피연산자의 평가가 끝나면 마지막 피연산자의 평가 결과를 반환합니다.
```javascript
var x, y, z;
x = 1, y = 2, z = 3; // 3
```

### 7. 그룹 연산자
소괄호('()')로 피연산자를 감싸는 그룹 연산자는 자신의 피연산자인 표현식을 가장 먼저 평가합니다. 그룹 연산자는 연산자 우선순위가 가장 높습니다.
```javascript
10 * 2 + 3 // 23

10 * (2 + 3) // 50
```

### 8. typeof 연산자
typeof 연선자는 피연산자의 데이터 타입을 문자열로 반환합니다.
`` 'string', 'number', 'boolean', 'undefined', 'symbol', 'object', 'function' `` 이렇게 7가지 문자열을 반환하며, 'null'은 반환하는 경우는 없습니다.

```javascript
typeof '' // 'string'
typeof 1  // 'number'
typeof NaN // 'number'
typeof true // 'boolean'
typeof undefined // 'undefined'
typeof Symbol() // 'symbol'
typeof null // 'object'
typeof [] // 'object'
typeof {} //'object'
typeof new Date() //'object'
typeof /test/gi // 'object'
typeof function () {} // 'function'
```
먼저, typeof 연산자의 NaN(Not a Number)의 값이 number인 이유는 NaN이 ECMAScript 표준에 따르면 Number는 배정밀도 64비트 부동 소수점 데이터여야 하는데 여기에는 Infinity , -Infinity 및 NaN 이 포함되기 때문입니다.

typeof 연산자의 null의 값이 'object'로 반환되는 건 자바스크립트의 버스입니다. 
따라서 값이 null인지 확인할 때는 일치 연산자(===)를 사용해야합니다.
또한 선언하지 않은 식별자를 typeof연산자로 연산할 시 ReferenceError가 아니라 undefined를 반환합니다.
```javascript
// undeclared 식별자를 선언한 적이 없다.
typeof undeclared; // undefined
```

### 9. 지수 연산자
지수 연산자는 좌항의 피연산자를 밑(base)으로, 우항의 피연산자를 지수(exponent)로 거듭 제곱하여 숫자 값을 반환힙니다.

```javascript
2 ** 2; // 4
2 ** 2.5; // 5.65685424949238
2 ** 0; // 1
2 ** -2; // 0.25
```
지수 연산자가 도입되기 전까지는 Math.pow 메서드를 사용했습니다.
``` javascript
Math.pow(2, 2); // 4
Math.pow(2, 2.5); // 5.65685424949238
Math.pow(2, 0); // 1
Math.pow(2, -2); // 0.25
```
지수 연산자의 결합 순서는 우항에서 좌항입니다. 즉, 우결합성을 갖습니다.
```javascript
2 ** (3 ** 2); // 512
Math.pow(2, Math.pow(3, 2)) // 512
```
음수를 거듭제곱의 밑으로 사용해 계산하려면 다음과 같이 괄호로 묶어야 합니다.
```javascript
-5 ** 2;
// SyntaxError: Unary operator used immediately before exponentiation expression.
(-5) ** 2;
```
지수 연산자는 다른 산술 연산자와 마찬가지로 할당 연산자와 함께 사용할 수 있으며, 이항 연산자 중에서 우선순위가 가장 높습니다.
```javascript
var num = 5;
num **= 2; // 25

2 * 5 ** 2; // 50
```

### 10. 연산자의 부수 효과
부수 효과가 있는 
** 연산자 할당 연산자(=), 증가/감소 연산자(++/--), delete 연산자 ** 입니다. 
```javascript
var x;

// 할당 연산자는 변수 값이 변하는 부수 효과가 있습니다. 이는 x 변수를 사용하는 다른 코드에 영향을 줍니다.
x = 1;
console.log(x); // 1

// 증가/감소 연산자(++/--)는 피연산자의 값을 변경하는 부수 효과가 있다.
// 피연산자 x의 값이 재할당되어 변경된다. 이는 x 변수를 사용하는 다른 코드에 영향을 준다.
x++;
console.log(x);

var o = { a: 1};

// delete 연산자는 객체의 프로퍼티를 삭제하는 부수 효과가 있다. 이는 o 객체를 사용하는 다른 코드에 영향을 준다.
delete o.a;
console.log(o); // {}
```


