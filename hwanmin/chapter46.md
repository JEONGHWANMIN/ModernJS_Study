## async await

async await은 제너레이터 보다 간단하고 가독성 좋게 비동기를 처리하기 위해서 ES8때 도입 되었다.

async await은 프로미스를 기반으로 동작한다. then catch finally 메서드를 사용하지 않고 동기적으로 처리하는 것 처럼 프로미스를 사용할 수 있다.

```js
async function fetchTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  console.log(data);
}
```

위 함수가 async await 예제인데 이제 async 함수를 사용하고 , 그안에서 await 키워드를 붙여서 프로미스 처리를 하면 프로미스가 resolve되는 것을 기다렸다가 , 결과를 받는다.

그래서 결국 동기적으로 처리한느 것 처럼 코드를 읽을 수 있다.

async 함수를 사용하면 명시적으로 resolve를 작성하지 않아도 resolve를 반환하는 프로미스를 반환한다.

```js
async function fetchTodos() {
  return 1;
}
```

예시
![image](https://user-images.githubusercontent.com/65848374/191237942-75169362-27ed-4d56-8418-14b13f906d15.png)

무조건 await키워드를 사용하는 것은 효율적이지 못하다.

즉 여러개의 프로미스를 실행시켜야 하는 상황

```js
async function foo() {
  const a = await new Promise((resolve) => setTimeout(() => resolve(1), 3000));
  const b = await new Promise((resolve) => setTimeout(() => resolve(2), 2000));
  const c = await new Promise((resolve) => setTimeout(() => resolve(3), 1000));

  console.log([a, b, c]); // [1, 2, 3]
}

foo();
```

위 예제는 6초가 걸리는 것을 볼 수 있다.

하지만 Promise.all로 실행을 시키면

```js
async function foo() {
  const res = await Promise.all([
    new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
    new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
    new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
  ]);

  console.log(res);

foo();
```

3초가 걸리는 것을 볼 수 있다.

즉 여러개의 프로미스를 처리할 때는 한번에 모아서 처리하는 것이 효울적이다.

하지만 프로미스끼리의 순서가 중요할 때는 await 키워드를 붙여서 사용해야 한다.

```js
async function bar(n) {
  const a = await new Promise((resolve) => setTimeout(() => resolve(n), 3000));

  const b = await new Promise((resolve) =>
    setTimeout(() => resolve(a + 1), 2000)
  );

  const c = await new Promise((resolve) =>
    setTimeout(() => resolve(b + 1), 1000)
  );

  console.log([a, b, c]);
}

bar(1);
```

async 함수는 try catch 메서드를 사용해서 에러를 핸들링 한다.

```js
async function fetchTodos() {
  return new Promise((resolve, reject) => {
    reject("실패");
  });
}

useEffect(() => {
  (async () => {
    try {
      const result = await fetchTodos();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  })();
}, []);
```

결과를 보면 reject된 결과가 err로 오고 이것을 console.log 찍으면 거절된 메세지가 들어 있다.
