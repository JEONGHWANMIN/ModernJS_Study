제어문(control flow statement)은 조건에 따라 코드 블록을 실행(조건문)하거나 반복 실행(반복문)할 때 사용합니다. 하지만 제어문의 사용은 코드의 실행 흐름을 인위적으로 제어하기 때문에 직관적인 코드의 흐름을 혼란스럽게 만듭니다. 따라서 제어문을 제대로 이해하여 복잡성을 해결하기 위한 기초 체력을 길러야합니다.

### 1. 블록문
블록문(block statement/compound statement)은 0개 이상의 문을 중괄호로 묶은 것으로, 코드 블록 또는 블록이라고 부르기도 합니다. 

```javascript
// 블록문
{
	var foo = 10;
}

// 제어문
var x = 1;
if(x < 10) {
	x++;
}

// 함수 선언문
function sum(a, b){
	return a + b;
}
```

### 2. 조건문

조건문(conditional statement)은 주어진 조건식(conditional expression)의 평가 결과에 따라 코드 블록(블록문)의 실행을 결정합니다. 조건식은 불리언으로 평가될 수 있는 표현식입니다.

1. ** `if...else` 문**
`if...else` 문은 주어진 조건식의 평가 결과, 즉 논리적 참 또는 거짓에 따라 실행할 코드 블록을 결정합니다. 
조건식의 평가 결과가 true일 경우 if 문의 코드 블록이 실행되고, false일 경우 else 문의 코드 블록이 실행됩니다.
```javascript
var x = 2;
var result;

if (x % 2) {
	result = '홀수';
} else {
	result = '짝수';
}

console.log(result); // 짝수
```
위 예제는 다음과 같이 `삼항 조건 연산자`로 바꿔쓸 수 있습니다.
```javascript
var x = 2;

var result = x % 2 ? '홀수' : '짝수';
// 2 % 2는 0이다. 이때 0은 false로 암묵적 강제 변환된다.
console.log(result); //짝수

// 만약 경우의 수가 세 가지('양수', '음수', '영')이라면
var kind = num ? (num > 0 ? '양수' : '음수') : '영';
console.log(kind); // 양수
```
`삼항 조건 연산자`는 값으로 평가되는 표현식입니다. 따라서, 위 예시처럼 변수에 할당할 수 있습니다. `if...else`문은 값으로 평가되는 표현식이 아닌 문이기 때문에 변수에 할당할 수 없습니다.

2. `switch` 문
`switch`문은 주어진 표현식을 평가하여 그 값과 일치하는 표현식을 갖는 case문으로 실행 흐름을 옮깁니다.
`case`문은 상황(case)을 의미하는 표현식을 지정하고 콜론으로 마칩니다.
그리고 그 뒤에 실행할 문들을 위치시킵니다.
switch문의 표현식과 일치하는 case문이 없다면 실행 순서는 default문으로 이동합니다. `default`문은 선택사항으로, 사용할 수도 있고 사용하지 않을 수도 있다.

```javascript
switch (표현식) {
  case 표현식1:
    switch 문의 표현식과 표현식1이 일치하면 실행될 문;
    break;
  case 표현식2:
    switch 문의 표현식과 표현식2이 일치하면 실행될 문;
    break;
  default:
    switch 문의 표현식과 일치하는 case문이 없을 때 실행될 문;
}
```
위 예제에서 `break`키워드는 코드 블록에서 탈출하는 역할을 합니다.
break문이 없다면 case문의 표현식과 일치하지 않더라도 실행 흐름이 다음 case문으로 연이어 이동합니다. default문의 실행이 종료되면 switch문을 빠져나가므로 별도의 break문이 필요 없습니다.

### 3. 반복문
반복문(loop statement)은 조건식의 평가 결과가 참인 경우 코드 블록을 실행합니다. 그 후 조건식을 다시 평가하여 여전히 참인 경우 코드 블록을 다시 실행합니다. 이는 조건식이 거짓일 때까지 반복됩니다.

1. ** `for` 문 **
`for`문은 조건식이 거짓으로 평가될 때까지 코드 블록을 반복 실행합니다. 만약 조건식의 평가 결과가 불리언 값이 아니면 불리언 값으로 강제 변화하여 논리적 참, 거짓을 구별합니다.
```javascript
for(변수 선언문 또는 할당문; 조건식; 증감식){
	조건식이 참인 경우 반복 실행될 문;
}

// for문 예제 
// 선언문의 변수 이름은 반복을 의미하는 iteration의 i를 일반적으로 사용합니다.
for(var i = 0; i < 2; i++){
	console.log(i);
}
```
위 for문 예제가 실행하는 순서를 간략하게 살펴보고자 합니다.
>1. for 문을 실행하면 가장 먼저 변수 선언문 var i = 0이 실행됩니다. **변수 선언문은 단 한 번만 실행됩니다.**
2. 변수 선언문 실행 후 조건식을 평가합니다.
3. 조건식의 평가 결과 true이면 코드 블록을 실행시키고 코드 블록의 실행이 종료되면 증감식이 실행된 후 다시 조건식이 실행됩니다.
** 기억해야할 점은 증감식 실행이 종료되면 변수 선언문이 아니라 조건식이 실행됩니다. **
4. 조건식의 평가 결과 false이면 for문을 종료합니다.

2. `while` 문
`while`문은 주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행합니다. <u>for문은 반복 횟수가 명확할 때 주로 사용하고 while문은 반복 횟수가 불명확할 때 주로 사용합니다.</u>
만약 조건식의 평가 결과가 불리언 값이 아니면 불리언 값으로 강제 변화하여 논리적 참, 거짓을 구별합니다.

```javascript
var count = 0;

while(count < 3) {
	console.log(count); // 0 1 2
  	count++;
}
```

3. `do...while` 문
`do...while`문은 ** 코드 블록을 먼저 실행하고 조건식을 평가합니다.** 따라서, 코드 블록은 무조건 한 번 이상 실행됩니다.
```javascript
var count = 0;

do {
	console.log(count);
  	count++;
} while(count < 3);
```

### 4. break 문
`break` 문은 레이블 문, 반복문(for, for...in, for...of, while, do...while) 또는 switch문의 코드 블록을 탈출합니다. 
위 문들의 코드 블록 외에 break 문을 사용하면 SyntaxError(문법 에러)가 발생합니다.  
`레이블 문(label statement)`이란 식별자가 붙은 문을 말합니다. 프로그램의 실행 순서를 제어하는데 사용합니다. 하지만 프로그램의 흐름이 복잡해져서 가독성이 나빠지고 오류를 발생시킬 가능성이 높기 때문에 권장되지 않습니다.
```javascript
// outer라는 식별자가 붙은 레이블 for문
outer: for(var i = 0; i < 3; i++){
	for(var j = 0; j < 3; j++){
    // i + j === 3이면 outer라는 식별자가 붙은 레이블 for문을 탈출한다.
     if(i + j === 3) break outer;
     console.log(`inner [${i}, ${j}]`);
    }
}

console.log('Done!');
```

### 5. continue 문
continue 문은 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시킵니다.

```javascript
// continue 문을 사용하지 않으면 if 문 내에 코드를 작성해야 한다.
for (var i = 0; i < string.length; i++){
	if(string[i] === search){
    count++;
    }
}

// continue 문을 사용하면 if 문 밖에 코드를 작성할 수 있다.
for (var i = 0; i < string.length; i++){
	if(string[i] !== search) continue;
    count++;
}

```

### 6. 반복문을 대체할 수 있는 다양한 기능
1.<a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach" target="_blank"> Array.prototype.forEach</a> 
forEach 메서드는 반복문을 추상화한 고차 함수로서 내부에서 반복문을 통해 자신을 호출한 배열을 순회하면서 수행해야 할 처리를 콜백함수로 전달받아 반복 호출합니다.

```javascript
const numbers = [1, 2, 3];
const pows = [];

// for문으로 배열 순회
for(let i = 0; i<numbers.length; i++){
	pow.push(numbers[i] ** 2);
}
console.log(pows); // [1, 4, 9]

// forEach 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출합니다.
numbers.forEach(item => pows.push(item ** 2));
console.log(pow); // [1, 4, 9] 
```
2. <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for...in"> for ... in 문</a>
for ... in 문은 객체의 프로퍼티 개수만큼 순회하며 for ... in 문의 변수 선언문에서 선언한 변수에 프로퍼티 키를 할당합니다.

`for(변수선언문 in 객체){...}`

```javascript
const person = {
	name: 'han',
    address: 'suwon'
};
// for...in 문의 변수 prop에 person 객체의 프로퍼티 키가 할당된다.
for(const key in person){
	console.log(key + ':' + person[key]);
}
// name: han
// address : suwon
```
3. <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for...of" target="_blank">for ... of 문</a>
`for(변수선언문 of 이터러블){...}`
for ... of 문은 이터러블을 순회하면서 이터러블의 요소를 변수에 할당합니다.

```javascript
for(const item of [1, 2, 3]){
  // item 변수에 순차적으로 1, 2, 3이 할당된다.
	console.log(item); // 1 2 3
}
```
