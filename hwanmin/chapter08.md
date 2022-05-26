# 08장 제어문

제어문은 조건문 , 반복문을 사용할때 사용한다.

#### 8.1 블록문

블록문은 문 자체가 종결성 의미를 가지기 때문에 세미콜론을 생략한다.
-> 05장에 한번 나왔던 내약이므로 생략

#### 8.2 조건문

```javascript

let age = 19

if (age < 20) {
  console.log("미성년자 입니다.")
} else if (age >= 20) {
  console.log("성인입니다.)
} else {
  ......
}

```

if - else 문은 삼항 조건 연산자 로도 바꿔 쓸 수 있다.

```javascript
let age = 19;

let result = age >= 20 ? '성인입니다.' : '미성년자 입니다.';
```

swith

```javascript
let age = 20;

switch (age) {
  case 20:
    console.log('성인입니다.');
    break;
  case 30:
    console.log('아저씨 입니다.');
    break;
}
```

switch 문은 break가 걸리지 않으면 밑으로 쭉 내려간다.

#### 8.3 반복문

조건에 따라 계속 반복되면서 , 조건이 거짓이 되면 반복이 중지된다.

for (변수 , 조건식 , 증감식)

```javascript
for (var i = 0; i < 10; i++) {
  console.log(i);
}
console.log(i);
```

while(조건문)

```javascript
let count = 0;

while (count < 3) {
  console.log(count);
  count++;
}
```

while 문 for문 둘 다 조건을 true 주면 무한 반복이 가능하다.

```javascript
let i = 2;
do {
  console.log(i);
} while (i < 2);
```

i = 2기 때문에 일반 while문이면 i가 안찍히지만 do - while문은 조건이 찍힌다.

#### 8.4 Break 문

반복문 , switch , 레이블

```javascript
for (let i = 0; i < 10; i++) {
  console.log(i);
  break;
}

hwanmin: {
  console.log('Yeah');
  break hwanmin;
  console.log('JJ');
}
```

0만 찍히고 break 문을 만났기 때문에 반복문을 빠져 나온다.
'Yeah'만 찍히고 반복문을 탈출한다.

#### 8.5 continue 문

continue 문은 반복문을 도는 도중 조건에 맞는 값이 continue를 만나면 반복문을 중지 시키는게 아니라 다시 위로 올려 보낸다.
그러므로 아래 식에서는 5는 출력되지 않는다.

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) continue;
  console.log(i);
}
```
