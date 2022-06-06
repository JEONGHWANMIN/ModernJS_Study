# 11장 원시 값과 객체의 비교

- 자바스크립트에서 제공하는 7가지 데이터 타입(숫자, 문자열, 불리언, null, undefined, symbol, 객체) 중에서 **객체를 제외한** 나머지 6개 모두 원시 타입이다.
- 상수(const) 또한 값을 저장하기 위한 메모리 공간이 필요하므로 변수라고 볼 수 있다.
  다른 변수 선언 키워드와 다르게 **재할당과 재선언이 불가능**한 특징을 가진 변수이다.

원시 타입과 객체 타입의 가장 큰 차이점 3가지

1. 원시 값은 **변경 불가능한 값**(immutable value)이다. 참조 값은 변경 가능한 값(mutable value)이다.
2. 원시 값을 변수에 할당하면 변수에는 **실제 값**이 저장된다. 객체를 변수에 할당하면 **참조 값**이 저장된다.
   1. 주의: **변수에 값이 저장되는 것이 아니라** 해당 변수(식별자)와 name binding 된 **메모리 공간에 값이 저장**되는 것임. (변수란 하나의 값을 저장하기 위해 확보한 메모리 공간 자체, 또는 그 공간(메모리)을 식별하기 위해 붙인 이름(=스택에 붙인 이름표: 변수명)이다.)
3. **값에 의한 전달(=복사) vs 참조에 의한 전달(=참조):**
   1. **값에 의한 전달**: 원시 값을 가진 변수를 다른 변수에 할당하면 **원본의 원시 값이 복사**되어 전달된다.(깊은복사)
   2. **참조에 의한 전달**: 객체를 가리키는 변수를 다른 변수에 할당하면 **원본의 참조 값이 복사**되어 전달된다.(얕은복사)
      값에 의한 전달: pass by value, 참조에 의한 전달: pass by reference

## 11.1 원시 값(primitive data type)

### 11.1.1 변경 불가능한 값(immutable value)

> 불변성을 갖는 원시 값을 할당한 변수는 재할당 이외에 변수 값을 변경할 수 있는 방법이 없다.(딥다이브 p139)

```jsx
// 원시 값
// 원시 값의 deep copy 예시
// 두 변수의 원시 값은 서로 다른 메모리 공간에 저장된 별개의 값이 되어 어느 한쪽에서 재할당을 통해 값을 변경하더라도 서로 간섭할 수 없다.
let a = 1;
let b = 2;
b = a; // b = 2 -> 1
b = 3; // b = 1 -> 3

console.log(a); // 1
console.log(b); // 3
// 원본 a의 복사본인 b의 값이 재할당 되더라도 원본의 값에 영향을 미치지 않음.
```

변수 ≠ 값

- 변수와 값을 구분하여 생각하여야 한다.
  변수: 값을 저장하기 위해 확보한 메모리 공간 자체, 또는 그 메모리 공간을 식별하기 위해 붙인 이름
  값: 표현식이 평가되어 생성된 결과. (ex: `2 + 2;` 라는 표현식은 평가되어 `4` 라는 값을 가진다.)
- 원시 값 자체를 변경할 수 없다 ≠ 변수 값을 변경할 수 없다
  변수는 언제든지 재할당을 통해 변수 값을 교체할 수 있다.

즉 원시 값은 **변경 불가능한 값**이기 때문에 값 자체를 변경할 수는 없지만 재할당으로 값을 새로 ‘교체’하여 값을 변경한 것과 같은 행동을 할 수 있다.

이 때, 새로 재할당된 값은 새로운 메모리 공간에 저장되고 이전에 할당된 값은 원래의 메모리 공간에 그대로 남아 있으나 어떠한 식별자(변수, 함수, 클래스)에도 연결(name binding)이 되어 있지 않으므로 사용할 수 없는 쓰레기 값이 된다.

이러한 값들은 자바스크립트 엔진이 가비지 컬렉터로 더이상 사용되지 않는 메모리를 해제해주지만 그 시점이 언제일지는 알 수 없다. 이러한 불필요한 쓰레기 값들이 발생하고 있는 상태를 **메모리 누수** 라고 한다.

**name binding**: 변수 이름과 확보된 메모리 공간의 주소를 연결하는 행위

### 11.1.2 문자열과 불변성

```jsx
let str1 = ''; // 0개의 문자로 이루어진 문자열
let str2 = 'Ryan'; // 4개의 문자로 이루어진 문자열
```

문자열: 0개 이상의 문자로 이루어진 집합

숫자 타입은 1이던 1억이던 숫자의 크기에 상관 없이 동일하게 8바이트이나 문자열은 문자의 길이에 따라 용량이 달라진다.
문자열은 원시 타입이기 때문에 읽기 전용의 변경 불가능한 값이다. 즉 문자열이 생성된 이후에는 값의 변경이 불가능하다.

```jsx
let str = 'Hello';
str = 'world';
```

식별자 `str`은 문자열 `'Hello'`를 가리키고 있다가 문자열 `'world'`를 가리키도록 **변경**되었다.

### 11.1.3 값에 의한 전달

- 값에 의한 전달: 변수에 원시 값을 갖는 변수를 할당하는 경우 할당되는 변수의 원시 값이 복사되어 전달되는 것.
- 원본과 복사본의 값 자체는 같다. 하지만 두 변수의 값은 서로 다른 메모리 공간에 저장된 별개의 값이다.
- 값을 전달하는 것이 아니라 엄밀히 따지면 메모리 주소를 전달하는 것이다. 메모리 주소를 통해 값을 참조할 수 있다.
- 각 제조사의 자바스크립트 엔진에 따라 음부터 별개의 메모리 공간에 저장되거나,
  할당 시점에는 두 변수가 같은 원시 값을 참조하다가 어느 한 쪽이 재할당 된 경우 서로 값의 메모리 주소값이 달라지거나 다를 수 있다.

```jsx
const age = 20;
let deepCopy = age;

console.log(age, deepCopy); // 20 20
console.log(age === deepCopy); // true
```

## 11.2 참조 값(reference data type)

- 객체는 데이터의 크기가 얼마든지 줄어들거나 커질 수 있다. (동적으로 추가되고 삭제가 가능)
- 참조 값: 생성된 객체가 저장된 메모리 공간의 주소 그 자체(reference value)

### 11.2.1 변경 가능한 값(mutable value)

**객체는 변경 가능한 값이다. 따라서 객체를 할당한 변수는 재할당 없이 객체를 직접 변경할 수 있다.**

```jsx
// 참조 값
// 참조 타입의 값은 힙 영역에 저장되며 저장된 데이터의 주소값(참조값)은 스택 영역에 생성되어 변수는 스택 영역에 저장됨.
// 현재 원본 배열(객체)인 arr1을 참조하고 있는 arr2는 서로 같은 주소값을 변수에 담고 있으므로 비교 시 true를 반환한다.
// 참조 자료형의 엄격한 비교(===)는 원시 값 끼리의 비교처럼 값 자체를 비교하는 게 아니라
// '주소값'이 같은지를 확인하는 것이다.
let arr1 = [1, 2, 3];
let arr2 = arr1;
console.log(arr1 === arr2); // true

// 참조 값의 shallow copy 예시
// 원본 객체인 ryan의 복사본인 tom을 수정하였으나 원본에도 수정한 내용이 동일하게 반영됨.
let ryan = { age: 10 };
let tom = ryan; // tom = { age : 10 }
tom.hobby = 'riding';

console.log(ryan.hobby); // riding
tom; // {age: 10, hobby: 'riding'}
ryan; // {age: 10, hobby: 'riding'}

// 상수인 const는 변수의 일종이기에 값을 할당할 수 있으나 재할당은 어떤 경우에도 불가능하다.
// 하지만 참조 값(객체)은 재할당 없이 값을 추가하거나 삭제, 또는 갱신할 수 있으므로,
// 상수에서도 객체의 경우 값의 변경이 가능하다. 원시 타입은 재할당만 할수 있으므로 불가능!
const user = {
  name: 'Ryan',
};

// 재할당 없이 프로퍼티 값 갱신 가능
user.name = 'Kim';

// 프로퍼티 동적 생성(새로운 프로퍼티 추가)
user.age = 16;

console.log(user); // {name: 'Kim', age: 16}
```

- 객체를 가진 변수가 가지고 있는 메모리 주소값과 해당 객체의 프로퍼티가 저장된 메모리 공간의 주소값은 다르다.
- 객체를 가진 변수가 가지고 있는 메모리 주소값(참조 값)이 실제 객체의 프로퍼티를 담은 메모리 공간에 접근하고 있는 형태이다.
  - 따라서 **“변수는 객체를 가리키고(참조하고) 있다”** 라고 표현한다.

### 11.2.2 참조에 의한 전달

- 객체를 복사하면 얕은복사가 일어난다. 즉 원본과 사본이 같은 참조 값(메모리 힙 주소)을 가진다.
- 이는 하나의 객체를 두 개의 식별자가 공유하고 있는 것으로, 둘 중 어느 하나의 값이 변경되더라도 변경사항을 공유한다.
- 객체는 생성 시마다 새로운 참조 값을 가진다. 따라서 일치 비교`===` 시 참조 값이 다르기 때문에 `false`가 된다.

```jsx
const obj1 = { name: 'kim' };
const obj2 = obj1;
console.log(obj1 === obj2); // true: 같은 참조값 끼리 비교.

const user1 = { age: 20 };
const user2 = { age: 20 };
console.log(user1 === user2); // false: 다른 참조값 끼리 비교.
console.log(user1.age === user2.age); // true: 같은 원시값 끼리 비교.
```

## 정리

- 원시 값이던 참조 값이던 변수에 저장되는 것은 값 자체가 아니라 변수와 연결된 메모리 공간의 주소값이다.(딥다이브 p 145)
- 원시 값을 가진 변수의 메모리 공간에는 값 자체가 저장된다.
- 참조 값을 가진 변수의 메모리 공간에는 값이 저장된 메모리의 주소값이 저장된다.
- 따라서 원시 값끼리 동등 비교시(`===`) 원시 값은 값 끼리 비교, 참조 값은 주소 값끼리 비교한다.