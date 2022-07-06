# 19장 프로토타입

## 19.7 프로토타입 체인

* 프로토타입의 프로토타입은 언제나 Objevt.prototype이다.

```
function King(name, age){
    this.name = name
    this.age = age
}

King.prototype.age = function(){
    retrun console.log(`I'm ${this.age} years old`)
},

const taeJong = new King('방원',40);

console.log(taejong.hasOwnProperty('age')); //true

Object.getPrototypeOf(taeJong) === King.prototype; // true
```
* King.prototype의 프로토타입은 Object.prototype이다. 프로토타입의 프로토타입은 언제나 Object.prototype이다.


---

# 프로토타입	체인

```
function Person(name){
	this.name;
}

Person.prototype.sayHello = function(){
	console.log(`Hi My name is ${this.name}`)
}

const me = new Person('Lee')

console.log(me.hasOwnProperty('name')); //true
```

* Person 생성자 함수에 의해 생성된 me 객체는 Object.prototype의 메서드인 hasOwnProperty를 호출할 수 있으므로 me 객체는 Person.prototype 뿐 아니라 Object.prototype도 상속받았다는 것을 의미한다.

* Person.prototype의 프로토타입은 Object.prototype이다.

* 모든 객체는 Object.prototype을 상속받는다. 

* 프로토타입의 프로토타입은 언제나 Object.prototype(end of prototype chain)이다.

* 따라서 Object.prototype의 프로토타입, 즉 `[[Prototype]]` 내부 슬롯의 값은 null이다.

* Object.prototype에서도 프로퍼티를 검색할 수 없는 경우 undefined를 반환한다. 에러가 발생하지 않는다!

* 자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 `[[Prototype]]` 내부 슬롯의 참조를 따라 자신의 부모역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색하다. 

* 이를 프로토타입 체인이라 한다. 

* 프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 메커니즘이다.

## me.hasOwnProperty('name')의 검색 과정

1. 먼저 hasOwnProperty 메서드를 호출한 me 객체에서 hasOwnProperty 메서드를 검색한다.

2. me 객체에는 hasOwnProperty 메서드가 없으므로 프로토타입 체인을 따라, 다시 말해 `[[Prototype]]` 내부 슬롯에 바인딩되어 있는 프로토타입으로 이동하여 hasOwnProperty 메서드를 검색한다.

3. Person.prototype에도 hasOwnProperty 메서드가 없으므로 프로토타입 체인을 따라, 다시 말해 `[[Prototype]]` 내부 슬롯에 바인딩되어 있는 프로토타입으로 이동하여 hasOwnProperty 메서드를 검색한다.

4. Object.prototype에는 hasOwnProperty 메서드가 존재한다. 자바스크립트 엔진은 Object.prototype.hasOwnProperty 메서드를 호출한다. 이때 Object.prototype.hasOwnProperty 메서드의 this에는 me 객체가 바인딩된다.

```
Object.prototype.hasOwnProperty.call(me, 'name')
```

* call 메서드는 this로 사용할 객체를 전달하면서 함수를 호출한다. this로 사용할 me 객체를 전달하면서 Object.prototype.hasOwnProperty 메서드를 호출한다.

## 19.8 오버라이딩과 프로퍼티 섀도잉

## 19.9 프로토타입의 교체

* 프로토타입은 임의의 다른 객체로 변경할 수 있다. 

### 19.9.2 인스턴스에 의한 프로토타입 교체

* 프로토타입은 생성자 함수의 prototype 프로퍼티뿐아니라 인스턴스의 `__proto__` 접근자 프로퍼티(또는 Object.setPrototypeOf 메서드)를 통해 프로토타입을 교체할 수 있다.

* 생성자 함수의 prototype 프로퍼티에 다른 임의의 객체를 바인딩하는 것은 미래에 생성할 인스턴스의 프로토타입을 교체하는 것이다.

* `__proto__` 접근자 프로퍼티를 통해 프로토타입을 교체하는 것은 이미 생성된 객체의 프로토타입을 교체하는 것이다. 

```
function Person(name) {
	this.name = name;
}

const me = new Person('Lee')

const parent = {
	sayHello(){
    	console.log('Hi! My name is ${this.name}')
    }
}

Object.setPrototypeOf(me, parent);

me.sayHello(); Hi My name is Lee
```

* prototype으로 교체한 객체에는 constructor 프로퍼티가 없으므로 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다. 

* 따라서 프로토타입의 constructor 프로퍼티로 me 객체의 생성자 함수를 검색하면 Person이 아닌 Object가 나온다. 
```
console.log(me.constructor === Person) ; //false
console.log(me.constructor === Object); //true
```

* 프로토타입으로 교체한 객체 리터럴에 constructor 프로퍼티를 추가하고 생성자 함수의 prototype 프로퍼티를 재설정하여 파괴된 생성자 함수와 프로토타입 간의 연결을 되살려 보자.

```
function Peron(name){
	this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent  = {
	//constructor 프로퍼티와 생성자 함수 간의 연결을 설정
    constructor : Person,
    sayHello(){
    	console.log(`Hi! My name is ${this.name}`)
    }
};

// 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결을 설정
Person.prototype = parent;

// me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일함
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Lee

console.log(me.constructor === Person) // true
console.log(me.constructor === Object) // false

console.log(Person.prototype === Object.getPrototypeOf(me)); //true

```

## instanceof 연산자
* instanceof 연산자는 이항 연산자로서 좌변에 객체를 가리키는 식별자, 우변에 생성자 함수를 가리키는 식별자를 피연산자로 받는다.


* 만약 우변의 피연산자가 함수가 아닌 경우 TypeError가 발생한다.

* **우변의 생성자 함수의 prototype에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하면 true로 평가되고, 그렇지 않으면 false로 평가된다.**

```
function Person(name){
	this.name = name;
}

const me = new Person('Lee');
console.log(me instanceof Person); //true
console.log(me instanceof Object); //true

//프로토타입으로 교체할 객체
const parent = {}

//프로토타입의 교체
Object.setPrototypeof(me, parent);

console.log(me instanceof Person) //false
console.log(me instanceof Object) //true
```
* me 객체는 비록 프로토타입이 교체되어 프로토타입과 생성자 함수 간의 연결이 파괴되었지만 Person 생성자 함수에 의해 생성된 인스턴스이다.

* 그러나 me instanceof Person은 false로 평가된다.

* 이는 Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않기 때문이다.

* instanceof 연산자는 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수를 찾는것이 아니라 생성자 함수의 prototype에 바인딩된 객체가 프로토타입 체인 상에 존재하는지 확인한다.


## 19.11 직접상속

### 19.11.1 Object.create에 의한 직접 상속
* Object.create 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성한다. 

* Object.create 메서드의 첫 번째 매개변수에는 **생성할 객체의 프로토타입**으로 지정할 객체를 전달한다. 

* 두 번째 매개변수에는 생성할 객체의 프로퍼티 키와 프로퍼티 디스크럽터 객체로 이뤄진 객체를 전달한다. 

* 두 번째 인수는 옵션이므로 생략가능하다.

* Object.create 메서드는 첫 번째 매개변수에 전달한 객체의 프로토타입 체인에 속하는 객체를 생성한다. 

* 즉, 객체를 생성하면서 직접적으로 상속을 구현하는 것이다. 

* Object.create 메서드의 장점
1. new 연산자가 없이도 객체를 생성할 수 있다. 
2. 프로토타입을 지정하면서 객체를 생성할 수 있따.
3. 객체 리터럴에 의해 생성된 객체도 상속받을 수 있다.

* 따라서 Object.prototype 빌트인 메서드는 다음과 같이 간접적으로 호출하는 것이 좋다.


## 19.12 정적 프로퍼티/메서드
* 정적<sup>static</sup> 프로퍼티/메서드는 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메서드를 말한다. 

```
//생성자 함수
function Person(name){
	this.name = name
} 

//프로토타입 메서드
Person.prototype.sayHello = function(){
	console.log(`Hi! My name is ${this.name}`);
}

//정적 프로퍼티
Person.staticProp = 'static prop';

//정적 메서드
Person.staticMethod = function(){
	console.log('staticMethod');
};


const me = new Person('Lee')

// 생성자 함수에 추가한 정적 프로퍼티/메서드는 생성자 함수로 참조/호출한다.
Person.staticMethod();

// 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.
// 인스턴스로 참조/호출할 수 있는 프로퍼티/메서드는 프로토타입 체인 상에 존재해야 한다.
me.staticMethod(); //typeError
```
* Person 생성자 함수는 객체이므로 자신의 프로퍼티/메소드를 소유할 수 있다.

* Person 생성자 함수 객체가 소유한 프로퍼티/메서드라고 한다. 

* 정적 프로퍼티/메서드 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다. 

* 생성자 함수가 생성한 인스턴스는 자신의 프로토타입 체인에 속한 객체의 프로퍼티/메서드에 접근할 수 있다.

* 하지만 정적 프로퍼티/메서드는 인스턴스의 프로토타입 체인에 속한 객체의 프로퍼티/메서드가 아니므로 인스턴스로 접근할 수 없다. 

* Object.create 메서드는 Object 생성자 함수의 정적 메서드고 Object.prototype.hasOwnProperty 메서드는 Object.prototype의 메서드다. 

* 따라서 Object.create 메서드는 인스턴스, 즉 Object 생성자 함수가 생성한 객체로 호출할 수 없다. 

* 하지만 Object.prototype.hasOwnProperty 메서드는 모든 객체의 프로토타입 체인의 종점, 즉 Object.prototype 메서드이므로 모든 객체가 호출할 수 있다. 

```
//Object.create는 정적 메서드다.
const obj = Object.create({name : 'Lee'});
//Object.prototype.hasOwnProperty는 프로토타입 메서드다.
obj.hasOwnProperty('name');//false
```

* 만약 인스턴스/프로토타입 메서드 내에서 this를 사용하지 않는다면 그 메서드는 정적 메서드로 변경할 수 있다.

* 인스턴스가 호출한 인스턴스/프로토타입 메서드 내에서 this는 인스턴스를 가리킨다.

* 메서드 내에서 인스턴스를 참조할 필요가 없다면 정적 메서드로 변경하여도 동작한다. 

* 프로토타입 메서드를 호출하려면 인스턴스를 생성해야 하지만 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있다. 

---
* 정적 메서드는 메서드를 프로퍼티 형태로 직접 할당하는 것과 동일한 일을 한다.

* 정적 메서드는 어떤 특정한 객체가 아닌 클래스에 속한 함수를 구현하고자 할 때 주로 사용된다.

---
* 정적 프로퍼티는 일반 클래스와 유사하게 생겼는데 앞에 static이 붙는다는 점만 다르다. 
---
* 정적 프로퍼티와 메서드는 상속된다. 

* 정적 메서드는 특정 클래스 인스턴스가 아닌 클래스 '전체'에 필요한 기능을 만들 때 사용할 수 있다. 

* 정적 메서드는 클래스 선언부 안에 위치하고 앞에 static 이라는 키워드가 붙는다.

* 정적 프로퍼티는 데이터를 클래스 수준으로 저장하고 싶을 때 사용한다. 정적 프로퍼티 역시 개별 인스턴스에 묶이지 않는다. 

---
* prototype이 아닌 클래스 함추 자체에도 메서드를 설정할 수 있다. 이런 메서드를 정적(static)메서드라고 한다. 
* 정적 메서드는 인스턴스 없이 클래스에서 바로 호출이 가능하다.

```
//ES5의 방식

function King(name, firstSon){
		this.name = name;
		this.firstSon = firstSon
}
King.prototype.jangja = function(){
	if(this.firstSon === true){
		console.log("과인 " + this.name +"은/는 적장자다")
}
	else{
	console.log("끌어내라")
}
}


//ES6의 방식
class King {
	constructor(name, firstSon){
		this.name = name;
        this.firstSon = firstSon
    }
    static name = "정적 프로퍼티 이름이다!"
	jangja(){
        if(this.firstSon === true){
            console.log("과인 " + this.name +"은/는 적장자다")
        }
        else{
            console.log("끌어내라")
        }
	}
    static hello(){
        console.log("반갑다 나는 정적 메서드다!!")
    }
}
//인스턴스
const taeJong = new King('이방원', true);

King.jangja() // Uncaught TypeError: King.jangja is not a function
King.hello() // 반갑다 나는 정적 메서드다!!
King.name // '정적 프로퍼티 이름이다!'
```

## 19.13 프로퍼티 존재 확인

###  19.13.1 in 연산자.
* in 연산자는 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인한다. 

```
const person = {
	name : "Lee",
    address : "Seoul"
}

console.log( 'name' in person) // true
console.log( 'toString' in person) // true
```
* in 연산자는 확인 대상 객체의 프로퍼티뿐만 아니라 확인 대상 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인한다.

* toString 프로퍼티는 Object.prototype의 메서드이다.

* in 연산자 대신 ES6에서 도입된 Reflect.has 메서드를 사용할 수도 있다. 

* Reflect.has 메서드는 in 연산자와 동일하게 작동한다.

### 19.13.2 Object.prototype.hasOwnProperty 메서드
* Object.prototype.hasOwnProperty 메서드를 사용하면 객체에 특정 프로퍼티가 있는지 확일 할 수 있다.

* Object.prototype.hasOwnProperty 메서드는 이름에서 알 수 있듯이 인수로 전달받은 프로퍼티 **키가 객체 고유의 프로퍼티 키인 경우에만 true를 반환하고 상속받은 프로토타입의 프로퍼티 키인 경우 false를 반환한다.**

```
const person = {
	name : "Lee",
    address : "Seoul"
}

console.log(person.prototype.hasOwnProperty('name')) // true
console.log(person.prototype.hasOwnProperty('age')) // false
```

## 19.14 프로퍼티 열거

### for ... in 문
* 객체의 모든 프로퍼티를 순회하며 열거하려면 for ... in 문을 사용한다.
```
for((변수선언문/item같은거 ) in 객체){
}
```

* for ... in 문은 객체의 프로퍼티 개수만큼 순회하며 for ... in 문의 변수 선언문에서 선언한 변수에 프로퍼티 키를 할당한다. 

* for ... in 문은 in 연산자처럼 순회 대상 객체의 프로퍼티 뿐 아니라 상속받은 프로토타입의 프로퍼티 까지 열거한다. 하지만 위 예제의 경우 toString과 같은 Object.prototype의 프로퍼티가 열거되지 않는다. 

* 이는 toString 메서드가 열거할 수 없도록 정의되어 있는 프로퍼티이기 때문이다. 

* Object.prototype.string의 프로퍼티 어트리뷰트 `[[Enumerable]]`의 값이 false이기 때문이다.

* 프로퍼티 어트리뷰트 `[[Enumerable]]`은 프로퍼티의 열거 가능 여부를 나타내며 불리언 값을 갖는다. 

* for ... in 문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트 `[[Enumerable]]`의 값이 true인 프로퍼티를 순회하며 열거한다. 

* 배열에는 for ... in 문을 사용하지 말고 일반적인 for 문이나 for ... of 문 또는 Array.prototype.forEach메서드를 사용하기를 권장한다. 배열도 객체이므로 프로퍼티와 상속받은 프로퍼티가 포함될 수 있다. 

## 19.14.2 Object.keys/values/entries 메서드

* for ... in 문은 객체 자신의 고유 프로퍼티뿐 아니라 상속받은 프로퍼티도 열거한다. 

* Object.prototype.hasOwnProperty 메서드를 사용하여 객체 자신의 프로퍼티인지 확인하는 추가 처리가 필요하다. 

* 자기 자신의 고유 프로퍼티만 열거하기 위해서는 for ... in 문을 사용하는 것보다 Object.keys/values/entries 메서드를 사용하는 것을 권장한다. 

* Object.keys 메서드는 객체 자신의 열거 가능한 <sup>enumerable</sup> 프로퍼티 키를 배열로 반환한다.

```
const person = {
	name : 'Lee',
	address : 'Seoul',
	__proto__ : { age : 20}
};

console.log(Object.entries(person)) // {{"name" : "Lee"}, {"address", "Seoul"}}
```


```
Object.getOwnPropertyDescriptors 
```

## static 

1. static : (변화움직임이 없이) 고정된 (형용사)

2. 정지 상태의


* static메서드/프로퍼티 : 정적 메서드/프로퍼티는 클래스의 인스턴스 없이 호출이 가능하며 클래스가 인스턴스화되면 호출할 수 없다. 정적 메서드는 종종 어플리케이션의 유틸리티 함수를 만드는데 사용된다.



```
//ES5의 방식

function King(name, firstSon){
		this.name = name;
		this.firstSon = firstSon
}
King.prototype.jangja = function(){
	if(this.firstSon === true){
		console.log("과인 " + this.name +"은/는 적장자다")
}
	else{
	console.log("끌어내라")
}
}

King.staticMethod = function(){
	return console.log("ES5")
}
King.staticMethod()

//ES6의 방식
class King {
	constructor(name, firstSon){
		this.name = name;
        this.firstSon = firstSon
    }
    static who = "정적 프로퍼티 이름이다!"
	jangja(){
        if(this.firstSon === true){
            console.log("과인 " + this.name +"은/는 적장자다")
        }
        else{
            console.log("끌어내라")
        }
	}
    static hello(){
        console.log("반갑다 나는 정적 메서드다!!")
    }
}
//인스턴스
const taeJong = new King('이방원', true);

taeJong.hasOwnProperty('who') // false

King.jangja() // Uncaught TypeError: King.jangja is not a function
King.hello() // 반갑다 나는 정적 메서드다!!

King.who // '정적 프로퍼티 이름이다!'
```

* 정적 프로퍼티/메서드는 생성자 함수가 생성한 **인스턴스로 참조/호출할 수 없다.**

* 생성자 함수가 생성한 인스턴스는 자신의 프로토타입 체인에 속한 객체의 프로퍼티/메서드에 접근할 수 있다. 

* 하지만 정적 프로퍼티/메서드는 인스턴스의 프로토타입 체인에 속한 객체의 프로퍼티/메서드가 아니므로 인스턴스로 접근할 수 없다. 


## 결론
* 정적 메서드는 클래스 선언부 안에 위치하고 앞에 static 이라는 키워드가 붙는다.
* 정적 프로퍼티는 데이터를 클래스 수준에 저장하고 싶을 때 사용한다. 
* 정적 프로퍼티 역시 개별 인스턴스에 묶이지 않는다.

