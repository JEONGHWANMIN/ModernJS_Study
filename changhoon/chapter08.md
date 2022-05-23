# 08장 제어문

제어문은 조건에 따라 코드 블록을 실행(조건문)하거나, 반복 실행(반복문)할 때 사용한다. 일반적인 코드는 위에서 아래 방향으로 순차적으로 실행된다. 제어문을 사용하면 코드의 실행 흐름을 인위적으로 제어할 수 있다. 



## 8.1 블록문

블록문<sup>block statement/compound statement</sup>은 0개 이상의 문을 중괄호로 묶은 것으로, 코드 블록 또는 블록이라고 부르기도 한다. 

자바스크립트는 블록문을 하나의 실행 단위로 취급한다. 

블록문은 단독으로 사용할 수도 있으나 일반적으로 제어문이나 함수를 정의할 때 사용하는 것이 일반적이다.

블록문이 사용되는 다양한 예제다. 문의 끝에는 세미콜론을 붙이는 것이 일반적이다.

하지만 블록문은 언제나 문의 종료를 의미하는 *자체 종결성*을 갖기 때문에 블록문의 끝에는 세미콜론을 붙이지 않는다는 것에 주의 하기 바란다.

```
//블록문
{
	var foo = 10;
}

// 제어문
var x = 1;
if (x < 10){
	x++;
}

//함수 선언문
function sum(a, b){
	return a + b;
}
```

## 8.2 조건문

조건문<sup>conditional statement</sup> 은 주어진 조건식<sup>conditional expression</sup> 의 평가 결과에 따라 코드 블록(블록문)의 실행을 결정한다.

조건식은 불리언 값으로 평가될 수 있는 표현식이다.

자바스크립트는 if ... else 문과 switch 문으로 두 가지 조건문을 제공한다.

### 8.2.1 if ... else 문

if ... else 문은 주어진 조건식(불리언 값으로 평가될 수 있는 표현식)의 평가 결, 즉 논리적 참 또는 거짓에 따라 실행할 코드 블록을 결정한다. 

조건식의 평가 결과가 true일 경우 if 문의 코드 블록이 실행되고, false일 경우 else 문의 코드 블록이 실행된다.

```
if(조건식){
	// 조건식이 참이면 이 코드 블록이 실행된다.
} else {
//조건식이 거짓이면 이 코드 블록이 실행된다.
} 
```

if 문의 조건식은 불리언 값으로 평가되어야 한다. 

만약 if 문의 조건식이 불리언 값이 아닌 값으로 평가되면 자바스크립트 엔진에 의해 *암묵적으로 불리언 값으로 강제 변환*되어 실행할 코드 블록을 결정한다.

조건식을 추가하여 조건에 따라 실행될 코드 블록을 늘리고 싶으면 else if 문을 사용한다.

```
if(조건식1){
	// 조건식1이 참이면 이 코드 블록이 실행된다.
} else if (조건식2) {
//조건식2이 참이면 이 코드 블록이 실행된다.
} else {
//조건식1과 2가 모두 거짓이면 이 코드 블록이 실행된다.
}
```

else if 문과 else문은 옵션이다. 즉, 사용할 수도 있고 사용하지 않을 수도 있다. if 문과 else문은 2번 이상 사용할 수 없지만 else if문은 여러 번 사용할 수 있다.


대부분의 if ... else문은 삼항 조건 연산자로 바꿔 쓸 수 있다. 


## <extra>삼항조건문

(조건식) ? 참일 경우 : 거짓일경우

삼항연산자로 if else 문처럼 복수의 라인을 실행 시키려고 하면 에러가 발생한다.
```

let a = 1, b = 1, c = 1, d = 1;

a > 0 ? b+=1; c+=1 : d += 1 ; ① ; 사용

a > 0 ? b+=1, c+=1 : d += 1 ; ② , 사용

a > 0 ? b+=1 c+=1 : d += 1 ; ③ 공백 사용


Uncaught SyntaxError: Unexpected token ';'①
Uncaught SyntaxError: Unexpected token ','②
Uncaught SyntaxError: Unexpected identifier ③
```



## 삼항연산자를 이용해서 복수라인의 코드를 실행하는 두 가지 방법


1. 익명함수로 만든다.
```
let a = 1, b = 1, c = 1, d = 1;

a > 0 ? function(){b+=1; c+=1}() : d += 1 ;

console.log(a, b, c, d)// 1 2 2 1
```

2. 복수라인을 괄호로 감싸고 ,(comma)로 구분해준다.
```
let a =1, b =1, c = 1, d = 1, e = 1, f = 1; 

a > 0 && b > 0 ? (c += 1, d+=1 ) : (e += 1, f +=1 );

console.log(a, b, c, d, e, f); // 1 1 2 2 1 1

```

> 삼항연산자는 일반적으로 간단한 한 줄의 조건과 한 줄의 리턴값을 깔끔하게 나타내기 위한 문법이다. if 구문을 좀 더 멋지고 짧게 나타내기 위함이다.<br>
하지만 복수라인의 경우 삼항 연산자를 쓴 것이 if 구문보다 더 복잡해 보인다.<br>
삼항연산자를 굳이 사용하는 것 보다 if구문을 사용하는 것이 좀 더 가시성과 직관성이 좋다.


### 8.2.2 switch 문

switch 문은 주어진 표현식을 평가하여 그 값과 일치하는 표현식을 갖는 case 문으로 실행 흐름을 옮긴다.

case 문은 상황을 의미하는 표현식을 지정하고 콜론으로 마친다. 그리고 그 뒤에 실행할 문들을 위치시킨다.

switch 문의 표현식과 일치하는 case문이 없다면 실행 순서는 default 문으로 이동한다. 

default 문은 선택사항으로, 사용할 수도 있고 사용하지 않을 수도 있다.

```
switch(표현식){
	case 표현식1:
    	switch 문의 표현식과 표현식1이 일치하면 실행될 문;
        break;
	case 표현식2:
    	switch 문의 표현식과 표현식1이 일치하면 실행될 문;
        break;
	default:
    	switch 문의 표현식과 일치하는 case 문이 없을 때 실행될 문;   
}
```

if ... else 문의 조건식은 불리언 값으로 평가되어야 하지만 switch 문의 표현식은 불리언 값보다는 문자열이나 숫자 값인 경우가 많다. 

if ... else 문은 논리적 참, 거짓으로 실행할 코드 블록을 결정한다.

switch 문은 논리적 참, 거짓보다는 다양한 상황(case)에 따라 실행할 코드 블록을 결정할 때 사용한다.

switch문의 표현식의 평가 결과와 일치하는 case문으로 실행 흐름이 이동하여 문을 실행하는 것은 맞지만 문을 실행한 후 switch 문을 탈출하지 않고 switch문이 끝날 때까지 이후의 모든 case문과 default문을 실행했기 때문이다.

이를 폴스루<sup>fall through</sup>라 한다. 

break 문이 없다면 case문의 표현식과 일치하지 않더라도 실행 흐름이 다음 case문으로 연이어 이동한다.

default문에는 break 문을 생략하는 것이 일반적이다. 

default문은 switch문의 맨 마지막에 위치하므로 default문의 실행이 종료되면 switch 문의 실행이 종료되면 switch 문을 빠져 나간다.

따라서 별도로 break문이 필요 없다.

if ... else 문으로 해결할 수 있다면 switch 문 보다 if ... else 문을 사용하는 편이 좋다.

하지만 조건이 너무 많아서 if ... else 문보다 switch 문을 사용했을 때 가독성이 더 좋다면 switch문을 사용하는 편이 좋다.

## 8.3 반복문

반복문<sup>loop statement</sup> 은 조건식의 평가 결과가 참인 경우 코드 블록을 실행한다.

그후 조건식을 다시 평가하여 여전히 참인 경우 코드 블록을 다시 실행한다. 이는 조건식이 거짓일 때까지 반복된다.

자바스크립트는 세 가지 반복문인 for 문, while 문 , do ... while 문을 제공한다.

### 8.3.1 for 문

for 문은 조건식이 거짓으로 평가될 때 까지 코드 블록을 반복 실행한다. 가장 일반적으로 사용되는 for 문의 형태는 다음과 같다.

```
for(변수 선언문 또는 할당문; 조건식; 증감식){
	조건식이 참인 경우 반복 실행될 문;
}
```

for 문의 변수 선언문의 변수 이름은 반복을 의미하는 iteration의 i를 사용하는 것이 일반적이다.

for 문의 변수 선언문, 조건식, 증감식은 모두 옵션이므로 반드시 사용할 필요는 없다. 단 어떤 식도 선언하지 않으면 무한 루프가 된다. 

```
//무한 루프
for(;;;){...}
```

for 문에서 for 문을 중첩해 사용할 수 있다. 이를 중첩 for 문이라 한다.

### 8.3.2 while 문

while 문은 주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행한다. 

for 문은 반복 횟수가 명확할 때 주로 사용하고

while문은 반복 횟수가 불명확할 때 주로 사용한다.

조건식의 평가 결과가 언제나 참이면 무한 루프가 된다.

```
while(true){...}
```

### 8.3.3 do ... while 문

do ... while문은 코드 블록을 먼저 실행하고 조건식을 평가한다. 

따라서 코드 블록은 무조건 한 번 이상 실행된다.

```
var count = 0;

do {
	console.log(count); 0, 1, 2
    count ++;
} while(count < 3);
```

## (extra) label 문
```
var i, j;

loop1:
for (i = 0; i < 3; i++) {      //첫번째 for문은 "loop1" 레이블을 붙였다.
   loop2:
   for (j = 0; j < 3; j++) {   //두번째 for문은 "loop2" 레이블을 붙였다.
      if (i === 1 && j === 1) {
         continue loop1;
      }
      console.log('i = ' + i + ', j = ' + j);
   }
}

// 출력 결과:
//   "i = 0, j = 0"
//   "i = 0, j = 1"
//   "i = 0, j = 2"
//   "i = 1, j = 0"
//   "i = 2, j = 0"
//   "i = 2, j = 1"
//   "i = 2, j = 2"
// 다음 두 경우를 어떻게 스킵하는지 주목 : "i = 1, j = 1", "i = 1, j = 2"
```

```
레이블 붙인 블록 break 사용
foo: {
    console.log('face');
    console.log('body');
}
//face
//body

foo: {
    console.log('face');
    break
    console.log('body');
}
//Uncaught SyntaxError: Illegal break statement

foo: {
    console.log('face');
    break foo
    console.log('body');
}
//face
```

## 8.4 break 문

break문은 코드 블록을 탈출한다. 

정확히 표현하자면 코드 블록을 탈출하는 것이 아니라 레이블 문, 반복문(for, for...in, for...of, while, do ... while) 또는 switch 문의 코드 블록을 탈출한다.

레이블 문, 반복문, switch문의 코드 블록 외에 break문을 사용하면 SyntaxError(문법 에러)가 발생한다.(위의 예제 처럼)

중첩된 for문의 내부 for문에서 break문을 실행하면 내부 for문을 탈출하여 외부 for문으로 진입한다.
이때 내부 for 문이 아닌 외부 for문을 탈출하려면 레이블 문을 사용한다.

```
var i, j;

loop1:
for (i = 0; i < 3; i++) {      //The first for statement is labeled "loop1"
   loop2:
   for (j = 0; j < 3; j++) {   //The second for statement is labeled "loop2"
      if (i === 1 && j === 1) {
         break loop1;
      }
      console.log('i = ' + i + ', j = ' + j);
   }
}

// Output is:
//   "i = 0, j = 0"
//   "i = 0, j = 1"
//   "i = 0, j = 2"
//   "i = 1, j = 0"
// Notice the difference with the previous continue example
```


break문은 반복문을 더 이상 진행하지 않아도 될 때 불필요한 반복을 회피할 수 있어 유용하다.

## 8.5 continue 문

continue 문은 반복문의 코드 블록 실행 현 시점에서 준단하고 반복문의 증감식으로 실행 흐름을 이동시킨다.

break문 처럼 반복문을 탈출하지는 않는다.







