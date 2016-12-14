
import React from 'react';
import "./trade.less";
import { Link ,hashHistory} from 'react-router';

class TradeHotLabel extends React.Component{
	constructor(props) {
		super(props);
		this.state = {       
        hotlabels: "",

      };
	}

	componentDidMount() {

       this.getHotTags();

	}

	getHotTags() {
		const self = this;
		let setData = {
		};
		$.GetAjax('/v1/category/hotCategoryList', setData, 'GET', true, function(data , state) {
			if (state && data.code == 1) {
				self.setState({
					hotlabels:data,
				});
			} else { 
				self.setState({
					hotlabels: ""
				});
			}
		});
	}
	render () {
		let hotlabels = this.state.hotlabels["data"]? this.state.hotlabels["data"] :'';
		let hotlabelMap = Object.keys(hotlabels).map(key=> hotlabels[key]);
		return (
			<div className="hot">
				{
					hotlabelMap.map((data,k) => {	
			    		return  <Link to={{ pathname: "/trade/tradeDetail",query:{categoryId:data.id,categoryName:data.name}}}  >
			    		     		<button  className="label">
					        			{data.name}
					        		</button>
				        		</Link>
			    	})
			    	
				}
			</div>
		)

	}
}


class TradeContent extends React.Component{
	constructor(props) {
		super(props);
		this.state = {       
		categorys:"",
		index:0

      };

	}
	componentDidMount() {
       this.getCategorys();
	}

	

    getCategorys() {
		const self = this;
		let setData = {

		};
		$.GetAjax('/v1/category/treeCategoryList', setData, 'GET', true, function(data , state) {
			if (state && data.code == 1) {
				self.setState({
					categorys:data.data,
				});
			} else {
				self.setState({
					categorys: ""
				});
			}
		});

    }

    changeMap(index,event) {    	
    	this.setState({
					index:index
				});


    }
    test(){
    	// console.log('test!test!test!');
    }
    loadImage(){
  //   	for ( let i in this.refs) {
		// 	let imgDom = ReactDOM.findDOMNode(this.refs[i]);
		// 	let data_url = imgDom.getAttribute('data-url');
		// 	if ( data_url ) {
		// 		$.lazyloadImg(data_url, images => {
		// 			setTimeout(()=>{
		// 				imgDom.setAttribute('src',images.src);
		// 			});
		// 		});
		// 	}
		// }
    }
	render () {

		var categorys = this.state.categorys? this.state.categorys :'';
		var categoryMap = Object.keys(categorys).map(key=> categorys[key]);
		


		return (
			<div className="content">
				<div className="content_left">
	   				<ul> {
		   					
						categoryMap.map((data,k) => {	
				    		return  <li >
				    					<button id={ k == this.state.index ? "current" : "" } onClick={this.changeMap.bind(this,k)} className="tab">{data.name}</button><i className="iconfont icon-right"></i>
				    				</li>							        	
				    	})
					}
					</ul>
			   	</div>
				<div className="content_right">							
                	{(() => {

						let bodyHtml = [];
						let childHtml= [];
						
						let category=categorys[this.state.index];	
						console.log(categorys);						
						if(category){
							let firstChild=category.chilren[0];
							if(firstChild){
								let secondChild=firstChild.chilren;
								if(secondChild&&secondChild.length>0){
									for ( let i in category.chilren ){
										childHtml=[];
										bodyHtml.push(<p className="list-title">{ category.chilren[i].name }</p>);
									    let	thirdChilden=category.chilren[i].chilren;																		
										thirdChilden.map((obj,key) => {
												childHtml.push(	
																<li>
																<Link to = {{ pathname: "/trade/tradeDetail",query:{categoryId:obj.id,categoryName:obj.name}}}  >
																	<div className="list-dv">											
																		<img  src={obj.imageUrl}/>
																	</div>
																	<p>{ obj.name }</p>
																</Link>	
																</li>
															)
										});
										bodyHtml.push(<ul>{ childHtml }</ul>);

										
									}

								}else{
									
									    let	thirdChilden=category.chilren;	

										thirdChilden.map((obj,key) => {
												childHtml.push(	
																<li>
																<Link to = {{ pathname: "/trade/tradeDetail",query:{categoryId:obj.id,categoryName:obj.name}}}  >
																	<div className="list-dv">											
																		<img  src={obj.imageUrl}/>
																	</div>
																	<p>{ obj.name }</p>
																</Link>	
																</li>
															)
										});
										bodyHtml.push(<ul>{ childHtml }</ul>);


								}

								// this.loadImage();

							}
							
												
						}					
						
						return bodyHtml;					
                	
					})()}
			   	</div>
			</div>
		)

	}
}





class TradeIndex extends React.Component {

	render() {		
		return (
			<div className="container-trade-index">
				<div className="main">			   		
		   			<TradeContent/>			   		
					<TradeHotLabel/>					
			    </div>
			</div>
		)
	}
}

module.exports = TradeIndex