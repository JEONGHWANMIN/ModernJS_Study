# 22장 this



* 객체는 상태<sup>state</sup>를 나타내는 프로퍼티와 동작<sup>behavior</sup> 을 나타내는 메서드를 하나의 논리적인 단위로 묶은 복합적인 자료구조다.
* 동작을 나타내는 메서드는 자신이 속한 객체의 상태, 즉 프로퍼티를 참조하고 변경할 수 있어야 한다. 
* 이때 메서드가 자신이 속한 객체의 프로퍼티를 참조하려면 먼저 자신이 **속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.**
* 객체 리터럴 방식으로 생성한 객체의 경우 메서드 내부에서 메서드 자신이 속한 객체를 가리키는 식별자를 재귀적으로 참조할 수 있는데 그것은 바람직하지 않다. 

```
const circle = {
    radius : 5,
    getDiameter(){
        //이 메서드가 자신이 속한 객체의 프로퍼티나 다른 메서드를 참조하려면 자신이 속한 객체인 circle을 참조할 수 있어야 한다.
        return 2 * circle.radius;
    }
}
console.log(circle.getDiameter()) // 10
```
* getDiameter 메서드 내에서 자신이 속한 객체를 가리키는 식별자 circle을 참조하고 있다. 
* 이 참조 표현식이 평가되는 시점은 getDiameter메서드가 호출되어 함수 몸체가 실행되는 시점이다.
* 위 예제의 객체 리터럴은 circle변수에 할당되기 직전에 평가된다. 
* 따라서 getDiameter메서드가 호출되는 시점에는 이미 객체 리터럴의 평가가 완료되어 객체가 완성되었고 circle 식별자에 생성된 객체가 할당된 이후다. 
* 따라서 메서드 내부에서 circle 식별자를 참조할 수 있다.
* 하지만 자기 자신이 속한 객체를 재귀적으로 참조하는 방식은 일반적이지 않으며 바람직하지도 않다. 
* 생성자 함수 방식으로 인스턴스를 생성하는 경우를 보자.

```
function Circle(radius){
    //이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
    ???.radius = radius;
}
Circle.prototype.getDiameter = function {
    //이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
    return 2 * ???.radius
}
const circle = new Circle(5);
```
* 생성자 함수 내부에서는 프로퍼티 또는 메서드를 추가하기 위해 자신이 생성할 인스턴스를 참조할 수 있어야 한다.
* 하지만 생성자 함수에 의한 객체 생성 방식은 먼저 생성자 함수를 정의한 이후 new 연산자와 함께 생성자 함수를 호출하는 단계가 추가로 필요하다.
* 생성자 함수로 인스턴스를 생성하러면 먼저 생성자 함수가 존재 해야한다.

* 생성자 함수를 정의하는 시점에는 아직 인스턴스를 생성하기 이전이므로 생성자 함수가 생성할 인스턴스를 가리키는 식별자를 알 수 없다. 
* 따라서 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 특수한 식별자가 필요하다. 이를 위해 자바스크립트는 this라는 특수한 식별자를 제공한다. 

* **this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수<sup>self-referencing variable</sup>다.**
* **this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드르 참조 할 수 있다.**

* this는 자바스크립트 엔진에 의해 암묵적으로 생성되며, 코드 어디서든 참조할 수 있다. 
* 함수를 호출하면 arguments 객체와 this가 암묵적으로 함수 내부에 전달된다. 
* 함수 내부에서 arguments 객체를 지역 변수처럼 사용할 수 있는 것 처럼 this도 지역 변수처럼 사용할 수 있다. 
* 단, this가 가리키는 값, 즉 this 바인딩은 함수 호출 방식에 의해 동적으로 결정된다.

> this 바인딩
> * 바인딩이란 식별자와 값을 연결하는 과정을 의미한다. 
> * 예를 들어, 변수 선언은 이름(식별자)과 확보된 메모리 공간의 주소를 바인딩하는 것이다. 
> * this 바인딩은 this(키워드로 분류되지만 식별자 역할을 한다.)와 this가 가리킬 객체를 바인딩하는 것이다. 

```
function Circle(radius){
    //this는 생성자 함수가 생성할 인스턴스를 가리킨다. 
    thisradius = radius;
}
Circle.prototype.getDiameter = function {
    //this는 생성자 함수가 생성할 인스턴스를 가리킨다. 
    return 2 * this.radius
}
const circle = new Circle(5); //10
```

* 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다. 
* 이처럼 this는 상황에 따라 가리키는 대상이 다르다.
> 자바나 C++같은 클래스 기반 언어에서 this는 언제나 클래스가 생성할 인스턴스를 가리킨다. 하지만 자바스크립트의 this는 함수가 호출되는 방식에 따라 this에 바인딩 될 값, 즉 this 바인딩이 동적으로 결정된다. 또한 strict모드(엄격 모드) 역시 this 바인딩에 영향을 준다.

* this는 코드 어디에서든 참조 가능하다. 전역에서도 함수 내부에서도 참조 할 수 있다. 

```
//전역에서 this는 전역 객체 window를 가리킨다.
console.log(this) // window

function square(number){
    console.log(this) // window
    return number * number;
}

const person = {
    name : 'Lee',
    getName() {
        // 메서드 내부에서 this는 호출한 객체를 가리킨다.
        console.log(this); //{name : "Lee", getName : f}
        return this.name;
    }
};
console.log(person.getName()); // Lee

function Person(name){
    this.name = name;
    // 생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
    console.log(this); // Person {name : "Lee"}
}
```

* this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 일반적으로 객체의 메서드 내부 또는 생성자 함수 내부에서만 의미가 있다. 
* 따라서 strict mode가 적용된 일반 함수 내부의 this에는 undefined가 바인딩된다. 일반 함수 내부에서 this를 사용할 필요가 없기 때문이다.

## 22.2 함소 호출 방식과 this바인딩
* this 바인딩(this에 바인딩될 값)은 함수 호출 방식, 즉 함수가 어떻게 호출되는지에 따라 동적으로 결정된다.

> 렉시컬 스코프와 this 바인딩은 결정 시기가 다르다. 
> * 함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프<sup>lexical scope</sup>는 함수 정의가 평가되어 함수 객체게 생성되는 시점에 상위 스코프를 결정한다. 하지만 this바인딩은 함수 호출 시점에 결정된다.

* 주의할 것은 동일한 함수도 다양한 방식으로 호출할 수 있다는 것이다. 
* 함수를 호출하는 장식은 다음과 같이 다양한다. 
1. 일반 함수 호출
2. 메서드 호출
3. 생성자 함수 호출
4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출

## 22.2.1 일반 함수 호출
* 기본 적으로 this에는 전역 객체 <sup>global object</sup>가 바인딩된다.
```
function foo(){
    console.log(this); // window
    function bar(){
        console.log(this) // widnow
    }
    bar()
}
foo();
```

* 위 예제처럼 전역 함수는 물론이고 중첩 함수를 일반 함수로 호출하면 함수 내부의 this에는 전역 객체가 바인딩된다.
* 다만 this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 객체를 생성하지 않는 일반 함수에서 this는 의미가 없다. 
* 따라서 strict mode에서는 일반 함수 내부의 this에는 undefined가 바인딩된다.

```
function foo(){
    'use strict'
    console.log(this); // undefined
    function bar(){
        console.log(this) // undefined
    }
    bar()
}
foo();
```

```
var value = 1;

const obj = {
    value: 100,
    foo(){
        console.log(this) // {value: 100, foo: f}
        console.log(this.value) // {100}
        
        //메서드 내에서 정의한 중첩 함수
        function bar(){
            console.log(this) // window
            console.log(this.value) // 1
        }

        // 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출하면 중첩 함수 내부의 this에는 전역 객체가 바인딩된다.
        bar()
    }
}
```

* 콜백 함수가 일반 함수로 호출된다면 콜백 함수 내부의 this에도 전역 객체가 바인딩된다. 
* 어떠한 함수라도 일반 함수로 호출되면 this에 전역 객체가 바인딩된다.

```
var value = 1;
const obj = {
    value : 100,
    foo(){
        console.log(this) // {value : 100, foo: f}
        setTimeout(function(){
            console.log(this) //window
            console.log(this.value) // 1
        }, 100);
    }
}
```

* **이처럼 일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함) 내부의 this에는 전역 객체가 바인딩 된다.** 

<!-- * 하지만 메서드 내에서 정의한 중첩 함수 또는 메서드에게 전달한 콜백 함수(보조 함수)가 일반 함수로 호출될 때 메서드 내의 중첩 함수 또는 콜백 함수의 this가 전역 객체를 바인딩하는 것은 문제가 있다. -->

* 외부 함수인 메서드와 중첩 함수 또는 콜백 함수의 this가 일치하지 않는다는 것은 중첩 함수 또는 콜백 함수를 헬퍼 함수로 동작하기 어렵게 만든다.

* 메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드의 this와 일치시키기 위한 방법은 다음과 같다.

```
var value = 1;

const obj = {
    value : 100,
    foo(){
        //this 바인딩(obj)을 변수 that에 할당한다.
        const that = this;

        //콜백 함수 내부에서 this대신 that을 참조한다.
        setTimeout(function(){
            console.log(that.value); 100
        }, 100)
    }
};

```
* 위 방법 이외에도 자바스크립트는 this를 명시적으로 바인딩할 수 있는 Function.prototype.apply,Function.prototype.call,Function.prototype.bind 메서드를 제공한다.

```
var value = 1;

const obj = {
    value : 100,
    foo(){
        //콜백 함수에 명시적으로 this를 바인딩한다.
        setTimeout(function(){
            console.log(that.value); 100
        }.bind(this),100)
    }
};
```

* 또는 화살표 함수를 사용해서 this 바인딩을 일치시킬 수 있다.

```
var value = 1;

const obj = {
    value : 100,
    foo(){
        // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
        setTimeout(()=> console.log(this.value), 100); //100
    }
};

```

## 22.2.2 메서드 호출

* 메서드 내부의 this에는 메서드를 호출한 객체, **즉 메서드를 호출할 때 메서드 이름 앞의 마침표(.) 연산자 앞에 기술한 객체가 바인딩된다.**

* 주의할 것은 메서드 내부의 this는 메서드를 소유한 객체가 아닌 메서드를 호출한 객체에 바인딩된다는 것이다. 

```
const person = {
    name : 'Lee',
    getName(){
        // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩 된다.
        return this.name;
    }
}
console.log(person.getName()); //Lee
```

* 위 예제의 getName 메서드는 person 객체의 메서드로 정의되었다. 
* 메서드는 프로퍼티에 바인딩된 함수다.
* 즉, person 객체의 getName 프로퍼티가 가리키는 함수 객체는 person 객체에 포함된 것이 아니라 독립적으로 존재하는 별도의 객체다. 
* getName 프로퍼티가 함수 객체를 가리키고 있을 뿐이다.

* 따라서 getName 프로퍼티가 가리키는 함수 객체, 즉 getName 메서드는 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될 수도 있고 일반 변수에 할당하여 일반 함수로 호출될 수도 있다. 

```
const anotherPerson = {
    name : 'Kim'
};
//getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;

//getName 메서드를 호출한 객체는 anotherPerson이다.
console.log(anotherPerson.getname()); //Kim

// getName 메서드를 변수에 할당
const getName = person.getName;

// getName 메서드를 일반 함수로 호출
console.log(getName()); // ''
//일반 함수로 호출된 getName 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
//브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
//Node.js환경에서 this.name은 undefined이다.
```

* 따라서 메서드 내부의 this는 프로퍼티로 메서드를 가리키고 있는 객체와는 관계가 없고 메서드를 호출한 객체에 바인딩된다.

* 프로토타입 메서드 내부에서 사용된 this도 일반 메서드와 마찬가지로 해당 메서드를 호출한 객체에 바인딩된다.

```
function Person(name){
    this.name = name;
}

Person.prototype.getName = function(){
    return this.name;
}

const me =  new Person('Lee');

//getName 메서드를 호출한 객체는 me다.
console.log(me.getName()) //Lee

Person.prototype.name = 'Kim';

//getName 메서드를 호출한 객체는 Person.prototype이다.
console.log(Person.prototype.getName()); /// 'Kim'
```

## 22.2.3 생성자 함수 호출
* 생성자 함수 내부의 this에는 생성자 함수가 (미래에) 생성할 인스턴스가 바인딩된다.

```
// 생성자 함수
function Circle(radius){
    // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
    this.radius = radius;
    this.getDiameter = function(){
        return 2 * radius
    }
}

//반지름이 5인 Circle 객체를 생성
const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); //10
console.log(circle2.getDiameter()); //20
```

* 일반 함수와 동일한 방법으로 생성자 함수를 정의하고 new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다. 

* 만약 new 연산자와 함께 생성자 함수를 호출하지 않으면 생성자 함수가 아니라 일반 함수로 동작한다.

```
//new 연산자와 함께 호출하지 않으면 생성자 함수로 동작하지 않는다. 즉, 일반적인 함수의 호출이다.
const circle3 = Circle(15);

//일반 함수로 호출된 Circle에는 반환문이 없으므로 암묵적으로 undefined를 반환한다.
console.log(circle3); // undefined

//일반 함수로 호출된 Circle 내부의 this는 전역 객체를 가리킨다.
console.log(radius); // 15

```

## 22.2.4 Function.prototype.apply/call/bind 메서드에 의한 간접 호출

* apply, call, bind 메서드는 Function.prototype의 메서드다. 즉, 이들 메서드는 모든 함수가 상속받아 사용할 수 있다.

* Function.prototype.apply, Function.prototype.call 메서드는 this로 사용할 객체와 인수 리스트로 전달받아 함수를 호출한다.

```

@param thisArg - this로 사용할 객체


function getThisBinding(){
    return this;
}

const thisArg = { a: 1};

console.log(getThisBinding()) // window

//getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.

console.log(getThisBinding.apply(thisArg)) //{a:1}
console.log(getThisBinding.call(thisArg)) // {a:1}
```

* apply와 call 메서드의 본질적인 기능은 함수를 호출하는 것이다. 
* apply와 call 메서드는 함수를 호춣하면서 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 this에 바인딩한다.


* 함수 호출 방식에 따라 달라지는 this 정리

|함수 호출 방식|this 바인딩|
|------|---|
|일반 함수 호출|전역 객체|
|메서드 호출|메서드를 호출한 객체|
|생성자 함수 호출|생성자 함수가 (미래에) 생성할 인스턴스|
|Function.prototype.apply/call/bind 메서드에 의한 간접 호출|Function.prototype.apply/call/bind 메서드에 첫 번째 인수로 전달한 객체|