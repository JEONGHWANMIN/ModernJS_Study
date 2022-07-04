### 1. 프로토타입 체인
** 프로토타입의 프로토타입은 언제나 Object.prototype**입니다.
자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 [[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색합니다. 이를 `프로토타입 체인`이라고 합니다. 

즉, 자바스크립트 엔진은 객체 간의 상속 관계로 이루어진 프로토타입의 계층적인 구조에서 객체의 프로퍼티를 검색합니다. 따라서 ** 프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘**이라고 할 수 있습니다. 

```javascript
function Person(name){
	this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function(){
	console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Han');

// hasOwnProperty는 Object.prototype의 메서드다.
console.log(me.hasOwnProperty('name')); // true
```

me 객체의 프로토타입은 Person.prototype입니다.
```javascript
Object.getPrototypeOf(me) === Person.prototype; // true
```

Person.prototype의 프로토타입은 Object.prototype입니다.
```javascript
Object.getPrototypeOf(Person.prototype) === Object.prototype; // true
```

프로토타입 체인의 최상위에 위치하는 객체는 언제나 Object.prototype입니다. 따라서 모든 객체는 Object.prototype을 상속받습니다.

**Object.prototype을 프로토타입 체인의 종점(end of prototype chain)**이라 하며, Object.prototype의 프로토타입, 즉 [[Prototype]] 내부 슬롯의 값은 null 입니다.

> 프로퍼티가 아닌 식별자는 스코프 체인에서 검색합니다. 즉, 자바스크립트 엔진은 함수의 중첩 관계로 이루어진 스코프의 계층적 구조에서 식별자를 검색합니다. **스코프 체인은 식별자 검색을 위한 메커니즘**입니다.

```javascript
me.hasOwnProperty('name');
```
위의 예제의 경우 먼저 스코프 체인에서 me식별자를 검색합니다. me 식별자는 전역에서 선언되었으므로 전역 스코프에서 검색되고 me 객체의 프로토타입 체인에서 hasOwnProperty 메서드를 검색합니다.

### 2. 오버라이딩과 프로퍼티 새도잉
- 오버라이딩
상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식

프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 프로토타입 체인을 따라 프로토타입 프로퍼티를 검색하여 프로토타입 프로퍼티를 덮어쓰는 것이 아니라 인스턴스 프로퍼티로 추가합니다.
이때, 인스턴스 메서드는 프로토타입 메서드를 `오버라이딩`하고, 프로토타입 메서드는 가려집니다. 이처럼 상속 관계 의해 프로퍼티가 가려지는 현상을 `프로퍼티 새도잉`이라고 합니다.

---

### 11. 직접 상속
#### 1. Object.create에 의한 직접 상속
Object.create 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성합니다.

```javascript
// 지정된 프로토타입 및 프로퍼티를 갖는 새로운 객체를 생성하여 반환한다.
@param {Object} prototype - 생성할 객체의 프로토타입으로 지정할 객체
@param {Object} [propertiesObject] - 생성할 객체의 프로퍼티를 갖는 객체
@returns {Object} 지정된 프로토타입 및 프로퍼티를 갖는 새로운 객체

Object.create(prototype[, propertiesObject])
```
```javascript
// 프로토타입이 null인 객체를 생성한다. 생성된 객체는 프로토타입 체인의 종점에 위치한다.
// obj -> null
let obj = Object.create(null)
console.log(Object.getPrototypeOf(obj) === null); // true
// Object.prototype을 상속받지 못한다.
console.log(obj.toString()); // TypeError: obj.toString is not a function

obj = Object.create(Object.prototype, {
	x : {value: 1, writable: true, enumerable: true, configurable: true}
});

// 위 코드는 아래와 동일합니다.
// obj = Object.create(Object.prototype);
// obj.x =1;

console.log(obj.x); // 1
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

const myProto = {x : 10};
// 임의의 객체를 직접 상속받는다.
console.log(obj.x); // 10
console.log(Object.getPrototypeOf(obj) === myProto); // true
```
Object.create 메서드의 장점은 다음과 같습니다.
- new 연산자가 없이도 객체를 생성할 수 있다.
- 프로토타입을 지정하면서 객체를 생성할 수 있다.
- 객체 리터럴에 의해 생성된 객체도 상속받을 수 있다.

### 2.객체 리터럴 내부에서 __proto__에 의한 직접 상속
권장하는 방법은 아니지만 이렇게 코드 구현도 가능하다.

```javascript
const myProto = {x : 10};

// 객체 리터럴에 의해 객체를 생성하면서 프로토타입을 지정하여 직접 상속받을 수 있다.
const obj = {
	y : 20,
  // 객체를 직접 상속받는다.
  __proto__: myProto
};
// 위 코드는 아래와 동일하다
/*const obj = Object.create(myProto, {
	y: {value: 20, writable: true, enumerable: true, configurable: true}
})
*/

console.log(obj.x, obj.y); // 10 20
console.log(Object.getPrototypeOf(obj) === myProto); // true
```
### 12. 정적 프로퍼티/메서드
정적(static)프로퍼티/메서드는 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메서드를 말합니다.

```javascript
// 생성자 함수
function Person(name){
	this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function(){
	console.log(`Hi! My name is ${this.name}`)
}

// 정적 프로퍼티
Person.staticProp = 'static prop'

// 정적 메서드
Person.staticMethod = function(){
	console.log('staticMethod')
}

const me = new Person('Han');

// 생성자 함수에 추가한 정적 프로퍼티/메서드는 생성자 함수로 참조/호출한다.
Person.staticMethod(); // staticMethod

// 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.
// 인스턴스로 참조/호출할 수 있는 프로퍼티/메서드는 프로토타입 체인 상에 존재해야 한다.
me.staticMethod(); // TypeError : me.staticMethod is not a function
```
Person 생성자 함수 객체가 소유한 프로퍼티/메서드를 정적 프로퍼티/메서드라고 합니다. 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없습니다.

