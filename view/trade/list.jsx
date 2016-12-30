
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
			areaId: this.props.areaId,
			categoryId:this.props.parent.location.query.categoryId ? this.props.parent.location.query.categoryId : ''
		}
		$.GetAjax('/v1/category/topRoute', config, 'Get', true, (data,state)=>{
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
			<div className="tradeDetail-list swiper-container">
				<p className="tradeDetail-list-header">热门榜单</p>
				<div className="swiper-wrapper">
					{(() => {
						let topdata = this.topdata || {};

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
									        		{(() => {
									        			let topdataResult = [];
									     
									        			if(topdata[i] != null){
															//分类别获取value值，转换成对应数据后，组装成数组填充给下面的值
															//data.type : 0代表数值 1代表百分比 2代表指数
									        				let listArr = [];
									        				let datatype = [];
									        				topdata[i].map((data,k)=>{
									        					datatype = data.type;
									        					listArr.push(data.value);
									        				});
									        				let result = [];
									        				if(datatype == 0){//0代表数值 
										        				result = $.getFormatCompanynull( listArr );
									        				}
									        				else if(datatype == 1){//1代表百分比 
										        				result = $.getPercentageCompany( listArr );
								        					}else if(datatype == 2){//2代表指数

										        				result = $.getIndicCompany( listArr );
								        					}else {
								        						result = $.getIndicCompany( listArr );
								        					}
									        				

									        				topdata[i].map((data,k)=>{

										        				topdataResult.push( <li>
															         					<i>{ k+1 }</i>
															        					<span>{ data.name }</span>
															        					<p>{result.value ? result.value[k]+result.company : ''}</p>
														        					</li> );
										        			})
									        			}
									        			return topdataResult;
									        			
									        		})()

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