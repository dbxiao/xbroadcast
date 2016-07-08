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



