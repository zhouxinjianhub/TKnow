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
 *   SwitherComponent 切换图片组件
 */
class SwitherComponent extends React.Component{
	constructor(props) {
		super(props);
		
	}

	switch(id,event){
		$(".switch a").removeClass('active');	
    	$("#o"+id).addClass('active');
    	var imgDom=this.refs.switcher_imge;
    	var url='';
    	switch (id) {
    		case 0:
    			url="../../images/about/tianji7.jpg";
    			break;
    		default:
    			url="../../images/about/tianji6.jpg";
    			break;
    	}
    	imgDom.setAttribute('src',url);

	}


	render(){
		return (
			<div className="swither-container">
				<p className="tips">多种展现形式</p>
				<img src="../../images/about/tianji7.jpg" ref="switcher_imge" className="switcher_imge"></img>
				<div className="switch">
				  <a id="o0" className="active" onClick={this.switch.bind(this,0) } >单屏</a>
				  <a id="o1" onClick={this.switch.bind(this,1) } >多屏</a>
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
		this.state = {       
            data:[]
        };
	}
	componentDidMount() {
		this.requestData();
		new Swiper('.swiper-container', {
        	nextButton: '.swiper-button-next',
        	prevButton: '.swiper-button-prev',
	        slidesPerView: 5,
	        spaceBetween: 30,
	        loop: true,
	        breakpoints: {
	            1024: {
	                slidesPerView: 4,
	                spaceBetween: 10
	            },
	            768: {
	                slidesPerView: 3,
	                spaceBetween: 5
	            },
	            640: {
	                slidesPerView: 2,
	                spaceBetween: 5
	            },
	            320: {
	                slidesPerView: 1,
	                spaceBetween: 2
	            }
	        },   
		    
	    });
	}
	requestData(){
		var self = this;

        let datas = {
           
        };

        $.GetAjax('/v1/tianji/careList', datas, 'POST', true, function(data , state) {

            if ( state && data.code == 1 ) {
            	self.setState({
					data:data.data
				});

            } else {


            }
        });
	}

	render(){
		return (
			<div className="swiper">
				<p className="swiper-name">典型客户</p>
				<div className="swiper-container">
			        <div className="swiper-wrapper">
			        	 {
			        	 	this.state.data.map((data,k) => {                            
                                            return  <div className="swiper-slide">
                                            			<img  src={data.picUrl}/>
                                            			<p>{data.name}</p> 
                                            		</div>                                                        
                                        }
                            ) 
                             
                        }			           
			        </div>


			        <div className="swiper-button-next"></div>
			        <div className="swiper-button-prev"></div>
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
		$(".container>.content>.nav").addClass("nav-about");		
	}
	componentWillUnmount(){  		
		$(".container>.content>.nav").removeClass("nav-about");		
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