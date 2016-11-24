
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
	componentDidMount() {
		// let query = this.props.location;
		// pageType= this.props.parent.params.pagetype ? this.props.parent.params.pagetype : "info";
		// console.log(pageType);
		
		pageType= this.props.parent.params.pagetype ? this.props.parent.params.pagetype : "info";
		console.log(pageType);
		if(pageType == "info"){
			$(".titlebar").remove();
		}
	}
	componentWillReceiveProps(){
		// pageType= this.props.parent.params.pagetype ? this.props.parent.params.pagetype : "info";
		console.log(pageType);
		if(pageType == "info"){
			$(".titlebar").remove();
		}else if(pageType == "list"){
			$(".titlebar").append();
		}else if(pageType == "detail"){
		}
	}

	/*aaa(){
		console.log('aaa');
	}*/

	getData(){
		// return data=['1','2'];
		let data;
		that.setState({
            data:['1','2']
        });
	}
	check(){
		pageType= this.props.parent.params.pagetype ? this.props.parent.params.pagetype : "info";
		console.log(pageType);
		// console.log(this.state.data);
		if(pageType == "info"){
			this.result = [<Carousel />,<List/>];
		}else if(pageType == "list"){
			this.result = ['',<List/>];
		}else if(pageType == "detail"){
			this.result = ['',<Detail/>]
		}
	}
	render() {
		this.check();
		return (
			<div className="container-info">
				{this.result[0]}
		      	<div className="con">
		      		{this.result[1] }
				        
			        {/*<Route path="/Information" onlyActiveOnIndex component={Information}/>*/}
		      	</div>
			</div>
		)
	}
}

module.exports = ContainerInfo