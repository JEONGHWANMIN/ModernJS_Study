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

## 프로미스 체이닝

```js
const url = "https://jsonplaceholder.typicode.com";

// id가 1인 post의 userId를 취득
promiseGet(`${url}/posts/1`)
  // 취득한 post의 userId로 user 정보를 취득
  .then(({ userId }) => promiseGet(`${url}/users/${userId}`))
  .then((userInfo) => console.log(userInfo))
  .catch((err) => console.error(err));
```

위 예제는 then then catch 순서로 처리를 하였다.

then then 이런식으로 연속해서 어떠한 프로미스를 처리하는 것을 프로미스 체이닝이라고 한다.

그래서 위 then catch 들은 콜백함수가 반환한 프로미스를 반환한다.

프로미스가 아니더라도 resolve , reject된 프로미스를 생성해서 반환한다.

ES8때 도입된 async await 패턴을 통해서도 해결할 수 있다.

```js
const url = "https://jsonplaceholder.typicode.com";

(async () => {
  // id가 1인 post의 userId를 취득
  const { userId } = await promiseGet(`${url}/posts/1`);

  // 취득한 post의 userId로 user 정보를 취득
  const userInfo = await promiseGet(`${url}/users/${userId}`);

  console.log(userInfo);
})();
```

위 예제는 async await을 사용해서 리팩토링 된 코드인데 확실히 좀 더 코드 읽는게 직관적 입니다.

```js
// ================================ Part4. Promise methods  ================================

// Promise.all([])
// 모든 프로미스가 fullfill 상태가 되면 종료된다.
async function PromiseAll() {
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise1");
    }, 1000);
  });
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise2");
    }, 3000);
  });
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise3");
    }, 10000);
  });

  const result = await Promise.all([promise1, promise2, promise3]);
  console.log(result);
  result.map((promise) => {
    console.log(promise);
  });
}

// 하지만 하나라도 Reject 된다면 프로미스가 종료된다.
async function PromiseAllReject() {
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("실패1");
    }, 1000);
  });
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise2");
    }, 3000);
  });
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise3");
    }, 10000);
  });

  const result = await Promise.all([promise1, promise2, promise3]);
  console.log(result);
  result.map((promise) => {
    console.log(promise);
  });
}

// PromiseRace는 무조건 제일 빠른 프로미스를 반환한다.
// 이때 제일 빠른 것이 반환해더라도 함수 실행은 계속 되어있다.
// Promise.race도 Promise.all 과 똑같이 하나라도 reject되면 끝난다.
async function PromiseRace() {
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise2");
    }, 3000);
  });
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise3");
    }, 10000);
  });
  const promise1 = new Promise((resolve, reject) => {
    // reject("실패!");
    setTimeout(() => {
      resolve("내가 제일 빨라 !!");
    }, 1000);
  });
  const fastPromise = await Promise.race([promise2, promise3, promise1]);
  console.log(fastPromise);
}

// Promise.allSettled는 각각의 성공 및 실패 상태를 배열안에 객체로 리턴해 준다.
// 성공하면 값이 뭔지 , 실패하면 이유가 뭔지 알려준다.
/** 
 [
  { status: 'fulfilled', value: 'promise2 성공!!' },
  { status: 'rejected', reason: 'promise3 실패!!' },
  { status: 'rejected', reason: 'promise 1 실패' }
]
 */
async function PromiseAllSettled() {
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise2 성공!!");
    }, 3000);
  });
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("promise3 실패!!");
    }, 10000);
  });
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("promise 1 실패");
    }, 1000);
  });
  const fastPromise = await Promise.allSettled([promise2, promise3, promise1]);
  console.log(fastPromise);
}
```
