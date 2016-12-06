
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import "./free.less";

import Message from "../common/message";//评论回复模块
// import "./js/jquery.easing.1.3.js";			// 
// import "./js/jquery.roundabout.js";			// 

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
				lazyurl: '../../images/exponent_free/screen1.png',
			},{
				imgurl:'../../images/black.gif',
				lazyurl: '../../images/exponent_free/screen2.png',
			},{
				imgurl:'../../images/black.gif',
				lazyurl: '../../images/exponent_free/screen3.png',
			},{
				imgurl:'../../images/black.gif',
				lazyurl: '../../images/exponent_free/screen4.png',
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
/*
 * @name CarouselComponent 3D轮播图组件
 */
class CarouselComponent extends React.Component{
	constructor(props) {
		super(props);
		this.data = [];
	}
	componentDidMount() {
		require.ensure([], require => {
			require('./js/jquery.easing.1.3.js');
			require('./js/jquery.roundabout2.js');
			$('#myRoundabout').css("opacity","1");
			$('#myRoundabout').roundabout({
	 			autoplay: true,
	            autoplayDuration: 5000,
	            autoplayPauseOnHover: true,
	            shape: 'figure8',
	       		minOpacity: 1,

	       		btnNext: '#previous',
	 			btnPrev: '#next'
			});

		}, 'myRoundabout')
	}
	render(){
		return (
			<div className="Carousel">
				<div className="title">
					<p>数据报告</p>
				</div>
				<div className="btn next">
					<a href="javascript:;" id="previous"></a>
		        </div>
		        <div className="content">
					<ul id="myRoundabout">

						<li>
							<img src="../../images/exponent_free/1.jpg" alt=""/>
							<div></div>
						</li>
						<li>
							<img src="../../images/exponent_free/1.jpg" alt=""/>
							<div></div>
						</li>
						<li>
							<img src="../../images/exponent_free/1.jpg" alt=""/>
							<div></div>
						</li>
						<li>
							<img src="../../images/exponent_free/1.jpg" alt=""/>
							<div></div>
						</li>
						<li>
							<img src="../../images/exponent_free/1.jpg" alt=""/>
							<div></div>
						</li>
						<li>
							<img src="../../images/exponent_free/1.jpg" alt=""/>
							<div></div>
						</li>
						<li>
							<img src="../../images/exponent_free/1.jpg" alt=""/>
							<div></div>
						</li>
					</ul>
		        </div>
		        <div className="btn previous">
					<a href="javascript:;" id="next"></a>
		        </div>
		    </div>
		)
	}
}

class ContainerFree extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		
	}
	render() {
		
		return (
			<div className="container-free">
			   <StaticPartComponent/>
			   <CarouselComponent/>
			   <Message />
			</div>
		)
	}
}

module.exports = ContainerFree