
import React from 'react';
import { Link, hashHistory } from 'react-router';
import Comment from "../common/comment";//评论回复模块


class ContainerCarousel extends React.Component {
	constructor(props) {
		super(props);
		this.id = this.props.parent.location.query.id ?  this.props.parent.location.query.id : '' ;
	}
	state = {
		data: []
	};
	componentDidMount() {
		this._getdetailData();
	}
	_getdetailData(id){
		const that = this;
        let setData = {
            dataType:'json',
            id:this.id,
        };
        $.GetAjax('/v1/information/detail', setData, 'GET', true, function(data , state) {
        // $.GetAjax('http://192.168.1.101:8090/view/info/data/getCategory.json', setData,'GET', true, function(data ,state) {
           if (state && data.code == 1) {
                that.setState({
                    data:data.data
                });
            } else {
            	console.log("请求数据失败");
            }
        });
	}
	getTime(time){
		// 将时间戳(以毫秒为单位)换成时间格式字符串
	    Date.prototype.Format = function (fmt) { //author: meizz 
	        let o = {
	            "M+": this.getMonth() + 1, //月份 
	            "d+": this.getDate(), //日 
	            "H+": this.getHours(), //小时 
	            "m+": this.getMinutes(), //分 
	            "s+": this.getSeconds(), //秒 
	            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	            "S": this.getMilliseconds() //毫秒 
	        };
	        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	        for (let k in o)
	        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	        return fmt;
	    }
	
		let dateTimeJsonStr = time; // C# DateTime类型转换的Json格式
	    dateTimeJsonStr = Date.now();
	    let msecStr = dateTimeJsonStr.toString().replace(/\/Date\(([-]?\d+)\)\//gi, "$1"); // => '1419492640000' ：通过正则替换，获取毫秒字符串
	    let msesInt = Number.parseInt(msecStr); // 毫秒字符串转换成数值
	    let dt = new Date(msesInt); // 初始化Date对象
		return dt.Format('yyyy-MM-dd');
	}
	//分享功能
	geterCode() {
		let params = encodeURIComponent(location.href );
		let result = $.httpxhr + "/v1/system/qrCode?url=" + params;
		return result;
	}
	render() {
		let detailData = this.state.data ? this.state.data : '';
		return (
			<div  className="detail">
				<div className="con">
					<div className="title">
						<p>{detailData ? detailData.title : ""}</p>
					</div>
					<div className = "viceText">
						<div className= "vice" >
							<div className="share-module">
						  		<i className="iconfont icon-share"></i>
						  		<img src={ this.geterCode() }/>
						    </div>
							<p>
								<span>上传时间：</span><span>{detailData ? this.getTime(detailData.created) : ""}</span>
								<span>&nbsp;&nbsp;&nbsp;查看：</span><span>{detailData ? detailData.viewCount : ""}</span>
								<span>&nbsp;&nbsp;&nbsp;分享：</span><span>{detailData ? detailData.shareCount : ""}</span>
							</p>
							<p>
								<span>类型：</span><span>{detailData ? detailData.categoryId : ""}</span>
								<span>&nbsp;&nbsp;&nbsp;来源：</span><span>{detailData ? detailData.source : ""}</span>
							</p>
						</div>

					</div>
					<div className="content">
						<div dangerouslySetInnerHTML={{__html: detailData.content}}>
						</div>
						
					</div>
				</div>

				<Comment module="info" option={{'page': 1,'pageSize': 10,'informationId':this.id,}}/>
				
			</div>
		)
	}
}

module.exports = ContainerCarousel

