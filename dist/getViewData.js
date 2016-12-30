import 'whatwg-fetch';
(function($) {
	/**
	 * @name GetAjax ajax请求插件+
	 * @param url 请求接口
	 * @param data 请求参数
	 * @param type get或者post
	 * @param async 同步或异步加载 true为异步 false为同步
	 * @param callback 异步加载回调函数
	 */
	$.GetAjax = function(url, data, type, async, callback) {
		var url = url || '',
			type = type || 'GET',
			data = data || {},
			async = async || true,
			json = void 0;

		$.cookie('token') ? data['token'] = $.cookie('token') || '' : '';
		type = type.toUpperCase();
		if(self.fetch) {
			let Result = type == "GET" ? fetch($.httpxhr+url+"?"+$.param(data)) : fetch($.httpxhr+url,{
				method: 'POST',
				body: (()=>{
					var json = new FormData();
					for(let k in data){
						json.append(k,data[k]);
					}
					return json;
				})()
			});

    		Result.then(function(response) {
				return response.json()
			}).then(function(success) {
				//	请求成功后赋值
				json = success || [];
				//	请求成功后异步回调
				if (typeof(callback) === 'function') {
					callback(json, true);
				}
			}).catch(function(ex) {
				json = ex || [];
				//	请求成功后异步回调
				if (typeof(callback) === 'function') {
					callback(json, false);
				}
			})
		} else {
		    $.ajax({
				//	请求配置
				url: $.httpxhr+url,
				type: type,
				data: data,
				async: async

			}).done(function(data) {
				//	请求成功后赋值
				json = data || [];
				//	请求成功后异步回调
				if (typeof(callback) === 'function') {
					callback(json, true);
				}
				return false;
				
			}).fail(function(data) {
				json = data || [];
				//	请求成功后异步回调
				if (typeof(callback) === 'function') {
					callback(json, false);
				}
				return false;
			});
		}
		//	同步返回值
		return json;
	}
})(jQuery)