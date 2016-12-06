import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import "./about.less";

import Message from "../common/message";//评论回复模块

/*
 * @name StaticPartComponent 静态部分组件（包括介绍、核心内容、满足需求、多种形式）
 */
class StaticPartComponent extends React.Component{
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		for ( let i in this.refs) {
			let imgDom = ReactDOM.findDOMNode(this.refs[i]);
			let data_url = imgDom.getAttribute('data-url');
			if ( data_url ) {
				$.lazyloadImg(data_url, images => {
					setTimeout(()=>{
						imgDom.setAttribute('src',images.src);
					});
				});
			}
		}
	}
	render() {
		let renderObj = [
			{
				imgurl:'../../images/black.gif',
				lazyurl: '../../images/about/tianji1.png',
			},{
				imgurl:'../../images/black.gif',
				lazyurl: '../../images/about/tianji2.jpg',
			},{
				imgurl:'../../images/black.gif',
				lazyurl: '../../images/about/tianji3.gif',
			},{
				imgurl:'../../images/black.gif',
				lazyurl: '../../images/about/tianji5.png',
			},{
				imgurl:'../../images/black.gif',
				lazyurl: '../../images/about/tianji6.jpg',
			},{
				imgurl:'../../images/black.gif',
				lazyurl: '../../images/about/tianji7.jpg',
			}
		];

        let [bodyHtml=[],childHtml=[]] = [];
        renderObj.map((data,k) => {
        	childHtml.push(
					<img src = { data.imgurl } data-url = { data.lazyurl }  ref = { 'lazy' + $.MathRand() }/>
        		);
        });

		return (
			<div className="staticPart">
				<div className="introduce">
					<div className="content">
						{ childHtml[0]}
					</div>
				</div>				
				<div className="coreContent">
					<div className="content">
						{ childHtml[1]}
					</div>
				</div>
				<div className="dema">
					<div className="content">
						{ childHtml[2]}
					</div>
				</div>
				<div className="repo">
				
					<div className="content">
						{ childHtml[3]}
					</div>
				</div>
			</div>
		)
	}
}

// <CarouselComponent data={this.state.data ? this.state.data : []} getDatas={this._getDatas}/>

/**
 * @name  CarouselComponent 轮播图组件
 */
class CarouselComponent extends React.Component{
	constructor(props) {
		super(props);
		this.data = [];
	}
	componentDidMount() {
		new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        spaceBetween: 30,
	        autoplay : 100000,//自动切换的时间间隔（单位ms）
	        grabCursor : true,
	        direction: 'vertical',
	        mousewheelControl: true
	    });
	}
	componentWillReceiveProps(nextProps){//在组件接收到一个新的prop时被调用 
		let list = nextProps ? nextProps : [];
		let listdata = list.data.data ? list.data.data : [];
		this.data = listdata.data ? listdata.data : [];
    }
	render(){
		return (
			<div className="swiper-container">
		        <div className="swiper-wrapper">

		        	{
		        		this.data.map((data,k) => {
			    		return  <Link className="swiper-slide" to={{ pathname: data.url }} >
				        			<img src={data.picUrl}/>
				        			<span>{data.title}</span>
				        		</Link>
			        	})
			        }

		        </div>
		        <div className="swiper-pagination"></div>
		    </div>
		)
	}
}






class ContainerAbout extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		
	}
	render() {
		return (
			<div className="container-about">
			   <StaticPartComponent/>               
			   <Message />
			</div>
		)
	}
}

module.exports = ContainerAbout