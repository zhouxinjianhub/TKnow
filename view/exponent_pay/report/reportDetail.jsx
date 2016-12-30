import React from 'react';
import { Link ,hashHistory} from 'react-router';
import "./reportDetail.less";


class ReportDetailComponent extends React.Component{
	constructor(props) {
		super(props);
		this.data = this.props.data ? this.props.data : [];
	}
	componentDidMount() {

	}
	componentWillReceiveProps(nextProps){
		this.props = nextProps;
		this.data = this.props.data ? this.props.data : [];
	}
	getTime(time){
		if(time){
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
		    let msecStr = dateTimeJsonStr.toString().replace(/\/Date\(([-]?\d+)\)\//gi, "$1"); // => '1419492640000' ：通过正则替换，获取毫秒字符串
		    let msesInt = Number.parseInt(msecStr); // 毫秒字符串转换成数值
		    let dt = new Date(msesInt); // 初始化Date对象
			return dt.Format('yyyy.MM.dd');
		}else {
			return null;
		}
		
	}
	loadFile(url){
		window.open(url);
	}
	render() {
		return (
			<div  className="reportdetail">
				<div className="con">
					<div className="title">
						<p>{this.data.name ? this.data.name : ""}</p>
					</div>
					<div className = "viceText">
						<div className= "vice" >
							<p>
								<span>上传时间：</span><span>{this.data ? this.getTime(this.data.created ? this.data.created : '') : ""}</span>
								<span>&nbsp;&nbsp;&nbsp;查看：</span><span>{this.data ? this.data.viewCount : ""}</span>
								<span>&nbsp;&nbsp;&nbsp;下载：</span><span>{this.data ? this.data.downloadCount : ""}</span>
							</p>
						</div>
						<div className="loadFile">
							<p>
								<label>下载：</label>
								{
									(()=>{
										let result = [];
										let data = this.data.url ? this.data.url : '';
										if(data){
											let dataurl = JSON.parse(data);
											for(let i in dataurl){
												result.push( <span><img onClick = {this.loadFile.bind(this,dataurl[i]) } src = {"../../images/exponent-pay/"+i+".png"}/></span> );
											}
											return result;
										}else{
											return null;
										}
										
									})()
								}

							</p>
						</div>

					</div>
					<div className="content">
						<iframe src={this.data.payUrl ? this.data.payUrl : "" }></iframe>
					</div>
				</div>
			</div>
		)
	}
}

class ReportDetail extends React.Component {
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
	_getdetailData(){
		const that = this;
        let setData = {
            dataType:'json',
            id:this.id,
        };
        $.GetAjax('/v1/zhishu/inner/dataReportDetail', setData, 'GET', true, function(data , state) {
           if (state && data.code == 1) {
                that.setState({
                    data:data.data
                });
            } else {
            	console.log("请求数据失败");
            }
        });
	}
	render() {
		return (
			<div className="reportdetailcon"> 
			   <ReportDetailComponent data = {this.state.data} />
			</div>
		)
	}
}

module.exports = ReportDetail