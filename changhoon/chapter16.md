# 16장 프로퍼티 어트리뷰트

## 16.1 내부 슬롯과 내부 메서드

* 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티<sup>pseudo property</sup>와 의사 메서드<sup>pseudo method</sup>다.

* ECMAScript 사양에 등장하는 이중 대괄호 (`[[...]]`)로 감싼 이름들이 내부 슬롯과 내부 메서드다.

* 내부 슬롯과 내부 메서드는 ECMAScript 사양에 정의된 대로 구현되어 자바스크립트 엔진에서 실제로 동작하지만 개발자가 직접 접근할 수 있도록 외부로 공개된 객체의 프로퍼티는 아니다. 

* 즉, 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 내부 로직이므로 원칙적으로 자바스크립트는 내부 슬롯과 내부 메서드에 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않는다.

* 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.

* 모든 객체는 `[[Prototype]]`이라는 내부 슬롯을 갖는다. 

* 내부 슬롯은 자바스크립트 엔진의 내부로직이므로 원칙적으로 직접 접근할 수 없지만 `[[Prototype]]` 내부 슬롯의 경우 ,`__proto__`를 통해 간접적으로 접근할 수 있다.

```
const obj = {}
obj.[[prototype]] // Uncaught SyntaxError: Unexpected token '['
obj.__proto__ // -> Object.prototype
```
## 16.2 프로퍼티 어트리뷰트와 프로퍼티 디스크럽트 객체
> * 자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다. 
> * 프로퍼티의 상태란 프로퍼티의 값<sup>value</sup>, 값의 갱신 가능 여부 <sup>writable</sup>, 열거 가능 여부 <sup>enumerable</sup>, 재정의 가능 여부 <sup>configurable</sup>

* 프로퍼티 어트리뷰트는 자바스크립트 엔진이 관리하는 내부 상태 값<sup>meta-property</sup> 인 내부 슬롯 `[[Value]]`,`[[Writable]]`, `[[Enumerable]]`, `[[Configurable]]`이다. 

* 따라서 프로퍼티 어트리뷰트에 직접 접근할 수 없지만 Object.getOwnPropertyDescriptor 메서드를 사용하여 간접적으로 확인할 수 있다. 

> 예제 코드

> 얕은 복사 
```
const personOne = {}
const personTwo = personOne
Object.defineProperties(personOne, {
    firstName : {
        value : "changhoon",
        writabe: false
    }
})
Object.getOwnPropertyDescriptors(personOne)// 둘다 똑같은 값이 나옴
Object.getOwnPropertyDescriptors(personTwo)// 둘다 똑같은 값이 나옴
```
> 깊은 복사 writable: false
```
const personOne = {}
Object.defineProperties(personOne, {
    firstName : {
        value : "changhoon",
        writabe: false
    }
})
const personTwo = JSON.parse(JSON.stringify(personOne))
console.log(personTwo)// {} 아무것도 담기지 않음
personOne.lastName = 'lee'
const personThree = JSON.parse(JSON.stringify(personOne))
console.log(personThree)// {lastName: 'lee'} 
```
> 예제 코드 enumerable
```
const objArr = {
    arr: [1, 2, 3, 4]
}
Object.getOwnPropertyDescriptors(objArr)

Object.defineProperties(objArr, {
    arr : {
        enumerable: false
    }
})
const deepArr =  JSON.parse(JSON.stringify(objArr))//{}
```
* writable이 false일 경우 얕은 복사를 할 경우 프로퍼티의 상태까지 똑같음(당연하다 같은 주소를 참조하니까)

* 하지만 깊은 복사를 하게 될 경우 writable이 true한 값만 복사된다.

## 16.3 데이터 프로퍼티와 접근자 프로퍼티

* 프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분할 수 있다. 

* 데이터 프로퍼티 <sup>data property</sup>
    * 키와 값으로 구성된 일반적인 프로퍼티다. 지금까지 살펴본 모든 프로퍼티는 데이터 프로퍼티다.
* 접근자 프로퍼티 <sup>accessor property</sup>
    * 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수<sup>accessor function</sup> 로 구성된 프로퍼티다.

## 16.3. 데이터 프로퍼티
* 데이터 프로퍼티<sup>data property</sup> 는 다음과 같은 프로퍼티 어트리뷰트를 갖는다. 이 프로퍼티 어트리뷰트는 자바스크립트 엔진이 프로퍼티를 생성할 때 기본 값으로 자동 정의 된다. 
<sup></sup>

|프로퍼티 어트리뷰트|프로퍼티 디스크럽터 객체의 프로퍼티|설명|
|------|---|---|
|`[[value]]`|value| * 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 값이다.<br> * 프로퍼티 키를 통해 프로퍼티 값을 변경하면 `[[Value]]`에 값을 재할당한다. <br> 이때 프로퍼티가 없으면 프로퍼티를 동적으로 생성하고 생성된 프로퍼티의 `[[Value]]`의 값을 저장한다.|
|`[[Writable]]`|writable| * 프로퍼티 값의 변경 가능 여부를 나타내며 불리언 값을 갖는다.<br> * `[[Writable]]`의 값이 false인 경우 해당 프로퍼티의 `[[Va  lue]]`의 값을 변경할 수 없는 읽기 전용 프로퍼티가 된다. |
|`[[Enumerable]]`|enumerable| * 프로퍼티의 열거 가능 여부를 나타내며 불리언 값을 갖는다. <br> * `[[Enumerable]]`의 값이 false인 경우 해당 프로퍼티는 for ... in 문이나 Object.keys 메서드 등으로 열거할 수 없다.
|`[[Configurable]]`|configurable|* 프로퍼티의 재정의 가능 여부를 나타내며 불리언 값을 갖는다. <br> * `[[Configurable]]`의 값이 false인 경우 해당 프로퍼티의 삭제, 프로퍼티 어트리뷰트 값의 변경이 금지된다. 단, `[[Writable]]`이 true인 경우 `[[Value]]`의 변경과 `[[Writable]]`을 false로 변경하는 것은 허용된다.|

## 16.3.2 접근자 프로퍼티

* 접근자 프로퍼티<sup>accessor property</sup>는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수<sup>accessor function</sup> 로 구성된 프로퍼티다.

|프로퍼티 어트리뷰트|프로퍼티 디스크럽터 객체의 프로퍼티|설명|
|------|---|---|
|`[[Get]]`|get|* 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수다.<br> * 즉, 접근자 프로퍼티 키로 프로퍼티 값에 접근하면 프로퍼티 어트리뷰트 `[[Get]]`의 값, 즉 getter 함수가 호출되고 그 결과가 프로퍼티 값으로 반환된다.|
|`[[Set]]`|set|* 접근자 프로퍼티를 통해 데이터의 값을 저장할 때 호출되는 접근자 함수다.<br> * 즉, 접근자 프로퍼티 키로 프로퍼티 값을 저장하면 프로퍼티 어트리뷰트 `[[Set]]`의 값, 즉 setter 함수가 호출되고 그 결과가 프로퍼티 값으로 저장된다.|
|`[[Enumerable]]`|enumerable| * 프로퍼티의 열거 가능 여부를 나타내며 불리언 값을 갖는다. <br> * `[[Enumerable]]`의 값이 false인 경우 해당 프로퍼티는 for ... in 문이나 Object.keys 메서드 등으로 열거할 수 없다.|
|`[[Configurable]]`|configurable|* 프로퍼티의 재정의 가능 여부를 나타내며 불리언 값을 갖는다. <br> * `[[Configurable]]`의 값이 false인 경우 해당 프로퍼티의 삭제, 프로퍼티 어트리뷰트 값의 변경이 금지된다. 단, `[[Writable]]`이 true인 경우 `[[Value]]`의 변경과 `[[Writable]]`을 false로 변경하는 것은 허용된다.|

* 접근자 함수는 getter/setter 함수라고도 부른다. 접근자 프로퍼티는 getter와 setter 함수를 모두 정의할 수도 있고 하나만 정의 할 수도 있다.

> get 은 값을 읽을 때, set은 값을 저장할 때 호출되는 접근자 함수다!
```
const person = {
    firstName = 'Ungmo',
    lastName = 'Lee',
    
    //호출될 떄 리턴해줄 값
    get fullName(){
        return `${this.firstName} ${this.lastName}`;
    },
    //프로퍼티를 할당할 때
    set fullName(name){
        [this.firstName, this.lastName] = name.split(' ');
    }
    구조 분해 할당으로 name으로 'changhoon lee'가 들어왔고 띄워쓰기를 기준으로 나뉘고 0번 인덱스인 changhoon이 firstName, 1번 인덱스 lee가 lastName에 할당된다.

    person.fullName = 'changhoon lee';
    console.log(person) // {firstName : "changhoon", lastName : "Lee"}
    console.log(person.fullName); changhoon Lee
}
```

* person 객체의 firstName과 lastName 프로퍼티는 일반적인 데이터 프로퍼티다.

* 메서드 앞에 get, set이 붙은 메서드가 있는데 이것들이 바로 getter와 setter 함수이다.

* getter/setter 함수의 이름 fullName이 접근자 프로퍼티다. 

* 접근자 프로퍼티는 자체적으로 값(프로퍼티 어트리뷰트`[[Value]]`)을 가지지 않으며 다만 데이터 프로퍼티의 값을 읽거나 저장할 때 관여할 뿐이다.

* 내부 슬롯과/메서드 관점에서 설명하면 접근자 프로퍼티 fullName으로 프로퍼티 값에 접근하면 내부적으로 `[[Get]]`내부 메서드가 호출되어 다음과 같이 동작한다.
    * 1. 프로퍼티 키가 유효한지 확인한다. 프로퍼티 키는 문자열 또는 심벌이어야 한다. 프로퍼티 키 "fullName"은 문자열이므로 유효한 프로퍼티 키다.
    * 2. 프로토타입 체인에서 프로퍼티를 검색한다. person 객체에 fullName 프로퍼티가 존재한다. 
    * 3. 검색된 fullName의 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인한다. fullName프로퍼티는 접근자 프로퍼티다.
    * 4. 접근자 프로퍼티 fullName의 프로퍼티 어트리뷰트 `[[Get]]`의 값, 즉 getter 함수를 호출하여 그 결과를 반환한다. 프로퍼티 fullName의 프로퍼티 어트리뷰트 `[[Get]]`의 값은 Object.getOwnPropertyDescriptor 메서드가 반환하는 프로퍼티 디스크립터<sup>Property Descriptor</sup> 객체의 get 프로퍼티 값과 같다.

## 프로토타입 <sup>prototype</sup>

* 프로토타입은 어떤 객체의 상위(부모) 객체의 역할을 하는 객체다. 

* 프로토타입은 하위(자식) 객체에게 자신의 프로퍼티와 메서드를 상속한다.

* 프로토타입 객체의 프로퍼티나 메서드를 상속받은 하위 객체는 자신의 프로퍼티 또는 메서드인것 처럼 자유롭게 사용할 수 있다.

* 프로토타입 체인은 프로토타입이 단방향 링크드 리스트 형태로 연결되어 있는 상속 구조를 말한다. 

* 객체의 프로퍼티나 메서드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면 프로토타입 체인을 따라 프로토타입의 프로퍼티나 메서드를 차례대로 검색한다.

## 접근자 프로퍼티와 데이터 프로퍼티를 구별하는 방법

```
// 일반 객체의 __proto__는 접근자 프로퍼티다.
// 함수 객체의 prototype은 데이터 프로퍼티다.
```

## 16.4 프로퍼티 정의
* 프로퍼티 정의란 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나, 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의 하는 것을 말한다.

* 프로퍼티 값을 갱신 가능하도록 할 것인지, 프로퍼티를 열거 가능하도록 할 것인지, 프로퍼티를 재정의 가능하도록 할 것인지 정의할 수 있다.

* Object.defineProperty 메서드를 사용하면 프로퍼티의 어트리뷰트를 정의할 수 있다. 

* 인수로는 객체의 참조와 데이터 프로퍼티의 키인 문자열 문자열, 문자열 디스크럽터 책체를 전달한다.

* Object.defineProperty 메서드로 프로퍼티를 저으이할 때

* Object.defineProperties 메서드를 사용하면 여러 개의 프로퍼티를 한 번에 정의할 수 있다.

|프로퍼티 디스크럽터 객체의 프로퍼티|대응하는 프로퍼티 어트리뷰트|생략했을 때의 기본 값|
|------|---|---|
|value|`[[value]]`|undefined|
|get|`[[get]]`|undefined|
|set|`[[set]]`|undefined|
|writable|`[[writable]]`|false|
|enumerable|`[[enumerable]]`|false|
|configuranle|`[[configuranle]]`|false|

>예제코드

>writable
```

Object.defineProperties(person, {
    firstName : {
        value : "changhoon",
        writabe: false
    }
})
person.firstName /// changhoon
person.firstName = 'yerin'// 아무런 에러 안뜨고 바뀔 것 처럼 나옴
person.firstName // changhoon 
```
>configurable
```
Object.defineProperties(person, {
    firstName : {
        value : "changhoon",
        configurable: false
    }
})
person.firstName /// changhoon
person.firstName = 'yerin'// 아무런 에러 안뜨고 바뀔 것 처럼 나옴
person.firstName // changhoon 
```

> 얕은 복사 깊은복사

## 16.5 객체 변경 방지
* 객체는 변경 가능한 값이므로 재할당 없이 직접 변경할 수 있다.

* 즉, 프로퍼티를 추가하거나 삭제할 수 있고, 프로퍼티 값을 갱신할 수 있으며, Object.defineProperty 또는 Object.defineProperties 메서드를 사용하여 프로퍼티 어트리뷰트를 재정의할 수도 있다. 

* 자바스크립트는 객체의 변경을 방지하는 다양한 메서드를 제공한다. 객체 변경 방지 메서드들은 객체의 변경을 금지하는 강도가 다르다.

## 16.5.1 객체 확장 금지
* Object.preventExtensions 메서드는 객체의 확장을 금지한다. 

* 확장이 금지된 객체는 프로퍼티 추가가 금지된다.

* 프로퍼티는 프로퍼티 동적 추가와 Object.defineProperty 메서드로 추가할 수 있다. 

* 이 두가지 방법이 모두 금지된다. 확장이 가능한 객체인지 여부는 Object.isExtensible 메서드로 확인 할 수 있다.

## 16.5.2 객체 밀봉
* Object.seal 메서드는 객체를 밀봉한다. 

* 객체 밀봉<sup>seal</sup> 이란 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지를 의미한다. 

* 밀봉된 객체는 읽기와 쓰기만 가능하다.

* 밀봉된 객체인지 여부는 Object.isSealed 메서드로 확인할 수 있다.

## 16.5.3 객체 동결
* Object.Freeze 메서드는 객체를 동결한다. 

* 객체 동결<sup>freeze</sup> 이란 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지, 프로퍼티 값 갱신 금지를 의미한다. 

* 동결된 객체는 읽기만 가능하다.

* 동결된 객체인지 여부는 Object.isFrozen 메서드로 확인할 수 있다.

## 16.5.4 불변 객체

* 앞서 알아본 변경 방지 메서드들은 얕은 변경 방지로 직속 프로퍼티만 변경이 방지되고 중첩 객체 까지는 영향을 주지는 못한다.

* Object.freeze 메서드로 객체를 동결하여도 중첩 객체까지 동결할 수 없다.

* 객체의 중첩 객체까지 동결하여 변경이 불가능한 읽기 전용의 불변 객체를 구현하러면 객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 Object.freeze 메서드를 호출해야 한다.







