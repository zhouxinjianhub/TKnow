
import React from 'react';

class ContainerRegionalList extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.listSwiper();
	}
	listSwiper(){
		var mySwiper = new Swiper ('.swiper-container', {
			slidesPerView : 4,
			slidesPerGroup : 4,
			spaceBetween : 30,
		    // 如果需要前进后退按钮
		    nextButton: '.next',
		    prevButton: '.prev'
		})        
	}
	render() {
		return (
			<div className="regional-list swiper-container">
				<p className="regional-list-header">热门榜单</p>
				<div className="swiper-wrapper">
			        <div className="swiper-slide">
			        	<p className="title type1">网络交易额 TOP5</p>
			        	<ul>
			        		<li><i>1</i>上海市</li>
			        		<li><i>2</i>上海市</li>
			        		<li><i>3</i>上海市</li>
			        		<li><i>4</i>上海市</li>
			        		<li><i>5</i>上海市</li>
			        	</ul>
			        </div>
			        <div className="swiper-slide">
			        	<p className="title type2">网络交易额 TOP5</p>
			        	<ul>
			        		<li><i>1</i>上海市</li>
			        		<li><i>1</i>上海市</li>
			        		<li><i>1</i>上海市</li>
			        		<li><i>1</i>上海市</li>
			        		<li><i>1</i>上海市</li>
			        	</ul>
			        </div>
			        <div className="swiper-slide">
			        	<p className="title type3">网络交易额 TOP5</p>
			        	<ul>
			        		<li><i>1</i>上海市</li>
			        		<li><i>1</i>上海市</li>
			        		<li><i>1</i>上海市</li>
			        		<li><i>1</i>上海市</li>
			        		<li><i>1</i>上海市</li>
			        	</ul>
			        </div>
			        <div className="swiper-slide">
			        	<p className="title type4">网络交易额 TOP5</p>
			        	<ul>
			        		<li><i>1</i>上海市</li>
			        		<li><i>1</i>上海市</li>
			        		<li><i>1</i>上海市</li>
			        		<li><i>1</i>上海市</li>
			        		<li><i>1</i>上海市</li>
			        	</ul>
			        </div>
			        <div className="swiper-slide">
			        	<p className="title type1">网络交易额 TOP5</p>
			        	<ul>
			        		<li><i>1</i>上海市</li>
			        		<li><i>1</i>上海市</li>
			        		<li><i>1</i>上海市</li>
			        		<li><i>1</i>上海市</li>
			        		<li><i>1</i>上海市</li>
			        	</ul>
			        </div>
			    </div>
			    {/*导航按钮*/}
			    <div className="prev swiper-button"></div>
			    <div className="next swiper-button"></div>
			</div>
		)
	}
}

module.exports = ContainerRegionalList