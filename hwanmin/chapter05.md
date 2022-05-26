# 표현식과 문

> 값

정의 : 값은 식이 평가되어 생성된 결과

평가란 -> 식을 해석해서 값을 생성 하거나 참조하는 것  
Ex ) 10 + 30 이 식 자체가 평가 -> 30 이라는 나온 결과가 값

> 리터럴

정의 : 리터럴 이란 사람이 이해할 수 있는 문자 또는 약속된 기호
Ex) 3 , A , [] , {}

> 표현식

정의 : 값으로 평가될 수 있는 문 -> 표현식이 평가되면 새로운 값을 생성하거나 기존 값을 참조한다.

```javascript
10
'HwanMin'

10 + 20

let a = 10
a // 10

10 !== 10

goStudy()
HhwanMin.goStudy()

// 동치이다.
1 + 2 = 3

```

> 문

정의 : 문은 프로그램을 구성하는 기본 단위이자 최소 실행 단위

- 문은 여러개의 토큰으로 나누어 진다.

```javascript
// 세미 콜론 까지가 토큰 7개
let hwanmin_age = 20 + 11;
```

문의 종류는 여러가지 이다.
-> 변순 선언문 , 할당문 , 함수 선언문 , 조건문 , 반복문

```javascript
if (hwanmin_age > 30) {
  console.log(true);
}

for (let i = 0; i < hwanmin_age; i++) {
  console.log(i);
}

function goStudy() {
  console.log('Go Study');
}
```

위의 코드 if , for , function 등의 블록은 자체 종결성 의미를 가지기 때문에 ;를 따로 찍지 않는다 !

세미콜론은 써도 안써도 둘다 가능하다.
-> 전 prettier를 사용하기 때문에 자동 삽입 ...

> 표현식인 문과 표현식이 아닌 문

이 주제는 읽으면서 많이 헷갈리는 부분이다 ...
표현식인 문은 값으로 평가될 수 있어야 한다.

구분하는 쉬운 방법 할당해 보기 !!

```javascript

let monday = let hwanmin

let hwanmin ; // 문

hwanmin = 31 ; // 표현식 왜냐하면 이제 hwamin 이라는 것을 찾모하면 31 이라는 값을 얻을 수 있다.

```

크롬 브라우저는 문은 무조건 undefined를 반환해 준다.
매우 신기해 !!
