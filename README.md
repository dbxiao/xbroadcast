# broadcast

## 关于broadcast 和 xbroadcast

* broadcast 和 xbroadcast 是一款前端模块广播插件，解决Web、H5、React和React Native模块之间通信需求。
* broadcast 为Web、H5提供广播功能。
* xbroadcast 服务于React和React Native，为组件之间提供广播功能。



## 使用方法

* broadcast提供trigger，listen两个方法

* broadcast.trigger(String, Data);
	String ：广播名称
	Data   ：广播数据

* broadcast.listen(String, callback(Data));
	String    ：广播名称
	callback  ：广播监听方法

## 广播命名规则
* 我们在使用广播的时候，会考虑广播命名，究竟谁来命名？业务代码定义广播还是通用组件定义？是发送者还是接受者？
* 经过作者大量调研，我们将代码分为：组件代码和业务代码。简单来说就是：widget和page，广播命名优先级遵循以下规则：

* 1、如果相同代码域，比如：widget和widget通信，page和page通信，listen优先trigger，listen者具有广播命名资格，trigger者只能使用广播。

* 2、组件优先业务（widget>page），比如：widget和page通信，无论是使用listen还是trigger服务，组件都有优先命名资格，业务代码只是广播使用权限。

* 3、命名样式:[changeTab]::common/widget/change
     //解释：在common/widget/change.js中提供changeTab广播 
