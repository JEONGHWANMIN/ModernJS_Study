## 0. 사전 조사

- Closures
클로저는 '둘러 싸여진 상태의 참조'와 함께 다발로 묶여진 함수의 콤비네이션

클로저는 내부 함수로 부터 외부 함수의 접근 권한을 준다.

클로저는 함수 생성 시점에 언제나 생긴다.

``` js
function hello() {
	return console.log('hello')
}
const testHello = hello() // 
//testHello에는 함수의 실행 결과가 할당됨 따라서 할당 될 때 콘솔에 'hello'가 찍히지만 
//그 다음에 호출 할 때는 undefined만 나옴 그리고 함수가 할당된게 아니라 할당된 결과가 할당된거라서 
//testHello()할 수도 없음

const testHello2 = hello

```
* 따라서
```js
const x = 1;
function outer(){
	const x = 10;
    const inner = function() {console.log(x)}
    return inner;
}

const innerFunc = outer(); // 이 시점에 outer()는 실행되고 그 결과인 inner 가 innerFunc에 할당된다.
// const innerFunc = inner  따라서 outer함수는 실행컨텍스트에서 사라 졌지만 inner가 외부 함수를 참조 한다.
//외부 함수보다 중첩함수, 내부 함수가 더 오래 유지되는 경우이다. 

// inner 함수에 의해서 참조하고 있기 때문에 가비지 컬렉터에 의해 사라지지 않는다. 
```


## 3. 
```js

## num 증가
const increase = (function() {
    let num = 0;
    return function(){
        return ++ num;
    }
}())

debugger
increase()

console.log(increase()) // 1
// increase() 하게 되면 increase 함수가 리턴하는 function(){return ++n }을 선물을 개봉하자마자 실행하는 것과 동일해진다. 상위 스코프의 num의 값을 1만큼 더한다.

console.log(increase()) // 2
console.log(increase()) // 3
```

## 4. 생성자함수를 활용한 예제
```js
## 생성자 함수

const Counter = (function(){
    // (1)
  let num = 0;
  function Counter(){
        };
  Counter.prototype.increase = function () {
            return ++num;
  }
  Counter.prototype.decrease  = function(){
            return num > 0 ? --num : 0;
  }
  return Counter;
}());

const counter = new Counter();

---
//ES5에서 클래스 만들 때 이렇게했음
function Counter(){}

const counter = new Counter(); << counter라는 인스턴스 생성됨

//new 연산자로 인해서
//counter라는 객체가 생성된다.

debugger
counter.increase()
counter.increase()
counter.decrease()
counter.decrease()

console.log(counter.increase()) ; //1
console.log(counter.increase()) ; //2
console.log(counter.decrease()) ; //1
console.log(counter.decrease()) ; //0
```
> counter 는 인스턴스가 생성됨. 그리고 Counter.prototype.increase, decrease에서 num 을 참조 하고 있음
따라서 num을 공유함


* 위 예제의 num(1)은 생성자 함수 Counter가 생성할 인스턴스의 프로퍼티가 아니라 즉시 실행 함수 내에서 성언된 변수다. 

* 만약 num 이 생성자 함수 Counter가 생성할 인스턴스의 프로퍼티라면(2) 인스턴스를 통해 외부에서 접근이 자유로운 public 프로퍼티가 된다. 

* 하지만 즉시 실행 함수 내에서 선언된 num 변수는 인스턴스를 통해 접근할 수 없으며, 즉시 실행 함수 외부에서도 접근할 수 없는 은닉된 변수다.

>근데 즉시 실행함수로 안만들어도 왜 문제 없지 ???

* 생성자 함수 Counter는 프로토타입을 통해 increase, decrease 메서드를 상속받는 인스턴스를 생성한다.

* increase, decrease 메서드는 모두 자신의 함수 정의가 평가되어 함수 객체가 될 때 실행중인 실행 컨텍스트의 즉시 실행 함수 컨텍스트의 렉시컬 환경을 기억하는 클로저다.

* 따라서 프로토타입을 통해 상속되는 프로토타입 메서드일지라도 즉시 실행 함수의 자유 변수 num을 참조할 수있다. 

* 다시 말해, num 변수의 값은 increase, decrease 메서드만이 변경할 수 있다.

* 변수 값은 누군가에 의해 언제든지 변경될 수 있어 오류 발생의 근본 원인이 될 수 있다.

* 외부 상태 변경이나 가변 데이터를 피하고 불변성을 지향하는 함수형 프로그래밍에서 부수효과를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이기 위해 클로저는 적극적으로 사용된다.

## 5. 함수형 프로그래밍에서 클로저를 활용하는 예제 (자유 변수를 공유하지 않는다.)
``` js
## 함수형 프로그래밍에서 클로저를 활용하는 예제

// 함수를 인수로 전달받고 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
function makeCounter(aux){
    // 카운트 상태를 유지하기 위한 자유 변수
    let counter = 0;
    //클로저를 반환
    return function B() {
        // 인수로 전달받은 보조함수에 상태 변경을 위임한다.
        counter = aux(counter);
        return counter
    };
}
// 보조함수
function increase(n){
    return ++n
}
function decrease(n){
    return --n
}

// 함수로 함수를 생성한다.
// makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환한다.
const increaser = makeCounter(increase) ; // (1)
console.log(increaser()) // 1
console.log(increaser()) // 2

// increaser 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동하지 않는다.
const decreaser = makeCounter(decrease);
console.log(decreaser()) // -1
console.log(decreaser()) // -2
```

> increaser 함수는 makeCounter(increase)의 결과 값. 
즉, function(){
	counter = increase(counter);
} 가 할당되어 있고

> decrease 함수는 makeCounter(decrease)의 결과 값. 
즉, function(){
	counter = decrease(counter);
} 가 할당되어 있다.
각 함수가 선언되는 시점에 렉시컬 환경이 다르므로 counter를 공유하지 않는다.

* makeCounter 함수는 보조 함수를 인자로 전달받고 함수를 반환하는 고차함수다.

* makeCounter 함수가 반환하는 함수는 자신이 생성됐을 때의 렉시컬 환경인 makeCounter 함수의 스코프에 속한 counter 변수를 기억하는 클로저다.

* makeCounter 함수는 인자로 전달 받은 보조 함수를 합성하여 자신이 반환하는 함수의 동작을 변경할 수 있다.

* 이때 주의해야 할 것은 **makeCounter 함수를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다.**

* 이는 함수를 호출하면 그때마다 새로운 makeCounter 함수 실행 컨텍스트의 렉시컬 환경이 생성되기 때문이다.

* (1)에서 makeCounter 함수를 호출하면 makeCounter 함수의 실행 컨텍스트가 생성된다. 그리고 makeCounter 함수는 함수 객체를 생성하여 반환한 후 소멸된다.

* makeCounter 함수가 반환한 함수
(makeCounter(increase) // return counter = increase(counter) ... ++counter)
는 makeCounter 함수의 렉시컬 환경을 상위 스코프로서 기억하는 클로저이며, 전역 변수인 **increaser**에 할당된다.

* 이때 makeCounter 함수의 실행 컨텍스트는 소멸되지만 makeCounter 함수 실행 컨텍스트의 렉시컬 환경은 makeCounter 함수가 반환한 함수의 `[[Environment]]`내부 슬롯에 의해 참조되고 있기 때문에 소멸되지 않는다.

* (2)에서 makeCounter 함수를 호출하면 새로운 makeCounter 함수의 실행 컨텍스트가 생성된다.
* 그리고 makeCounter 함수는 함수 객체를 생성하여 반환한 후 소멸된다.
* makeCounter 함수가 반환한 함수는 makeCounter 함수의 렉시컬 환경을 상위 스코프로서 기억하는 클로저이며, 전역 변수인 decreaser에 할당된다.
* 이때 makeCounter 함수의 실행 컨텍스트는 소멸되지만 makeCounter 함수 실행 컨텍스트의 렉시컬 환경은 makeCounter 함수가 반환한 함수의 `[[Envirionment]]` 내부 슬롯에 의해 참조되고 있기 때문에 소멸되지 않는다.


## 6. 자유변수를 공유하는 예제
```js
// 함수를 반환하는 고차함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
const counter = (function (){
    // 카운트 상태를 유지하기 위한 자유 변수
    let counter = 0;
    // 함수를 인수로 전달받는 클로저를 반환
    return function (aux){
        //인수로 전달받은 보조 함수에 상태 변경을 위임한다.
        counter = aux(counter)
        return counter;
    }
}());
function increase(n){
    return ++n;
}

function decrease(n){
    return --n;
}

debugger

console.log(counter(increase)) // 1
console.log(counter(increase)) // 2

// 자유 변수를 공유한다.
console.log(counter(decrease)) // 1
console.log(counter(decrease)) // 0
```
> counter(increase)를 하게되면 즉시 실행함수로 인해 
```js
function (aux){
        counter = increase(counter) // <-- aux(counter) 였던 것
        return counter;
    }
```
가 실행되어 상위 스코프의 counter를 참조하게 된다. 


**counter 함수선언시점은 같고 인수로 들어오는 함수가 달라지므로 같은 함수 내의 상위 스코프의 counter를 공유한다.**

* 위 예제에서 전역 변수 increaser 와 decreaser에 할당된 함수는 각각 자신만의 독립된 렉시컬 환경을 갖기 때문에 카운트를 유지하기 위한 자유변수 counter를 공유하지 않아 카운터의 증감이 연동되지 않는다.

* 따라서 독립된 카운터가 아니라 연동하여 증감이 가능한 카운터를 만들려면 렉시컬 환경을 공유하는 클로저를 만들어야 한다.

* 이를 위해서는 makeCounter 함수를 두 번 호출하지 말아야 한다.



## 24.5 캡슐화와 정보 은닉

* 캡슐화는 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말한다. 

* 캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 정보 은닉이라 한다.

* 정보 은닉은 외부에 공개할 필요가 없는 구현의 일부를 외부에 공개되지 않도록 감추어 적절치 못한 접근으로 부터 객체의 상태가 변경되는 것을 방지해 정보를 보호하고, 객체 간의 상호 의존성, 즉 결합도를 낮추는 효과가 있다.

* 대부분의 객체지향 프로그램 언어는 클래스를 정의하고 그 클래스를 구성하는 멤버(프로퍼티와 메서드)에 대하여 public, private, protected 같은 접근 제한자를 선언하여 공개 범위를 한정할 수 있다.

* public으로 선언된 프로퍼티와 메서드는 클래스 외부에서 참조할 수 있지만 private으로 선언된 경우는 클래스 외부에서 참조할 수 없다. 

* 자바스크립트는 public, private, protected 같은 접근 제한자를 제공하지 않는다.

* 따라서 자바스크립트 객체의 모든 프로퍼티와 메서드는 기본적으로 외부에 공개되어 있다.

* 즉, 객체의 모든 프로퍼티와 메서드는 기본적으로 public이다.

```js
function Person(name, age) {
    this.name = name // public
    let _age = age; //private
    
    //인스턴스 메서드 따라서 Person 객체가 생성될 때마다 중복 생성된다.
    this.say = function () {
        console.log(`Hi My name is ${this.name}. I am ${_age}.`);
    },
}

const me = new Person('Lee', 20);
me.sayHi(); //Hi My name is Lee. I am 20.
console.log(me.name) = // Lee
console.log(me._age) = undefined
```

* 위 예제의 name 프로퍼티는 현재 외부로 공개되어 있어서 자유롭게 참조하거나 변경할 수 있다. 
* name 프로퍼티는 public하다. 

* 하지만 _age 변수는 Person 생성자 함수의 지역 변수이므로 Person 생성자 함수 외부에서 참조하거나 변경할 수 없다.
* 즉, _age 변수는 private 하다.


```js

function Person(name, age) {
    this.name = name // public
    let _age = age; //private
}
Person.prototype.sayHi = function(){
    // Person 생성자 함수의 지역변수 _age를 참조할 수 없다.
    console.log(`Hi My name is ${this.name}. I am ${_age}.`)
}
```

* 이때 Person.prototype.sayHi 메서드 내에서 Person 생성자 함수의 지역 변수 _age를 참조할 수 없는 문제가 발생한다. 

* 따라서 다음과 같이 즉시 실행 함수를 사용하여 Person 생성자 함수와 Person.prototype.sayHi 메서드를 하나의 함수내에 모아보면

```js
const Person = (function(){
    let _age = 0;
    //생성자 함수
    function Person(name, age){
        this.name = name; // public
        _age = age;
    }
    Person.prototype.sayHi = function(){
        console.log(`Hi! My name is ${this.name}. I am ${_age}.`)
    },
    return Person;
}())

const me = new Person('Lee', 20);
me.sayHi(); // `Hi! My name is Lee. I am 20.`
console.log(me.name) // Lee
console.log(me._age) // undefined
```
* 위 패턴을 사용하면 public, private, protected 같은 접근 제한자를 제공하지 않는 자바스크립트에서도 정보 은닉이 가능한 것처럼 보인다.
* 즉시 실행 함수가 반환하는 Person 생성자 함수와 Person 생성자 함수의 인스턴스가 상속받아 호출할 Person.prototype.sayHi 메서드는 즉시 실행 함수가 종료된 이후 호출된다.
* 하지만 Person 생성자 함수와 sayHi 메서드는 이미 종료되어 소멸한 즉시 실행 함수의 지역변수 _age를 참조할 수 있는 클로저다.


* 하지만 Person 생성자 함수가 여러 개의 인스턴스를 생성할 경우 _age 변수의 상태가 유지되지 않는다.

```js
const me = new Person('Lee', 20);
me.sayHi(); // Hi! My name is Lee I am 20.

const you = new Person('Kim', 30);
you.sayHi(); // Hi! My name is Kim. I am 30.

// _age 변수 값이 변경된다.
me.sayHi(); // Hi! My name is Lee, I am 30.
```
* 이는 Person.prototype.sayHi 메서드가 단 한 번 생성되는 클로저이기 때문에 발생하는 현상이다.
* Person.prototype.sayHi 메서드는 즉시 실행 함수가 호출될 때 생성된다. 
* 이때 Person.prototype.sayHi 메서드는 자신의 상위 스코프인 즉시 실행 함수의 실행 컨텍스트의 렉시컬 환경의 참조를 `[[Environment]]`에 저장하여 기억한다. 
* 따라서 Person 생성자 함수의 모든 인스턴스가 상속을 통해 호출할 수 있는 Person.prototype.sayHi 메서드의 상위 스코프는 어떤 인스턴스로 호출하더라도 하나의 동일산 상위 스코프를 사용하게 된다.
* 이러한 이유로 Person 생성자 함수가 여러 개의 인스턴스를 생성할 경우 위와 같이 _age 변수의 상태가 유지 되지 않는다.

* 이처럼 자바스크립트는 정보 은닉을 완전하게 지원하지 않는다.
* 인스턴스 메서드를 사용한다면 자유 변수를 통해 private을 흉내낼 수는 있지만 프로토타입 메서드를 사용하면 이마저도 불가능해진다.
* ES6의 Symbol 또는 weakMap을 사용하여 private한 프로퍼티를 흉내 내기도 했으나 근본적인 해결책이 되지는 않는다.
* 2021년 1월 현재 TC39 프로세스의 stage 3(candidate)에는 클래스에 private 필드를 정의할 수 있는 새로운 표준 사양이 제안되어 있다. 표준 사양으로 승급이 확실시되는 이 제안은 현재 최신 브라우저와 최슨 node에 이미 구현되어있다.

## 24.6 자주 발생하는 실수
```js
var funcs = []
for (var i = 0; i < 3; i ++){
    funcs[i] = function (){return i} // (1)
}
for (var j = 0; j < funcs.length; j++){
    console.log(funcs[j])//(2)
}
```
* 첫 번째 for문의 코드 블록 내(1)에서 함수가 funcs 배열의 요소로 추가된다. 

* 그리고 두 번째 for 문의 코드 블록 내(2)에서 funcs 배열의 요소로 추가된 함수를 순차적으로 호출한다. 

* 이때 funcs 배열의 요소로 추가된 3개의 함수가 0, 1, 2를 반환하지 않는다.

* for 문의 변수 선언문에서 var 키워드로 선언한 i 변수는 블록 레벨 스코프가 아닌 함수 레벨 스코프를 갖기 때문에 전역 변수다.

* 전역 변수 i 에는 0, 1, 2 가 순차적으로 할당된다. 

* 따라서 funcs 배열의 요소로 추가한 함수를 호출하면 전역 변수 i를 참조하여 i의 값 3이 출력된다.

* 클로저를 사용해 위 예제를 바르게 동작하는 코드로 만들어 보자.

```js
var funcs = [];

for(var i = 0; i < 3; i++){
    funcs[i] = (function(id){
        return function(){
            return id;
        }
    }(i))
}

for(var j = 0 ; j < funcs.length; j++){
    console.log(funcs[j])
}
```