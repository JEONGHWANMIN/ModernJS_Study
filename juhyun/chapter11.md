# 11장 원시 값과 객체의 비교

자바스크립트의 데이터 타입은 원시 타입과 객체 타입으로 구분할 수 있다.

원시 값은 변경 불가능한 값이며, 객체 값은 변경 가능한 값이다.

원시 값을 변수에 할당하면 메모리 공간에는 실제 값이 저장되며, 객체 값을 변수에 할당하면 메모리 공간에 참조 값이 저장된다.

원시 값을 갖는 변수를 다른 변수에 할당하면 원시 값이 복사되어 전달되며 값에 의한 전달이라 한다.

객체 값을 갖는 변수를 다른 변수에 할당하면 참조 값이 복사되어 전달되며 참조에 의한 전달이라 한다.

## 11.1 원시 값

### 11.1.1 변경 불가능한 값

원시 타입의 값은 변경 불가능한 값(immutable value)이다.

변경 불가능하다는 것은 변수가 아니라 값에 대한 부분이다.

즉, 원시 값 자체를 변경할 수 없다는 것이지 변수 값은 언제든지 재할당을 통해 교체할 수 있다.

상수는 재할당이 금지된 변수일 뿐이다.

원시 값을 할당한 변수에 새로운 원시 값을 재할당하면 새로운 메모리 공간을 확보하고 재할당한 원시 값을 저장한 후, 변수는 새롭게 재할당한 원시 값을 가리킨다.

이러한 불변성을 갖는 원시 값을 할당한 변수는 재할당 이외에 변수 값을 변경할 수 있는 방법이 없다.

### 11.1.2 문자열과 불변성

문자열은 0개 이상의 문자로 이뤄진 집합을 말하며 1개의 문자는 2바이트의 메모리 공간에 저장된다.

따라서 문자열은 몇 개의 문자로 이뤄졌느냐에 따라 필요한 메모리 공간의 크기가 결정된다.

문자열은 유사 배열 객체이면서 이터러블이므로 배열과 유사하게 각 문자에 접근할 수 있다.

```javascript
let str = "string";
str[0] = "S";
console.log(str); // 'string'
```

배열과 유사하게 인덱스를 사용해 각 문자에 접근할 수 있지만 문자열은 원시 값이므로 변경할 수는 없다. 이때 에러가 발생하지는 않는다.

### 11.1.3 값에 의한 전달

```javascript
let score = 80;
let copy = score;
console.log(score); // 80
console.log(copy); // 80

score = 100;
console.log(score); // 100
console.log(copy); // 80
```

변수에 원시 값을 갖는 변수를 할당하면 할당받는 변수에는 할당되는 변수의 원시 값이 복사되어 전달된다. 이를 값에 의한 전달이라 한다.

이때 score 변수와 copy 변수의 값 80은 다른 메모리 공간에 저장된 별개의 값이다.

엄격하게 표현하면 변수에는 값이 전달되는 것이 아니라 메모리 주소가 전달되기 때문에 '값에 의한 전달'이라는 용어는 오해가 있을 수 있다.

변수와 같은 식별자는 값이 아니라 메모리 주소를 기억하고 있기 때문이다.

'값에 의한 전달'도 사실은 값을 전달하는 것이 아니라 메모리 주소를 전달한다. 단, 전달된 메모리 주소를 통해 메모리 공간에 접근하면 값을 참조할 수 있다.

두 변수의 원시 값은 서로 다른 메모리 공간에 저장된 별개의 값이 되어 어느 한쪽에서 재할당을 통해 값을 변경하더라도 서로 간섭할 수 없다.

## 11.2 객체

객체는 프로퍼티의 개수가 정해져 있지 않고, 동적으로 추가되고 삭제할 수 있어서 확보해야 할 메모리 공간의 크기를 사전에 정해 둘 수 없다.

### 11.2.1 변경 가능한 값

객체(참조)타입의 값, 즉 객체는 변경 가능한 값(mutable value)이다.

객체를 할당한 변수가 기억하는 메모리 주소를 통해 메모리 공간에 접근하면 참조 값에 접근할 수 있다. 참조 값은 생성된 객체가 저장된 메모리 공간의 주소 그 자체다.

객체는 변경 가능한 값이기 때문에 재할당 없이 객체를 직접 변경할 수 있다.

즉, 재할당 없이 프로퍼티를 동적으로 추가할 수도 있고 프로퍼티 값을 갱신할 수도 있으며 프로퍼티 자체를 삭제할 수도 있다.

객체는 원시 값과는 다르게 여러 개의 식별자가 하나의 객체를 공유할 수 있다는 단점이 있다.

### 11.2.2 참조에 의한 전달

객체를 가리키는 변수를 다른 변수에 할당하면 원본의 참조 값이 복사되어 전달된다. 이를 참조에 의한 전달이라 한다.

다시 말해, 원본 변수와 사본 변수 모두 동일한 객체를 가리킨다. 두 개의 식별자가 하나의 객체를 공유하는 것을 의미한다.

따라서 한쪽에서 객체를 변경하면 서로 영향을 주고받는다.

결국 '값에 의한 전달'과 '참조에 의한 전달'은 식별자가 기억하는 메모리 공간에 저장되어 있는 값을 복사해서 전달한다는 면에서 동일하다.

다만 식별자가 기억하는 메모리 공간, 즉 변수에 저장되어 있는 값이 원시 값이냐 참조 값이냐의 차이만 있을 뿐이다.

따라서 자바스크립트에는 '참조에 의한 전달'은 존재하지 않고 '값에 의한 전달'만이 존재한다고 말할 수 있다.
