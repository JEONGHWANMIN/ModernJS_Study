### 1. 객체지향 프로그래밍
```javascript
// 반지름과 원의 지름 속성을 갖는 객체
const circle={
	radius: 5; // 반지름
  // 원의 지름
  	getDiameter() {
    	return 2 * this.radius
    }
};

console.log(person); // {name: "Han", address: "Suwon"} 
```
`객체`란 객체의 ** 상태를 나타내는 데이터**와 상태 데이터를 조작할 수 있는 ** 동작**을 ** 하나의 논리적인 단위로 묶은 복합적인 자료구조**를 의미합니다.
이때 객체의 상태 데이터를 프로퍼티(property), 동작을 메서드(method)라고 부릅니다.

** 이렇게 독립적인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임**을 `객체지향 프로그램` 이라고 합니다.

### 2. 상속과 프로토타입
`상속`은 객체지향 프로그래밍의 핵심 개념으로 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 의미합니다.

자바스크립트는 `프로토타입`을 기반으로 상속을 구현하여 불필요한 중복을 제거합니다.

```javascript
// 생성자 함수
function Circle(radius){
	this.radius = radius
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를 
// 공유해서 사용할 수 있도록 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function(){
	return Math.PI * this.radius ** 2;
}

// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
// 프로토타입 Circle.prototype으로부터 getArea 메서드를 상속받는다.
// 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea); // true 
```
Circle 생성자 함수가 생성한 모든 인스턴스는 자신의 프로토타입, 즉 상위(부모) 객체 역할을 하는 Circle.prototype의 모든 프로퍼티와 메서드를 상속받습니다.

### 3. 프로토타입 객체
프로토타입 객체(또는 줄여서 프로토타입)란 객체지향 프로그래밍의 근간을 이루는 객체 간 상속을 구현하기 위해서 사용됩니다.
프로토타입은 어떤 객체의 상위(부모) 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티(메서드 포함)을 제공합니다. 프로토타입을 상속받은 하위(자식)객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 자유롭게 사용할 수 있습니다.

** 프로토타입은 객체 생성 방식에 의해 결정되고 모든 객체의 [[Prototype]]이라는 내부 슬롯에 저장됩니다.**

>**객체 리터럴에 의해 생성된 객체의 프로토타입**은 `Object.prototype`이고, **생성자 함수에 의해 생성된 객체의 프로토타입**은 `생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체` 입니다.

즉 모든 객체는 하나의 프로토타입을 갖습니다. 
![객체와 프로토타입](https://velog.velcdn.com/images/starrypro/post/576356b6-0541-4f36-8f2c-0f2427c9ec27/image.png)

[[Prototype]] 내부 슬롯에는 직접 접근할 수 없지만, 위 그림처럼 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입에 접근할 수 있습니다. 정확히는 자신의 [[prototype]] 내부 슬롯이 가리키는 프로토타입에 간접적으로 접근하는 겁니다.
추가로 프로토타입(프로토타입 객체)은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근할 수 있고, 생성자 함수는 자신의 prototype 프로퍼티를 통해 프로토타입에 접근할 수 있습니다.

### 3-1. `__proto__` 접근자 프로퍼티
** 모든 객체는 `__proto__`접근자 프로퍼티를 통해 자신의 프로토타입, 즉 [[Prototype]] 내부 슬롯에 간접적으로 접근할 수 있습니다. **

![](https://velog.velcdn.com/images/starrypro/post/e94a50ea-9506-45a0-8b78-8a31e6da0e27/image.png)

위 이미지의 [[Prototype]] 부분이 person 객체의 프로토타입인 Object.prototype 입니다. 

<a href="https://velog.io/@starrypro/Part-16.-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0-%EC%96%B4%ED%8A%B8%EB%A6%AC%EB%B7%B0%ED%8A%B8" target="_blank">16장. 프로퍼티 어트리뷰트</a>에서 살펴본 것처럼
접근자 프로퍼티는 자제적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수(accessor function), 즉 [[Get]], [[Set]] 프로퍼티 어트리뷰트로 구성된 프로퍼티입니다.
`__proto__`접근자 프로퍼티도 마찬가지로 getter/setter 함수라고 부르는 접근자 함수([[Get]], [[Set]]프로퍼티 어트리부트에 할당된 함수)를 통해 [[Prototype]] 내부 슬롯의 값, 즉 프로토타입을 취득하거나 할당합니다.

![](https://velog.velcdn.com/images/starrypro/post/bac5624e-2f74-46ba-becd-f62bbc4b1dbe/image.png)

```javascript
const obj = {};
const parent = {x : 3};

// getter 함수인 get __proto__가 호출되어 obj 객체의 프로토타입을 취득
obj.__proto__;

// setter 함수인 set __proto__가 호출되어 obj 객체의 프로토타입을 교체
obj.__proto__ = parent;

console.log(obj.x); // 3
```
- ** `__proto__` 접근자 프로퍼티는 상속을 통해 사용됩니다.**
`__proto__`접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티입니다. 모든 객체는 상속을 통해 Object.prototype.__proto__ 접근자 프로퍼티를 사용하는 겁니다.

>`Object.prototype`
모든 객체는 프로토타입의 계층 구조인 프로토타입 체인에 묶여있습니다. 자바스크립트 엔진은 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면`__proto__`접근자 프로퍼티가 가리키는 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색합니다. 프로토타입 체인의 종점. 즉 프로토타입 체인의 최상위 객체는 Object.prototype이며, 이 객체의 프로퍼티와 메서드는 모든 객체에 상속됩니다.

- `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유
프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서 입니다.

```javascript
const parent = {}
const child = {}

// child의 프로토타입을 parent로 설정
child.__proto__ = parent
// parent의 프로토타입을 child로 설정
parent.__proto__ = child // TypeError: Cyclic __proto__ value
```
프로토타입 체인은 단방향 링크드 리스트로 구현되어야 합니다. 그렇지 않으면 프로토타입 체인에서 프로퍼티를 검색할 때 무한 루프에 빠질 수 있습니다.

위 코드와 같이 서로가 자신의 프로토타입이 되는 비정상적인 프로토타입 체인이 만들어지면 프로토타입 체인 종점이 존재하지 않기 때문에 `__protp__`접근자 프로퍼티는 에러를 발생시킵니다.

- `__proto__` 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않습니다.
직접 상속을 통해 다음과 같이 Object.prototype을 상속받지 않는 객체를 생성할 수도 있기 때문에 `__proto__`접근자 프로퍼티를 사용할 수 없는 경우가 있습니다.

```javascript
// obj는 프로토타입 체인의 종점입니다. 따라서 Object.__proto__를 상속받을 수 없다.
const obj = Object.create(null);
console.log(obj.__proto__); // undefined

// 따라서 __proto__보다 Object.getPrototypeOf 메서드를 사용하는 편이 좋다.
console.log(Object.getPrototypeOf(obj)); // null
```
따라서 `__proto__`접근자 프로퍼티 대신 Object.getPrototypeOf 메서드와 Object.setPrototypeOf 메서드를 사용할 것을 권장하고 있습니다.

```javascript
const obj = {};
const parent = {x : 2};

// obj 객체의 프로토타입을 취득
Object.getPrototypeOf(obj); // obj.__proto__

// obj 객체의 프로토타입을 교체
Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent

console.log(obj.x); //2
```

### 3-2. 함수 객체의 prototype 프로퍼티
** 모든 객체가 가지고 있는(Object.prototype으로부터 상속받은)`__proto__`접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킵니다.** 하지만 이들을 사용하는 주체가 다릅니다.

구분 | 소유 | 값 | 사용 주체 | 사용 목적
--|--|--|--|--
`__proto__`접근자 프로퍼티 | 모든 객체 | 프로토타입의 참조 | 모든 객체 | 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용
prototype 프로퍼티 | constructor | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용

### 3-3 프로토타입의 constructor 프로퍼티와 생성자 함수
모든 프로토타입은 constructor 프로퍼티를 갖습니다. 이 constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킵니다. 이 연결은 생성자 함수가 생성될 때, 즉 함수 객체가 생성될 때 이뤄집니다.
```javascript
// 생성자 함수
function Person(name){
	this.name = name;	
}
const me = new Person('Han');

// me 객체의 생성자 함수는 Person이다.
console.log(me.constructor === Person); //true
```
me 객체에는 constructor 프로퍼티가 없지만 me 객체의 프로토타입인 Person.prototype에는 constructor 프로퍼티가 있습니다. 따라서 me 객체는 프로토타입인 Person.prototype의 constructor 프로퍼티를 상속받아 사용할 수 있습니다.

### 4. 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

```javascript
// 객체 리터럴
const obj = {}

// 함수 리터럴
const add = function (a, b){return a + b}

// 배열 리터럴
const arr = [1, 2, 3]

// 정규 표현식 리터럴
const regexp = /is/ig
```

리터럴 표기법 | 생성자 함수 | 프로토타입
--|--|--
객체 리터럴 | Object | Object.prototype
함수 리터럴 | Function | Function.prototype
배열 리터럴 | Array | Array.prototype
정규 표현식 리터럴 | RegExp | RegExp.prototype

### 5. 프로토타입의 생성 시점
** 프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성됩니다. **

#### 5-1. 사용자 정의 생성자 함수와 프로토타입 생성 시점
><a href="https://velog.io/@starrypro/Part-17.-%EC%83%9D%EC%84%B1%EC%9E%90-%ED%95%A8%EC%88%98%EC%97%90-%EC%9D%98%ED%95%9C-%EA%B0%9D%EC%B2%B4-%EC%83%9D%EC%84%B1" target="_blank">17장 생성자 함수에 의한 객체 생성</a>에서 살펴본 것처럼 내부 메서드 [[Construct]]를 갖는 함수 객체, 즉 화살표 함수나 ES6의 메서드 축약 표현으로 정의하지 않고 일반 함수(함수, 선언문, 함수 표현식)으로 정의한 함수 객체는 new 연산자와 함께 생성자 함수로서 호출할 수 있습니다.

** 생성자 함수로서 호출할 수 있는 함수, 즉 constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성됩니다.**
![](https://velog.velcdn.com/images/starrypro/post/85610406-c777-4171-a2af-278aa03da6f0/image.png)

함수 선언문은 런타임 이전에 자바스크립트 엔진에 의해 먼저 실행되기 때문에 함수 선언문으로 정의된 Person 생성자 함수는 어떤 코드보다 먼저 평가되어 함수 객체가 되고 이때 프로토타입도 더불어 생성됩니다.
생성된 프로토타입은 Person 생성자 함수의 prototype 프로퍼티에 바인딩됩니다.
![](https://velog.velcdn.com/images/starrypro/post/def21325-abd6-4fd2-be56-a7dcd25e9d8d/image.png)

** 생성된 프로토타입은 오직 constructor 프로퍼티만을 갖는 객체입니다. 프로토타입도 객체이고 모든 객체는 프로토타입을 가지므로 프로토타입도 자신의 프로토타입을 갖습니다. 생성된 프로토타입의 프로토타입은 Object.prototype입니다.**

참고로 생성자 함수로서 호출할 수 없는 함수, 즉 non-construct는 프로토타입이 생성되지 않습니다.

```javascript
//화살표 함수는 non-constructor다.
const Person = name => {
	this.name = name;
};

// non-constructor는 프로토타입이 생성되지 않는다.
console.log(Person.prototype); //undefiend
```
#### 5-2 빌트인 생성자 함수와 프로토타입 생성 시점
빌트인 생성자 함수도 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성됩니다.

모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성되고 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩됩니다.

> ** 전역 객체**는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 생성되는 특수한 객체입니다. 전역 객체는 클라이언트 사이드 환경(브라우저)에서는 window, 서버 사이드 환경(Node.js)에서는 global 객체를 의미합니다. 

### 6. 객체 생성 방식과 프로토타입의 결정
객체는 다음과 같이 다양한 생성 방법이 있습니다. 
- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스(ES6)

#### 6-1. 객체 리터럴에 의해 생성된 객체의 프로토타입
자바스크립트 엔진은 객체 리터럴을 평가하여 객체를 생성할 때 추상 연산 OrdinaryObjectCreate를 호출합니다. 이때 추상 연산 OrdinaryObjectCreate에 전달되는 프로토타입은 `Object.prototype`입니다. 즉 객체 리터럴에 의해 생성되는 프로토타입은 Object.prototype입니다.

#### 6-2. Object 생성자 함수에 의해 생성된 객체의 프로토타입
Object 생성자 함수를 호출하면 객체 리터럴과 마찬가지로 추상 연산OrdinaryObjectCreate가 호출됩니다. 이때 추상 연산 OrdinaryObjectCreate에 전달되는 프로토타입은 `Object.prototype`입니다. 즉 Object 생성자 함수에 의해 생성되는 프로토타입은 Object.prototype입니다.

#### 6-3. 생성자 함수에 의해 생성된 객체의 프로토타입
new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하면 다른 객체 생성 방식과 마찬가지로 추상 연산 OrdinaryObjectCreate가 호출됩니다.
이때 추상 연산 OrdinaryObjectCreate에 전달되는 프로토타입은 `생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체`입니다. 즉, 생성자 함수에 의해 생성되는 객체의 프로토타입은 생ㅅ어자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체입니다.

```javascript
function Person(name){
	this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function(){
	console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Han')
const you = new Person('Lee')

me.sayHello(); // Hi! My name is Han
you.sayHello(); // Hi! My name is Lee
```
