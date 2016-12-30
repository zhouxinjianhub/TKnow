
import React from 'react';
import { Link, hashHistory } from 'react-router';
// import Carousel from './Carousel.jsx' // 资讯分类


/**
 * @name  CarouselComponent 轮播图组件
 */
class CarouselComponent extends React.Component{
	constructor(props) {
		super(props);
		this.data = [];
	}
	componentDidMount() {
		
	}
	startAddSwiper(){
		new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        spaceBetween: 30,
	        autoplay : 100000,
	        grabCursor : true,
	        direction: 'vertical',
	        mousewheelControl: true
	    });
	}
	componentWillReceiveProps(nextProps){//在组件接收到一个新的prop时被调用
		let list = nextProps ? nextProps : [];
		let listdata = list.data.data ? list.data.data : [];
		this.data = listdata.left ? listdata.left : [];
		this.setState({
			status: true
		},()=>{
			this.startAddSwiper();
		})
    }
	render(){
		return (
			<div className="swiper-container  infoIndex-con">
		        <div className="swiper-wrapper">

		        	{
		        		this.data.map((data,k) => {
			    		return  <div className="swiper-slide" >
			    					<Link className="" to={{ pathname: "/info/detail",query:{id:data.id} }} >
					        			<img src={data.picUrl}/>
					        			<span>{data.title}</span>
				        			</Link>
				        		</div>
			        	})
			        }

		        </div>
		        <div className="swiper-pagination"></div>
		    </div>
		)
	}
}

/**
 * @name  AdvertComponent 广告位组件
 */
class AdvertComponent extends React.Component{
	constructor(props) {
		super(props);
		this.data = [];
	}
	componentWillReceiveProps(nextProps){//在组件接收到一个新的prop时被调用
		let list = nextProps ? nextProps : [];
		let listdata = list.data.data ? list.data.data : [];
		this.data = listdata.right ? listdata.right : [];
		this.setState({
			status: true
		},()=>{
			this.startAddSwiper();
		})
    }
    startAddSwiper(){
		new Swiper('.advert', {
	        pagination: '.advert-button',
	        nextButton: '.advert-next',
	        prevButton: '.advert-prev',
	        paginationClickable: true,
	        spaceBetween: 30,
	        centeredSlides: true,
	        autoplay: false,
	        direction: 'horizontal',
	        autoplayDisableOnInteraction: false
	    });
	}
	render(){
		return(
			<div className=" advert">
		        <div className="swiper-wrapper">

		        	{
		        		this.data.map((data,k) => {
			    		return  <div className="swiper-slide" >
			    					<Link className="" to={{ pathname: "/info/detail",query:{id:data.id} }} >
					        			<img src={data.picUrl}/>
					        			<span>{data.title}</span>
				        			</Link>
				        		</div>
			        	})
			        }

		        </div>
		        <div className="advert-button "></div>

		        <div className="advert-next swiper-button-next"></div>
		        <div className="advert-prev swiper-button-prev"></div>
		    </div>
			
		)
	}
}
// class AdvertComponent extends React.Component{
// 	constructor(props) {
// 		super(props);
// 		this.data = [];
// 		this.title;
// 		this.pathname;
// 		this.picUrl;
// 		this.id;
// 	}
// 	componentWillReceiveProps(nextProps){//在组件接收到一个新的prop时被调用
// 		let list = nextProps ? nextProps : [];
// 		let listdata = list.data.data ? list.data.data : [];
// 		this.data = listdata.right ? listdata.right : [];
//         this.pathname= this.data[0] ? this.data[0].url : '';
// 		this.title = this.data[0] ? this.data[0].title : '';
// 		this.picUrl = this.data[0] ? this.data[0].picUrl : '';
// 		this.id =  this.data[0] ? this.data[0].id : '';
//     }
// 	render(){
// 		return(
// 			<div className="advert">
// 	    		 <Link className="advert" to={{ pathname: "/info/detail",query:{id:this.id} }}>
// 	    			<img src={this.picUrl}/>
// 	    			<span>{this.title}</span>
// 	    		</Link>
// 		    </div>
// 		)
// 	}
// }

class ContainerCarousel extends React.Component {
	constructor(props) {
		super(props);
	}
    state = {
		data: []
	};
	componentDidMount() {
		const that = this;
		that._getDatas();
	}
	_getDatas() {//加载tab选项卡数据方法
        const that = this;
        let setData = {
            dataType:'json',
            type:1,
            needAll:true
        };
        $.GetAjax('/v1/information/headline', setData, 'GET', true, function(data , state) {
        // $.GetAjax('http://192.168.1.101:8090/view/info/data/page.json', setData,'GET', true, function(data ,state) {
           if (state && data.code == 1) {
                that.setState({
                    data:data
                });
            } else{
            	console.log("请求数据失败");
            }
        });
    }
	render() {
		return (
			<div className="Carousel">
				<CarouselComponent data={this.state.data ? this.state.data : []} getDatas={this._getDatas}/>
			    <AdvertComponent data={this.state.data ? this.state.data : []}/>
			</div>
		)
	}
}

module.exports = ContainerCarousel
