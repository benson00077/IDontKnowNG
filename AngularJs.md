<a name="readme-top"></a>

<details>
  <summary>📔 Table of Contents</summary>

- [1. 👉 框架之外 - 其他知識點](#1--框架之外---其他知識點)
  - [1.1. new 關鍵字](#11-new-關鍵字)
  - [1.2. Dirty Check](#12-dirty-check)
  - [1.3. Revealing module pattern](#13-revealing-module-pattern)
  - [1.4. IFFY](#14-iffy)
- [2. 👉 Two way binding and MVC](#2--two-way-binding-and-mvc)
- [3. 👉 Three Main Object](#3--three-main-object)
  - [3.1. Scope](#31-scope)
    - [3.1.1. $rootScope](#311-rootscope)
    - [3.1.2. $scope](#312-scope)
  - [3.2. Controller](#32-controller)
  - [3.3. Modules](#33-modules)
- [4. 👉 Directive](#4--directive)
  - [4.1. Directive on properties of html element (as Modifier)](#41-directive-on-properties-of-html-element-as-modifier)
  - [4.2. Directive on element (as components)](#42-directive-on-element-as-components)
  - [4.3. Directive 的回傳物件](#43-directive-的回傳物件)
    - [4.3.1. scope](#431-scope)
  - [4.4. Direcitve 的 link 和 controller 的差別？](#44-direcitve-的-link-和-controller-的差別)
- [5. 👉 Services (singleton)](#5--services-singleton)
  - [5.1. provider()](#51-provider)
    - [5.1.1. Example](#511-example)
  - [5.2. factory()](#52-factory)
    - [5.2.1. source](#521-source)
  - [5.3. service()](#53-service)
    - [5.3.1. source](#531-source)
    - [5.3.2. Example](#532-example)
  - [5.4. value()](#54-value)
  - [5.5. constant()](#55-constant)
- [6. 👉 關於運行機制](#6--關於運行機制)
- [7. 👉 Details](#7--details)
  - [7.1. $emit](#71-emit)
  - [7.2. $q](#72-q)
- [8. 👉 Q&A](#8--qa)
  - [8.1. 測試時讀取的到 controllers 內的 Local variables 嗎](#81-測試時讀取的到-controllers-內的-local-variables-嗎)
  - [8.2. Controller 內的變數在每次呼叫都會重新宣告並賦值嗎](#82-controller-內的變數在每次呼叫都會重新宣告並賦值嗎)
</details>

> 這不是從頭開始的教學，只是學習筆記，方便之後複習用，所以會有許多概念交叉互相解釋。

# 1. 👉 框架之外 - 其他知識點
## 1.1. new 關鍵字
- this
    - 函數自調用時，this = window。
    - 函數被 new 之後，this = 該函數物件的實例。
    - 所以以前常常這樣寫，這樣實例就可以有相關屬性。
        ```js
        // 模擬一個類別 Person
        function Person(name, age) {
            this.name = name;
            this.age = age;
        }
        ```
## 1.2. Dirty Check
在這之前的框架可能都會像是這樣來通知數據變更的
```js
var user = {name: 'Joe'}
var framworkUser = framwork.wrapData(user);
//...
framworkUser.name.set('Joseph');
```

通常數據會變動，是來自於使用者交互事件，或是得到了外部返回的數據。變動發生時就會觸發 `$digest() Cycle`，這週期會檢查已渲染的視圖層上是否有數據變動。怎麼知道有變動的？因為當這周期在之前渲染的時候，已經複了製一份數據。檢查新舊數據的動作就叫做髒檢查。


## 1.3. Revealing module pattern
refer to [here](https://gist.github.com/zcaceres/bb0eec99c02dda6aac0e041d0d4d7bf2)

## 1.4. IFFY
To prevent global variabales.
# 2. 👉 Two way binding and MVC
- 所謂的雙向數據綁定，這個雙向就是指頁面跟內存（作用域物件）。也就是MVC 的 view - model 這兩向的綁定。model 是 data model，controller 則是對 model 的操作(大概吧)
- 注意函數也是物件，只是是個可以呼叫的特殊物件。


# 3. 👉 Three Main Object
## 3.1. Scope
### 3.1.1. $rootScope
- 提供方法，讓 $scope 可以跟父子層傳遞事件或數據
    ```js
    $emit(eventName, args);

    $broadcast(eventName, args);

    $on(eventName, listenerCallbackFn(event, args...))
    ```
- `event life cycle`: starts at the scope on which `$emit` was called. (比如說 $scope.click的函數). All listeners listening for name event on this scope get notified. Afterwards, the event traverses upwards toward the root scope and calls all registered listeners along the way. The event will **stop propagating** if one of the listeners cancels it.
  - 看起來就像是冒泡機制

see example [here](https://www.cnblogs.com/craryprimitiveman/p/3679552.html)

### 3.1.2. $scope
- 依循 prototype chain 往父層查找 
- 在 controller 裡面，會注入此物件。方便在這物件上添加相關屬性或方法。
- 在 html 裡面，可以透過以下方式得到此物件的屬性
  1. 表達式 {{panelData.hide}}
  2. html ele 內作為屬性使用的 Directive 對照的值。例如 ng-hide="panelData.hide"
- 跨作用域的溝通：
  1. 创建一个单例服务，然后通过这个服务处理所有子作用域的通信。
  2. 通过作用域中的事件处理通信。詳見 [2.1.1. $rootScope](#211-rootscope)
## 3.2. Controller
- 作為控制數據的主要手段，用來操作 $scope 這個作用域物件。
- 是實例。通常你會把在`app.controller('myController', function($scope) {/.../})`寫出 constructor function，讓 Angularjs new 出一個 Controller 實例，並在參數部分注入依賴的 $scope 物件（依賴注入）。
- 也就是MV*的 M Model 層。
## 3.3. Modules
- Working with modules
    - 創建 modules 物件。例如 `var app = angular.module('myApp', [...]);`
- Controllers usually live in modules
    - Avoids the global namespace (by [Revealing module pattern](#53-revealing-module-pattern))
- 找注入的模組來源其實不方便：以套件 angular-translate 為例
  - `angular.module('pascalprecht.translate')` 代表我們使用了套件內定一個其中一個模組
  - 可是這樣變成沒有辦法直觀知道，所注入的 module 是來自哪個套件，只能靠命名猜或是搜尋。


# 4. 👉 Directive
    Directives allow for indirect model view interaction
## 4.1. Directive on properties of html element (as Modifier)
| Directive     | 解釋                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ng-app        | 指定 module name                                                                                                                |
| ng-controller | 雙向綁定，劃分作用域                                                                                                            |
| ng-init       | 當下作用域之下，初始化數據                                                                                                      |
| ng-model      | 用在 input, select, textarea tags 上。幫忙把輸入在 input 內的值 push 給 $scope，或是反過來說成為 input 的初始值(因為雙向綁定)。 |
| ng-click      | 點擊時，調用 $scope 作用域物件上定義的方法                                                                                      |
| ng-repeat     | 迭代陣列顯示數據，陣列有幾個元素，就產生幾個新作用域。                                                                          |
| ng-bind       | 用 tag 的方式，取代或解決在標籤內文使用表達式 {{}} 時數據閃屏的問題。會閃屏是因為瀏覽器先解析 html 才載入 js 。                 |

## 4.2. Directive on element (as components)
- component 有所謂的 isolate scope，這意味著不用再在 html 外層使用 ng-controller 把作用域區隔開。
- link: option to register DOM listeners as well as update the DOM. It is executed after the template has been cloned and is where directive logic will be put. 這裡通常就會用到 Angularjs 包裝起來的 jQuery。
```js
function panel(){
    'ngInject';
    return {
        restrict: 'E', // E for html element
        link: funcion(scope, element, attrs){ /**/ }, // for DOM manipulation
        templateUrl: funcion(element, attrs) {
            return "smt.html";
        },
        // refer to the Controller Object,
        // which is the function you define in app.controller(/*...*/))
        // or the controller belong to this directive ...
        controller: myController, 
        scope: { // to create isolate scope
            // 之後就可以向這樣呼叫零件 <panel panelOPtion="..." panelLayout="...">
            panelOption: '=',
            panelLayout: '=', // same as '=panelDate'
        }


    }
}
```

## 4.3. Directive 的回傳物件
### 4.3.1. scope
- `继承不隔离`：当 scope:flase 时，表示指令不创建额外的作用域，默认继承使用父级作用域
- `继承但隔离`：当 scope:true 时，指令自己有的用自己的，没有的找父级拿，同一份数据父级能影响指令，但指令却无法反向影响父级
- `隔离作用域`：当 scope:{} 时，指令作用域不再继承父作用域，两边的数据不再互通。
  - 這也就是 isolate scope
  - `@` operator: allow you to pass a `string` from your current scope to the isolated one.
  - `=` operator: allow you to pass an `object` that you can use and modify from the isolated scope. (set up a `bidirectional binding`)如果直接複寫物件內屬性的內容，就會造成 break the two way bindings between your current scope and the isolated one and create two different copies of it (one in the current scope, and one in the isolated)
  - `&` operator: allows you to call a `function` expression of your current scope from the isolated scope.
- refs:
  - [angularjs 一篇文章看懂自定义指令directive](https://www.cnblogs.com/echolun/p/11564103.html)
  - [Use of isolate scope - @, &, and = in a simple Angular Directive](https://stackoverflow.com/a/35377848/16124226)
  - [Docs: directive's scope option](https://docs.angularjs.org/api/ng/service/$compile)
  - [Docs: Isolating the Scope of a Directive](https://docs.angularjs.org/guide/directive#isolating-the-scope-of-a-directive)

## 4.4. Direcitve 的 link 和 controller 的差別？
- 執行順序：Controller → Direcitve link
- 差異：
  - scope 是綁定模型用的
  - controller 是給 scope 加上方法（邏輯）用的。是 scope 中 watch 的事件被觸發時的 context。
  - link 是用來把 directive 嵌入 dom 的切面機制。 （因為 html 先編譯，所以不建議用原生方法在編譯前就對 dom 操作）


angularjs 對於 drictive 執行順序如下：
- 首先编译 html
- 调用 $compile 生成 dom 对象
- 调用 link 绑定到相应 scope
- 触发 $digest 更新視圖層

用 jQuery 類比，那 compile 相當於創建一些 dom 對象  ` $("<a class='//...') ` ，link 則是 `$().append` 之類的 dom 操作。


# 5. 👉 Services (singleton)
> For create shared datas- all the services are singleton
> 控制反轉、依賴注入。

## 5.1. provider()

- 其它的方法基本上都是對此函數的封裝
- 會使用這個方法是為了想要有更細節的 config 設定。

### 5.1.1. Example
```js
var app = angular.module('app', [])
app.config(function($provide) {
  $provide.provider('books', function() {
    this.$get = funcion () {    
      
      let [appName, appDesc] = ['book loader', 'book description']
      
      // 這個 return 的物件就會是你的 Service
      return {
        appName: appName,
        appDesc: appDesc
      }
    }

    var includeVersionIntitle = false;
    this.setIncludeVersionInTitle = function (value) {
      includeVersionIntitle = value;
    }
  })
})

// 上面也可以直接寫成這樣，ngjs 把 provider 暴露出來了
app.provider(/** ... */)

// 可以調用上面的 provider，ngjs 會把 'books' → 'booksProvider'
app.config(fucntion(booksProvider) {
  booksProvider.setIncludeVersionInTitle(true)
})

/* Controller */
app.controller('BooksController', BooksController)
function BooksController(books) {
  var vm = this; // vm = view model
  vm.appName = books.appName;
}
```

## 5.2. factory()
- 簡化版 provider，會呼叫 provider()
### 5.2.1. source
Registers a service factory function that will retrun a servce instance
```js
function factory(name, factoryFn, enforce) {
  return provider(name, {
    $get: enforce !== false ? enforceRetrunValue(name, factoryFn) : factoryFn
  })
}
```


## 5.3. service()
- 呼叫 factory()，factory() 又呼叫 provider()。
- 何時會需要用？當你已經有一個繼承體系(Inheritance Hierarchies)，用 new 建構子的方式，會確保實體確實從他的 prototypes 繼承。
### 5.3.1. source
函數參數為建構子函數，這意味著會用 new 來實例化。（被 instanciate() 封裝）
```js
function service(name, constructor) {
  return factory(name, ['$injector', function($injector) {
    return $injector.instanciate(constructor);
  }])
}
```
### 5.3.2. Example
```js
app.service('logger', BookAppLogger) {}

function LoggerBase() {}
LoggerBase.prototype.output = function (msg) { 
  console.log('LoggerBase: ' + msg)
}

function BookAppLoger() {
  LoggerBase.call(this);
  this.logBook = function (book) {
    console.log('Book: ' + book.tittle);
  }
}

BookAppLogger.prototype = Object.create(LoggerBase.prototype)

// controller
function BooksController(logger) {
  logger.output('BookController has been created') // from logger's prototype
}
```

## 5.4. value()
- 精簡版 factory() ，不用傳參
- 不可被注入到 module configuration function
- 可被 devorator 複寫

## 5.5. constant()
- 精簡的 registers service w/ injector ，不會呼叫 factory 或 provider
- 可被注入到 module configuration function
- 不可被 devorator 複寫

# 6. 👉 關於運行機制
- [生命週期](https://dotblogs.com.tw/supershowwei/2016/08/26/212944)
- Angularjs's core is HTML Compiler。會先解析 html ，之後才在必要的時候創建 Controller 或是你零件的實例。
- [angularjs link compile与controller的区别详解，了解angular生命周期](https://www.cnblogs.com/echolun/p/11674869.html)

# 7. 👉 Details

## 7.1. $emit
```js
/**
 * @param {string} name Event name to emit.
 * @param {...*} args Optional one or more arguments which will be passed onto the event listeners.
 * @return {Object} Event object (see {@link ng.$rootScope.Scope#$on}).
 */ 
{$emit: function(name, args) {
  do {
    /*...*/
    //traverse upwards
    scope = scope.$parent;
  } while (scope);
}}
```

## 7.2. $q
舊的 promise 寫法，通常寫法是這樣 

`$q` 需要手動多一個 try catch 。兩者比較參考這[問答](https://stackoverflow.com/a/28692824/16124226)。

`$q` 相關方法範例，可以參考這[問答](https://stackoverflow.com/a/43496024/16124226)。

```js
/* $q 這樣寫 */
function asyncGreet(name) {
  var defer = $q.defer();  // $q.defer() 建立一個deferred延遲物件

  setTimeout(function() {
    deferred.notify('About to greet ' + name);
    if (okToGreet(name)) {
      deferred.resolve('Hi, ' + name);
    } else {
      deferred.reject('Greeting ' + name + ' is not allowed.');
    }
  }, 1000);

  return defer.promise;  //返回 deferred 例項的promise物件
}

/* new Promise 這樣寫 */ 
function asyncGreet(name){
  return new Promise(function(resolve, reject){
    setTimeout(resolve('Hi, ' + name), 1000);
  });
}

/* 調用層 */
var promise = asyncGreet('Superman');  //獲得promise物件
promise.then((greeting) => {console.log('Success: ' + greeting)}) //收集回調
```

記得 Promise executor 函數內的異步任務會被放入任務列隊，等待執行。參考[筆記](https://github.com/benson00077/dag_graph/issues/8)


# 8. 👉 Q&A
## 8.1. 測試時讀取的到 controllers 內的 Local variables 嗎
https://groups.google.com/g/angular/c/zBFOjFqFROU

https://stackoverflow.com/questions/35150084/access-to-the-local-variable-while-directive-unit-testing-in-angularjs
## 8.2. Controller 內的變數在每次呼叫都會重新宣告並賦值嗎

另一個問題是，存在 $scope 內的變數呢？會重新宣告賦值嗎

我感覺都是類似閉包的機制把狀態儲存在函數上才對，因為這就是 JavaScript 的機制，用來模仿物件導向。