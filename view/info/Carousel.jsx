
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
			    		return  <Link className="swiper-slide" >
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

/**
 * @name  AdvertComponent 广告位组件
 */
class AdvertComponent extends React.Component{
	constructor(props) {
		super(props);
		this.data = [];
		this.title;
		this.pathname;
		this.picUrl;
	}
	componentWillReceiveProps(nextProps){//在组件接收到一个新的prop时被调用
		let list = nextProps ? nextProps : [];
		let listdata = list.data.data ? list.data.data : [];
		this.data = listdata.data ? listdata.data : [];
         this.pathname= this.data[0] ? this.data[0].url : '';
		 this.title = this.data[0] ? this.data[0].title : '';
		 this.picUrl = this.data[0] ? this.data[0].picUrl : '';
    }
	render(){
		return(
			<div className="advert">
	    		 <Link className="advert" >
	    			<img src={this.picUrl}/>
	    			<span>{this.title}</span>
	    		</Link>
		    </div>
		)
	}
}

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
        $.GetAjax('/v1/information/page', setData, 'GET', true, function(data , state) {
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
