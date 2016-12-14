
import React from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';
import { Link } from 'react-router';

import Message from "../common/message";//评论回复模块


import "./js/jquery.easing.1.3.js";
import "./js/jquery.roundabout2.js";

import "./free.less";

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
				lazyurl: './images/exponent_free/yingchaointroduce.png',
			},{
				imgurl:'./images/black.gif',
				lazyurl: './images/exponent_free/coreContent.png',
			},{
				imgurl:'./images/black.gif',
				lazyurl: './images/exponent_free/demand.png',
			},{
				imgurl:'./images/black.gif',
				lazyurl: './images/exponent_free/forms.png',
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
		this.isImg = true;
		this.imgdata = [];
		this.result = []; 
	}

	componentDidMount() {
		this.getCarData();
		require.ensure([], require => {
			// require('./js/jquery.easing.1.3.js');
			// require('./js/jquery.roundabout2.js');
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
		}, 'myRoundabout'); 
		
	}
	componentDidUpdate(){
		$('#myRoundabout').roundabout({
 			autoplay: true,
            autoplayDuration: 5000,
            autoplayPauseOnHover: true,
            shape: 'figure8',
       		minOpacity: 1,

       		btnNext: '#previous',
 			btnPrev: '#next'
		});

	}
	getCarData(){
	 	const that = this;
        let setData = {
            dataType:'json',
        };
        $.GetAjax('/v1/zhishu/freeDataReportList', setData, 'GET', true, function(data , state) {
        // $.GetAjax('/exponent_free/js/freeDataReportList.json', setData,'GET', true, function(data ,state) {
           if (state && data.code == 1) {
           		that.isImg = true;
           		that.imgdata = data.data;
           		that.renderImg();
                that.setState({
                    status: true
                });
               
            } else{
            	that.isImg = false;
            	that.setState({
                    status: false
                });
            }
        });
	}
	renderImg(){

		this.imgdata.map((data,k) => {
			this.result.push(<li>
								<Link to={{ pathname: "/exponent_free/freeDetail",query:{freeUrl:data.freeUrl,name:data.name}}} >
				        			<img src={data.picUrl}/>
				        		</Link>
			        			<div></div>
			        		</li>
		        		);
		
		})
		return this.result;
	}
	render(){
		
		if(this.isImg == false){
			return null;
		}

		let divStyle = {
			width:'900px',
			height:'400px',
		};
		return (
			<div className="Carousel">
				<div className="title">
					<p>数据报告</p>
				</div>
				<div className="btn next">
					<a href="javascript:;" id="previous"></a>
		        </div>
		        <div className="content">
					<ul id="myRoundabout" style={divStyle}>
						{this.result}
						{/*<li>
							<a href="http://localhost:8090/#/exponent_free/freeDetail?freeUrl=http%3A%2F%2F192.168.1.221%3A8080%2Fapi%2Fv1%2Ffile%2FdownloadFile%3Fkey%3Dlynn%26name%3D1.pdf%26ak%3D1">
								<img src="./images/exponent_free/1.jpg" alt=""/>
							</a>
							<div></div>
						</li>
						<li>
							<a href="http://localhost:8090/#/exponent_free/freeDetail?freeUrl=http%3A%2F%2F192.168.1.221%3A8080%2Fapi%2Fv1%2Ffile%2FdownloadFile%3Fkey%3Dlynn%26name%3D1.pdf%26ak%3D1">
								<img src="./images/exponent_free/1.jpg" alt=""/>
							</a>
							<div></div>
						</li>
						<li>
							<a href="http://localhost:8090/#/exponent_free/freeDetail?freeUrl=http%3A%2F%2F192.168.1.221%3A8080%2Fapi%2Fv1%2Ffile%2FdownloadFile%3Fkey%3Dlynn%26name%3D1.pdf%26ak%3D1">
								<img src="./images/exponent_free/1.jpg" alt=""/>
							</a>
							<div></div>
						</li>*/}
					
					</ul>
		        </div>
		        <div className="btn previous">
					<a href="javascript:;" id="next"></a>
		        </div>
		    </div>
		)
	}
}


/*
 * @name FreeIndexComponent 主页
 */
class FreeIndexComponent extends React.Component{
	constructor(props) {
		super(props);
		this.freeName = '';
	}
	componentDidMount() {
		this.freeName = this.props.freeName;
		if(this.freeName == "exponent_free"){
			$(".container>.content>.nav").addClass("nav-free");
		}
	}
	componentWillUnmount(){  
		if(this.freeName == "exponent_free"){
			$(".container>.content>.nav").removeClass("nav-free");
		}
	}
	render() {
		return(
			<div className="freeIndex">
			   <StaticPartComponent/>
			   <CarouselComponent/>
			   <Message />
			</div>
		)
		
	}
}

/*
 * @name PublicReportComponent 公开报告页
 */
class PublicReportComponent extends React.Component{
	constructor(props){
		super(props);
		this.freeUrl=[];
		this.title = [];
	}
	check(){
		this.freeUrl = this.props.parent.location.query.freeUrl ?  this.props.parent.location.query.freeUrl : '' ;
		this.title = this.props.parent.location.query.name ?  this.props.parent.location.query.name : '' ;
	}
	render() {
		this.check();
		return (
			<div className="freeDetail">
				<div className="freeDe-title">天知道&nbsp;&nbsp;|&nbsp;&nbsp;映潮指数&nbsp;&nbsp;|&nbsp;&nbsp;{this.title}</div>
				<iframe src={this.freeUrl} frameborder="0"></iframe>
			</div>
		)

	}
}
class ContainerFreeComponent extends React.Component {
	constructor(props) {
		super(props);
		this.freeName = '';
	}
	render() {
		this.freeName = this.props.parent.params.freeName ? this.props.parent.params.freeName : 'exponent_free';
		return (
			<div className="container-free">
				{(()=>{
					switch( this.freeName ){
						case "exponent_free"   : return <FreeIndexComponent freeName = {this.freeName}/>
						case "freeDetail"  : return <PublicReportComponent parent={this.props.parent}/>
						default : 	     return <FreeIndexComponent freeName = {this.freeName}/>
					}
				})()}
			</div>
		)
	}
}

module.exports = ContainerFreeComponent