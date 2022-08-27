# 38장 브라우저의 렌더링 과정
* 구글의 V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임 환경인 Node.js의 등장으로 자바스크립트는 웹 브라우저를 벗어나 서버사이드 애플리케이션 개발에서도 사용할 수 있는 범용 개발 언어가 되었다. 
* 하지만 자바스크립트가 가장 많이 사용되는 분야는 역시 웹 브라우저 환경에서 동작하는 웹 페이지/애플리케이션의 클라이언트 사이드다.

* 대부분의 프로그래밍 언어는 운영체제<sup>Operating System</sup>나 가상 머신 <sup>Virtual Machine</sup> 위에서 실행되지만 웹 애플리케이션의 클라이언트 사이드 자바스크립트는 브라우저에서 HTML, CSS와 함께 실행된다. 

* 따라서 브라우저 환경을 고려할 때 더 효율적인 클라이언트 사이드 자바스크립트 프로그래밍이 가능한다.

* 이를 위해 브라우저가 HTML, CSS 자바스크립트로 작성된 텍스트 문서를 어떻게 파싱(해석)하여 브라우저에 렌더링하는지 살펴보자.


## 파싱<sup>parsing</sup>
* 파싱(구문 분석 <sup>syntax analysis</sup>)은 프로그래밍 언어의 문법에 맞게 작성된 텍스트를 읽어 들여 실행하기 위해 텍스트 문서의 문자열을 토큰으로 분해(어휘 분석<sup>lexical analysis</sup>)하고, 토큰에 문법적 의미와 구조를 반영하여 트리 구조의 자료구조인 파스트리<sup>parse tree/syntax tree</sup> 를 생성하는 일련의 과정을 말한다. 일반적으로 파싱이 완료된 이후에는 파스 트리를 기반으로 중간 언어인 바이트코드를 생성하고 실행한다.

## 렌더링<sup>rendering</sup>
* 렌더링은 HTML, CSS, 자바스크립트로 작성된 문서를 파싱하여 브라우저에 시각적으로 출력하는 것을 말한다.

## 렌더링 과정
1. 브라우저는 HTML, CSS, 자바스크립트, 이미지, 폰트 파일 등 렌더링에 필요한 리소스를 요청하고 서버로부터 응답을 받는다.
2. 브라우저의 렌더링 엔진은 서버로부터 응답된 HTML과 CSS를 파싱하여 DOM과 CSSDOM을 생성하고 이들을 결합하여 렌더 트리를 생성한다.
3. 브라우저의 자바스크립트 엔진은 서버로부터 응답된 자바스크립트를 파싱하여 AST<sup>Abstract Syntax Tree</sup> 를 생성하고 바이트코드로 변환하여 실행한다. 이때 자바스크립트는 DOM API를 통해 DOM이나 CSSOM을 변경할 수 있다. 변경된 DOM과 CSSOM은 다시 렌더 트리가 결합된다.
4. 렌더 트리를 기반으로 HTML 요소의 레이아웃(위치와 크기)을 계산하고 브라우저 화면에 HTML 요소를 페인팅한다. 


## 38.1 요청과 응담
* 브라우저의 핵심 기능은 필요한 리소스(HTML, CSS, 자바스크립트, 이미지, 폰트 등의 정적 파일 또는 서버가 동적으로 생성한 데이터)를 서버에 요청<sup>request</sup> 하고 서버로부터 응답<sup>response</sup> 받아 브라우저에 시각적으로 렌더링하는 것이다. 
* 즉, 렌더링에 필요한 리소스는 모두 서버에 존재하므로 필요한 리소스를 서버에 요쳥하고 서버가 응답한 리소스를 파싱하여 렌더링하는 것이다. 

* 서버에 요청을 전송하기 위해 브라우저는 주소창을 제공한다. 
* 브라우저의 주소창에 URL의 주소창을 입력하고 엔터키를 누르면 URL의 호스트 이름이 DNS를 통해 IP주소로 변환되고 이 IP 주소를 갖는 서버에게 요청을 전송한다. 

> 예시
* 브라우저의 주소창에 https://poiemaweb.com을 입력하고 엔터키를 누르면 루트 요청이 poiemaweb.com 서버로 전송된다. 
* 루트 요청에는 명확히 리소스를 요청하는 내용이 없지만 일반적으로 서버는 루트 요청에 대해 암묵적으로 index.html을 응답하도록 기본 설정되어 있다. 
* 즉, https://poiemaweb.com은 https://poiemaweb.com/index.html과 같은 요청이다. 

* 따라서 서버는 루트 요청에 대해 서버의 루트폴더에 존재하는 정적 파일 index.html을 클라이언트(브라우저)로 응답한다. 
* 반드시 브라우저의 주소창을 통해 서버에게 정적 파일만을 요청할 수 있는 것은 아니다.
* 
* 자바스크립트를 통해 동적으로 서버에 정적/동적 데이터를 요청할 수도 있다.

* 요청과 응답은 개발자 도구의 Network 패널에서 확인할 수 있다.

브라우저의 주소창에 'https://poeimaweb.com'을 입력하고 엔터키를 눌러 서버에 루트 요청을 전송해보자. 
* 다음 그림처럼 브라우저가 poeimweb.com 서버에 요청한 내용과 서버가 응답한 내용을 개발자 도구의 Network 패널에서 확인할 수 있다. 

* 개발자 도구의 Network 패널을 활성화하기 이전에 브라우저가 이미 응답을 받은 경우
응답된 리소스가 표시되지 않는다. 

* 따라서 Network 패널에 아무런 리소스가 표시되지 않았다면 페이지를 새로고침해야 한다.

* index.html(poeimweb.com)뿐만 아니라 CSS, 자바스크립트, 이미지, 폰트 파일 들도 응답된 것을 확인할 수 있다. 요청도 하지 않은 이 리소스들은 왜 응답되었을까?

* 이는 브라우저의 렌더링 엔진이 HTML(index.html)을 파싱하는 도중에 외부 리소스를 로드하는 태그, 즉 CSS 파일을 로드하는 link태그, 자바스크립트를 로드하는 script태그등을 만나면 HTML의 파싱을 일시 중단하고 해당 리소스 파일을 서버로 요청하기 때문이다.

## 38.2 HTTP1.1과 HTTP2.0
* HTTP<sup>HyperText Transfer Protocol</sup>는 웹에서 브라우저와 서버가 통신하기 위한 프로토콜(규약)이다. 

* HTTP/1.1은 기본적으로 커넥션당 하나의 요청과 응답만 처리한다.
* 즉, 여러 개의 요청을 한 번에 전송할 수 없고 응답 또한 마찬가지다.
* 따라서 HTML 문서 내에 포함된 여러 개의 리소스 요청, 즉 CSS파일을 로드하는 link 태그, 이미지 파일을 로드하는 img태그, 자바스크립트를 로드하는 script태그 등에 의한 리소스 요청이 개별적으로 전송되고 응답 또한 개별적으로 전송된다.
* 이처럼 HTTP/1.1은 리소스의 동시 전송이 불가능한 구조이므로 요청할 리소스의 개수에 비례하여 응답시간도 증가하는 단점이 있다. 

* 이처럼 HTTP/1.1은 다중 요청/응답이 불가하다는 단점이 있지만 HTTP/2는 커넥션당 여러개의 요청과 응답, 즉 다중 요청/응답이 가능한다.
* 따라서 HTTP/2.0은 여러 리소스의 동시 전송이 가능하므로 HTTP/1.1에 비해 페이지 로드 속도가 약 50% 정도 빠르다고 알려져 있다.

## 구글의 HTTP/2 소개
* HTTP의 주요 목표는 완전한 요청 및 응답 다중화(Multiplexing)하여 지연을 줄이고 HTTP 헤더 필드의 효율적인 압축을 통해 프로토콜 오버헤드를 최소화하고 요청 우선 순위 지정 및 서버 푸시를 추가하는 것이다.

* 이러한 요구 사항을 구현하기 위해 새로운 흐름 제어, 오류 처리 및 업그레이드 메커니즘과 같은 다른 프로토콜 확장 기능의 많은 지원 캐스트가 있지만, 이러한 기능은 모든 웹 개발자가 어플리케이션에서 이해하고 활용해야 하는 가장 중요한 기능이다.

* HTTP/2는, HTTP의 애플리케이션 시멘틱스를 어떠한 방법으로도 변경하지 않는다. HTTP 메서드, 상태코드, URI 및 헤더 필드 등의 모든 핵심 개념은 그대로 유지된다.

* 대신 HTTP/2는 클라이언트와 서버간의 데이터 포맷 및 전송 방법을 변경하여 프로세스 전체를 관리한다. 

* 또, 새로운 프레임 레이어내의 애플리케이션으로부터 복잡함을 모두 숨긴다.

* 그 결과, 기존의 모든 애플리케이션을 변경하지 않고 전달할 수 있다.
## 38.3 HTML 파싱과 DOM 생성

* 브라우저의 요청에 의해 서버가 응답한 HTML 문서는 문자열로 이루어진 순수한 텍스트다.
* 순수한 텍스트인 HTML 문서를 브라우저에 시각적인 픽셀로 렌더링하러면 HTML 문서를 브라우저가 이해할 수 있는 자료구조(객체)로 변환하여 메모리에 저장해야 한다.

1. 서버에 존재한더 HTML  파일이 브라우저의 요청에 의해 응답된다. 이때 서버는 브라우저가 요청한 HTML 파일을 읽어 들여 메모리에 저장한 다음 메모리에 저장된 바이트(2진수)를 인터넷을 경유하여 응답한다.
2. 브라우저는 서버가 응답한 HTML 문서를 바이트(2진수) 형태로 응답받는다. 그리고 응답된 바이트 형태의 HTML 문서는 meta 태그의 charset 어트리뷰트에 의해 지정된 인코딩 방식(예: UTF-8)은 content-type: text/html; charset:utf-8과 같이 응답헤더<sup>response header</sup>에 담겨 응답된다.
3. 문자열로 변환된 HTML 문서를 읽어 들여 문법적 의미를 갖는 코드의 최소 단위인 토큰<sup>Token</sup> 들로 분해한다.
4. 각 토큰을 객체로 변환하여 노드<sup>node</sup> 들을 생성한다. 토큰의 내용에 따라 문서 노드, 요소 노드, 어트리뷰트 노드, 텍스트 노드가 생성된다. 노드는 이후 DOM을 구성하는 요소가 된다.
5. HTML 문서는 HTML 요소들의 집합으로 이루어지며 HTML 요소는 중첩 관계를 갖는다. 즉, HTML 요소의 컨텐츠 영역(시작 태그와 종료 태그 사이)에는 텍스트뿐만 아니라 다른 HTML, 요소도 포함될 수 있다. 이때 HTML 요소 간에는 중첩 관계에 의해 부자관계가 형성된다. 이러한 HTML 요소 간의 부자관계를 반영하여 모든 노드들을 트리 자료구조로 구성한다. 이 노드들로 구성된 트리 자료구조를 DOM<sup>Document Object Model</sup>이라 부른다.

즉, DOM은 HTML 문서를 파싱한 결과물이다.

## 38.4 CSS 파싱과 CSSOM 생성
* 렌더링 엔진은 HTML을 처음부터 한 줄씩 순차적으로 파싱하여 DOM을 생성해 나간다. 
* 이처럼 렌더링 엔진은 DOM을 생성해 나가다가 CSS를 로드하는 link 태그나 style 태그를 만나면 DOM 생성을 일시 중단한다.
* 그리고 link태그의 href 어트리뷰트에 지정된 CSS 파일을 서버에 요청하여 로드한 CSS 파일이나 style 태그 내의 CSS를 HTML과 동일한 하싱과정(바이트 -> 문자 -> 노드 -> CSSOM)을 거치며 해석하여 CSSOM<sup>CSS Object Model</sup>을 생성한다.
* 이후 CSS 파싱을 완료하면 HTML 파싱이 중단된 지점부터 다시 HTML을 파싱하기 시작하여 DOM 생성을 재개한다.

* 렌더링 엔진은 meta 태그까지 HTML을 순차적으로 해석한 다음, link 태그를 만나면 DOM생성을 일시 중단하고 link 태그의 href 어트리뷰트에 지정된 CSS 파일을 서버에 요청한다. 

* 서버로부턴 CSS 파일이 응답되면 렌더링 엔진은 HTML과 동일한 해석과정(바이트->문자->토큰->노드->CSSOM)을 거쳐 CSS를 파싱하여 CSSOM을 생성한다.

* CSSOM은 CSS의 상속을 반영하여 생성된다. 
```css
body{
    font-size:18px;
}
ul{
    list-style-type:none;
}
```
* CSSOM은 CSS의 상속을 반영하여 생성된다. 위 예제에서 body 요소에 적용한 font-size 프로퍼티와 ul 요소에 적용한 list-style-type 프로퍼티는 모든 li요소에 상속된다. 이러한 상속 관계가 반영되어 다음과 같은 CSSOM이 생성된다.

## 38.5 렌더 트리 생성
* 렌더링 엔진은 서버로 부터 응답된 HTML과 CSS를 파싱하여 각각 DOM과 CSSOㅡ를 생성한다. 그리고 DOM과 CSSOM은 렌더링을 위해 렌더 트리<sup>render tree</sup>로 결합된다.

* 렌더 트리는 렌더링을 위한 트리 구조의 자료구조다. 따라서 브라우저 화면에 렌더링되지 않는 노드(예: meta태그, script 태그 등)와 CSS에 의해 비표시(예: display: none)되는 노드들은 포함하지 않는다. 다시 말해, 렌더 트리는 브라우저 화면에 렌더링되는 노드만을 구성된다.

* 이후 완성된 렌더 트리는 각 HTML 요소의 레이아웃(위치와 크기)을 계산하는 데 사용되며 브라우저 화면에 픽셀을 렌더링하는 페인팅<sup>페인팅</sup>처리에 입력된다.

* 지금까지 살펴본 브라우저의 렌더링 과정은 반복해서 실행될 수 있다. 예를 들어, 다음과 같은 경우 반복해서 레이아웃 계산과 페인팅이 재차 실행된다.
  * 자바스크립트에 노드 추가 또는 삭제
  * 브라우저 창의 리사이징에 의한 뷰포트<sup>viewport 크기 변경</sup>
  * HTML 요소의 레이아웃(위치, 크기)에 변경을 발생시키는 width/height, margin, padding, border, display, position, top/right/bottom/left 등의 스타일 변경

* 레이아웃 계산과 페인팅을 다시 실행하는 리렌더링은 비용이 많이 드는, 즉 성능에 악영향을 주는 작업이다.
* 따라서 가급적 리렌더링이 빈번하게 발생하지 않도록 주의할 필요가 있다.

## 38.6 자바스크립트 파싱과 실행
* HTML 문서를 파싱한 결과물로서 생성된 DOM은 HTML 문서의 구조와 정보뿐만 아니라 HTML 요소와 스타일 등을 변경할 수 있는 프로그래밍 인터페이스로서 DOM API를 제공한다.
* 즉, 자바스크립트 코드에서 DOM API를 사용하면 이미 생성된 DOM을 동적으로 조작할 수 있다.

* CSS 파싱 과정과 마찬가지로 렌더링 엔진은 HTML을 한 줄씩 순차적으로 파싱하여 DOM을 생성해 나가다가 자바스크립트 파일을 로드하는 script 태그나 자바스크립트 코드를 콘텐츠로 담은 script 태그를 만나면 DOM 생성을 일시 중단한다.

* 그리고 script 태그의 src 어트리뷰트에 정의된 자바스크립트 파일을 서버에 요청하여 로드한 자바스크립트파일이나 script태그 내의 자바스크립트 코드를 파싱하기 위해 자바스크립트 엔진에 제어권을 넘긴다. 
* 이후, 자바스크립트 파싱과 실행이 종료되면 렌더링 엔진으로 다시 제어권을 넘겨 HTML 파싱이 중단된 지점부터 다시 HTML 파싱을 시작하여 DOM 생성을 재개한다.

* 자바스크립트 파싱과 실행은 브라우저의 렌더링 엔진이 아닌 자바스크립트 엔진이 처리한다.
* 자바스크립트 엔진은 자바스크립트 코드를 파싱하여 CPU가 이해할 수 있는 저수준언어로 변환하고 실행하는 역할을 한다.
* 자바스크립트 엔진은 구글 크롬과 Node.js의 V8, 파이어폭스의 SpiderMonkey, 사파리 JavaScriptCore 등 다양한 종류가 있으며, 모든 자바스크립트 엔진은 ECMAScript 사양을 준수한다.

* 렌더링 엔진으로 부터 제어권을 넘겨받은 자바스크립트 엔진은 자바스크립트 코드를 파싱하기 시작한다. 렌더링 엔진이 HTML과 CSS를 파싱하여 DOM과 CSSOM을 생성하듯이 자바스크립트 엔진은 자바스크립트를 해석하여 AST(추상적 구문 트리)를 생성한다. 
* 그리고 AST를 기반으로 인터프리터가 실핼 할 수 있는 중간코드인 바이트코들르 생성하여 실행한다.

## 38.7 리플로우와 리페인트
* 만약 자바스크립트 코드에 DOM이나 CSSOM을 변경하는 DOM API가 사용된 경우 DOM이나 CSSOM이 변경된다.
* 이때 변경된 DOM과 CSSOM은 다시 렌더 트리로 결합되고 변경된 렌더 트리를 기반으로 레이아웃과 페인트 과정을 거쳐 브라우저의 화면에 다시 렌더링한다.
* 이를 리플로우, 리페인트라 한다.

* 리플로우는 레이아웃 게산을 다시 하는 것을 말하며, 노드 추가/삭제, 요소의 크기/위치 변경, 윈도우 리사이징 등 레이아웃에 영향을 주는 변경이 발생한 경우에 한하여 실행된다. 

* 리페인트는 재결합된 렌더 트리를 기반으로 다시 페인트를 하는 것을 말한다.

* 따라서 리플로우와 리페인트가 반드시 순차적으로 동시에 실행되는 것은 아니다. 레이아웃에 영향이 없는 변경은 리플로우 없이 리페인트만 실행된다.


## 38.8 자바스크립트 파싱에 의한 HTML 파싱 중단

* 지금까지 살펴본 바와 같이 렌더링 엔진과 자바스크립트 엔진은 병렬적으로 파싱을 실행하지 않고 직렬적으로 파싱을 수행한다.
* 이처럼 브라우저는 동기적으로, 즉 위에서 아래 방향으로 순차적으로 HTML, CSS, 자바스크립트를 파싱하고 실행한다.
* 이것은 script 태그의 위치에 따라 HTML 파싱이 블로킹되어 DOM 생성이 지연될 수 있다는 것을 의미히니다.
* 따라서 script태그의 위치는 중요한 의미를 갖는다. 

```html
<head>
  <link rel='style' href='style.css'>
  <script>
    const $apple = document.getElementById('apple');
  </script>
</head>
<body>
  <ul>
    <li id="apple">apple</li>
    <li id="banana">banana</li>
    <li id="orange">orange</li>
  </ul>
</body>
```
* DOM API인 document.getElementById('apple')은 DOM에서 id가 'apple'인 HTMl요소를 취한다. 
* 하지만 document.getElementById('apple')을 실행하는 시점에는 아직 id가 'apple'인 HTML 요소를 파싱하지 않았기 때문에 DOM에는 id가 'apple'인 HTML요소가 포함되어있지 않은 상태이다. 따라서 동작하지 안흔ㄴ다.
* 이러한 문제를 회파하기 위해 body 요소의 가장 아래에 자바스크립트를 위치시키는 것은 좋은 아이디어이다.
  * DOM이 완성되지 않은 상태에서 자바스크립트가 DOM을 조작하면 에러가 발생할 수 있다.
  * 자바스크립트 로딩/파싱/실행으로 인해 HTML 요소들의 렌더링에 지장받는 일이 발생하지 않아 페이지 로딩 시간이 단축된다.

* body 요소의 가장 아래에 script태그를 입력하면
* 자바스크립트가 실행될 시점에는 이미 렌더링 엔진이 HTML요소를 모두 파싱하여 DOM생성을 완료한 이후다. 
* 따라서 DOM이 완성되지 않은 상태에서 자바스크립트가 DOM을 조작하는 에러가 발생할 우려도 없다.
* 또한 자바스크립트가 실행되기 이전에 DOM 생성이 완료되어 렌더링되므로 페이지 로딩 시간이 단축되는 이점도 있다.

## 38.9 script 태그의 async/defer 어트리뷰트
* 자바스크립트 파싱에 의한 DOM 생성이 중단되는 문제를 근본적으로 해결하기 위해 HTML5 부터 script태그에 async와 defer속성을 추가할 수 있게 되었다.

```html
<script async src='extern.js'></script>
<script defer src='extern.js'></script>
```

* async와 defer 어트리뷰트를 사용하면 HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다. 
* 하지만 자바스크립트의 실행 시점에 차이가 있다.

## async 어트리뷰트
* HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다. 단, 자바스크립트의 파싱과 실행은 자바스크립트 파일의 로드가 완료된 직후에 진행되며, 이때 HTML 파싱이 중단된다. 
* 여러 개의 script 태그에 async 어트리뷰트를 지정하면 script 태그의 순서와는 상관없이 로드가 완료된 자바스크립트부터 먼저 실행되므로 순서가 보장되지 않는다. 
* 따라서 순서가 보장이 필요한 script 태그에는 async 어트리뷰트를 지정하지 않아야 한다.

## defer 어트리뷰트
* async 어트리뷰트와 마찬가지로 HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다.
* 단, 자바스크립트의 파싱과 실행은 HTML파싱이 완료된 직후, 즉 DOM 생성이 완료된 직후(이때 DOMContentLoaded 이벤트가 발생한다.) 진행된다.
* 따라서 DOM생성이 완료된 이후 실행되어야 할 자바스크립트에 유용하다.


---

# 38장 브라우저의 렌더링 과정(발표)

<img src="https://github.com/JEONGHWANMIN/ModernJS_Study/blob/master/changhoon/img/브라우저의구조.png">

브라우저의 구조

>
UserInterface: 주소표시줄, 이전/다음/새로고침 버튼 등 웹 페이지를 제외하고 사용자와 상호작용하는 사용자 인터페이스
Browser Engine : 유저 인터페이스와 렌더링 엔진을 연결하는 브라우저 엔진
Rendering Engine : HTML과 CSS를 파싱하여 요청한 웹 페이지를 표시하는 렌더링 엔진
Networking : 네트워크 요청을 수행하는 네트워크 파트
JavaScript Interpreter : 자바스크립트 코드를 실행하는 인터프리터 (크롬은 V8)
UI Backend : 체크박스나 버튼과 같은 위젯을 그려주는 UI 백엔드 파트 
DataPersistance : 로컬스토리지, 쿠키와 같은 보조 기억장치에 데이터를 저장하는 파트 
 

렌더링 엔진

<img src="https://github.com/JEONGHWANMIN/ModernJS_Study/blob/master/changhoon/img/렌더링엔진.png">


렌더링 엔진의 목표
1. HTML, CSS, JS, 이미지 등 웹 페이지에 포함된 모든 요소들을 화면에 보여준다.
2. 업데이트가 필요할 때, 효율적으로 렌더링 할 수 있도록 자료 구조를 생성한다. (여기서 업데이트란 사용자와 상호작용, 스크롤, 클릭, 비동기 요청)





* 구글의 V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임 환경인 Node.js의 등장으로 자바스크립트는 **웹 브라우저**를 벗어나 (서버사이드 애플리케이션 개발) 서버 개발 에서도 사용할 수 있는 범용 개발 언어가 되었다. 

* 하지만 자바스크립트가 가장 많이 사용되는 분야는 역시** 웹 브라우저 환경**에서 동작하는 웹 페이지/애플리케이션의 클라이언트 사이드다.

* 대부분의 프로그래밍 언어는 운영체제<sup>Operating System</sup>나 가상 머신 <sup>Virtual Machine</sup> 위에서 실행되지만 

* 웹 애플리케이션의 클라이언트 사이드 자바스크립트는 **브라우저에서** HTML, CSS와 함께 실행된다. 

* 따라서 브라우저 환경을 고려할 때 더 효율적인 클라이언트 사이드 자바스크립트 프로그래밍이 가능한다.

* 이를 위해 브라우저가 HTML, CSS 자바스크립트로 작성된 텍스트 문서를 어떻게 파싱(해석)하여 브라우저에 렌더링하는지 살펴보자.


## 파싱<sup>parsing</sup>
* 파싱(구문 분석 <sup>syntax analysis</sup>)은 프로그래밍 언어의 문법에 맞게 작성된 텍스트를 읽어 들여 실행하기 위해 텍스트 문서의 문자열을 토큰으로 분해(어휘 분석<sup>lexical analysis</sup>)하고, 토큰에 문법적 의미와 구조를 반영하여 트리 구조의 자료구조인 파스트리<sup>parse tree/syntax tree</sup> 를 생성하는 일련의 과정을 말한다. 일반적으로 파싱이 완료된 이후에는 파스 트리를 기반으로 중간 언어인 바이트코드를 생성하고 실행한다.

## 렌더링<sup>rendering</sup>
* 렌더링은 HTML, CSS, 자바스크립트로 작성된 문서를 파싱하여 **브라우저에 시각적으로 출력하는 것을 말한다.**


<img src="https://github.com/JEONGHWANMIN/ModernJS_Study/blob/master/changhoon/img/렌더링엔진동작과정.png">



## 렌더링 과정
1. 브라우저는 HTML, CSS, 자바스크립트, 이미지, 폰트 파일 등 렌더링에 필요한 리소스를 요청하고 서버로부터 응답을 받는다.

2. 브라우저의 렌더링 엔진은 서버로부터 응답된 HTML과 CSS를 파싱하여 DOM과 CSSOM을 생성하고 이들을 결합하여 렌더 트리를 생성한다.

3. 브라우저의 자바스크립트 엔진은 서버로부터 응답된 자바스크립트를 파싱하여 AST<sup>Abstract Syntax Tree</sup>(추상 구문 트리) 를 생성하고 바이트코드로 변환하여 실행한다. 이때 자바스크립트는 DOM API를 통해 DOM이나 CSSOM을 변경할 수 있다. 변경된 DOM과 CSSOM은 다시 렌더 트리가 결합된다.

4. 렌더 트리를 기반으로 HTML 요소의 레이아웃(위치와 크기)을 계산하고 브라우저 화면에 HTML 요소를 페인팅한다. (리페인트..?)


## 38.1 요청과 응담
*** 브라우저의 핵심 기능은 필요한 리소스(HTML, CSS, 자바스크립트, 이미지, 폰트 등의 정적 파일 또는 서버가 동적으로 생성한 데이터)를 서버에 요청<sup>request</sup> 하고 서버로부터 응답<sup>response</sup> 받아 브라우저에 시각적으로 렌더링하는 것이다. **

* 즉, 렌더링에 필요한 리소스는 모두 서버에 존재하므로 필요한 리소스를 서버에 요쳥하고 서버가 응답한 리소스를 파싱하여 렌더링하는 것이다. 

* 서버에 요청을 전송하기 위해 브라우저는 주소창을 제공한다. 
* 브라우저의 주소창에 URL의 주소창을 입력하고 엔터키를 누르면 URL의 호스트 이름이 DNS를 통해 IP주소로 변환되고 이 IP 주소를 갖는 서버에게 요청을 전송한다. 

> 예시

* 브라우저의 주소창에 https://poiemaweb.com을 입력하고 엔터키를 누르면 루트 요청이 poiemaweb.com 서버로 전송된다. 

* 루트 요청에는 명확히 리소스를 요청하는 내용이 없지만 일반적으로 서버는 루트 요청에 대해 암묵적으로 **index.html을 응답하도록 기본 설정**되어 있다.

* 즉, https://poiemaweb.com은 **https://poiemaweb.com/index.html과 같은 요청이다. **

* 따라서 서버는 루트 요청에 대해 서버의 루트폴더에 존재하는 정적 파일 index.html을 클라이언트(브라우저)로 응답한다. 

* 반드시 브라우저의 주소창을 통해 서버에게 정적 파일만을 요청할 수 있는 것은 아니다.
* 자바스크립트를 통해 동적으로 서버에 정적/동적 데이터를 요청할 수도 있다.

* 요청과 응답은 개발자 도구의 Network 패널에서 확인할 수 있다.


---
* 브라우저의 주소창에 'https://poeimaweb.com'을 입력하고 엔터키를 눌러 서버에 루트 요청을 전송해보자. 

*브라우저가 poeimweb.com 서버에 요청한 내용과 서버가 응답한 내용을 개발자 도구의 Network 패널에서 확인할 수 있다. 

* 개발자 도구의 Network 패널을 활성화하기 이전에 브라우저가 이미 응답을 받은 경우
응답된 리소스가 표시되지 않는다. 

* 따라서 Network 패널에 아무런 리소스가 표시되지 않았다면 페이지를 새로고침해야 한다.

* index.html(poeimweb.com)뿐만 아니라 CSS, 자바스크립트, 이미지, 폰트 파일 들도 응답된 것을 확인할 수 있는데 데 그이유는

* 이는 브라우저의 렌더링 엔진이 HTML(index.html)을 파싱하는 도중에 외부 리소스를 로드하는 태그, **즉 CSS 파일을 로드하는 link태그, 자바스크립트를 로드하는 script태그등을 만나면 HTML의 파싱을 일시 중단하고 해당 리소스 파일을 서버로 요청하기 때문이다.**

## 38.2 HTTP1.1과 HTTP2.0

HTTP는 응용계층에 속하는 프로토콜이다. 이것이 통신을 하려면 전송계층을 통해야한다. 

HTTP/0.9 ~ /2 TCP 사용

|비교|TCP|UDP|
|---|---|---|
|연결방식|연결형 서비스|비연결형 서비스|
|패킷 교환|가상 회선 방식|데이터그램방식|
|전송순서보장|보장함|보장하지 않음|
|신뢰성|높음|낮음|
|전송속도|느림|빠름|

TCP는 신뢰성 구축에 신경을 많이 쓴 프로토콜
UDP는 신뢰성 신경쓰지 않고 일단 보냄
HTTP는 TCP를 이용한다.



> HTTP1.1은 1999년 출시됨
HTTP1.1은 기본적으로 연결당 하나의 요청과 응답을 처리하기 떄문에 동시 전송 문제와 다수의 리소스를 처리하기에 속도와 성능 이슈를 가지고 있다. 

* 매번 새로운 연결로 성능이 저하되고 서버 부하가 커져서 비용이 많이 발생하게됨


* HTTP<sup>HyperText Transfer Protocol</sup>는 웹에서 브라우저와 서버가 통신하기 위한 프로토콜(규약)이다. 

* HTTP/1.1은 기본적으로 커넥션당 하나의 요청과 응답만 처리한다.
* 즉, 여러 개의 요청을 한 번에 전송할 수 없고 응답 또한 마찬가지다.
* 따라서 HTML 문서 내에 포함된 여러 개의 리소스 요청, 즉 CSS파일을 로드하는 link 태그, 이미지 파일을 로드하는 img태그, 자바스크립트를 로드하는 script태그 등에 의한 리소스 요청이 개별적으로 전송되고 응답 또한 개별적으로 전송된다.
* 이처럼 HTTP/1.1은 리소스의 동시 전송이 불가능한 구조이므로 요청할 리소스의 개수에 비례하여 응답시간도 증가하는 단점이 있다. 

* 이처럼 HTTP/1.1은 다중 요청/응답이 불가하다는 단점이 있지만 HTTP/2는 커넥션당 여러개의 요청과 응답, 즉 다중 요청/응답이 가능한다.
* 따라서 HTTP/2.0은 여러 리소스의 동시 전송이 가능하므로 HTTP/1.1에 비해 페이지 로드 속도가 약 50% 정도 빠르다고 알려져 있다.

## 구글의 HTTP/2 소개
> HTTP 2015년에 등장함 
기존 HTTP/1.대 버전의 성능향상에 초점을 맞춘 프로토콜(성능도 속도도 좋아짐)
1. Multiplexed Streams(한 커넥션에 여러개의 메세지를 동시에 주고 받을 수 있음)
2. Stream Prioritziation(요청 리소스간 의존 관계를 설정),
3. Server Push(HTML 문서상에 필요한 리소스를 클라이언트 요청없이 보낼 수 있음)
4. Header Compression(Header 정보를 HPACK압충방식을 이용하여 압축전송)을 사용하여 성능을을 획기적으로 향상 시켰습니다.


![](https://velog.velcdn.com/images/anotherhoon/post/adad4a5a-9c9b-42bd-b2f6-e608399adfd7/image.png)


표준의 대체가 아닌 확장
HTTP 메시지 전송 방식의 변화
-> HEADERS와 DATA 프레임으로 나누고 그것을 -> 바이너리 프레이밍 계층 사용 ->  
파싱, 전송 속조 개선, 오류 발생 가능성 낮춤

* HTTP의 주요 목표는 완전한 요청 및 응답 다중화(Multiplexing)하여 지연을 줄이고 HTTP 헤더 필드의 효율적인 압축을 통해 프로토콜 오버헤드를 최소화하고 요청 우선 순위 지정 및 서버 푸시를 추가하는 것이다.

* 이러한 요구 사항을 구현하기 위해 새로운 흐름 제어, 오류 처리 및 업그레이드 메커니즘과 같은 다른 프로토콜 확장 기능의 많은 지원 캐스트가 있지만, 이러한 기능은 모든 웹 개발자가 어플리케이션에서 이해하고 활용해야 하는 가장 중요한 기능이다.

* HTTP/2는, HTTP의 애플리케이션 시멘틱스를 어떠한 방법으로도 변경하지 않는다. HTTP 메서드, 상태코드, URI 및 헤더 필드 등의 모든 핵심 개념은 그대로 유지된다.

* 대신 HTTP/2는 클라이언트와 서버간의 데이터 포맷 및 전송 방법을 변경하여 프로세스 전체를 관리한다. 

* 또, 새로운 프레임 레이어내의 애플리케이션으로부터 복잡함을 모두 숨긴다.

* 그 결과, 기존의 모든 애플리케이션을 변경하지 않고 전달할 수 있다.



> 자료 출처 및 참고 : [쿨라임의 HTTP/1.1, HTTP/2, 그리고 QUIC](https://www.youtube.com/watch?v=xcrjamphIp4)