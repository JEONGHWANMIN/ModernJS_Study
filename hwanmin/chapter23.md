# 실행 컨텍스트

실행 컨텍스트 -> 자바스크립트 동작원리 핵심 개념

## 23.1 소스코드의 타입

ECMAScript 사양은 4가지 소스코드로 나누어짐

각각 4가지 소스코드는 실행 컨텍스트를 생성함

1. 전역코드 : 전역에 존재하는 소스코드
2. 함수코드 : 함수 내부에 존재하는 소스코드
3. eval코드 : 빌트인 전역 함수인 eval 함수에 인수로 전달되어 실행되는 소스코드
4. 모듈코드 : 모듈 내부에 존재하는 소스코드

> 1. 전역코드

전역 변수를 관리하기 위해서 최상위 스코프인 전역 스코프를 생성 var 키워드 , fuction 키워드로 정의된 전역 함수를 전역 객체의 프로퍼티와 메서드로 바인딩 시키고 참조하기 위해서 전역 객체랑 연결 , 전역 코드가 평가되면 전역 컨텍스트가 생성 된다.

> 2. 함수코드

함수코드는 지역 스코프를 생성하고 , 지역변수 , 매개변수 ,argumets 객체를 관리해야한다.

생성한 지역 스코프를 전역 스코프에서 시작하는 스코프 체인의 일원으로 연결해야 한다.

함수코드가 평가되면 함수 실행 컨텍스트가 생성된다.

> 3. eval코드

strict mode에서 자신만의 독자적인 스코프를 생성 , 이를 위해 eval 코드가 평가되면 eval 실행 컨텍스트가 생성된다.

> 4. 모듈코드

모듈 코드는 모듈별로 독립적인 모듈 스코프를 생성한다. 이를 위해 모듈 코드가 평가되면 모듈 실행 컨텍스트가 생성된다.

## 23.2 소스코드의 평가와 실행

모든 소스코드는 실행에 앞서서 코드를 실행하기 위한 준비를 한다.

-> 소스 코드 평가

-> 소스 코드 실행

두가지의 과정으로 나누어 진다.

> 소스 평가 과정

실행 컨텍스트를 생성하고 , 변수 , 함수 등의 선언문만 먼저 실행하여 생성된 변수나 함수 식별자를 키로 실행 컨텍스트가 관리하는 스코프에 등록한다.

> 소스 실행 과정

소스 평가 과정이 끝나면 선언문을 제외한 소스코드가 순차적으로 실행된다. -> 런타임 실행

소스 코드 결과는 다시 실행 컨텍스트가 관리하는 스코프에 등록 된다.

## 23.3 실행 컨텍스트의 역할

```js
// 전역 변수 선언
const x = 1;
const y = 2;

// 함수 정의
function foo(a) {
  // 지역 변수 선언
  const x = 10;
  const y = 20;

  // 메서드 호출
  console.log(a + x + y); // 130
}

// 함수 호출
foo(100);

// 메서드 호출
console.log(x + y); // 3
```

> 1. 전역코드 평가

foo() 함수 , x,y 변수 -> 평가 -> 전역 스코프 등록

전역 객체 -> foo() 함수만 (함수 선언문 , var 변수)

> 2. 전역 코드 실행

코드가 윗 줄 부터 순차적으로 실행

x,y값 할당 foo()함수 호출

> 3. 함수 코드 평가

함수 코드 평가 과정 실행 -> 함수에 들어오는 매개변수랑 , 지역 변수 선언문 실행

-> 각각 생성된 매개변수랑 지역 변수가 함수 실행 컨텍스트 등록 (함수 스코프)

arguments 객체가 생성 되고 , this 바인딩 까지 된다.

> 4. 함수 코드 실행

console.log(a+x+y) 호출

console.log()를 스코프 체인을 통해서 검색 (함수 안에는 console이라는 객체가 없기 때문에 ?) 함수 지역 스코프랑 상위 스코프가 체이닝이 된다.

console.log()에 들어간 매개변수 a,x,y가 평가된다.(스코프 체이닝을 통해서) 콘솔로가 찍히면 다시 함수로 돌아와서 마저 소스 코드가 실행된다.

그래서 이 모든과정이 원활하게 진행될 수 있도록 해주는 것이 실행 컨텍스트 영향이다.

## 23.4 실행 컨텍스트 스택

```js
const x = 1;

function foo() {
  const y = 2;

  function bar() {
    const z = 3;
    console.log(x + y + z);
  }
  bar();
}

foo(); // 6
```

실행 컨텍스트는 스택이라는 자료구조로 관리가 된다.

전역 컨텍스트
전역 컨텍스트 -> foo()
전역 컨텍스트 -> foo() -> bar()
전역 컨텍스트 -> foo()
전역 컨텍스트

## 23.5 렉시컬 환경

식별자와 식별자에 바인딩된 값 , 그리고 상위 스코프에 대한 참조를 기록하는 자료구조로 실행 컨텍스트를 구성하는 컴포넌트

실행컨텍스트 스택 : 코드 실행 순서 관리

렉시컬 환경 : 스코프 , 식별자 관리

## 23.6 실행 컨텍트의 생성과 식별자 검색 과정

순서

1. 전역 객체 생성
2. 전역 렉시컬 환경 생성
   2-1 전역환경 레코드 생성
   2-1-1 객체 환경 레코드 생성
   2-1-2 선언적 환경 레코드 생성
   2-2 this 바인딩
   2.3 외부 렉시컬 환경에 대한 참조 결정

### 전역 객체 생성

전역 객체 생성은 전역 코드가 평가되기 이전에 실행된다.

전역 객체도 Object.prototype을 상속받는다.

즉 , 전역 객체도 프로토타입 체인의 일원이다.

BindingObject 생성

### 전역 코드 평가

소스코드가 로드되면 자바스크립트 엔진은 전역 코드를 평가한다.

1. 전역 실행 컨텍스트 생성
   비어있는 실행 컨텍스트 스택 -> 글로벌 실행 컨텍스트 추가

2. 전역 렉시컬 환경 생성
   전역 렉시컬 환경이 생성되고 전역 컨텍스트에 바인딩 한다.

   1. 전역 환경 레코드 생성

      1. 객체 환경 레코드
         - var 변수와 , 함수 선언문 등이 관리된다.
         - BindingObject 통해 전역 객체의 프로퍼티와 메서드가 된다.
      2. 선언적 환경 레코드
         - let const 선언한 전역 변수를 관리한다.
         - let , const 성질 -> 블록 레벨 스코프 (여기서 블록은 ? 선언적 환경 레코드) 이 안에서만 참조가 가능했던 거임
         - 게다가 let , const 변수 선언문에 도달하기 전에 TDZ 빠지게 되므로 전역 객체에서 참조할 수 없다. 그래서 let , const 호이스팅이 일어나긴 하지만 TDZ 존에 있기 때문에 런타임 전에 건드리는게 불가능 하다.

   2. this 바인딩

      1. 전역 환경 레코드 `[[GlobalThisValue]` 내부 슬롯에 this가 바인딩 된다.
      2. 객체 환경 레코드 , 선언적 환경 레코드 This 바인딩이 없다.

   3. 외부 렉시컬 환경에 대한 참조 결정
      - 외부 렉시컬에 대한 참조는 현재 평가 중인 소스코드를 포함하는 외부 소스코드의 렉시컬 환경 , 즉 상위 스코프를 가르킨다. 단방향 링크스 리스트인 스코프 체인 구현
        (코드 평가 단계에서 상위 스코프에 변수가 뭐뭐 있는지 확인하고 지금 블록 내에서 사용이 가능한지 ? 판단하는 역할을 이 렉시컬 환경이 해주는 것 같음 근데 전역 코드 평가에서는 전역보다 상위가 없으니까 외부 렉시컬 환경은 Null이 할당되는 거임)

3. 전역 코드 실행
   전역 코드가 순차적으로 실행 된다.
   위에서 부터 값을 읽어 나가면서 변수에 값을 대입한다.
   그러다가 함수 호출을 만나면 함수를 호출 한다.

   스코프에 따라서 동일한 이름이 여러개가 있을 수 있는데 , 이때 식별자를 실행 컨텍스트에서 검색하기 시작한다.
   현재 렉시컬 환경에서 식별자가 없을 경우 상위 스코프로 이동하여 식별자를 검색한다. -> 스코프 체인

   foo() 함수 코드 평가
   만약에 함수가 실행되면 코드의 제어권이 foo 함수 내부로 이동된다.

   1. 함수 실행 컨텍스트 생성
      함수에 대한 실행 컨텍스트가 생성된다. 그리고 함수 렉시컬 환경이 완성된 다음 실행 컨텍스트 스택에 푸쉬된다.
      그래서 스택에 맨 위에 쌓이면서 실행 중인 실행 컨텍스트가 함수가 된다.
   2. 함수 렉시컬 환경 생성
      함수 렉시컬 환경이 생성되고 , 함수 실행 컨텍스트에 바인딩이 된다.
      1. 2-1 함수 환경 레코드 생성
         매개변수 , arguments객체 , 함수 내부에서 선언한 지역 변수와 중첩 함수를 등록하고 관리
