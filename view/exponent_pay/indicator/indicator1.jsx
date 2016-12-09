
import React from 'react';
import "../../../dist/page.js";

class IndicatorTableComponent extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		data: []
	};
	componentDidMount() {
		this.option = this.props.option;
		this.renderPager();
	    this._getDatas(this.option);
	}
	renderPager(total,page) {
		const self = this;
		$(".comment-split").createPage({
			//两参数调用page分页方法
	        pageCount:6,
	        current:1,

	        // backFn:function(p){
	        // 	self.option.page = p;
	        //     self._getDatas(self.option);
	        // }
	    });
	}
	_getDatas(config){
		// const moduleType = this.props.module || false;
		// let url = void 0;
		// let option = config || {};
		// switch (moduleType){
		// 	case "info":url = "/v1/information/commentList";break;
		// 	// case "region":url = "/v1/area/commentList";break;
		// 	default: break;
		// };
		// if ( !moduleType ) {return false;};
		// $.GetAjax(url,option,'GET',false,(data,state)=>{
		// 	if ( state && data.code == 1 ) {
		// 		this.renderPager(data['data'].totalPage,data['data'].page);
		// 		this.setState({
		// 			data: data
		// 		});
		// 	}else{
		// 		this.setState({
		// 			data: []
		// 		});
		// 	}
		// });
	}
	render(){
		return(
			<div className="indicatorTable">
				<div className="indicator-content">

					<table className="table">
						<tr className="head">
						  <td  className="thone">成都市</td>
						  <td className="tdtwo">01月</td>
						  <td>02月</td>
						  <td>01月</td>
						  <td>02月</td>
						  <td>01月</td>
						  <td>02月</td>
						  <td>01月</td>
						  <td>02月</td>
						  <td>02月</td>
						  <td>01月</td>
						  <td>02月</td>
						  <td>02月</td>
						  <td>01月</td>
						  <td>02月</td>
						  <td>02月</td>
						  <td>01月</td>
						  <td>02月</td>
						</tr>
						<tr className="">
						  <td className="tdone">3C数码网络零售额</td>
						  <td className="tdtwo">13llllllllll66</td>
						  <td>60000000000</td>
						  <td>1366</td>
						  <td>1</td>
						  <td>1366</td>
						  <td></td>
						  <td>1366</td>
						  <td></td>
						  <td></td>
						  <td></td>
						  <td></td>
						  <td></td>
						  <td>1366</td>
						  <td></td>
						  <td></td>
						  <td></td>
						  <td></td>
						</tr>
						<tr className="">
						  <td className="tdone">3C数码网络零售额</td>
						  <td className="tdtwo">13gggggggggggggggg66</td>
						  <td>2</td>
						  <td>1366</td>
						  <td>2</td>
						  <td>1366</td>
						  <td>2</td>
						  <td>1366</td>
						  <td>2</td>
						  <td>2</td>
						  <td>4</td>
						  <td>4</td>
						  <td>1366</td>
						  <td>2</td>
						  <td>2</td>
						  <td>4</td>
						  <td>4</td>
						  <td>1366</td>
						</tr>
						<tr className="">
						  <td className="tdone">3C数码网络零售额</td>
						  <td className="tdtwo">13gggggggggggggggg66</td>
						  <td>2</td>
						  <td>1366</td>
						  <td>2</td>
						  <td>1366</td>
						  <td>2</td>
						  <td>1366</td>
						  <td>2</td>
						  <td>2</td>
						  <td>4</td>
						  <td>4</td>
						  <td>1366</td>
						  <td>2</td>
						  <td>2</td>
						  <td>4</td>
						  <td>4</td>
						  <td>1366</td>
						</tr>

					</table>

				</div>
				
				<div className="comment-split"></div>

			</div>
		)
	}
}

class ContainerIndicatorModule1 extends React.Component {
	render() {
		return (
			<div className="Indicator-module">

				<div className="Indic-header">
					<div className="Indic-header-choose">
						<form action="" method="get"> 
							<label><input className=" choose-input" name="" type="checkbox" value="" /><label >显示排名 </label> </label> 
							<label><input className=" choose-input"  name="" type="checkbox" value="" /><label >显示同比 </label></label> 
							<label><input className=" choose-input"  name="" type="checkbox" value="" /><label >显示环比 </label></label> 
						</form> 
					</div>
					<div className="Indic-header-expl">
						<img src="../../../images/exponent-pay/expl.jpg" alt=""/>
					</div>
				</div>
				<IndicatorTableComponent/>
			</div>
		)
	}
}

module.exports = ContainerIndicatorModule1