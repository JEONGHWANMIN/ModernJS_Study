# 19장 프로토타입

## 19.1 객체지향 프로그래밍

* 자바스크립트는 객체 기반의 프로그래밍 언어이며 자바스크립트를 이루고 있는 거의 "모든 것"이 객체다. 원시 타입<sup>primitive type</sup>의 값을 제외한 나머지 값들(함수, 배열, 정규 표현식 등)은 모두 객체다.

* 객체지향 프로그래밍은 프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 명령형 프로그래밍<sup>imperative programming</sup>의 절차지향적 관점에서 벗어나 여러 개의 독립적 단위, 즉 객체<sup>object</sup>의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다.

* 객체지향 프로그래밍은 실세계의 실체(사물이나 개념)를 인식하는 철학적 사고를 프로그래밍에 접목하려는 시도에서 시작한다.

* 실체는 특징이나 성질을 나타내는 속성<sup>attribute/property</sup>을 가지고 있고, 이를 통해 실체를 인식하거나 구별할 수 있다.
```
DOM을 조작할 떄
const input = document.createElement('input')
input.setAttribute("type", "checkbox")

를 통해 <input type="checkbox"> 를 생성할 수 있었다. 
input.type = "checkbox" 처럼
객체에 프로퍼티키와 값을 추가하듯이 추가할 수 있었다.
setAttribute의 attribute와 property가 모두 속성을 의미한다는 걸 상기했다.
```

## 19.1.1 추상화
* 예를 들어, 사람은 이름, 주소, 성별, 나이, 신장, 체중, 학력, 성격, 직업 등 다양한 속성을 갖는다. 
* 속성을 구체적으로 표현하면 특정한 사람을 다른 사람과 구별하여 인식할 수 있다.
* 우리가 구현하려는 프로그램에서는 사람의 "이름"과 "주소"라는 속성에만 관심이 있다고 가정하자. 이처럼 다양한 속성 중에서 프로그램에 필요한 속성만 간추려 내어 표현하려는 것을 추상화<sup>추상화</sup>라 한다.

* 이름과 주소 속성으로 표현된 객체(object)인 person을 다른 객체와 구별하여 인식할 수 있다. 
* 이처럼 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료 구조를 객체라 하며, 
* 객체지향 프로그래밍은 독립적인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임이다.

## 객체 상태, 메서드
```
function Circle = {
    radius : 5,;//반지름
    //원의 지름
    getDiameter() {
        return 2 * this.radius
    }
}
```
* 속성<sup>attribute/property</sup>은 객체의 상태를 나타내는 데이터이며, (원에 반지름이라는 속성)
* 메서드<sup>method</sup>는 동작이다. (반지름을 가지고 원의 지름을 구할 수 있다.)
* 객체 지향 프로그래밍은 객체의 상태<sup>state</sup>를 나타내는 데이터와 상태 데이터를 조작할 수 있는 동작<sup>behavior</sup>을 하나의 논리적인 단위로 묶어 생각한다.
* 따라서 객체는 **상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조**라고 할 수 있다.
* 각 객체는 고유의 기능을 갖는 독립적인 부품으로 볼 수 있지만 자신의 고유한 기능을 수행하면서 다른 객체와 관계성<sup>relationshipt</sup>을 가질 수 있다.
* 다른 객체와 메시지를 주고 받거나 데이터를 처리할 수도 있다.
* 또는 다른 객체의 상태 데이터나 동작을 상속받아 사용하기도 한다.

## 19.2 상속과 프로토타입
* 상속<sup>inheritance</sup>은 객체지향 프로그래밍의 핵심 개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다.
* 자바스크립트는 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거한다. 중복을 제거하는 방법은 기존의 코드를 적극적으로 재사용하는 것이다. 
* 코드의 재사용은 개발비용을 현저히 줄일 수 있는 잠재력이 있으므로 매우 중요하다. 

* 생성자 함수는 동일한 프로퍼티(메서드를 포함한) 구조를 갖는 객체를 여러 개 생성할 떄 유용하다. 하지만 생성자 함수는 문제가 있다.

* 생성자 함수가 생성하는 모든 객체(인스턴스)는 프로퍼티와 메서드를 갖는다.
* 프로퍼티 값은 일반적으로 인스턴스마다 다르다.
* 하지만 메서드는 모든 인스턴스가 동일한 내용의 메서드를 사용하므로 단 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
* 즉 생성자 함수가 생성한 모든 인스턴스는 똑같이 동작하는 메서드를 중복 생성하고 중복 소유하고 있다.
* 이처럼 동일한 생성자 함수에 의해 생성된 모든 인스턴스가 동일한 메서드를 중복 소유하는 것은 메모리를 불필요하게 낭비한다.
* 또한 인스턴스를 생성할 때마다 메서드를 생성하므로 성능에도 약영향을 준다. (10개의 인스턴스를 생성하면 똑같이 동작하는 메서드도 10개 생성된다.)
* 상속을 통해 불필요한 중복을 제거할 수 있다. 자바스크립트는 프로토타입<sup>prototype</sup>을 기반으로 상속을 구현한다.
```
function Circle = {
    radius : 5,;//반지름
    //원의 지름
}
Circle.prototype.getDiameter = function() {
    return 2 * this.radius
}

const circle1 = new Circle(1);
const circle2 = new Circle(2);

const circle = new Circle(2);
console.log(circle1.getDiameter === circue2.getDiameter) //true
console.log(circle1.getDiameter()) // 2
console.log(circle2.getDiameter()) // 4
```


## 19.3 프로토타입 객체
* 프로토타입 객체(프로토타입)란 객체지향 프로그래밍의 근간을 이루는 객체간 상속<sup>inheritance</sup> 을 구현하기 위해 사용된다.
* 프로토타입은 어떤 객체의 상위(부모) 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티(메서드 포함)를 제공한다.
* 프로토타입을 상속받은 하위(자식)객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 자유롭게 사용할 수 있다.

* 모든 객체는 `[[Prototype]]`이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조(null인 경우도 있다.)다.
* `[[Prototype]]`에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다.
* 즉, 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고 `[[Prototype]]`에 저장된다.

* 객체리터럴에 의해 생성된 객체의 프로토타입은 Object.prototype이고 생성자 함수에 의해 생성된 객체의 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩 되어있는 객체다.

* 모든 객체는 하나의 프로토타입을 갖는다. 그리고 모든 프로토타입은 생성자 함수와 연결되어 있다.
* `[[Prototype]]` 내부 슬롯에는 직접 접근할 수 없지만, `__proto__`접근자 프로퍼티를 통해 자신의 프로토타입, 즉 자신의 `[[Prototype]]` 내부 슬롯이 가리키는 프로토타입에 간접적으로 접근할 수 있다.

* 프로토타입은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근할 수 있고, 생성자 함수는 자신의 prototype 프로퍼티를 통해 프로토타입에 접근할 수 있다.

## extra 프로토타입 상속
* 자바스크립트의 객체는 명세서<sup>specification</sup> 에서 명명한 `[[Prototype]]` 이라는 숨긴 프로퍼티를 갖는다.
* `[[Prototype]]`값은 null이거나 다른 객체에 대한 참조가 되는데, 다른 객체를 참조하는 경우 참조 대상을 '프로토타입(prototype)'이라 부른다.
* object에서 프로퍼티를 읽으려고 하는데 해당 프로퍼티가 없으면 자바스크립트는 자동으로 프로토타입에서 프로퍼티를 찾는다.
* 프로그래밍에선 이런 동작 방식을 '프로토타입 상속'이라 부른다.

* `__proto__`는 `[[Prototype]]`용 getter, setter이다.
    * `__proto__`는 `[[Prototype]]`과 다르다.
    * `__proto__`는 `[[Prototype]]`의 getter(획득자)이자 setter(설정자)이다.
    * 하위 호환성 때문에 여전히 `__proto__`를 사용할 순 있지만 대신에 Object.getPrototypeOf나 Object.setPrototypeOf을 써서 프로토타입을 획득(get)하거나 설정(set)한다.
    * `__proto__`는 브라우저 환경에서만 지원하도록 자바스크립트 명세서에서 규정했는데, 실상은 서버사이드를 포함한 모든 호스트 환경에서 `__proto__`를 지원한다.

## 19.3.1 __proto__ 접근자 프로퍼티
* 모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 `[[Prototype]]` 내부 슬롯에 간접적으로 접근할 수 있다. 

## 19.3.1  (1)`__proto__`는 접근자 프로퍼티다.
* 내부 슬롯은 프로퍼티가 아니다 따라서 자바스크립트는 원칙적으로 내부 슬롯과 내부 메서드에 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않는다. 
* `[[Prototype]]` 내부 슬롯에도 직접 접근할 수 없으며 `__proto__` 접근자 프로퍼티를 통해 간접적으로 `[[Prototype]]`내부 슬롯의 값, 즉 프로토타입에 접근할 수 있다.
* 접근자 프로퍼티는 자체적으로는 값(`[[Value]]` 프로퍼티 어트리뷰트)을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 떄 사용하는 접근자 함수(accessor function), 즉 `[[Get]], [[Set]]` 프로퍼티 어트리뷰트로 구성된 프로퍼티다. 

* Object.prototype의 접근자 프로퍼티인 `__proto__`는 getter/setter 함수라고 부르는 접근자 함수(`[[Get]], [[Set]]` 프로퍼티 어트리뷰트에 할당된 함수)를 통해 `[[Prototype]]`내부 슬롯의 값, 즉, 프로토타입을 취득하거나 할당한다. 

* `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하면 내부적으로 `__proto__` 접근자 프로퍼티의 getter 함수인 ([Get])이 호출된다. 
* `__proto__` 접근자 프로퍼티를 통해 새로운 프로토타입을 할당하면 `__proto__` 접근자 프로퍼티의 setter함수인 ([Set])이 호출된다.

## 19.3.1 (2) `__proto__` 접근자 프로퍼티는 상속을 통해 사용된다.
* `__proto__` 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티다.
* 모든 객체는 상속을 통해 Object.prototype.`__proto__` 접근자 프로퍼티를 사용할 수 있다.

## Object.prototype
* 모든 객체는 프로토타입의 계층 구조인 프로토타입 체인에 묶여 있다. 
* 자바스크립트 엔진은 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 `__prototype__` 접근자 프로퍼티가 가리키는 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다.
* 프로토타입 체인의 종점, 즉 프로토타입 체인의 최상위 객체는 Object.prototype이며, 이 객체의 프로퍼티와 메서드는 모든 객체에 상속된다.


## 19.3.1 (3) `__proto__`접근자 프로퍼티를 통해 프로토타입에 접근하는 이유
* `[[Prototype]]` 내부 슬롯의 값, 즉 프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지 하기 위해서다.
```
const parent = {}
const child = {}

child.__proto__  = parent;
parent.__proto__ = child;
```
* 위 예제에서는 parent 객체를 child객체의 프로토타입으로 설정한 후, child 객체를 parent 객체의 프로토타입으로 설정했다.
* 이러한 코드가 에러 없이 정상 처리되면 서로가 자신의 프로토타입이 되는 비정상적인 프로토타입 체인이 만들어 지기 때문에 `__proto__`접근자 프로퍼티는 에러를 발생시킨다.

* 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다. 즉, 프로퍼티 검색 방향이 한쪽 방향으로만 흘러가야 한다. 
* 하지만 서로가 자신의 프로토타입이 되는 순환 참조하는 프로토타입 체인이 만들어지면 프로토타입 체인 종점이 존재하지 않기 때문에 프로토타입 체인에서 프로퍼티를 검색할 때 무한 루프에 빠진다. 
* 따라서 아무런 체크 없이 무조건적으로 프로토타입을 교체할 수 없도록 `__proto__`접근자를 통해 프로토타입에 접근하고 교체하도록 구현할 수 있다. 

## 19.3.1 (4) `__proto__` 접근자를 코드 내에서 직접 사용하는 것은 권장되지 않는다.
* `__proto__`접근자 프로퍼티는 ES5까지 ECMAScript 사양에 포함되지 않은 비표준이었다. 
* 하지만 일부 브라우저에서 `__proto__`를 지원하고 있었기 때문에 브라우저 호환성을 고려하여 ES6에서 `__proto__`를 표준으로 채택했다. 현재 대부분의 브라우저(IE 11 이상)가 `__proto__`를 지원한다.

* 하지만 코드 내에서 `__proto__`접근자 프로퍼티를 직접 사용하는 거은 권장하지 않는다.
* 모든 객체가 `__proto__`접근자를 사용할 수 있는 것은 아니기 때문이다. 
* 나중에 살펴보겠지만 직접 상속을 통해 다음과 같이 Object.prototype을 상속받지 않는 객체를 생성할 수도 있기 때문에 `__proto__`접근자 프로퍼티를 사용할 수 없는 경우가 있다.

```
//obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__를 상속받을 수 없다.
const obj = Object.create(null);

//obj는 Object.__proto__를 상속받을 수 없다.
console.log(obj.__proto__);//undefined

//따라서 __proto__ 보다 Object.getPrototypeOf 메서드를 사용하는 편이 좋다.
console.log(Object.getPrototypeof(obj)); //null
```
* 따라서 `__proto__` 접근자 프로퍼티 대신 프로토타입의 참조를 취득하고 싶은 경우에는 Object.getPrototype 메서드를 사용하고, 프로토타입을 교체하고 싶은 경우에는 Object.setPrototypeOf 메서드를 사용할 것을 권장한다.

* Object.create(proto, [descriptors]) : `[[Prototype]]`이 proto를 참조하는 빈 객체를 만듭니다. 이때 프로퍼티 설명자를 추가로 넘길 수 있습니다.

* Object.getPrototypeOf(obj) : obj의 `[[Prototype]]`을 반환합니다.

* Object.setPrototypeOf(obj, proto) : obj의 `[[Prototype]]`이 proto가 되도록 설정합니다.


```
let Lee = {
  lastName: 'lee'
};

let changhoon = Object.create(Lee);
chanhoon.lastName // 'lee'

Object.getPrototypeOf(changhoon) === Lee // true

let jung = {}
Object.setPrototypeOf(jung, Lee)
jung.lastName // 'lee'

let bro = Object.create(Object.getPrototypeOf(Lee), Object.getOwnPropertyDescriptors(Lee));
bro.__proto__// undefined

```


```
const obj = {};
const parent = { x : 1};

// obj 객체의 프로토타입을 취득
Object.getPrototypeOf(obj); //obj.__proto__;
// obj 객체의 프로토타입을 교체
Object.setPrototypeOf(obj, parent); obj.__proto__ = parent;

console.log(obj.x) = //1 
```
* Object.getPrototypeOf 메서드와 Object.setPrototype 메서드는 getObject.prototype.`__proto__`의 처리 내용과 일치한다. 

* Object.getPrototypeOf 메서드는 ES5에서 도입된 메서드이며, IE9 이상에서 지원한다. Object.setPrototypeOf메서드는 ES6에서 도입된 메서드이며, IE  11이상에서 지원한다.

## 19.3.2 함수 객체의 prototype 프로퍼티
* 함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.
* 함수 객체는 prototype을 소유한다, 일반 객체는 prototype 프로퍼티를 소유하지 않는다.


* prototype 프로퍼티는 생성자 함수가 생성할 객체(인스턴스)의 프로토타입을 가리킨다.
* 따라서 생성자 함수로서 호출할 수 없는 함수, 즉 non-constructor인 화살표 함수와 ES6 메서드 축약 표현으로 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다.

```
//화살표 함수는 non-constructor이다.
const Person = name => {
    this.name = name;
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(Person.hasOwnProperty('prototype')) // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(Person.prototype); //undefined

// ES6의 메서드 축약 표현으로 정의한 non-constructor이다.
const obj = {
    foo(){}
},

//non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(obj.foo.hasOwnProperty('prototype')); //false

//non-constructor는 프로토타입을 생성하지 않는다.
console.log(obj.foo.prototype); //undefined
```

* 생성자 함수로 호출하기 위해 정의하지 않은 일반 함수(함수 선언문, 함수 표현식)도 prototype 프로퍼티를 소유하지만 객체를 생성하지 않는 일반 함수의 prototype 프로퍼티는 아무런 의미가 없다.

* 모든 객체가 가지고 있는(엄밀히 말하면 Object.prototype으로부터 상속받은)`__proto__` 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킨다. 
* 하지만 이들 프로퍼티를 사용하는 주체가 다르다.

|구분|소유|값|사용|주체|사용목적|
|------|---|---|---|---|---|
|`__proto__`접근자 프로퍼티|모든 객체|프로토타입의 참조|모든 객체|객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용|
|prototype 프로퍼티|constructor|프로토타입의 참조|생성자 함수|생성자함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용|

* 예를 들어, 생성자 함수로 객체를 생성한 후 `__proto__` 접근자 프로퍼티와 prototype 프로퍼티로 프로토타입 객체에 접근해보자.

```
//생성자 함수
function Person(name) {
    this.name = name;
}

const me = new Person('Lee');
// 결국 Person.prototype과 me.__proto__ 는 동일한 프로토타입을 가리킨다.
console.log(Person.prototype === me.__proto__)
```

## extra 함수의 prototype 프로퍼티
* 개발자가 특별히 할당하지 않더라도 모든 함수는 기본적으로 "prototype" 프로퍼티를 갖는다.
* 디폴트 프로퍼티 "prototype"은 constructor 프로퍼티 하나만 있는 객체를 가리키는데, 여기서 constructor 프로퍼티는 함수 자신을 가리킨다.
```
function Hello() {}
Hello.prototype.constructor === Hello // true

function Rabbit(name) {
  this.name = name;
}

let rabbit = new Rabbit("흰 토끼");
let rabbit2 = new rabbit.constructor("검정 토끼");
rabbit.name// "흰 토끼"
rabbit2.name// "검정 토끼"


```

## 19.3.3 프로토타입의 constructor 프로퍼티와 생성자 함수
* 모든 프로토타입은 constructor 프로퍼티를 갖는다. 
* 이 constructor 프로퍼티는 prototype 프로퍼티로 자기 자신을 참조하고 있는 생성자 함수를 가리킨다.
* 이 연결은 생성자 함수가 생성될 때, 즉 함수 객체가 생성될 때 이뤄진다.

```
// 생성자 함수
function Person(name) {
    this.name = name;
}
const me = new Person('Lee');
// me 객체의 생성자 함수는 Person 이다.
console.log(me.constructor === person); //true
```
* 위 예제에서 Person 생성자 함수는 me 객체를 생성했다.
* 이때 me 객체는 프로토타입의 constructor 프로퍼티를 통해 생성자 함수와 연결된다.
* me 객체에는 constructor 프로퍼티가 없지만 me 객체의 프로토타입인 Person.prototype 에는 constructor 프로퍼티가 있다.

* 따라서 me 객체는 프로토타입인 Person.prototype의 constructor 프로퍼티를 상속받아 사용할 수 있다.

## 19.4 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

* 생성자 함수에 의해 생성된 인스턴스는 프로토타입의 constructor 프로퍼티에 의해 생성자 함수와 연결된다.

* 이때 constructor 프로퍼티가 가리키는 생성자 함수는 인스턴스를 생성한 생성자 함수다.

```
//obj 객체를 생성한 생성자 함수는 Object다.
const obj = new Object();
console.log(obj.constructor === Object); // true

//add 함수 객체를 생성한 생성자 함수는 Function이다.
const add = new Function ('a', 'b', 'return a + b');
console.log(add.constructor === Function); //true

//생성자 함수
function Person(name) {
    this.name = name;
}

// me 객체를 생성한 생성자 함수는 Person이다.
const me = new Person('Lee');
console.log(me.constructor === Person) // true
```
* 하지만 리터럴 표기법에 의한 객체 생성 방식과 같이 명시적으로 new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하지 않는 방식도 있다.

```
//객체 리터럴
const obj = {};
//함수 리터럴
const add = function(a,b) { return a + b}
//배열 리터럴
const arr = [1, 2, 3];
//정규 표현식 리터럴
const regexp = /is/ig;
```
* 리터럴 표기법에 의해 생성된 객체도 물론 프로토타입이 존재한다.
* 하지만 리터럴 표기법에 의해 생성된 객체의 경우 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수는 없다.

```
// obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성했다.
const obj = {};
// 하지만 obj 객체의 생성자 함수는 Object 생성자 함수다.
console.log(obj.constructor === Object); // true
```
* 위 예제의 obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴에 의해 생성된 객체다.

* 하지만 obj 객체는 Object 생성자 함수와 constructor 프로퍼티로 연결되어 있다.

* 그렇다면 객체 리터럴에 의해 생성된 객체는 사실 Object 생성자 함수로 생성되는 것일까 ?

* Object 생성자 함수는 다음과 같이 구현하도록 정의되어 있다.

```
Object([value])
When the Object function is calle with optional argument value, the following steps aore taken:
1. If New Target is neither unfined nor the active function, then a. Return? OrdinaryCreateFromConstructor(NewTarget,Object.prototype)
2. If value is undefined or null, return OrdinaryObjectCreate(Object.prototype)
3. Return ! ToObject(value)

The "length" property of the Object constructor function is 1
```
* 2에서 Object 생성자 함수에 인수를 전달하지 않거나 undefined 또는 null을 인수로 전달하면서 호출하면 내부적으로는 추상 연산 OrdinaryObjectCreate를 호출하여 Object.prototype을 프로토타입으로 갖는 빈 객체를 생성한다.

```
// foo 함수는 Function 생성자 함수로 생성한 함수 객체가 아니라 함수 선언문으로 생성했다.
function foo() {}

// 하지만 constructor 프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 Function 생성자 함수다.
console.log(foo.constructor === Function); //true
```
* 리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하다.

* 따라서 리터럴 표기법에 의해 생성된 객체도 가상적인 생성자 함수를 갖는다.

* 프로토타입은 생성자 함수와 더불어 생성되며 prototype, constructor 프로퍼티에 의해 연결되어 있기 때문이다.

* 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재한다.

* 리터럴 표기법에 의해 생성된 객체는 생성자 함수에 의해 생성된 객체는 아니다.

* 하지만 큰 틀에서 생각해보면 리터럴 표기법으로 생성한 객체도 생성자 함수로 생성한 객체와 본질적인 면에서 큰 차이는 없다.

* 예를 들어, 객체 리터럴에의해 생성한 객체와 Object 생성자 함수에 의해 생성한 객체는 생성 과정에 미묘한 차이는 있지만 결국 객체로서 동일한 특성을 갖는다.

* 함수 리터럴에 의해 생성한 함수와 Function 생성자 함수에 의해 생성한 함수는 생성 과정과 스코프, 클로저 등의 차이가 있지만 결국 함수로서 동일한 특성을 갖는다.

* 따라서 프로토타입의 constructor 프로퍼티를 통해 연결되어 있는 생성자 함수를 리터럴 표기법으로 생성한 객체를 생성한 생성자 함수로 생각해도 무리가 없다.



## 19.5 프로토타입의 생성 시점
* 객체는 리터럴 표기법 또는 생성자 함수에 의해 생성되므로 결국 모든 객체는 생성자 함수와 연결되어 있다.

* 프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.
* 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재하기 때문이다.

* 생성자 함수는 사용자가 직접 정의한 사용자 정의 생성자 함수와 자바스크립트가 기본 제공하는 빌트인 생성자 함수로 구분할 수 있다.

## 19.5.1 사용자 정의 생성자 함수와 프로토타입 생성 시점
* 내부 메서드 `[[Construct]]]`를 갖는 함수 객체, 즉 화살표 함수나 ES6의 메서드 축약 표현으로 정의하지 않고 일반 함수(함수 선언문, 함수 표현식)로 정의한 함수 객체는 new연산자와 함께 생성자 함수로서 호출할 수 있다.

* 생성자 함수로서 호출할 수 있는 함수, 즉 constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토 타입도 더불어 생성된다.

```
//함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
console.log(Person.prototype); // {constructor: f}

// 생성자 함수
function Person(name){
    this.name = name;
}
```
* 생성자 함수로서 호출할 수 없는 함수, 즉 non-constructor는 프로토타입이 생성되지 않는다.
```
//화살표 함수는 non-constructor다.
const Person = name => {
    this.name = name;
}
//non-constructor는 프로토타입이 생성되지 않는다.
console.log(Person.prototype); //undefined
```

* 함수 선언문은 런타임 이전에 자바스크립트에 의해 먼저 실행된다. 따라서 함수 선언문으로 정의된 Person 생성자 함수는 어떤 코드 보다 먼저 평가되어 함수 객체가 된다. 

* 이때 프로토타입도 더불어 생성된다. 생성된 프로토타입은 Person 생성자 함수의 prototype 프로퍼티에 바인딩된다.

* 생성된 프로토타입은 오직 constructor 프로퍼티만을 갖는 객체다. 프로토타입도 객체이고 모든 객체는 프로토타입을 가지므로 프로토타입도 자신의 프로토타입을 갖는다. 

* 생성된 프로토타입의 프로타타입은 Object.prototype이다.

* 이처럼 빌트인 생성자 함수가 아닌 사용자 정의 생성자 함수는 자신이 평가되어 함수 객체로 생성되는 시점에 프로토타입도 더불어 생성되며, 생성된 프로토타입의 프로토타입은 언제나 Object.prototype이다.

## 19.5.2 빌트인 생성자 함수와 프로토타입 생성 시점
* Object, String, Number, Function, Array, RegExp, Date, Promise 등과 같은 빌트인 생성자 함수도 일반 함수와 마찬가지로 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성된다.

* 모든 빌트인 생성자 함수는 전역 객체가 되는 시점에 생성된다.

* 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩 된다. 

## 전역 객체 <sup>global object</sup>
* 전역 객체는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 생성되는 특수한 객체다.

* 전역 객체는 클라이언트 사이드 환경(브라우저)에서는 window, 서버 사이드 환경(Node.js)에서는 global 객체를 의미한다.

* 전영 객체는 표준 빌트인 객체(Object, String, Number, Function, Array...)들과 환경에 따른 호스트 객체(클라이언트 Web API 또는 Node.js의 호스트 API)그리고 var 키워드로 선언한 전역 변수와 전역함수를 프로퍼티로 갖는다. 

* Math, Reflect, JSON을 제외한 표준 빌트인 객체는 모두 생성자 함수다.

* 이처럼 객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화되어 존재한다. 

* 이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 `[[Prototype]]` 내부 슬록세 할당된다.

* 이로써 생성된 객체는 프로토타입을 상속받는다.

## 19.6 객체 생성 방식과 프로토타입의 결정
* 객체는 다음과 같이 다양한 생성 방법이 있다.
    * 객체리터럴
    * Object 생성자 함수
    * 생성자 함수
    * Object.create 메서드
    * 클래스(ES6)

* 이처럼 다양한 방식으로 생성된 모든 객체는 각 방식마다 세부적인 객체 생성 방식의 차이는 있으나 추상 연산에 의해 생성된다는 공통점이 있다.

* 추상 연산 OrdinaryObjectCreate는 필수적으로 자신이 생성할 객체의 프로토타입을 인수로 전달받는다.

* 그리고 자신이 생성할 객체에 추가할 프로퍼티 목록을 옵션으로 전달할 수 있다.

* 추상 연산은 빈 객체를 생성한 후, 객체에 추가할 프로퍼티 목록이 인수로 전달된 경우 프로퍼티를 객체에 추가한다.

* 그리고 인수로 전달받은 프로토타입을 자신이 생성한 객체의 `[[Prototype]]`내부 슬롯에 할당한 다음, 생성한 객체를 반환한다.

* 즉, 프로토타입은 추상 연산에 전달되는 인수에 의해 결정된다.

* 이 인수는 객체가 생성되는 시점에 객체 생성 방식에 의해 결정된다.

## 19.6.1 객체 리터럴에 의해 생성된 객체의 프로토타입
* 자바스크립트 엔진은 객체 리터럴을 평가하여 객체를 생성할 떄 추상 연산 OrdinaryObjectCreate를 호출한다.

* 이때 추상 연산에 전달되는 프로토타입은 Object.prototype이다. 

* 즉, 객체 리터럴에 의해 생성되는 객체의 프로토타입은 Object.prototype 이다.

* 이처럼 객체 리터럴에 의해 생성된 객체는 Object.prototype을 프로토타입으로 갖게되며, 이로써 Object.prototype을 상속받는다.

* Obj 객체는 constructor 프로퍼티와 hasOwnProperty 메서드 등을 소유하지 않지만 자신의 프로토타입인 Object.prototype인 Object.prototype의 constructor프로퍼티와 hasOwnProperty 메서드를 자신의 자산인 것 처럼 자유롭게 사용할 수 있다.

* 이는 obj 객체가 자신의 프로토타입인 Object.prototype 객체를 상속받았기 때문이다.

## 19.6.2 Object 생성자 함수에 의해 생성된 객체의 프로토타입

* Object 생성자 함수를 인수 없이 호출하면 빈 객체가 생성된다. 
