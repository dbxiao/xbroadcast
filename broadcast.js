/**
 * @author [dbxiao]
 * @module [broadcast]
 * @date   [2016-01-12]
 * @desc   [web广播组件，适用于模块化广播通信]
 */

(function(){
    var broadcast = function(){
        this._option = {
            debug : false
        };
        this._mListenChannel = new Object(); //{"SORT_TIME":{data:null,callback}}
        this.init();
    };

    /**
     * [definedChannel 频道列表]
     * @type {Object}
     * @description [
     *     1、所有广播频道必须在channelList定义，
     *     2、不存在的广播频道无法进行trigger和listen调用
     * ]
     */
    broadcast.definedChannel = {
        //    {name}           {description}
        "WGT_NAV_CHANGE" : "widget-nav-change"
    };

    broadcast.prototype = {
        init : function(){
            var _this = this;
            _this.channel();
        },

        /**
         * [definedChannel 动态定义频道]
         * @return {key} [频道名称]
         */
        definedChannel : function(key, defined){
            broadcast.definedChannel[key] = defined;
        },

        /**
         * [channel 获取频道列表]
         * @return {[type]} [description]
         */
        channel : function(){
            var channel = new Object();
            for(x in broadcast.definedChannel){
                channel[x] = x;
            };
            return channel
        },

        /**
         * [trigger 广播触发方法]
         * @param  {String}   name     [广播名称，必须在broadcast.definedChannel预定义]
         * @param  {Object}   data     [广播参数，必须为object格式]
         * @return {none}              [无返回]
         * @description                [
         *     trigger方法机制：
         *     1、查找广播频道时候存在，
         *     2、如果频道存在，将参数和回调函数放在广播缓存中
         * ]
         */
        trigger : function(name, data){
            var _this = this;
            var i = 0;

            if(!data)
                this._option.debug && console.info('[broadcast::trigger]:你Trigger的频道没有data，请确认,频道为：'+name);

            if(broadcast.definedChannel[name]  &&  _this._mListenChannel[name] && _this._mListenChannel[name].length >0){
                for(i; i<_this._mListenChannel[name].length; i++){
                   if(typeof _this._mListenChannel[name][i].listenCb == "function"){
                        _this._mListenChannel[name][i].listenCb(data);
                        console.trace()
                   }else{
                        return false;
                        console.trace()
                   }
                }
            }else{
                if(!broadcast.definedChannel[name])
                    this._option.debug && console.info('[broadcast::trigger]:你Trigger的频道不存在,频道为：'+name);
                if(_this._mListenChannel[name] && _this._mListenChannel[name].length == 0)
                    this._option.debug && console.info('[broadcast::trigger]:你Trigger的频道无监听,频道为：'+name);
                console.trace();
            }
        },

        /**
         * [listen 广播监听]
         * @param  {String}   name           [广播名称，必须在broadcast.definedChannel预定义]
         * @param  {Function} listenCallback [广播监听回调方法]
         * @return {none}                    [无返回]
         * @description                      [
         *     listen方法机制：
         *     1、查找广播频道时候存在，
         *     2、如果频道存在，将频道进行预定义，定义后，等待trigger触发
         * ]
         */
        listen : function(name, listenCallback){
            var _this = this;
            var initCannelArr = function(){
                _this._mListenChannel[name] = [];
                pushCannelArr();
            };
            var pushCannelArr = function(){
                _this._mListenChannel[name].push({
                    "data" : null,
                    "listenCb" : listenCallback
                });
            }
            if(broadcast.definedChannel[name]){
                typeof _this._mListenChannel[name] == "undefined" ? initCannelArr() : pushCannelArr();
            }else{
                console.info('[broadcast::listen]-你监听的频道'+name+'不存在');
            }

            console.trace();
        },

        /**
         * [debug 调试模式]
         */
        debug : function(){
            var _this = this;
            _this._option.debug = true;
        },

        /**
         * [help 帮助中心]
         */
        help : function(type){
            console.group("::broadcast::帮助中心");
            console.log("broadcast.listen(name, listenCallback) // name: 广播频道，listenCallback：监听方法");
            console.log("broadcast.trigger(name, data)          // name: 广播频道，data：参数对象");
            console.log("broadcast.channel()                    // 获取所用频道name");
            console.log("broadcast.debug()                      // 开启广播调试模式");
            console.groupEnd();
        }
    };

    window.broadcast = new broadcast();
})();
