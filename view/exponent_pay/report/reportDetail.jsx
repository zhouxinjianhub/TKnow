import React from 'react';
import { Link ,hashHistory} from 'react-router';
import "./reportDetail.less";


class ReportDetailComponent extends React.Component{
	constructor(props) {
		super(props);
		this.name = this.props.name;
		this.payUrl = this.props.payUrl;
	}
	state = {  
		data: []
	};
	componentDidMount() {
		// this._getdetailData(id);
	}
	
	// _getdetailData(id){
	// 	const that = this;
 //        let setData = {
 //            dataType:'json',
 //            id:id,
 //        };
 //        $.GetAjax('/v1/information/detail', setData, 'GET', true, function(data , state) {
 //        // $.GetAjax('http://192.168.1.101:8090/view/info/data/getCategory.json', setData,'GET', true, function(data ,state) {
 //           if (state && data.code == 1) {
 //                that.setState({
 //                    data:data.data
 //                });
 //            } else {
 //            	console.log("请求数据失败");
 //            }
 //        });
	// }
	// getTime(time){
	// 	// 将时间戳(以毫秒为单位)换成时间格式字符串
	//     Date.prototype.Format = function (fmt) { //author: meizz 
	//         let o = {
	//             "M+": this.getMonth() + 1, //月份 
	//             "d+": this.getDate(), //日 
	//             "H+": this.getHours(), //小时 
	//             "m+": this.getMinutes(), //分 
	//             "s+": this.getSeconds(), //秒 
	//             "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	//             "S": this.getMilliseconds() //毫秒 
	//         };
	//         if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	//         for (let k in o)
	//         if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	//         return fmt;
	//     }
	
	// 	let dateTimeJsonStr = time; // C# DateTime类型转换的Json格式
	//     dateTimeJsonStr = Date.now();
	//     let msecStr = dateTimeJsonStr.toString().replace(/\/Date\(([-]?\d+)\)\//gi, "$1"); // => '1419492640000' ：通过正则替换，获取毫秒字符串
	//     let msesInt = Number.parseInt(msecStr); // 毫秒字符串转换成数值
	//     let dt = new Date(msesInt); // 初始化Date对象
	// 	return dt.Format('yyyy.MM.dd');
	// }
	render() {
		let detailData = this.state.data ? this.state.data : '';
		return (
			<div  className="reportdetail">
				<div className="con">
					<div className="title">
						<p>{this.name ? this.name : ""}</p>
					</div>
					<div className = "viceText">
						<div className= "vice" >
							{/*<p>
								<span>上传时间：</span><span>{detailData ? this.getTime(detailData.created) : ""}</span>
								<span>&nbsp;&nbsp;&nbsp;查看：</span><span>{detailData ? detailData.viewCount : ""}</span>
								<span>&nbsp;&nbsp;&nbsp;分享：</span><span>{detailData ? detailData.shareCount : ""}</span>
							</p>
							<p>
								<span>类型：</span><span>{detailData ? detailData.categoryId : ""}</span>
								<span>&nbsp;&nbsp;&nbsp;来源：</span><span>{detailData ? detailData.source : ""}</span>
							</p>*/}
						</div>

					</div>
					<div className="content">
						<iframe src={this.payUrl ? this.payUrl : "" }></iframe>
					</div>
				</div>
			</div>
		)
	}
}

class ReportDetail extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
	}
	render() {
		let name = this.props.parent.location.query.name;
		let payUrl = this.props.parent.location.query.payUrl;
		return (
			<div className="reportdetailcon"> 
			   <ReportDetailComponent name={name} payUrl = {payUrl}/>
			</div>
		)
	}
}

module.exports = ReportDetail