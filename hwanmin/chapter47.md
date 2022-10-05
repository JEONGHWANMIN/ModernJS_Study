# 47장 에러처리

try catch문을 통해서 에러 처리가 가능하다.

에러를 처리하지 않으면 프로그램은 강제 종료된다.

에러가 발생해서 밑에 end가 찍히지 않는 코드

```js
console.log("start");

foo();

console.log("end");
```

try catch를 사용하면 프로그램이 강제 종료되지 않고 계속해서 코드 실행이 가능하다.

```js
console.log("start");

try {
  foo();
} catch (e) {
  console.log("error", e);
}

console.log("end");
```

위 순서는 먼저 try문이 실행되고 만약 에러가 발생한다면 발생한 에러는 catch에 전달된다.

## Error 생성자 함수

Error생성자 함수는 에러 객체를 생성 한다.

이 에러 객체는 message프로퍼티 , stack프로퍼티 두가지를 가진다.

message는 에러 메세지를 전달할 메세지이고 , stack 프로퍼티의 값은 에러를 발생시킨 스택의 호출 정보를 나타내는 문자열이며 디버깅 목적으로 사용된다.

Error는 생성자 함수를 포함해서 7가지 에러 객체를 생성할 수 있다.

1. Error
2. Syntax Error
3. ReferenceError
4. TypeError
5. RangeError
6. URIError
7. EvalError

## thorw 문

Error 객첼르 생성한다고 바로 에러가 발생하는 것은 아니다.

에러 발생과 에러생성은 의미가 다르다.

에러 객체를 만들어서 던지면 catch문에서 받아서 catch블록이 실행됩니다.

```js
try {
  throw new Error("나는 에러 !!");
} catch (e) {
  console.log(e);
}
```

```js
const repeat = (n, f) => {
  if (typeof f !== "function") {
    throw new TypeError("f must be a function");
  }
  for (let i = 0; i < n; i++) {
    f(i);
  }
};

try {
  repeat(1, 2);
} catch (e) {
  console.log(e);
}
```

위 코드는 타입 에러를 발생 시킨다.

왜냐하면 두번째 인자가 함수 타입이 아니라 number 타입이기 때문에 발생된 에러 이다.

## 에러의 전파

에러는 호출자 방향으로 전파된다.

콜스택의 아래 방향으로 전파된다.

```js
const foo = () => {
  throw Error("foo에서 발생한 에러");
};

const bar = () => {
  foo();
};

const baz = () => {
  bar();
};

try {
  baz();
} catch (e) {
  console.log(e);
}
```

```
Error: foo에서 발생한 에러
    at foo (/Users/jeonghwanmin/ml/ModernJS_Study/hwanmin/test.js:2:9)
    at bar (/Users/jeonghwanmin/ml/ModernJS_Study/hwanmin/test.js:6:3)
    at baz (/Users/jeonghwanmin/ml/ModernJS_Study/hwanmin/test.js:10:3)
    at Object.<anonymous> (/Users/jeonghwanmin/ml/ModernJS_Study/hwanmin/test.js:14:3)
    at Module._compile (node:internal/modules/cjs/loader:1103:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1155:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12)
    at node:internal/main/run_main_module:17:47
```

콜스택의 아래방향 즉 위 실행 컨텍스트는 아래와 같은 방향인데

전역 -> baz -> bar -> foo (에러)

foo
bar
baz
전역

하지만 에러 메세지를 보면은 foo부터 발생해서 bar baz 즉 아래 방향으로 나타나는 것을 확인할 수 있다.

즉 호출된 에러를 캐치하지 않으면 호출자 방향으로 전파된다.

그리고 만약 어디에서도 캐치하지 않으면 프로그램은 강제 종료된다.

비동기 함수인 setTimeout이나 프로미스 후속 처리 메서드의 콜백 함수는 태스크 큐나 마이크로태스크 큐에 일시 저장되었다가 콜스택이 비면 이벤트 루프에 의해서 콜 스택으로 푸시된다.

이때 콜 스택에 푸시된 콜백 함수의 실행 컨텍스트는 콜 스택의 가장 하부테 존재하기 때문에 에러를 전파할 호출자가 존재하지 않는다.

-> 즉 비동기 처리는 무조건 맨 아래에서 호출되기 때문에 에러를 전파할 호출자가 따로 없다는 뜻인거 같다.


콜스택 -> z

마이크로태스트큐 -> z