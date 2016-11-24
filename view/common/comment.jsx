
import React from 'react';
import ReactDOM from 'react-dom';

import "./comment.less";
import "../../dist/page.js";
import { Link } from 'react-router';

console.log($.httpxhr);
class CommentComponent extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.renderPager();
	    this._getDatas();
	}
	renderPager() {
		$(".comment-split").createPage({
	        pageCount:30,
	        current:1,
	        backFn:function(p){
	            console.log(p);
	        }
	    });
	}
	checktextarea(e) {
		let targetValue = e.target.value;
		let valueLength = targetValue.length;
		const totalNum = 2000;
		if ( valueLength >= totalNum ) {
			e.target.value = e.target.value.substr(0,totalNum);
			valueLength = totalNum;
		}
		ReactDOM.findDOMNode(this.refs.residue).innerText = totalNum-valueLength;
	}
	_getDatas(){
		const moduleType = this.props.module;
		let url = void 0;
		switch (moduleType){
			case "info": url = "";
		}
		console.log(moduleType);
	}
	render() {
		return (
			<div className="comment-container">
				<p className="comment-header">评论(33)</p>
				<div className="comment-textArea">
					<textarea placeholder="发表几句评论吧..." onKeyUp={this.checktextarea.bind(this)}></textarea>
					<p className="comment-default">还可以输入<span ref="residue">2000</span>个字符</p>
					<input type="button" value="发表"/>
				</div>
				<ul className="comment-list">
					<li>
						<div className="left">
							<img src="../../images/user.jpg"/>
						</div>
						<div className="right">
							<p className="userName">用户名<span className="lou">#33</span></p>
							<p className="sendTimes">刚刚</p>
							<p className="userContent">刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚</p>
						</div>
					</li>
					<li>
						<div className="left">
							<img src="../../images/user.jpg"/>
						</div>
						<div className="right">
							<p className="userName">用户名<span className="lou">#33</span></p>
							<p className="sendTimes">刚刚</p>
							<p className="userContent">刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚刚</p>
						</div>
					</li>
				</ul>
				<div className="comment-split"></div>
			</div>
		)
	}
}

module.exports = CommentComponent