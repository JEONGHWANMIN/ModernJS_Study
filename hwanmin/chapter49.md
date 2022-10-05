# Webpack Babel

## Babel

바벨이 무엇인가 ?? 예제를 통해서 알아보자

```js
[1, 2, 3].map((n) => n ** n);
```

위와 같은 코드가 있을 때 화살표 함수는 ES6 , 지수연산자는 ES7에 나온거라서 구형 브라우저에서는 돌아가지 않는다.

이 때 사용되는 것이 바벨이다.

```js
[1, 2, 3].map(function (n) {
  return Math.pow(n, n);
});
```

위와 같이 최신사양의 소스코드를 구형브라우저에서도 돌아갈 수 있도록 ES5 사양의 소스코드로 트랜스파일링 할 수 있다.

```js
// src/js/main.js
import { pi, power, Foo } from "./lib";

console.log(pi);
console.log(power(pi, pi));

const f = new Foo();
console.log(f.foo());
console.log(f.bar());
```

```js
// dist/js/main.js
"use strict";

var _lib = require("./lib");

// src/js/main.js
console.log(_lib.pi);
console.log((0, _lib.power)(_lib.pi, _lib.pi));
var f = new _lib.Foo();
console.log(f.foo());
console.log(f.bar());
```

위 두 코드를 보면 위에 import로 선언된게 require모듈 즉 ES6이전 사양으로 잘 변환이 되었다.

하지만 이 코드를 브라우저에 적용하면 에러가 난다.

왜냐하면 브라우저는 기본적으로 모듈단위를 지원하지 않기 때문이다. 그래서 이 때 필요한 것이 웹팩이다.

## webpack

웹팩은 번들러 인데 번들러란 js css 이미지 등의 리소스를 하나의 파일로 만들어 주는 역할을 한다.

webpack을 사용하면 각각 모듈 파일들이 하나로 번들링 되므로 script태그를 여러개 쓰는 번거러움도 사라진다.

웹팩은 설정할떄 설정 파일이 필요한데 그게 webpack.config.js 파일이다.

```js
const path = require("path");

module.exports = {
  // entry file
  // https://webpack.js.org/configuration/entry-context/#entry
  entry: "./src/js/main.js",
  // 번들링된 js 파일의 이름(filename)과 저장될 경로(path)를 지정
  // https://webpack.js.org/configuration/output/#outputpath
  // https://webpack.js.org/configuration/output/#outputfilename
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
  },
  // https://webpack.js.org/configuration/module
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src/js")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  devtool: "source-map",
  // https://webpack.js.org/configuration/mode
  mode: "development",
};
```

entry : 시작점 , output : 번들링된 파일이 나오는 곳 , module을 통해서 추가 플러그인이나 웹팩에 포함 시키지 않은 폴더나 파일 등을 지정할 수 있다.

ES6에서 추가된 사양들은 바벨을 사용해서 트랜스파일링해도 ES5를 대체할 기능이 없어서 설정되지 못한다.

이런경우에는 babel/polyfill 의존성을 설치해서 해결이 가능하다.
