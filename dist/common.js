/*动态加载*/
$.extend({
	includePath: './js/static/',
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
	//将数字转化成 亿万文字分开
	formatPrice: function (count, isShowEnd) {
		if (!count) {
			return false;
		}
		count = parseInt(count);
		var result = "";
		if (count < 10000) {
			result = $.addZero(count);
		} else if (count > 10000 && count < 100000000) {
			var end = count % 10000;
			var wan = parseInt(count / 10000);
			result = "" + wan + "<span class='short-size-span'>万</span>" + $.addZero(end);
		} else if (count > 100000000) {
			var yi = parseInt(count / 100000000);
			var yiEnd = count % 100000000;
			var end = yiEnd % 10000;
			var wan = parseInt(yiEnd / 10000);
			result = "" + yi + "<span class='short-size-span'>亿</span>" + $.addZero(wan) + "<span class='short-size-span'>万</span>" + $.addZero(end);
		} else {
			result = count;
		}

		return result;
	},
	// 位数不够补0
	addZero:function (number) {
		var len = ("" + number).length;
		if (len == 1) {
			number = "000" + number;
		} else if (len == 2) {
			number = "00" + number;
		} else if (len == 3) {
			number = "0" + number;
		}
		return number;
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
			})
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
	// 图片懒加载
	lazyloadImg: function (url,callback) {
		var img = new Image();
    	img.src = url;
    	img.onload = callback(img);
	},
	MathRand: function (sum=5) {
		var Num=""; 
		for ( var i = 0; i < sum ; i++ ) { 
			Num += Math.floor( Math.random()*10 );
		}
		return Num;
	},
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
	regTest: function( type, str ) {
		var reg = null;
		if ( type == "phone" ) {
			reg = /^0*(13|14|15|17|18|19)\d{9}$/
		} else if ( type == "email" ) {
			reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
		} else if ( type == "chinese" ) {
			reg = /^[u4e00-u9fa5],{0,}$/
		} else if ( type == "null" ) {
			reg = /^\S+$/
		}
		return reg.test(str);
	} 

	//线上路径
	// getCtx: function() {
	// 	var webroot=document.location.href;
	// 	webroot=webroot.substring(webroot.indexOf('//')+2,webroot.length);
	// 	webroot=webroot.substring(webroot.indexOf('/')+1,webroot.length);
	// 	webroot=webroot.substring(0,webroot.indexOf('/'));
	// 	var rootpath="/"+webroot;
	// 	return rootpath;
	// }
});

$.onloadJavascript('../config.js');

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