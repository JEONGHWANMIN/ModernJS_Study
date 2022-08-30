# 45.4 프로미스의 에러 처리

콜백 패턴은 에러처리가 곤란한 문제가 있었지만 , 프로미스는 에러를 문제없이 처리할 수 있다!

```js
const promiseGet = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolove(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.status));
      }
    };
  });
};
```

프로미스의 대한 후속 처리는 프로미스가 제공하는 then , catch , finally를 사용해서 할 수 있다.

```js
const wrongUrl = "http://jsonplaceholder.typicode.com/XXX/1";

promiseGet(wrongUrl).then(
  (res) => console.log(res),
  (err) => console.error(err)
);
```

위 코드처럼 then안에서 두번째 인자로 처리가 가능하지만 따ㅏ로 빼서 catch 메서드를 사용해서 처리할 수 있다.

```js
const wrongUrl = "http://jsonplaceholder.typicode.com/XXX/1";

promiseGet(wrongUrl)
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
```

catch메서드는 내부족으로 then(undefined,onRejected) 를 호출하는 것과 같다.

즉 위에 then메서드의 두번째 콜백함수로 처리하는 것이다.

```js
const wrongUrl = "http://jsonplaceholder.typicode.com/XXX/1";

promiseGet(wrongUrl)
  .then((res) => console.log(res))
  .then(undefined, (err) => console.error(err));
```

위와 같이 해결했을 때는 가독성이 좋지 못한다는 문제가 발생한다.

그렇기 떄문에 catch메서드를 사용해서 에러를 핸들링 하는 것이 가독성이 좋고 또한 then메서드 내부에서 발생한 에러까지 모두 캐치 할 수 있는 장점이 있기 때문에

catch메서드를 사용해야 한다.

## 프로미스 예시 (성공)

```js
const Promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("성공");
  }, 3000);
});

Promise1.then((res) => console.log(res));
```

## 프로미스 예시 (실패)

```js
const Promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("실패");
  }, 3000);
});

Promise2.then((res) => console.log(res)).catch((err) => console.log(err));
```

## 프로미스 예시 (실패) then 두번째 인자로 err 받기

```js
const Promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("실패");
  }, 3000);
});

Promise2.then(
  (res) => console.log(res),
  (err) => console.log(err)
);
```

## 프로미스 예시

```js
const Promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("실패");
  }, 3000);

  setTimeout(() => {
    resolve("성공");
  }, 2500);
});

Promise2.then(
  (res) => console.log(res),
  (err) => console.log(err)
);
```

## 프로미스 예시 then catch finally

```js
const Promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("실패");
  }, 3000);

  setTimeout(() => {
    resolve("성공");
  }, 2500);
});

Promise2.then((res) => console.log(res))
  .catch((err) => console.log(err))
  .finally(() => console.log("나는 파이널!"));
```
