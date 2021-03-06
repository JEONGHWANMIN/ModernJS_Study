# 04장 변수
>모던 자바스크립트 Deep Dive

- 메모리는 데이터를 저장할 수 있는 메모리셀의 집합체다. 메모리 셀 하나의 크기는 1바이트(8비트)이며, 컴퓨터는 메모리의 셀의 크기, 즉 1바이트 단위로 데이터를 저장하거나 읽어들인다. 각 셀은 고유의 메모리 주소를 갖는다. 

- 변수(variable)는 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름을 말한다. <br>간단히 말하자면 변수는 프로그래밍 언어에서 값을 저장하고 참조하는 메커니즘으로, **값의 위치를 가리키는 상징적인 이름**이다.

- 메모리 공간에 저장된 값을 식별할 수 있는 고유한 이름을 **변수 이름(변수명)**이라 한다. <br>그리고 변수에 저장된 값을 **변수 값**이라고 한다.

- 변수에 값을 저장하는 것을 **할당<sup>assignment</sup>(대입, 저장)**이라 하고, 변수에 저장된 값을 읽어 들이는 것을 **참조<sup>reference</sup>**라 한다.


- 변수 이름을 식별자<sup>identifier</sup>라고도 한다. **식별자는 어떤 값을 구별해서 식별할 수 있는 고유한 이름을 말한다.**

- 식별자는 값이 저장되어 있는 메모리 주소를 기억해야 한다. 즉, 식별자는 값이 저장되어 있는 메모리 주소와 매핑 관계를 맺으며, 이 매핑 정보도 메모리에 저장되어야 한다.

- 이처럼 **식별자는 값이 아니라 메모리 주소를 기억하고 있다.** 식별자는 메모리 주소에 붙인 이름이다.

- 식별자라는 용어는 변수 이름에만 국한해서 사용하지 않는다. **예를 들어, 변수, 함수, 클래스 등의 이름은 모두 식별자다.**

- **변수 선언은 소스코드가 순차적으로 실행되는 시점인 런타임 이전에 먼저 실행되지만 값의 할당은 소스코드가 순차적으로 실행되는 시점인 런타임에 실행된다.**

- 변수의 선언과 값의 할당을 하나의 문장으로 단축 표현해도 var score = 80; 자바스크립트 엔진은 변수의 선언과 값의 할당을 2개의 문으로 나누어 각각 실행한다.

- var 키워드로 선언한 변수는 값을 재할당할 수 있다. 재할당은 현재 변수에 저장된 값을 버리고 새로운 값을 저장하는 것이다. var키워드로 선언한 변수는 선언과 동시에 undefined로 초기화 되기 때문에 **엄밀히 말하자면 변수에 처음으로 값을 할당하는 것도 사실은 재할당이다.**

- 만약 **값을 재할당할 수 없어서 변수에 저장된 값을 변경할 수 없다면 변수가 아니라 상수<sup>constant</sup>라 한다.**

- 현재 score 변수의 값은 90이다. score 변수의 이전 값인 undefined와 80은 어떤 변수도 값으로 갖고 있지 않다. 다시 말해, 어떤 식별자와도 연결되어 있지 않다. 이것은 undefined와 80이 더 이상 필요하지 않다는 것을 의미한다.**이러한 불필요한 값들은 가비지 콜렉터에 의해 메모리에서 자동 해제된다.**<br>

  단 메모리에서 언제 해제될지는 예측할 수 없다.

  

- 가비지 콜렉터 <sup>garbage collector</sup>
  가비지 콜렉터는 애플리케이션이 할당한 메모리 공간을 주기적으로 검사하여 더 이상 사용되지 않는 메모리를 해제<sup>release</sup>하는 기능을 말한다.  더 이상 사용되지 않는 메모리란 간단히 말하자면 어떤 식별자도 참조하지 않는 메모리 공간을 의미한다. 자바스크립트는 가비지 콜렉터를 내장하고 있는 매니지드 언어로서 가비지 콜렉터를 통해 메모리 누수<sup>memory leak</sup>를 방지한다.

- 언매니지드 언어와 매니지드언어
  프로그래밍 언어는 메모리 관리 방식에 따라 언매니지드 언어와 매니지드 언어로 분류할 수 있다.
  C 언어 같은 언매니지드 언어는 개발자가 명시적으로 메모리를 할당하고 해제하기 위해 malloc()과 free()같은 저수준 메모리 제어 기능을 제공한다. 언매니지드 언어는 메모리 제어를 개발자가 주도할 수 있으므로 개발자의 역량에 따라 최적의 성능을 확보할 수 있지만 그 반대의 경우 치명적 오류를 생산할 가능성도 있다.<br>자바스크립트 같은 매니지드 언어는 메모리의 할당 및 해제를 위한 메모리 관리 기능을 언어차원에서 담당하고 개발자의 직접적인 메모리 제어를 허용하지 않는다. 즉, 개발자가 명시적으로 메모리를 할당하고 해제할 수 없다. 더 이상 사용하지 않는 메모리의 해제는 가비지 콜렉터가 수행하며, 이 또한 개발자가 관여할 수 없다. 매니지드 언어는 개발자의 역량에 의존하는 부분이 상대적으로 작아져 어느정도 일정한 생산성을 확보 할 수 있다는 장점이 있지만 성능 면에서 어느 정도의 손실은 감수 할 수밖에 없다.  