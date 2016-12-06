
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
			    		return  <Link to={"/info/"+data.id} >
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
	render () {

		var categorys = this.state.categorys? this.state.categorys :'';
		var categoryMap = Object.keys(categorys).map(key=> categorys[key]);
		// console.log(categorys);
		// console.log(categoryMap);
		// console.log(categorys[0]);
		// var obj = {"name1":"张三","name2":"李四"}; 
		// var value = obj.name1;//得到了"undefined"
		// console.log(obj)
		// console.log(value)
		// var a={};
		// a.name="tom";
		// a.age=10;
		// console.log(a);
		// console.log(a.name);
		// console.log(categorys[0]['name']);


		return (
			<div className="content">
				<div className="content_left">
	   				<ul> {
		   					
						categoryMap.map((data,k) => {	
				    		return  <li >
				    					<button onClick={this.changeMap.bind(this,k)} className="tab">{data.name}</button><i className="iconfont icon-right"></i>
				    				</li>							        	
				    	})
					}
					</ul>
			   	</div>
				<div className="content_right">							
                	{this.state.index}
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