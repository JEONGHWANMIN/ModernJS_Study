# 16장 프로퍼티 어트리뷰트

## 16.1 내부 슬롯과 내부 메서드

내부 슬롯과 내부 메서드는 자바스크립트 엔진에서 실제로 동작하지만 개발자가 직접 접근할 수 있도록 외부로 공개된 객체의 프로퍼티는 아니다.

원칙적으로 자바스크립트는 내부 슬롯과 내부 메서드에 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않지만 일부에 한하여 간접적으로 접근할 수 있는 수단을 제공한다.

예를 들어, 모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖는다. 원칙적으로는 여기에 접근할 수 없지만 **proto**를 통해 간접적으로 접근할 수 있다.

## 16.2 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.

프로퍼티 어트리뷰티에 직접 접근할 수는 없지만 Object.getOwnPropertyDescriptor 메서드를 사용하여 간접적으로 확인할 수 있다.

이 메서드는 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.

## 16.3 데이터 프로퍼티와 접근자 프로퍼티

- 데이터 프로퍼티 : 키와 값으로 구성된 일반적인 프로퍼티

- 접근자 프로퍼티 : 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티

### 데이터 프로퍼티

- value 어트리뷰트 : 프로퍼티의 값

- writable 어트리뷰트 : 프로퍼티 값의 변경 가능 여부

- enumerable 어트리뷰트 : 프로퍼티의 열거 가능 여부

- configurable 어트리뷰트 : 프로퍼티의 재정의 가능 여부

### 접근자 프로퍼티

- get 어트리뷰트 : 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수

- set 어트리뷰트 : 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수

- enumerable 어트리뷰트 : 프로퍼티의 열거 가능 여부

- configurable 어트리뷰트 : 프로퍼티의 재정의 가능 여부

## 16.4 프로퍼티 정의

프로퍼티 정의란 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나 기존 프로퍼티의 어트리뷰트를 재정의하는 것을 말한다.

## 16.5 객체 변경 방지

객체는 변경 가능한 값이므로 재할당 없이 직접 변경할 수 있다.

자바스크립트는 객체의 변경을 방지하는 다양한 메서드를 제공한다.

### 객체 확장 금지

Object.preventExtensions 메서드는 객체의 확장을 금지한다. 객체 확장 금지란 프로퍼티 추가 금지를 의미한다.

### 객체 밀봉

Object.seal 메서드는 객체를 밀봉한다. 객체 밀봉이란 프로퍼티 추가 및 삭제와 어트리뷰트 재정의 금지를 의마한다. 즉, 밀봉된 객체는 읽기와 쓰기만 가능하다.

### 객체 동결

Object.freeze 메서드는 객체를 동결한다. 객체 동결이란 프로퍼티 추가 및 삭제와 어트리뷰트 재정의 금지, 프로퍼티 값 갱신 금지를 의마한다. 즉, 동결된 객체는 읽기만 가능하다.

### 불변 객체

위의 변경 방지 메서드들은 얕은 변경 방지로 직속 프로퍼티만 변경이 방지되고 중첩 객체까지는 영향을 주지 못한다.

객체의 중첩 객체까지 동결하여 불변 객체를 구현하려면 객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 Object.freeze 메서드를 호출해야 한다.
