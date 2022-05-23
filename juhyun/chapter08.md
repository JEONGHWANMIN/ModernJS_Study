# 8장 제어문

제어문은 조건에 따라 코드 블록을 인위적으로 제어할 때 사용한다.

## 8.1 블록문

블록문은 0개 이상의 문을 중괄호로 묶은 것으로, 일반적으로 문의 끝에는 세미콜론을 붙이지만 블록문은 문의 종료를 의미하는 자체 종결성을 갖기 때문에 붙이지 않아도 된다.

```javascript
{
  let foo = 10;
}
```

## 8.2 조건문

조건문은 주어진 조건식의 평가 결과에 따라 코드 블록의 실행을 결정하며 if ... else 문과 switch 문이 있다.

### if ... else 문

조건식의 평가 결과가 true일 경우 if 문의 코드 블록이 실행되고, false일 경우 else 문의 코드 블록이 실행된다.

else if 문과 else 문은 옵션이다. if, else 문은 2번 이상 사용할 수 없지만 else if 문은 여러 번 사용할 수 있다.

또한 만약 코드 블록 내의 문이 하나뿐이라면 중괄호를 생략할 수 있다.

```javascript
let num = 2;
let kind;

if (num > 0) kind = "pos";
else if (num < 0) kin = "nag";
else kind = "zero";
```

대부분의 if ... else 문은 삼항 조건 연산자로 바꿔 쓸 수 있다.

```javascript
let x = 2;
let result = x % 2 ? "odd" : "even";
```

```javascript
let num = 2;
let kind = num ? (num > 0 ? "pos" : "nag") : "zero";
```

위에서 num > 0 ? 'pos':'nag' 는 표현식이다. 삼항 조건 연산자는 값으로 평가되는 표현식을 만들기 때문에 변수에 할당할 수 있다.

하지만 if ... else 문은 표현식이 아닌 문이라 변수에 할당할 수 없다.

### switch 문

```javascript
switch(표현식){
  case 표현식1:
    switch 문의 표현식과 표현식1이 일치하면 실핼될 문;
    break;
  case 표현식2:
    switch 문의 표현식과 표현식2이 일치하면 실핼될 문;
    break;
  default:
    switch 문의 표현식과 일치하는 case 문이 없을 때 실행될 문;
}
```

switch 문의 표현식과 일치하는 case 문이 없다면 실행 순서가 default 문으로 이동한다. (default 문은 선택사항)

if ... else 문의 조건식은 불리언 값으로 평가되어야 하지만 switch 문의 표현식은 불리언 값보다는 문자열이나 숫자 값인 경우가 많다.

즉, if ... else 문은 논리적 참, 거짓으로 실행할 코드 블록을 결정하고, switch 문은 다양한 상황(case)에 따라 실행할 코드 블록을 결정할 때 사용한다.

case 문의 마지막에 break 문을 사용하지 않으면 switch 문을 탈출하지 않고 나머지 case 문과 default 문을 실행한다.

이를 폴스루(fall through)라고 한다. 경우에 따라 폴스루가 유용할 수도 있다.

## 8.3 반복문

반복문은 조건식이 거짓일 때까지 코드 블록을 반복 실행한다.

### for 문

for 문은 반복 횟수가 명확할 때 주로 사용한다.

```javascript
for (변수 선언문 또는 할당문; 조건식; 증감식){
  조건식이 참인 경우 반복 실행될 문;
}
```

### while 문

while 문은 반복 횟수가 불명확할 때 주로 사용한다.

```javascript
while(조건문){
  조건식의 평가결과가 참인 동안 실행될 코드
}
```

### do ... while 문

do ... while 문은 do 부분의 코드 블록을 먼저 한번 실행하고 while 문을 실행한다.

## 8.4 break 문

레이블 문, 반복문, switch 문의 코드 블록을 탈출하기 위해 사용한다.

중첩된 for 문의 내부 for 문에서 break 문을 실행하면 내부 for 문을 탈출하고 외부 for 문으로 진입한다.

레이블 문을 사용하면 중첩된 for 문의 외부로 탈출할 때 유용하지만 프로그램의 흐름이 복잡해져서 그 밖에 상황에서는 권장하지 않는다.

## 8.5 continue 문

continue 문은 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문으로 증감식으로 실행 흐름을 이동시킨다.
