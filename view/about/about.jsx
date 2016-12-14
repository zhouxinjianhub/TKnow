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
				imgurl:'./images/black.gif',
				lazyurl: './images/about/tianji1.png',
			},{
				imgurl:'./images/black.gif',
				lazyurl: './images/about/tianji2.jpg',
			},{
				imgurl:'./images/black.gif',
				lazyurl: './images/about/tianji3.gif',
			},{
				imgurl:'./images/black.gif',
				lazyurl: './images/about/tianji5.png',
			},{
				imgurl:'./images/black.gif',
				lazyurl: './images/about/tianji6.jpg',
			},{
				imgurl:'./images/black.gif',
				lazyurl: './images/about/tianji7.jpg',
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
				<div className="tianji">
					<div className="content">
						{ childHtml[0]}
					</div>
				</div>				
				<div className="platform">
					<div className="content">
						{ childHtml[1]}
					</div>
				</div>
				<div className="visualization">
					<div className="content">
						{ childHtml[2]}
					</div>
				</div>
				<div className="output">
					<div className="content">
						{ childHtml[3]}
					</div>
				</div>
			</div>
		)
	}
}


/**
 *   SwitherComponent 切换组件
 */
class SwitherComponent extends React.Component{
	constructor(props) {
		super(props);
		
	}	
	render(){
		return (
			<div className="swither-container">
				<p>多种展现形式</p>
				<img className="switcher_imge"></img>
				<div className="switch">
				  <a>单屏</a>
				  <a>多屏</a>
				</div>
		    </div>
		)
	}
}

/**
 *   CarouselComponent 轮播图组件
 */

class CarouselComponent extends React.Component{
	constructor(props) {
		super(props);
		this.data = [];
	}
	componentDidMount() {
		new Swiper('.swiper-container', {
		    pagination: '.swiper-pagination',
	        slidesPerView: 4,
	        centeredSlides: true,
	        paginationClickable: true,
	        spaceBetween: 30    
		    
	    });
	}
	componentWillReceiveProps(nextProps){//在组件接收到一个新的prop时被调用 
		let list = nextProps ? nextProps : [];
		let listdata = list.data.data ? list.data.data : [];
		this.data = listdata.data ? listdata.data : [];
    }
	render(){
		return (
			<div className="swiper">
				<p>典型客户</p>
				<div className="swiper-container">
					 <div className="swiper-wrapper">
				        <div className="swiper-slide">Slide 1</div>
			            <div className="swiper-slide">Slide 2</div>
			            <div className="swiper-slide">Slide 3</div>
			            <div className="swiper-slide">Slide 4</div>
			            <div className="swiper-slide">Slide 5</div>
			            <div className="swiper-slide">Slide 6</div>
				    </div>
				    
				</div>   
		        
		    </div>
		)
	}
}



class ContainerAbout extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {		
		$(".container>.content>.nav").addClass("nav-free");		
	}
	componentWillUnmount(){  		
		$(".container>.content>.nav").removeClass("nav-free");		
	}
	render() {
		return (
			<div className="container-about">
			   <StaticPartComponent/>               
			   <SwitherComponent/>               
			   <CarouselComponent/>               
			   <Message />
			</div>
		)
	}
}

module.exports = ContainerAbout