### 1. this 키워드
객체는 상태(state)를 나타내는 `프로퍼티`와 동작(behavior)을 나타내는 `메서드`를 하나의 논리적인 단위로 묶은 복합적인 자료구조입니다.

동작을 나타내는 메서드는 자신이 속한 객체의 상태, 즉 프로퍼티를 참조하고 변경할 수 있어야하며, 이를 위해서 ** 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 합니다.**

```javascript
function Circle(radius){
	// 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
  ???.radius = radius;
}

Circle.prototype.getDiameter = function(){
	// 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
  return 2 * ???.radius
}

// 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수를 정의해야 한다.
const circle = new Circle(5)
```
생성자 함수 내부에서는 프로퍼티 또는 메서드를 추가하기 위해 자신이 생성할 인스턴스를 참조할 수 있어야 합니다.

하지만 생성자 함수를 정의하는 시점에는 아직 인스턴스를 생성하기 이전이므로 생성자 함수가 생성할 인스턴스를 가리키는 식별자를 알 수 없습니다. 

따라서 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 특수한 식별자가 필요한데 자바스크립트에서는 this라는 특수한 식별자를 제공합니다.

>this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수(self-referencing variable)입니다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있습니다.

this는 자바스크립트 엔진에 의해 암묵적으로 생성되며, 코드 어디서든 참조할 수 있습니다. 단, ** this가 가리키는 값. 즉 `this 바인딩`은 함수 호출 방식에 의해 동적으로 결정됩니다. **
![](https://velog.velcdn.com/images/starrypro/post/d0730bea-28bf-492b-9e3b-3238af406820/image.jpeg)

> this 바인딩에서 바인딩이란 식별자와 값을 연결하는 과정을 의미합니다. 예를 들어, 변수 선언은 변수이름(식별자)과 확보된 메모리 공간의 주소를 바인딩하는 것입니다. this 바인딩은 this(키워드로 분류되지만 식별자 역할을 한다)와 this가 가리킬 객체를 바인딩하는 것입니다.

아래는 객체 리터럴과 생성자 함수에서의 this 입니다.

```javascript
// 객체 리터럴
const circle = {
	radius: 5,
  	getDiameter(){
    	//this는 메서드를 호출한 객체를 가리킨다.
      return 2 * this.radius;
    }
};
console.log(circle.getDiameter());  // 10
```
객체 리터럴의 메서드 내부에서의 this는 메서드를 호출한 객체를 가리킵니다.
```javascript
// 생성자 함수
function Circle(radius){
// this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
}

Circle.prototype.getDiameter = function(){
	//this는 생성자 함수가 생성할 인스턴스를 가리킨다.
   return 2 * this.radius;
};

//인스턴스 생성
const circle = new Circle(5);
console.log(circle.getDiameter()); //10
```
생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킵니다.
참고로 전역에서의 this는 전역 객체 window를 가리킵니다.

```javascript
// this는 어디서든지 참조 가능하다.
// 전역에서 this는 전역 객체 window를 가리킨다.
console.log(this); // window

function square(number){
	// 일반 함수 내부에서 this는 전역 객체 window를 가리킨다.
  console.log(this); // window
  return number * number
}

square(2);
```
this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 일반적으로 객체의 메서드 내부 또는 생성자 함수 내부에서만 의미가 있습니다. strict mode가 적용된 일반 함수 내부의 this에는 undefined가 바인딩됩니다.

### 2. 함수 호출 방식과 this 바인딩

> 함수 상위 스코프를 결정하는 방식인 렉시컬 스코프는 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정합니다. 하지만 this 바인딩은 함수 호출 시점에 결정됩니다.

### 2.1 일반 함수 호출
전역 함수는 물론이고 중첩 함수와 콜백 함수조차도 ** 일반 함수로 호출된다면 함수 내부의 this에는 전역 객체가 바인딩됩니다. ** 즉, 어떠한 함수라도 일반 함수로 호출되면 this에 전역 객체가 바인딩됩니다.

```javascript
// var 키워드로 선언한 전역 변수 value는 전역 객체의 프로퍼티다.
var value = 1;

// const 키워드로 선언한 전역 변수 value는 전역 객체의 프로퍼티가 아닙니다.
// const value = 1;

const obj = {
	value: 100,
  	foo(){
    	console.log("foo's this:", this); // {value: 100, foo: f}
      	console.log("foo's this.value:", this.value); // 100
      // 메서드 내에서 정의한 중첩 함수
      function bar(){
      	console.log("bar's this:", this); //window
        console.log("bar's this.value:", this.value); //1
      }
      // 콜백 함수 내부의 this에는 전역 객체가 바인딩된다.
      setTimeout(function(){
      	console.log("callback's this:", this); //window
        console.log("callback's this.value:", this.value); //1
      }, 100)
      // 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this에는 전역 객체가 바인딩된다.
      bar();
    }
};
obj.foo();
```
아래 코드는 메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치시키기 위한 코드입니다.

```javascript
var value = 1;

const obj = {
	value: 100,
  	foo(){
    	// 콜백 함수에 명시적으로 this를 바인딩한다.
      	setTimeout(function(){
        	console.log(this.value); //100
        }.bind(this). 100);
    }
};
```
또는 화살표 함수를 이용해서 this 바인딩을 일치시킬 수 있습니다.

```javascript
var value = 1;

const obj = {
	value: 100,
  	foo(){
    	// 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
      setTimeout(()=>console.log(this.value), 100); // 100
    }
};
obj.foo();
```

### 2.2 메서드 호출

** 매서드는 객체에 포함된 것이 아니라 독립적으로 존재하는 별도의 객체입니다.**
따라서 아래 getName 프로퍼티가 가리키는 함수 객체, 즉 getName 메서드는 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될 수도 있고 일반 변수에 할당하여 일반 함수로 호출도리 수도 있습니다.

```javascript
const person = {
	name: 'Han',
	getName(){
    	// 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
      return this.name;
    }
};

const anotherPerson = {
	name: "Kim"
};
// getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;

//getName 메서드를 호출한 객체는 anotherPerson이다.
console.log(anotherPerson.getName()); // kim

//getName 메서드를 변수에 할당
const getName = person.getName;

//getName 메서드를 일반 함수로 호출
console.log(getName()); // ''

// 일반 함수로 호출된 getName 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
// 브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
// Node.js 환경에서 this.name은 undefined다.
```

### 2.3 생성자 함수 호출
생성자 함수 내부의 this에는 생성자 함수가 생성할 인스턴스가 바인딩됩니다.

```javascript
// 생성자 함수
function Circle(radius){
	// 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function(){
  	return 2 * this.radius;
  };
}

// 반지름이 5인 Circle 객체를 생성
const circle1 = new Circle(5);
// 반지름이 10인 Circle 객체를 생성
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2. getDiameter()); // 20
```

### 2.4 Function.prototype.apply/call/bind 메서드에 의한 간접 호출

![](https://velog.velcdn.com/images/starrypro/post/3808041f-69ea-4763-a2ff-a77872d38d3c/image.jpeg)


apply, call, bind 메서드는 Function.prototype의 메서드입니다. 즉, 이들 메서드는 모든 함수가 상속받아 사용할 수 있습니다.

```javascript
/*
주어진 this 바인딩과 인수 리스트 배열을 사용하여 함수를 호출한다.
@param thisArg - this로 사용할 객체
@param argsArray - 함수에게 전달할 인수 리스트의 배열 또는 유사 배열 객체
@returns 호출된 함수의 반환값
*/
Function.prototype.apply(thisArg[, argsArray])

/*
주어진 this 바인딩과 ,로 구분된 인수 리스트를 사용하여 함수를 호출한다.
@param thisArg - this로 사용할 객체
@param arg1, arg2, ... - 함수에게 전달할 인수 리스트
@returns 호출된 함수의 반환값
*/
Function.prototype.call(thisArg[, args1[, args2[, ...]]])
```
** apply와 call 메서드의 본질적인 기능은 함수를 호출하는 것입니다.**
apply와 call 매서드는 호출할 함수에 인수를 전달하는 방식만 다를 뿐 동일하게 동작합니다.

```javascript
function getThisBinding(){
	console.log(arguments);
  	return this;
}

//this로 사용할 객체
const thisArg = {a: 1};

// getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.
// apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달한다.
console.log(getThisBinding.apply(thisArg, [1, 2, 3]));
// Arguments(3)[1, 2, 3 callee: f, Symbol(Symbol.iterator): f]
// {a: 1}

// call 메서드는 호출할 함수의 인수를 쉽표로 구분한 리스트 형식으로 전달한다.
console.log(getThisBinding.call(thisArg, 1, 2, 3));
// Arguments(3)[1, 2, 3 callee: f, Symbol(Symbol.iterator): f]
// {a: 1}
```

apply와 call 메서드의 대표적인 용도는 arguments객체와 같은 유사 배열 객체에 배열 메서드를 사용하는 경우입니다.

```javascript
function convertArgsToArray(){
console.log(arguments);
  
  // arguments 객체를 배열로 변환
  // Array.prototype.slice를 인수 없이 호출하면 배열의 복사본을 생성합니다.
  const arr = Array.prototype.slice.call(arguments);
  // const arr = Array.prototype.slice.apply(arguments);
  console.log(arr);
  
  return arr;
}

convertArgsToArray(1, 2, 3); // [1, 2, 3]
```
** Function.prototype.bind 메서드는 apply와 call 메서드와 달리 함수를 호출하지 않스니다.** 다만 첫 번째 인수로 전달한 값으로 this 바인딩이 교체된 함수를 새롭게 생성해 반환합니다.

```javascript
function getThisBinding(){
	return this;
}

// this로 사용할 객체
const thisArg = {a : 1};

// bind 메서드는 첫 번째 인수로 전달한 thisArg로 this 바인딩이 교체된
// getThisBinding 함수를 새롭게 생성해 반환한다.
console.log(getThisBinding.bind(thisArg)); //getThisBinding
// bind 메서드는 함수를 호출하지는 않으므로 명시적으로 호출해야 한다.
console.log(getThisBinding.bind(thisArg)()); // {a: 1}
```

### 3. 정리하기

함수 호출 방식  | this 바인딩
--|--
일반 함수 호출 | 전역 객체
메서드 호출 | 메서드를 호출한 객체 
생성자 함수 호출 | 생성자 함수가 (미래에) 생성할 인스턴스
Function.prototype.apply/call/bind 메서드에 의한 간접 호출 | Function.prototype.apply/call/bind 메서드에 첫 번째 인수로 전달한 객체
