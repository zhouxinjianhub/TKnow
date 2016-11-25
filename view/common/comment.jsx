
import React from 'react';
import ReactDOM from 'react-dom';

import "./comment.less";
import "../../dist/page.js";
import { Link } from 'react-router';


class CommentComponent extends React.Component {
	constructor(props) {
		super(props);
		this.totalNum = 2000;
		this.isGetAjax = true;
	}
	state = {
		data: []
	};
	componentDidMount() {
		this.option = this.props.option;
	    this._getDatas(this.option);
	}
	renderPager(total,page) {
		const self = this;
		$(".comment-split").createPage({
	        pageCount:total,
	        current:page,
	        backFn:function(p){
	        	console.log(p);
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
		ReactDOM.findDOMNode(this.refs.residue).innerText = this.totalNum-valueLength;
	}
	addInformationController(e){
		const moduleType = this.props.module || false;
		let url = void 0;
		let option = {};
		let values = $.trim(ReactDOM.findDOMNode(this.refs.addinfo).value);
		
		switch (moduleType){
			case "info": (()=>{
				url = "/v1/information/inner/addInformationComment";
				option = {
					comment: values,
					informationId: this.option.informationId
				}
			})();break;
			default: break;
		};
		
		if ( values.length == 0 ) {
			alert('评论内容不能为空');
			ReactDOM.findDOMNode(this.refs.addinfo).value = "";
			return false;
		};

		if ( !moduleType ) {return false;};
		this._addInformation(url,option);
	}
	_addInformation(url,option) {
		$.GetAjax(url,option,'GET',false,(data,state)=>{
			if ( state && data.code == 1 ) {
				alert('评论成功');
				this._getDatas(this.option);
				ReactDOM.findDOMNode(this.refs.addinfo).value = "";
			}
		});
	}
	_getDatas(config){
		const moduleType = this.props.module || false;
		let url = void 0;
		let option = config || {};
		switch (moduleType){
			case "info":url = "/v1/information/commentList";break;
			default: break;
		};
		if ( !moduleType ) {return false;};
		$.GetAjax(url,option,'GET',false,(data,state)=>{
			if ( state && data.code == 1 ) {
				this.isGetAjax ? this.renderPager(data['data'].totalPage,data['data'].page) : '';
				this.isGetAjax = false;
				this.setState({
					data: data
				});
			}
		});
	}
	render() {
		return (
			<div className="comment-container">
				<p className="comment-header">评论({this.state.data['data']&&this.state.data['data'].total || 0})</p>
				<div className="comment-textArea">
					<textarea placeholder="发表几句评论吧..." onKeyUp={this.checktextarea.bind(this)} ref="addinfo"></textarea>
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
														<img src={d.avatar || "../../images/user.jpg"}/>
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
			</div>
		)
	}
}

module.exports = CommentComponent