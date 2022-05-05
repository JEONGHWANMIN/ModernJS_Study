> 04장 변수

## 04장 변수

```jsx
10 + 20;
```

위 연산을 할 때 바로 30이란 값이 메모리에 잡히는게 아니고 각각 메모리에 10 , 20 , 10+20 각각 메모리에 2진수로 저장된다.

30이란 값에 접근하려면 메모리 주소에 직접 접근해야 하지만 **자바스크립트는 허용 x**

올바른 방법 : **변수**를 이용해서 접근한다. \*변수 : 메모리 공간을 식별하기 위한 식별자

> 변수를 만드는 방법

`var , let , const` 키워드를 통해서 만든다 .

`var score` 선언 시 발생하는 순서

1. JavaScript 엔진 var 발견
2. var 뒤에오는 이름을 새로운 변수로 선언
3. undefined 가 할당

`let score` `var score` = undefiend

`const score`; 'const' declarations must be initialized.

var , let 은 undefiend 로 초기화가 되고 const 는 선언 자체가 안된다.

> 변수 호이스팅

변수 선언은 순차적으로 실행되는 런타임 이전에 먼저 실행된다.

```jsx
console.log(score) undefined
var score = 2;
```

let , const 도 호이스팅이 일어난다 .

var 는 선언과 동시에 초기화가 이루어 지면서 undefined가 할당되지만 ,

**let , const 는 선언은 되지만 초기화가 되지 않는다. 이때 Temporary Dead Zone에 들어가게 된다.**

**선언은 됬지만 초기화가 되지 않아서 메모리가 준비 안된 상태 !**

\*TDZ : 컴퓨터가 값으로 완전히 초기화 하기 전까지 변수에 액세스 할 수 없는 블록 영역

```jsx
// let myName
// if here ? let myName ;
console.log(myName); // Cannot access 'myName' before initialization
console.log(myName);
console.log(myName);
let myName = 'HwanMin';
```

그러면 var는 TDZ 가 없어서 undefiend가 바로 할당되는 거냐 ? 라고 하면 그것도 아니다.

var 도 TDZ 가 있지만 , var 에 TDZ는 호이스팅 이후 바로 종료된다 .

```jsx
{
  let bestFood = 'Fish and Chips';

  let myBestMeal = function () {
    console.log(bestFood);
    let bestFood = 'Vegetable Fried Rice';
  };

  myBestMeal();
}
```

> 함수 호이스팅

```javascript
a();
// 함수 표현식
const a = () => {
  // bula bula
};
/-----------------------------------------------/;
a();
// 함수 선언문
function a() {
  // bula bula
}
```

제가 자주보는 유튜버 님의 말
-> 아니 애초에 호이스팅 날 상황을 안 만들면 되잖아요 ? 만들지 마세요.

> 값의 할당

`var score = 2 ;`

이건 하나 처럼 보이지만 결국 2번에 걸쳐 실행된다 .

1. 호이스팅으로 인해서 var score = undefiend // 초기화
2. 순차적으로 내려오면서 코드를 만나면 score = 2 ; 를 넣는 식이다.

```jsx
console.log(score);
score = 80;
socre = 90;
var score;

console.log(score);
```

순서

1. 호이스팅 : var score = undefined
2. score = 80
3. score = 90

이때 score라는 변수는 90이 저장되어 있는 메모리 값 주소를 참조하게 된다.

그러면 나머지 undefined , 80 이란 변수는 가비지 콜렉터에 의해서 해제된다.

언제 해제되는지는 알 수 없다.

> 식별자 네이밍 규칙

예약어는 사용할 수 없다.

### 자주 쓰이는 4가지 네이밍 컨벤션

카멜케이스 , 스네이크 케이스 , 파스칼 케이스 , 헝카리언 케이스

```jsx
let firstName; // 카멜

let first_name; // 스네이크

let FirstName; // 파스칼

let strFirstName; // type + 식별자l
```

→ 보통 카멜케이스를 많이 쓰는 것 같다.

다른분들은 ?

> 실행컨텍스트

-> 실행 컨텍스트 ?
자바스크립트 엔진이 변수를 관리 할 수 잇또록 존재를 알린다 .

보통 호이스팅 , 스코프 체이닝 , 클로져와 많이 다뤄진다.
04장에서는 호이스팅을 제대로 알고 넘어가고 뒤에 비슷한 개념이 나올때 마다 하나하나 보면 될 거 같다.
