# 07장 연산자

```javascript
// 산술 연산자
5 * 4;

// 문자열 연결 연산자
'hwanMin age is' + '31';

// 할당 연산자
age = 31;

// 비교 연산자
3 > 5;

// 논리 연산자
true && false;

// 타입 연산자
typeof 'Hi';
```

위 연산자 중 신기한건 타입연산자 , 보통 다른 연산자들은 많이 봐왔지만 typeof 는 자주 쓰긴 했지만 , 연산자 인줄은 처음 알았다.

연산자는 연산자와 , 피연산자 두개로 나누어 진다.

ex 5 \*4 , 연산자 \* , 피연산자 5 , 4

> 7.1 산술 연산자

##### 이항 산술 연산자

\+ , \- , \* , / , % 흔이 우리가 자주 쓰는 일반 연산자를 이항 산술 연산자 라고 한다.

##### 단항 산술 연산자

++ , -- , + , -

```javascript
for (let i = 0; i < 3; i++) {
  console.log(i);
}
```

흔히 쓰는 for문에서 마지막 i++ 이 부분이 단항 산술 연산자 부분이다.
++ , -- 는 숫자 자체를 더해주고나 빼주는 부수 효과가 있다.
쓰이는 위치에 따라서 전위증가 , 후위 증가로 효과가 달라진다.
전위증가 : 선 증가 후 할당
후위증가 : 선 할당 후 증가

```javascript
let a = '1';
console.log(+a);
```

문자열에 +를 붙이면 숫자로 바뀐다.
근데 가독성이 좋은지는 모르겠다. 남들과 협업할때는 직관적으로 Number로 감싸는게 좋은거 같다. (개인생각)

##### 문자열 연결 연산자

```javascript
let a = 1 + '1';
console.log(+a);
```

위 결과는 11이 나온다. 숫자에 문자열이 더해지면 문자열이 된다.
보통 숫자를 문자열로 바꿀때 String()으로 감싸는 방법도 있찌만 , + '' 처럼 빈 문자열을 더해줘서 나타내는 경우도 있다.

> 7.2 할당 연산자

##### 할당 연산자 : = , += , -= , \*= , /= , %=

```javascript
// 아래 코드는 같다.
sum += 1;
sum = sum + 1;
```

```javascript
var x;
console.log((x = 10));
// 10
```

위 코는 할당문 이만 10 이 찍히므로 표현식 입니다.

> 비교 연산자

비교연산자는 좌항과 우항을 비교해서 불리언값으로 리턴해준다.
== (동등비교연산자)
=== (일치비교연산자)

```javascript
console.log(1 == '1');
console.log(1 === '1');
```

위 두 개의 코드는 엄연히 다른 결과를 가져옵니다.

== 처럼 2개만 쓰이면 값이 같냐고만 묻지만 ,
=== 처럼 3개를 쓰면 값과 타입까지 일치하는지 확인하기때문에 ===가 용이하게 사용됩니다.

NaN (Not a Number)는 일치비교연산자 사용해도 자신과 일치하지 않기 때문에 , isNaN() 이라는 함수를 사용해야 한다.

더 정교하게 일치비교를 할때는 Object.is() 메서드를 사용한다.

```javascript
Object.is(-0, +0) +
  // false
  0 ===
  -0;
// true
```

##### 대소 관계 비교연산자

> , < , >= , <=

##### 삼항 조건 연산자

-> 조건 ? 참 : 거짓
이런식으로 이루어진다.

if 문과 다른점은 값처럼 사용이 가능하다.

```javascript
function findShortestOfThreeWords(word1, word2, word3) {
  // TODO: 여기에 코드를 작성합니다.
  let min = Math.min(word1.length, word2.length, word3.length);
  if (word1.length === min) {
    return word1;
  } else if (word2.length === min) {
    return word2;
  } else if (word3.length === min) {
    return word3;
  }
  return word1.length === min ? word1 : word2.length === min ? word2 : word3;
}
```

##### 논리 연산자

|| , && , !

```javascript
!true -> false
true || false -> true 가 하나라도 있으면 true
true && true -> 둘다 트루여야지 트루
```

나중에 조건을 많이 걸때 논리합 , 논리곱 연산은 많이 사용된다.

##### 쉼표 연산자

쉼표로 연달아서 변수 선언이 가능하다.

```javascript
let x , y , z = 1 , 2 , 3
// Uncaught SyntaxError: Unexpected number
let x , y , z ;
x = 1  , y = 2 , z = 3
// Not Error
```

##### 그룹 연산자

수학에서 배웠던 우선순위랑 똑같다.

```javascript
10 * 2 + 3 -> 23
10 * (2 + 3) -> 5
```

##### typeof 연산자

typeof 는 자주 쓰던 연산자이지만 , 평소에는 연산자라고는 생각지도 못했다.
typeof로 타입을 찍으면 타입을 문자열로 반환해준다.

주의할점

- 함수는 객체이지만 , function으로 반환해준다. (배열이랑 , 객체는 Object로 반환)
- null 타입은 null 타입이지만 Object로 반환 (버그라고 한다... )

```javascript
function a() {
}
typeof a -> 'function'

typeof null -> 'Object
```

##### 지수 연산자

```javascript
2 ** 2 -> 4
4 ** 4 -> 256

Math.pow(2,2)
Math.pow(4,4)

```

깔끔한 느낌이라서 나는 위에 지수 연산자를 더 선호한다..

이건 새롭게 알게 된 내용인데 음수를 제곱할대는 ()로 감싸줘야 작동한다.
안그러면 에러발생..

```javascript
(-5) ** 2
-5 ** 2
Uncaught SyntaxError: Unary operator used immediately before exponentiation expression. Parenthesis must be used to disambiguate operator precedence
```

##### 그 외의 연산자

?. , ?? , delete , new instanceof , in

###### ?. 옵셔널 체이닝

앞 평가 대상이 undefined , null 이면 평가를 멈추고 undefined를 반환하고 오류를 던지지 않는다.
-> 즉 페이지에서 데이터를 받아오기전에 옵셔널 체이닝을 사용하면 페이지 로드전에 오류 뜰 일이 없는 것이다.

###### ?? 널 병합 연산자

같은 코드

```javascript
x = a ?? b;
x = a !== null && a !== undefined ? a : b;
```

참조 : https://ko.javascript.info/nullish-coalescing-operator
-> 삼항 연산자 !

위 예시는 a 가 null , undefined가 아니면 a 아니면 b 를 x 할당 .

OR , ?? 차이점 !

```javascript
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

-> true 1
-> false 0

그렇기 때문에 위와같은 결과가 나온다.

###### delete

코플릿 풀 때 많이 썻던 연산자로 , 객체 프로퍼티 값을 삭제시켜준다.

###### new

새로운 객체 , 인스턴스 를 생성 할때

```javascript
class HelloName {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  print() {
    return `Hello ${this.name} \nyou age is ${this.age}`;
  }
}

let HwanMin = new HelloName('HwanMin', 31);
console.log(HwanMin.print());
// Hello HwanMin
// you age is 31

let arr = new Array(1);
console.log(arr);

let obj = new Object();
console.log(obj);
```

new 연산자로 인스턴스를 만들 수 있다.

###### instanceof

```javascript
console.log(HwanMin instanceof HelloName);
console.log(arr instanceof Array);
console.log(obj instanceof Object);
```

둘다 결과는 true

결국 우리가 사용하는 배열 , 객체도 하나의 인스턴스를 만들어서 사용하는 것과 같다.

##### 연산자 우선순위

사실 연산자 우선순위는 양이 많기때문에 외워서 사용한다기 보다는 그때그때 찿아서 사용하면 될 것 같다.
사실 () 연산자만 잘 사용해도 우선순위는 잘 맞춰질거 같다.
왜냐면 () 최상의 우선순위이기 때문 !
