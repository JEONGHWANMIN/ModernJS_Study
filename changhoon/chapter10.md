# 10장 객체 리터럴
> 모던 자바스크립트 Deep Dive 10장 
## 10.1 객체란?
* 자바스크립트는 객체 <sup>objcect</sup>기반의 프로그래밍 언어이며, 자바스크립트를 구성하는 거의 "모든 것"이 객체다.

* 원시 값을 제외한 나머지 값(함수, 배열, 정규 표현식 등)은 모두 객체다.

* 원시 타입은 단 하나의 값만 나타내지만 객체타입<sup>object/reference type</sup> 은 다양한 타입의 값(원시 값 또는 다른 객체)을 하나의 단위로 구성한 복합적인 자료구조<sup>data structure</sup>다.

* 또한 원시 타입의 값, 즉 원시 값은 변경 불가능한 값<sup>immutable value</sup>이지만 객체 타입의 값, 즉 객체는 변경 가능한 값<sup>mutable value</sup>이다. 

* 객체는 0개 이상의 프로퍼티로 구성된 집합이며, 프로퍼티는 키<sup>key</sup>와 값<sup>value</sup>으로 구성된다.

* 자바스크립트에서 사용할 수 있는 모든 값은 프로퍼티 값이 될 수 있다. 

* 자바스크립트의 함수는 일급 객체 이므로 값으로 취급할 수 있다.

* 따라서 함수도 프로퍼티 값으로 사용할 수 있다.

* 프로퍼티 값이 함수일 경우, 일반 함수와 구분하기 위해 메서드<sup>method</sup>라 부른다.

* 객체는 프로퍼티와 메서드로 구성된 집합체이며 프로퍼티와 메서드의 역할은 다음과 같다.
> * 프로퍼티 : 객체의 상태를 나타내는 값(data)
> * 메서드 : 프로퍼티(상태 데이터)를 참조하고 조작할 수 있는 동작(behavior)

* 객체의 집합으로 프로그램을 표현하려는 프로그램 패러다임을 객체지향 프로그램이라 한다.


## extra 일급 객체
>18장 함수와 일급객체
1. 무명의 리터럴로 생성할 수 있다. 즉 런타임에 생성이 가능하다. 함수표현식으로 사용이 가능하다.
2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
3. 함수의 매개 변수에 전달 할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.
>section 2 Unit1-[JavaScript]고차 함수 Chapter1-1. 일급 객체
1. 변수에 할당(assign) 할 수 있다. 
2. 다른 함수의 전달인자(argument)로 전달 될 수 있다.
3. 다른 함수의 결과로서 리턴될 수 있다.

* 자바스크립트의 함수는 다음의 예제와 같이 위의 조건을 모두 만족하므로 일급 객체다.
* 따라서 우리는 고차함수를 사용할 수 있다.
* 고차 함수(higher order function)는 함수를 전달인자(argument)로 받을 수 있고, 함수를 리턴할 수 있는 함수입니다. 
```
// 1. 함수는 무명의 리터럴로 생성할 수 있다. 
무명의 리터럴
```

## 10.2 객체 리터럴에 의한 객체 생성
* 자바스크립트는 프로토타입 기반 객체지향 언어로서 클래스 기반 객체지향 언어와는 달리 다양한 객체 생성 방법을 지원한다.
> * 객체 리터럴 // const obj = {}
> * Object 생성자 함수 // const obj = new Object;
> * 생성자 함수 // 
> * Object.create 메서드 
> * 클래스(ES6) // class Person{}

* 객체 생성 방법중에서 가장 일반적이고 간단한 방법은 객체 리터럴을 사용하는 방법이다. 

* 객체 리터럴의 중괄호는 코드블록을 의미하지 않는다. 

* 코드 블록의 닫는 중괄호 뒤에는 세미 콜른을 붙이지 않는다.

* 하지만 객체 리터럴은 값으로 평가되는 표현식이다. 따라서 객체 리터럴의 닫는 중괄호 뒤에는 세미 콜론을 붙인다.

* 객체 리터럴 외의 객체 생성 방식은 모두 함수를 사용해 객체를 생성한다. 

## 10.3 프로퍼티

* 객체는 프로퍼티의 집합이며, 프로퍼티는 키와 값으로 구성된다.

* 프로퍼티를 나열할 때는 쉼표(,)로 구분한다. 일반적으로 마지막 프로퍼티 뒤에는 쉼표를 사용하지 않으나 사용해도 좋다.{그런데 this.name = "changhoon";this.age = 16; 메서드 사이에서도 ,도 되고 심지어 안적어도됨 객체가 아니라 함수라서 그런게 아닐까}

>* extra 클래스에서 정의한 메서드의 특징 434p 
> 2. 객체 리터럴과 다르게 클래스에서 메서드를 정의할 때는 콤마가 필요없다.

```
오늘 드라이버로써 페어랑 문제를 푸는데 습관적으로 this.age = 0, this.color = 'pink' 처럼 콤마를 찍고 있었는데 세미콜론을 찍어야하는 거였음!! 근데 사실 세미콜론을 쓰거나, 콤마를 쓰거나, 그냥 아무것도 입력하지 않아도 상관없음
class Grub {
  constructor(){
    this.age = 0;
    this.color = 'pink';
    this.food = 'jelly';
  }
  eat(){
    return `Mmmmmmmmm ${this.food}`
  }
}
```

```
const circleObj = {
    radius: 5,
    getDiameter(){
        return 2 * this.radius
    },
    sayHello(){
        return console.log("heollo")
    }
}

class Circle {
    constructor(radius){
        this.radius = radius
    }
    getDiameter(){
        return 2 * this.radius
    }
    sayHello(){
        return "hello"
    }
}
클래스 안에 메서드를 넣는 것은 함수안에 함수를 넣는것
function hello(){
    function say(){
        return console.log("say")
    }
    function ho(){
        return console.log("ho")
    }
    say()
    ho()
} 클로저아닌가?
hello()// say ho

클래스에서 메서드 사이에 쉼표를 넣으면 문법 에러가 발생한다.
```

* 프로퍼티 키와 프로퍼티 값으로 사용할 수 있는 값은 다음과 같다.
>* 프로퍼티 키 : 빈 문자열을 포함하는 모든 문자열 또는 심벌 [값](#1)
>* 프로퍼티 값 : 자바스크립트에서 사용할 수 있는 모든 값

* 심벌 값도 프로퍼티 키로 사용할 수 있지만 일반적으로 문자열을 사용한다.

* 이때 프로퍼티 키는 문자열이므로 따옴표('...' 또는 "...")로 묶어야 한다.

* 하지만 식별자 네이밍 규칙을 준수하는 이름, 즉 자바스크립트에서 사용가능한 유효한 이름인 경우 따옴표를 생략할 수 있다.

* 반대로, 식별자 네이밍 규칙을 따르지 않는 이름에는 반드시 따옴표를 사용해야 한다.

```
const person = {
    firstName = "chang-hoon" // 네이밍 규칙을 준수하는 프로퍼티 키
    "lase-name" = "Lee" // 네이밍 규칙을 준수하지 않은 프로퍼티 키
}
```
#1
*  프로퍼티 키에 문자열이나 심벌 값 외의 값을 사용하면 암묵적으로 타입 변환을 통해 문자열이 된다.
* 예를 들어 프로퍼티 키로 숫자 리터럴을 사용하면 따옴표는 붙지 않지만 내부적으로 문자열로 변환된다.

```
const foo = {
    0 : 1,
    1 : 2,
    2 : 3
};

console.log(foo); // {0:1. 1:2. 2:3}
console.log(typeof (Object.keys(foo)[0]));//string
```

* 이미 존재하는 프로퍼티 키를 중복선언하면 나중에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어쓴다. 이때 에러가 발생하지 않는다. 

```
const user = {
      name: '김코딩',
      company: {
        name: 'Code States',
        department: 'Development',
        role: {
          name: 'Software Engineer'
        }
      },
      age: 35
    }
const changedUser = {...user, name: '박해커',age: 20}
// user의 name 프로퍼티 키를 중복 선언하여 나중에 선언한 name: '박해커'가 먼저 선언한 name: '김코딩'를 덮어썼다. 

```


##  10.4 메서드
* 자바스크립트의 함수는 객체(일급 객체)다. 따라서 함수는 값으로 취급할 수 있기 때문에 프로퍼티 값으로 사용할 수 있다. 

* 프로퍼티 값이 함수일 경우 일반 함수와 구분하기 위해 메서드<sup>method</sup>라 부른다.

* 즉 메서드는 객체에 묶여 있는 함수를 의미한다.

* 메서드 내부에서 this 키워드는 객체 자신(함수x 객체 자신 O)을 가리키는 참조 변수다. 

## 10.5 프로퍼티 접근
* 프로퍼티에는 두 가지 방법으로 접근할 수 있다.
>* 마침표 프로퍼티 접근 연산자(.)를 사용하는 마침표 표기법<sup>dot notation</sup> 
>* 대괄호 프로퍼티 접근 연산자([...])를 사용하는 대괄호 표기법 <sup>bracket notation</sup> 

* 대괄호 표기법을 사용하는 경우 대괄호 프로퍼티 접근 연산자 내부에 지정하는 프로퍼티 키는 반드시 따옴표로 감싼 문자열이어야 한다.

* 대괄호 프로퍼티 접근 연산자 내에 따옴표로 감싸지 않음 이름을 프로퍼티 키로 사용하면 자바스크립트 엔진은 식별자로 해석한다. {식별자가 뭘까}

* 객체에 존재하지 않은 프로퍼티에 접근하면 undefined를 반환한다. 이때 ReferenceError가 발생하지 않는다.

* 프로퍼티 키가 식별자 네이밍 규칙을 준수하지 않는 이름, 즉 자바스크립트에서 사용 가능한 유효한 이름이 아니면 반드시 대괄호 표기법을 사용해야 한다. 
```
const foo ={
    0 : 1,
    1 : 2,
    2 : 3
}
foo.1 // Uncaught SyntaxError: Unexpected number
foo['1'] // 2
```

* 단, 프로퍼티 키가 숫자로 이뤄진 문자열인 경우 따옴표를 생략할 수있다. 
* 그 외의 경우 대괄호 내에 들어가는 프로퍼티 키는 반드시 따옴표로 감싼 문자열이어야 한다는 점을 잊지 말자.




## 10.6 프로퍼티 값 갱신

* 이미 존재하는 프로퍼티에 값을 할당하면 프로퍼티 값이 갱신된다.

## 10.7 프로퍼티 동적 생성

* 존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가되고 프로퍼티 값이 할당된다.
```
const person {
    name : 'Lee'
};
person.age = 20;

console.log(person) // {name: "Lee", age: 20}
```

## 10.8 프로퍼티 삭제
* delete 연산자는 객체의 프로퍼티를 삭제한다. 이때 delete 연산자의 피연산자는 프로퍼티 값에 접근할 수 있는 표현식이어야 한다. 

* 만약 존재하지 않는 프로퍼티를 삭제하면 아무런 에러 없이 무시된다.

```
const person = {
    name : "lee",
    age : 16
}
person.hometown = 'Pusan'
delete person.age;// person 프로퍼티에 age가 존재하므로 age프로퍼티를 삭제할 수 있다.
delete person.gender; // person 프로퍼티에 gender가 존재하지 않으므로 gender프로퍼티를 삭제할 수 없다. 이때 에러가 발생하지 않는다.
```

## 10.9 ES6에서 추가된 객체 리터럴의 확장 기능

## 10.9.1 프로퍼티 축약 표현
* 객체 리터럴의 프로퍼티는 프로퍼티 키와 프로퍼티 값으로 구성된다.

* 프로퍼티 값은 변수에 할당된 값, 즉 식별자 표현식일 수도 있다.

```
const x = 1, y = 2;

const obj = {
    x: x,
    y: y
}
console.log(obj) // {x:1, y:2}
프로퍼티 키는 왜 안 바뀔까?
```

* ES6에서 프로퍼티 값으로 변수를 사용하는 경우 변수 이름과 프로퍼티 키가 동일한 이름일 때 프로퍼티 키를 생략<sup>property shorthand</sup> 할 수 있다. 

* 이때 프로퍼티 키는 변수 이름으로 자동 생성된다.

```
const x = 1 , y = 2;
const obj = {
    x,
    y,
},
console.log(obj) // {x:1, y:2}
```

## 10.9.2 계산된 프로퍼티 이름
* 문자열 또는 문자열 타입 변환할 수 있는 값으로 평가되는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수도 있다. 
* 단, 프로퍼티 키로 사용할 표현식을 대괄호([...])로 묶어야 한다. 
* 이를 계산된 프로퍼티 이름<sup>computed property name</sup>이라 한다.

```
//ES5
cont prefix = 'prop';
let i = 0;
const obj ={};
//계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성
obj[prefix + '-' + ++i] = i
obj[prefix + '-' + ++i] = i
obj[prefix + '-' + ++i] = i
console.log(obj); //{prop-1 : 1, prop-2 : 2, prop-3 : 3}
```

ES6에서는 객체 리터럴 내부에서도 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성할 수 있다.

```
//ES5
cont prefix = 'prop';
let i = 0;
const obj ={
    [`${prefix} - ${++i}`]: i,
    [`${prefix} - ${++i}`]: i,
    [`${prefix} - ${++i}`]: i
};
console.log(obj); //{prop-1 : 1, prop-2 : 2, prop-3 : 3}
```

## 10.9.3
* ES5에서 메서드를 정의하려면 프로퍼티 값으로 함수를 할당한다.
```
ES5
const obj = {
    name : 'Lee',
    sayHi: function(){
        console.log('Hi' + this.name);
    }
}
obj.sayHi(); // Hi! Lee
```

* ES6에서는 메서드를 정의할 때 function 키워드를 생략한 축약 표현을 사용할 수 있다.
```
ES6
const obj = {
    name: 'Lee',
    sayHi(){
        console.log('Hi' + this.name);
    }
}
```
* ES6의 메서드 축약 표현으로 정의한 메서드는 프로퍼티에 할당한 함수와 다르게 작동한다.