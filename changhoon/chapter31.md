# 31장 RegExp

## 31.1 정규 표현식이란?

* 정규 표현식<sup>regular expression</sup> 은 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어(formal language)다.

* 정규 표현식은 자바스크립트의 고유 문법이 아니며, 대부분의 프로그래밍 언어와 코드 에디터에 내장되어 있다.

* 자바스크립트는 펄<sup>Pearl</sup> 의 정규 표현식 문법을 ES3 부터 도입했다.

* 정규 표현식은 문자열을 대상으로 패턴 매칭 기능을 제공한다. 
> 패턴 매칭 기능이란 특정 패턴과 일치하는 문자열을 검색하거나 추출 또는 치환할 수 있는 기능을 말한다.

* 예를 들어, 사용자로부터 입력받은 휴대폰 전화번호가 유효한 휴대폰 전호인지 체크하는 경우
> 휴대폰 전화번호는 '숫자 3개' + '-' + '숫자 4개' + '-' + '숫자 4개' 라는 일정한 패턴이 있다. 

* 이 휴대폰 전화번호 패턴을 정규 표현식으로 정의하고 사용자로부터 입력받은 문자열이 휴대폰 전화번호 패턴에 매칭하는지 체크할 수 있다.

```js
//사용자로부터 입력받은 휴대폰 전화번호
const tel = '010-1234-567팔';

//정규 표현식 리터럴로 휴대폰 전화번호 패턴을 정의한다.
const regExp = /^\d{3}-\d{4}-\d{4}$/;
3자리 숫자로시작하는가 숫자4번반복 숫자다4번반복 문자열의 종료$.

//tel이 휴대폰 전화번호 패턴에 매칭하는지 테스트(확인)한다.
regExp.test(tel); // false
```
* 만약 정규 표현식을 사용하지 않는다면 반복문과 조건문을 통해 '첫 번째 문자가 숫자이고 이어지는 문자도 숫자이고 이어지는 문자도 숫자이고 다음은 '-'이고 ... '와 같이 한 문자씩 연속해서 체크해야 한다.

* 정규표현식을 사용하면 반복문과 조건문 없이 패턴을 정의하고 테스트하는 것으로 간단히 체크할 수 있다 다만 정규 표현식은 주석이나 공백을 허용하지 않고 여러 가지 기호를 혼합하여 사용하기 때문에 가독성이 좋지 않다는 문제가 있다.

## 31.2 정규 표현식의 생성

* 정규 표현식 객체(RegExp 객체)를 생성하기 위해서는 정규 표현식 리터럴과 RegExp 생성자 함수를 사용할 수 있다.

* 일반적인 방법은 정규 표현식 리터럴을 사용하는 것이다. 

* 정규 표현식은 패턴과 플래그로 구성된다. 

```js
const target = 'Is this all there is?';

//패턴: is
//플래그: i => 대소문자를 구별하지 않고 검색한다.

const regexp = /is/i;

// test 메서드는 target 문자열에 대해 정규 표현식 regexp의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.
regexp.test(target); // true
```

* RegExp 생성자 함수를 사용하여 RegExp 객체를 생성할 수도 있다.

```js
/**
 * pattern : 정규 표현식의 패턴
 * flags : 정규 표현식의 플래그(g, i, m ,u, y)
**/
new RegExp(pattern[, flags])
```

```js
// [예제31-03]
const target = 'Is this all there is?';

const regexp = new RegExp(/is/i); //ES6
// const regexp = new RegExp(/is/,'i');
// const regexp = new RegExp('is', 'i');
regexp.test(target); //true
```
* RegExp 생성자 함수를 사용하면 변수를 사용해 동적으로 RegExp 객체를 생성할 수 있다.

```js
// [예제31-04]
const count = (str, char) => (str.match(new RegExp(char, 'gi')) ?? []).length;
count('Is this all there is?', 'is'); // -> 3
count('Is this all there is?', 'xx'); // -> 0
```

## 31.3 RegExp 메서드

### 31.3.1 RegExp.prototype.exec
* exec 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환한다. 매칭 결과가 없는 경우 null을 반환한다.
* exec 는 execuion의 줄임말로, 원하는 정보를 뽑아내고자 할 때 사용한다. 검색의 대상이 찾고자 하는 문자열데 대한 정보를 가지고 있다면 이를 배열로 반환하며, 찾는 문자열이 없다면 null을 반환한다.
```js
const target = 'Is this all there is?';
const regExp = /is/;
regExp.exec(target);
// -> ["is", index: 5, input: 'Is this all there is?', groups: undefined]
```
* exec 메서드는 문자열 내의 모든 패턴을 검색하는 **g 플래그를 지정해도 첫 번째 매칭 결과만 반환**하므로 주의하기 바란다.
### 31.3.2 RegExp.prototype.test
* test 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.
```js
const target = 'Is this all there is?';
const regExp = /is/;
regExp.test(tareget); // -> true
```

### 31.3.1 String.prototype.match
* String 표준 빌트인 객체가 제공하는 match 메서드는 대상 문자열과 인수로 전달받은 정규 표현식과의 매칭 결과를 배열로 반환한다.
```js
const target = 'Is this all there is?';
const regExp = /is/;
target.match(regExp);
// -> ['is', index: 5, input: "Is this all there is?", groups: undefined]
```
* exec 메서드는 문자열 내의 모든 패턴을 검색하는 g 플래그를 지정해도 첫 번째 매칭 결과만 반환한다.
* 하지만 String.prototype.match 메서드는 g 플래그가 지정되면 모든 매칭 결과를 배열로 반환한다. 


```js
//예제[31-08]
const target = 'Is this all there is?';
const regExp = /is/g;
target.match(regExp); // -> ['is', 'is']
```
---
번외
### String.prototype.replace
* '검색 후 바꾸기'를 수행한다. 첫 번째 인자로는 정규표현식을 받고, 두 번째 인자로는 치환하려는 문자열을 받는다. 문자열에서 찾고자 하는 대상을 검색해서 이를 치환하련느 문자열로 변경 후 변경된 값을 리턴한다.
```js
let target = 'Is this all there is?'
const regExp = /this/;
target.replace(regExp,'THIS'); // -> 'Is THIS all there is?'
```
### String.prototype.split()
* 주어진 인자를 구분자로 삼아, 문자열을 부분 문자열로 나누어 그 결과를 배열로 반환한다.

```js
const target = 'Is this all there is?';
target.split(' ') // ['Is', 'this', 'all', 'there', 'is']
```

### String.prototype.search()
* 정규표현식을 인자로 받아 가장 처음 매칭되는 부분 문자열의 위치를 반환한다. 매칭되는 문자열이 없으면 -1을 반환한다.
```js
const target = 'Is this all there is?';
const regExp = /hello/
target.search(/hello/); //-1
tareget.search(all); // 8
```

## 31.4 플래그
* 패턴과 함꼐 정규 표현식을 구성하는 플래그는 정규 표현식의 검색 방식을 설정하기 위해 사용한다.
* 플래그는 총 6개 있다. 
* 그중 중요한 3개의 플래그를 살펴보자.

|플래그|의미|설명|
|---|---|---|
|i|Ignore case|대소문자를 구별하지 않고 패턴을 검색한다.|
|g|global|대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다.|
|m|Multi line|문자열의 행이 바뀌더라도 패턴 검색을 계속한다.|

* 플래그는 옵션이므로 선택적으로 사용할 수 있으며, 순서와 상관없이 하나 이상의 플래그를 동시에 설정할 수도 있다.
* 어떠한 플래그를 사용하지 않은 경우 대소문자를 구별해서 패턴을 검색한다.
* 그리고 문자열에 패턴 검색 매칭 대상이 1개 이상 존재해도 첫 번째 매칭한 대상만 검색하고 종료 한다.

```js
const target = 'Is this all there is?'

// target 문자열에서 is 문자열을 대소문자를 구별하여 한 번만 검색한다.
target.match(/is/);
//-> ['is', index: 5, input: "Is this all there is?", groups: undefined]

// target 문자열에서 is 문자열을 대소문자를 구별하지 않고 한 번만 검색한다.
target.match(/is/i);
//-> ['is', index: 0, input: "Is this all there is?", groups: undefined]

// target 문자열에서 is 문자열을 대소문자를 구별하여 전역 검색하다.
target.match(/is/g);
// -> ['is','is']

// target 문자열에서 is 문자열을 대소문자를 구별하지 않고 전역 검색한다.
target.match(/is/ig);
// -> ['Is', 'is','is']
```

## 31.5 패턴
* 정규 표현식은 '일정한 규칙(패턴)을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어다. 정규 표현식은 패턴과 플래그로 구성된다. 정규 표현식의 패턴은 문자열의 일정한 규칙을 표현하기 위해 사용하며, 정규 표현식의 플래그는 정규 표현식의 검색 방식을 설정하기 위해 사용한다'

* 패턴은 /로 열고 닫으며 문자열의 따옴표는 생략한다. 
* 따옴표를 포함하면 따옴표까지도 패턴에 포함되어 검색된다.
* 또한 패턴은 특별한 의미를 가지는 메타문자 또는 기호로 표현할 수 있다.
* 어떤 문자열 내에 패턴과 일치하는 문자열이 존재할 때 '정규 표현식과 매치한다'고 표현한다. 
* 패턴을 표현하는 몇 가지 방법에 대해 살펴보자.

## 31.5.1 문자열 검색
* 정규 표현식의 패턴에 문자 또는 문자열을 지정하면 검색 대상 문자열에서 패턴으로 지정한 문자 또는 문자열을 검색한다.
* 정규 표현식을 생성하는 것만으로 검색이 수행되지는 않는다. 앞서 살펴본 RegExp 메서드를 사용하여 검색 대상 문자열과 정규 표현식의 매칭 결과를 구하면 검색이 수행된다.

* 검색 대상 문자열과 플래그를 생략한 정규 표현식의 매칭 결괄르 구하면 대소문자를 구별하여 정규 표현식과 매치한 첫 번째 결과만 반환한다. 

```js
const target = 'Is this all there is?'

// 'is' 문자열과 매치하는 패턴, 플래그가 생략되었으므로 대소문자로 구별한다.
const regExp = /is/;

//target과 정규 표현식이 매치하는지 테스트한다. 
regExp.test(target); // -> true

//target과 정규 표현식의 매칭 결과를 구한다. 
target.match(regExp);
// -> ['is', index: 5, input : 'Is this all there is?', groups: undefined]
```
* 대소문자를 구별하지 않고 검색하려면 플래그 i를 사용한다.
```js
const target = 'Is this all there is?';

// 'is' 문자열과 매치하는 패턴, 플래그 i를 추가하면 대소문자를 구별하지 않는다.
const regExp = /is/i 

target.match(regExp);
// -> ['Is', index:0, input:"Is this all there is?", groups: undefined]
```
* 검색 대상 문자열 내에서 패턴과 매치하는 모든 문자열을 전역 검색하려면 플래그 g를 사용한다.

```js
const target = 'Is this all there is?';

// 'is' 문자열과 매치하는 패턴,
// 플래그 g를 추가하면 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다.
const regExp = /is/ig;
target.match(regExp); // -> ['Is', 'is', 'is']
```

## 31.5.2 임의의 문자열 검색
* .은 임의의 문자 한 개를 의미한다. 문자의 내용은 무엇이든 상관없다. 다음 예제의 경우 .을 3개 연속하여 패턴을 생성했으므로 문자의 내용과 상관없이 3자리 문자열과 매치한다.

```js
const regExp = /.../g;
tareget.match(regExp); // -> ['Is ', 'thi', 's a', 'll ', 'the' 're ', 'is?']
```

## 31.5.3 반복 검색
* {m.n}은 앞선 패턴(다음 예제의 경우 A)이 최소 m번, 최대 n번 반복되는 문자열을 의미한다.
* 콤마 뒤에 공백이 있으면 정상 동작하지 않으므로 주의하기 바란다. 

```js
const target = 'A AA B BB Aa Bb AAA'
// 'A'가 최소 1번, 최대 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{1,2}/g

target.match(regExp); //-> ['A', 'AA', 'A', 'AA' A]
```

* {n}은 앞선 패턴이 n번 반복되는 문자열을 의미한다. 즉, {n}은 {n,n}과 같다.

```js
const target = 'A AA B BB Aa Bb AAA'
const regExp = /A{2}/g;
target.match(regExp); // -> ['AA', 'AA']
```
* {n,}은 앞선 패턴이 최소 n번 이상 반복되는 문자열을 의미한다.
```js
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 최소 2번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /A{2,}/g;
target.match(regExp); //-> ['AA', 'AAA']
```

## 31.6 자주 사용하는 정규 표현식

### 31.6.1 특정 단어로 시작하는지 검사
* 검색 대상 문자열이 'http://' 또는 'https://'로 시작하는지 검사한다.
* [...] 바깥의 ^은 문자열의 시작을 의미하고, ?은 앞선 패턴(다음 예제의 경우's')이 최대 한 번(0번 포함) 이상 반복되는지를 의미한다.
* 다시 말해, 검색 대상 문자열에 앞선 패턴('s')이 있어도 없어도 매치된다.
```js
//[예제 31-31]
const url = 'https://example.com';

// 'http://' 또는 'https://'로 시작하는지 검사한다.
/^https?:\/\//.test(url); // -> true
```

### 31.6.2 특정 단어로 끝나는지 검사

* 검색 대상 문자열이 'html'로 끝나는지 검사한다. '$'는 문자열의 마지막을 의미한다. 

```js
const fileName = 'index.html';
/html$/.test(fileName); // -> true
```

### 31.6.3 숫자로만 이루어진 문자열인지 검사
* 다음 예제는 검색 대상 문자열이 숫자로만 이루어진 문자열인지 검사한다.
* [...] 바깥의 ^은 문자열의 시작을, $는 문자열의 마지막을 의미한다. 
* \d는 숫자를 의미하고 +는 앞선 패턴이 최소 한 번 이상 반복되는 문자열의 의미하다.
* 즉, 처음과 끝이 숫자이고 최소 한 번 이상 반복되는 문자열과 매치한다.

```js
//[예제 31-34]
const target = '12345';

// 숫자로만 이루어진 문자열인지 검사한다. 
/^\d+$/.test(target); // -> true
```


