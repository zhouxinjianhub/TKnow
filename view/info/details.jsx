
import React from 'react';
import { Link, hashHistory } from 'react-router';
import Comment from "../common/comment";//评论回复模块


class ContainerCarousel extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		data: []
	};
	componentDidMount() {
		let id = this.props.parent.location.query.id ?  this.props.parent.location.query.id : 0 ;
		this._getdetailData(id);
	}
	_getdetailData(id){
		const that = this;
        let setData = {
            dataType:'json',
            id:id,
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
		// 将时间戳(以s为单位)换成时间格式字符串
		let timestamp = time;
		let newDate = new Date();
		newDate.setTime(timestamp * 1000);

		Date.prototype.format = function(format) {
	       let date = {
	              "M+": this.getMonth() + 1,
	              "d+": this.getDate(),
	              "h+": this.getHours(),
	              "m+": this.getMinutes(),
	              "s+": this.getSeconds(),
	              "q+": Math.floor((this.getMonth() + 3) / 3),
	              "S+": this.getMilliseconds()
	       };
	       if (/(y+)/i.test(format)) {
	              format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	       }
	       for (let k in date) {
	              if (new RegExp("(" + k + ")").test(format)) {
	                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
	                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
	              }
	       }
	       return format;
		}
		return newDate.format('yyyy-MM-dd');
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
							<img src="../../../images/info/share.png" alt=""/>
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
						<div>
							{detailData.content}
						</div>
						
					</div>
				</div>
			
				<Comment module="info" option={{'page': 1,'pageSize': 10,'informationId': 1}}/>
			</div>
		)
	}
}

module.exports = ContainerCarousel

