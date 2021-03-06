/*动态加载*/
import base64 from "base64";
$.extend({
	includePath: '/',
	include: function(file) {
		var files = typeof file == "string" ? [file] : file;
		for (var i = 0; i < files.length; i++) {
			var name = files[i].replace(/^\s|\s$/g, "");
			var att = name.split('.');
			var ext = att[att.length - 1].toLowerCase();
			var isCSS = ext == "css";
			var tag = isCSS ? "link" : "script";
			var attr = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' ";
			var link = (isCSS ? "href" : "src") + "='" + $.includePath + name + "'";
			if ($(tag + "[" + link + "]").length == 0) document.write("<" + tag + attr + link + "></" + tag + ">");
		}
	},
	// 异步加载js
	onloadJavascript: function(url, async, cache,callback) {
		$.ajax({
			url: url,
			dataType: "script",
			async: async || false,
			cache: cache || false
		}).done(function(data) {
			if (callback && typeof(callback) === 'function') {
				callback(data);
			}
		});
	},
	//获取url?后面的参数
	getUrlParam: function(key) {
		var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	//提取字符串中介于两个指定下标之间的字符
	splitString: function (string,start,end) {
		var result = string.substring(start,end);
		return result;
	},
	//时间戳转换为时间
	getLocalTime: function(time) {
		var dateTime = new Date(time),
			year = dateTime.getFullYear(),
			month = dateTime.getMonth() + 1,
			day = dateTime.getDate(),
			hour = dateTime.getHours(),
			minute = dateTime.getMinutes(),
			second = dateTime.getSeconds();
    	return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
	},
	// 传一个数组来获取应该用什么单位，并返回转后的数组给你
	getFormatCompany:function(arrays,state){
		
		let arraysNew=$.arraysSortAndRemoveZero(arrays);
		let numLength = arraysNew.length;
		let result = 0;
		let company = '元';
		let count = 0;
		if ( numLength % 2 == 0 ) {
			let tt = Number(arraysNew[parseInt(numLength/2)-1]);
			let tt2 = Number(arraysNew[parseInt(numLength/2)]);
			count = (tt+tt2)/2;
		}else{
			let tt = Number(arraysNew[parseInt(numLength/2)]);
			count = tt;
		};

		if (count < 0.0001) {
			result = count*100000000;
			company = "元";
		} else if (count >= 0.0001 && count < 1) {
			result = count*10000;
			company = "万元";
		} else {
			result = count*1;
			company = "亿元";
		}
		let newArray = $.formatPrice (arrays,company,state);
		return {value:newArray,company:company};
	},
	//新生成一个数组
	formatPrice: function (countArray,company,state=false) {
		let newArray = countArray;
		let temp = 1;
		if ( company == '元' ) {
			temp = 100000000;
		} else if ( company == '万元' ) {
			temp = 10000;
		} else {
			temp = 1;
		};
		let i = 0;
		countArray.map((d,k)=>{
			if (state) {
				if ( d != null && d != "" && d != 0 ) {
					newArray[i] = (d*temp).toFixed(2);
					i++;
				}
			}else{
				newArray[k] = (d*temp).toFixed(2);
			}
		});
		return newArray;
	},
	//为数组排序并除去为0的数
	arraysSortAndRemoveZero:function(oldArray){
		let newArray = new Array();
		let i = 0;

		oldArray.map((d,k)=>{
			if ( d != null && d != "" && d != 0 ) {
				newArray[i] = d;
				i++;
			}
		});
		newArray.sort();
		return newArray;
	},
	//传一个百分比类型的数组过来，剩以100，正数加上“+”号，负数不变，结果保留两位小数
	getPercentageCompany:function(arr){
		let company="%";
		let newArray = arr;
		arr.map((data,k)=>{
			if(data == "" || data == null){
				newArray[k] = '';
			}else if(data>0){
				newArray[k] = "+"+(data*100).toFixed(2);
			}else {
				newArray[k] = (data*100).toFixed(2);
			}
		});

		return  {value:newArray,company:company};
	},
	//热门榜单，为了保持和其他几种数据格式一致，传入指数或其他类型的数组过来，返回value和company
	getIndicCompany:function(arr){
		let company="";
		let newArray = arr;
		arr.map((data,k)=>{
			if(data == "" || data == null){
				newArray[k] = '';
			}else {
				newArray[k] = data;
			}
		});

		return  {value:newArray,company:company};
	},
	// 将数字转化成千分符格式
	toThousands: function (num) {
		var result = [],
			counter = 0;
		num = (num || 0).toString().split('');
		for (var i = num.length - 1; i >= 0; i--) {
			counter++;
			result.unshift(num[i]);
			if (!(counter % 3) && i != 0) {
				result.unshift(',');
			}
		}
		return result.join('');
	},
	// 动态数字
	show_num: function (type, value, isShowEnd) {
		var num = $(type);
		num.animate({
			count: value
		}, {
			duration: 800,
			step: function() {
				num.html($.formatPrice(String(parseInt(this.count)), isShowEnd));
			},
			complete: function() {
				num.html($.formatPrice(String(parseInt(value)), isShowEnd));
			}
		});
	},
	// 手机端样式修改
	isMobile: function () {
		var windowWidth = $(window).width();
		var scales = windowWidth/1100;
		if ( $('body').hasClass('mobileBody') ) {
			$('#main > .content > div').css({
				width: '1100px',
				webkitTransform: 'scale('+scales+')',
				webkitTransformOrigin: '0 0 0',
				position: 'absolute',
				top: '0'
			});
		}
	},
	// 微信分享获取配置参数
	wechartShare: function(config) {
		if ( $('body').hasClass('mobileBody') ) {
			$.onloadJavascript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js',true,false,()=>{
				$.GetAjax('/v1/wx/getToken', {url: location.href}, 'Get', true, (data,state)=>{
		            if (state && data.code == 1) {
		                let wechartObj = data.data;
						wx.config({
							debug: false,
							appId: wechartObj.appId,
							timestamp: wechartObj.timestamp,
							nonceStr: wechartObj.nonceStr,
							signature: wechartObj.signature,
							jsApiList: [
								'onMenuShareTimeline',
								'onMenuShareAppMessage'
							]
						});
						let option = {
							title: config.title,
							desc: config.desc,
							link: config.link,
							imgUrl: config.imgUrl
						};
						$.wechartReady(option);
		            }
		        });
			})
		}
	},
	// 微信分享接口
	wechartReady: function (config) {
		wx.ready(function () {
			wx.onMenuShareAppMessage({
				title:  config.title,
				desc:   config.desc,
				link:   config.link,
				imgUrl: config.imgUrl,
				trigger: function (res) {
					// alert('用户点击发送给朋友123');
				},
				success: function (res) {
					// alert('已分享123');
				},
				cancel: function (res) {
					// alert('取消了分享');
				},
				fail: function (res) {
					alert(JSON.stringify(res));
				}
			});
			wx.onMenuShareTimeline({
				title:  config.title,
				desc:   config.desc,
				link:   config.link,
				imgUrl: config.imgUrl,
				trigger: function (res) {
					// alert('用户点击分享到朋友圈');
				},
				success: function (res) {
					// alert('已分享');
				},
				cancel: function (res) {
					// alert('取消了分享');
				},
				fail: function (res) {
					alert(JSON.stringify(res));
				}
			});
		});
	},
	// 判断是否为手机
	isPhone: function () {
		if ( $('body').hasClass('mobileBody') ) {
			return true;
		}else{
			return false;
		}
	},
	// 判断用户是否登录
	userlogin: function () {
		let config = {
			account: $.cookie('account') || false,
			url: '/user',
			nickname: $.cookie('nickname') || false,
			sig: $.cookie('token') || false
		}
		let result = config.sig ? config : false;
		return result;
	},
	// 退出登录
	laoutLogin: function (callback,type) {
		$.cookie('token','');
		$.cookie('account','');
		$.cookie('nickname','');
        $.cookie('member', '');
		if (callback && typeof(callback) === 'function') {
			callback();
			type ? history.go(0) : '';
		}
	},
	// 判断是不是VIP用户
	isVipUser: function () {
		let isVIP = $.decodeBase64($.cookie('member'),10);
		return isVIP == 2 ? true : false;
	},
	// 图片懒加载
	lazyloadImg: function (url,callback) {
		var img = new Image();
    	img.src = url;
    	img.onload = callback(img);
	},
	// 生成随机数
	MathRand: function (sum=5) {
		var Num=""; 
		for ( var i = 0; i < sum ; i++ ) { 
			Num += Math.floor( Math.random()*10 );
		}
		return Num;
	},
	// 时间插件
	formatMsgTime: function(timespan) {
		var dateTime = new Date(timespan),
			year = dateTime.getFullYear(),
			month = dateTime.getMonth() + 1,
			day = dateTime.getDate(),
			hour = dateTime.getHours(),
			minute = dateTime.getMinutes(),
			second = dateTime.getSeconds(),
			now = new Date(),
			now_new = Date.parse(now.toDateString());  //typescript转换写法

		var milliseconds = now - dateTime,timeSpanStr = void 0;

		if (milliseconds <= 1000 * 60 * 1) {
			timeSpanStr = '刚刚';
		}
		else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
			timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
		}
		else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
			timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
		}
		else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
			timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
		}
		else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
			timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
		} else {
			timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
		}

		return timeSpanStr;
	},
	// 正则判断
	regTest: function( type, str ) {
		var reg = null;
		if ( type == "phone" ) {
			reg = /^0*(13|14|15|16|17|18|19)\d{9}$/
		} else if ( type == "email" ) {
			reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
		} else if ( type == "chinese" ) {
			reg = /^[u4e00-u9fa5],{0,}$/
		} else if ( type == "null" ) {
			reg = /^\S+$/
		} else if ( type == "password" ) {
			reg = /^[a-zA-Z_0-9]{6,16}$/
		} else if ( type == "user" ) {
			reg = /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/
		} else if ( type == "num" ) {
			reg = /^[0-9]+$/
		}else if(type=="allnum"){
			reg = /^\d+$/
		}else if(type=="allsame"){
			reg = /^(.)\1+$/
		}else if(type=="username"){
			reg = /(^[\u4e00-\u9fa5A-Za-z0-9])([\u4e00-\u9fa5A-Za-z0-9_]{3,15}$)/
		}
		return reg.test(str);
	},
	// url参数拼接
	urlEncode: function(param, key){
		var paramStr="";
		if(param instanceof String||param instanceof Number||param instanceof Boolean){
			paramStr+="&"+key+"="+encodeURIComponent(param);
		}else{
			$.each(param,function(i){
				var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
				paramStr+='&'+ $.urlEncode(this, k);
			});
		}
		return paramStr.substr(1);
	},
	//加密可以加密N次，对应解密N次就可以获取明文
	encodeBase64:function (mingwen,times) {
		var code="";  
	    var num=1;  
	    if(typeof times=='undefined'||times==null||times==""){  
	       num=1;  
	    }else{  
	       var vt=times+"";
	       num=parseInt(vt);
	    }  
	  
	    if(typeof mingwen=='undefined'||mingwen==null||mingwen==""){  
	  
	    }else{  
	        code=mingwen;  
	        for(var i=0;i<num;i++){
	           code=base64.btoa(code);
	        }  
	    }  
	    return code; 
	}, 
	//加密可以加密N次，对应解密N次就可以获取明文 
	decodeBase64:function (mi,times) {
		var mingwen="";  
	    var num=1;  
	    if(typeof times=='undefined'||times==null||times==""){  
	       num=1;  
	    }else{  
	       var vt=times+"";  
	       num=parseInt(vt);  
	    }  
	  
	  
	    if(typeof mi=='undefined'||mi==null||mi==""){  
	  
	    }else{  
	       mingwen=mi;  
	       for(var i=0;i<num;i++){  
	           mingwen=base64.atob(mingwen);  
	       }  
	    }  
	    return mingwen;  
	},
	//判断传入数组中是否包含该元素，有则删除，返回false，没有则添加该元素，返回true
	addOrremoveValue:function(arr,value){
		let state;
		arr.push(value);
		let count = $.arrCheckCount(arr,value);
		let resultArr = [];
		if(count == 2 || count > 2){
			let newArr = arr; 
			for(let i=0; i<arr.length; i++) {
				if(arr[i] == value){
					newArr[i] = -1;
				}
			}
			for(let i = 0; i< newArr.length; i++){
				if( newArr[i]!= -1 ){
					resultArr.push(newArr[i]);
				}
			}
			state = false;
		}else{
			resultArr = arr;
			state = true;
		}
		return  {value:resultArr,state:state};
	},
	//判断数组里该元素出现的次数
	arrCheckCount:function(arr,value){
		let newArr = [];
		let count=0;
	    for(let i=0;i<arr.length;i++){
	        if(arr[i] == value){
		        count++;
	        }
	  }
	  return count;
	}
});

$.onloadJavascript('./config.js');

(function(window) {
    var theUA = window.navigator.userAgent.toLowerCase();
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        $('body').addClass('mobileBody');
    } else {
        if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
	        var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
	        if (ieVersion <= 9) {
	            var str = "<p style='color:#555;font-size:24px;line-height:20px;font-family:微软雅黑;text-align:left;margin:0 auto;width:400px;'>是时候升级你的浏览器了</p>";
	            var str2 = "<p style='color:#555;font-size:12px;font-family:微软雅黑;text-align:left;margin:auto;width:400px;'>为了获得更好的用户体验，推荐使用:<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:red'>谷歌</a>,"
	            + "<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E7%81%AB%E7%8B%90%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:red'>火狐</a>,"
	            + "<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E7%8C%8E%E8%B1%B9%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:red'>猎豹</a>,或者双核浏览器的<span style='color:red'>极速模式</span></p>";
	            document.writeln("<pre style='background-color:#efeff5; height:100%;border:0;position:fixed;top:0;left:0;width:100%;z-index:9999'>" + 
	            "<h2 style='padding-top:20%;margin:0'><strong>" + str + "<br/></strong></h2><p>" + 
	            str2 + "</p></pre>");
	            document.execCommand("Stop");
	        };
	    }
    }
    
})(window);