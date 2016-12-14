
import React from 'react';

import "./comment.less";
import "../../dist/page.js";
import Login from "../login/login";
import { Link } from 'react-router';


class CommentComponent extends React.Component {
	constructor(props) {
		super(props);
		this.totalNum = 2000;
	}
	state = {
		data: []
	};
	componentDidMount() {
		this.option = this.props.option;
	    this._getDatas(this.option);
	}
	componentWillReceiveProps(nextProps){
		this.option = nextProps.option;
	    this._getDatas(this.option);
	}
	renderPager(total,page) {
		const self = this;
		$(".comment-split").createPage({
	        pageCount:total,
	        current:page,
	        backFn:function(p){
	        	self.option.page = p;
	            self._getDatas(self.option);
	        }
	    });
	}
	checktextarea(e) {
		let targetValue = e.target.value;
		let valueLength = targetValue.length;
		if ( valueLength >= this.totalNum ) {
			e.target.value = e.target.value.substr(0,this.totalNum);
			valueLength = this.totalNum;
		}
		this.refs.residue.innerText = this.totalNum-valueLength;
	}
	addInformationController(e){
		let isLogin = $.userlogin();
		if ( !isLogin ) {
			this.openMsk();
			return false;
		}
		e.target.value = "正在提交";
		const moduleType = this.props.module || false;
		let url = void 0;
		let option = {};
		let values = $.trim(this.refs.addinfo.value);
		
		switch (moduleType){
			case "info": (()=>{
				url = "/v1/information/inner/addInformationComment";
				option = {
					comment: values,
					informationId: this.option.informationId
				}
			})();break;
			case "region": (()=>{
				url = "/v1/area/inner/addAreaComment";
				option = {
					comment: values,
					areaId: this.option.areaId
				}
			})();break;
			case "trade": (()=>{
				url = "/v1/category/inner/addCategoryComment";
				option = {
					comment: values,
					categoryId: this.option.categoryId
				}
			})();break;
			default: break;
		};
		
		if ( values.length == 0 ) {
			layer.open({
				title: '评论',
				content: '<div>评论内容不能为空</div>',
				scrollbar: false
			});
			e.target.value = "发表";
			this.refs.addinfo.value = "";
			return false;
		};

		if ( !moduleType ) {return false;};
		this._addInformation(url,option);
	}
	_addInformation(url,option) {
		$.GetAjax(url,option,'GET',false,(data,state)=>{
			if ( state && data.code == 1 ) {
				layer.msg('评论成功', {icon: 6});
				this._getDatas(this.option);
				this.refs.addinfo.value = "";
			}
		});
	}
	_getDatas(config){
		const moduleType = this.props.module || false;
		let url = void 0;
		let option = config || {};
		switch (moduleType){
			case "info":url = "/v1/information/commentList";break;
			case "region":url = "/v1/area/commentList";break;
			case "trade":url = "/v1/category/commentList";break;
			default: break;
		};
		if ( !moduleType ) {return false;};
		$.GetAjax(url,option,'GET',false,(data,state)=>{
			if ( state && data.code == 1 ) {
				this.renderPager(data['data'].totalPage,data['data'].page);
				this.setState({
					data: data
				});
			}else{
				this.setState({
					data: []
				});
			}
		});
	}
	focusCheck(e) {
		e.target.style.borderColor = '#49befc';
	}
	blurCheck(e) {
		e.target.style.borderColor = '#ccc';
	}
	closeMsk(state,e) {
		this.refs.openmsk.style.display = "none";
		state && history.go(0) || "";
	}
	openMsk(e) {
		this.refs.openmsk.style.display = "block";
	}
	render() {
		return (
			<div className="comment-container">
				<p className="comment-header">评论({this.state.data['data']&&this.state.data['data'].total || 0})</p>
				<div className="comment-textArea">
					<textarea placeholder="发表几句评论吧..." onChange={this.checktextarea.bind(this)} ref="addinfo" onFocus={this.focusCheck.bind(this)} onBlur={this.blurCheck.bind(this)}></textarea>
					<p className="comment-default">还可以输入<span ref="residue">{ this.totalNum }</span>个字符</p>
					<input type="button" value="发表" onClick={this.addInformationController.bind(this)}/>
				</div>
				<ul className="comment-list">
					{(() => {
						let result = this.state.data['data'] && this.state.data['data'].total > 0 ? true : false || false;
						let htmlDom = [];
						switch ( result ) {
							case true: (()=>{
								let lou = this.state.data['data'].total;
								let page = this.state.data['data'].page-1;
								this.state.data['data'].data.map((d,k)=>{
									htmlDom.push(<li>
													<div className="left">
														<img src={d.avatar || "./images/user.jpg"}/>
													</div>
													<div className="right">
														<p className="userName">{d.account}<span className="lou">#{lou-this.props.option.pageSize*page}</span></p>
														<p className="sendTimes">{$.formatMsgTime(d.created)}</p>
														<p className="userContent">{d.content}</p>
													</div>
												</li>);
									lou--;
								})
							})()
							default: (()=>{
								htmlDom.push('');
							})();
						}
						return htmlDom;
					})()}
				</ul>
				<div className="comment-split"></div>
				<div className="login-alert" ref="openmsk">
					<div className="msk" onClick = { this.closeMsk.bind(this,false) }></div>
					<Login source="other" closeMsk={ this.closeMsk.bind(this) }/>
				</div>
			</div>
		)
	}
}

module.exports = CommentComponent