
import React from 'react';
import ReactDOM from 'react-dom';
import "./info.less";

// import NavLink from './NavLink.js';
import Carousel from './Carousel' // 资讯轮播图
import List from './list' // 资讯分类页
import Detail from './details' //资讯详情页
import { Link } from 'react-router';

let pageType;
let result;//决定加载的模块
class ContainerInfo extends React.Component {
	constructor(props) {
		super(props);
	}
	
	check(){
		pageType= this.props.parent.params.pagetype ? this.props.parent.params.pagetype : "info";
		if(pageType == "info"){
			this.result = [<Carousel />,<List parent={this.props.parent}/>];
		}else if(pageType == "list"){
			this.result = ['',<List parent={this.props.parent}/>];
		}else if(pageType == "detail"){
			this.result = ['',<Detail parent={this.props.parent}/>]
		}
	}
	render() {
		this.check();
		return (
			<div className="container-info">

				{this.result[0]}
				{this.result[1] }
			</div>
		)
	}
}

module.exports = ContainerInfo