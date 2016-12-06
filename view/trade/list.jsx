
import React from 'react';

class ContainerRegionalList extends React.Component {
	constructor(props) {
		super(props);
		this.isTopRoute = true;
		this.topdata = [];
		this.topdatalen = 0;
	}
	componentDidMount(){
		this.getTopRouteDatas();
	}
	componentWillReceiveProps(nextProps){
		this.props = nextProps;
		this.getTopRouteDatas();
	}
	getTopRouteDatas(){
		let config = {
			timeId: this.props.timeId,
			areaId: this.props.areaId
		}
		$.GetAjax('/v1/area/topRoute', config, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
            	this.isTopRoute = true;
            	this.topdata = data.data;
            	this.setState({
            		status: true
            	},()=>{
            		this.start();
            	});
            } else {
            	this.isTopRoute = false;
            	this.setState({
            		status: false
            	});
            }
        });
	}
	start(){
		new Swiper ('.swiper-container', {
			slidesPerView : 4,
			slidesPerGroup : 4,
			spaceBetween : 30,
		    // 如果需要前进后退按钮
		    nextButton: '.next',
		    prevButton: '.prev'
		})        
	}
	render() {
		if ( this.isTopRoute == false ) {
			return null;
		}
		return (
			<div className="regional-list swiper-container">
				<p className="regional-list-header">热门榜单</p>
				<div className="swiper-wrapper">
					{(() => {
						let topdata = this.topdata || {}
						let topListHTML = [];
						let k_ls = 0;
						this.topdatalen = 0;
						for (let i in topdata) {
							this.topdatalen ++;
							k_ls >= 4 ? k_ls = 1 : k_ls++;
							let classNamed = "title type"+k_ls
							topListHTML.push(<div className="swiper-slide">
									        	<p className={ classNamed }>{ i } TOP5</p>
									        	<ul>
									        		{
									        			topdata[i].map((data,k)=>{
									        				return <li><i>{ k+1 }</i>{ data.name }</li>
									        			})
									        		}
									        	</ul>
									        </div>)
						}
						return topListHTML;
					})()}
			    </div>
			    {/*导航按钮*/}
			    {(()=>{
			    	let nextButton = [];
			    	if ( this.topdatalen > 4 ) {
			    		nextButton.push(<div className="prev swiper-button"></div>);
			    		nextButton.push(<div className="next swiper-button"></div>);
			    	}
			    	return nextButton;
			    })()} 
			</div>
		)
	}
}

module.exports = ContainerRegionalList