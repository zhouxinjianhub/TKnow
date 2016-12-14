
import React from 'react';
import "../../../dist/page.js";

class IndicatorTableComponent extends React.Component {
	constructor(props) {
		super(props);
		this.flag = true;//默认采用倒序
	}
	state = {
		data: []
	};
	componentDidMount() {
		this.option = this.props.option;
		this.renderPager();
	    this._getDatas(this.option);
	    require.ensure([], require => {
			require('./slimtable.js');
			$(".indictable").slimtable();
		}, 'indicTable');
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
	//对表格进行排序
	sortTable(e){
		
	}
	render(){
		let datajson = [
			[ "成都市", "1月", "1月同比", "1月环比", "2月", "2月同比", "2月环比", "3月","3月同比" ],
			[ "1", "ex1", "ex_a", "2,5", "2.5", "30%", "19222222222222", "ex_a1","10%" ],
			[ "2", "ex2", "ex_b", "5,4", "5.4", "28,5%", "33", "ex_b1" ,"101111111111111%"],
			[ "3", "ex3", "ex_c", "16,7", "16.7", "19,3%", "33", "ex_c1" ,"10%"],
			[ "4", "ex4", "ex_d", "2,8", "2.8", "1,8%", "28", "ex_b1" ,"10%"],
			[ "5", "ex6", "ex_e", "2,5", "2.5", "2,85 %", "44", "ex_a1" ,"10%"],
			[ "6", "ex7", "ex_f", "5,5", "5.5", "16%", "52", "ex_d1","10%" ],
			[ "7", "ex8", "ex_g", "6,8", "6.8", "-1,9%", "39", "ex_e1" ,"10%"],
			[ "8", "ex9", "ex_h", "6,8", "6.8", "+1,9 %", "28", "ex_d1","10%" ],
			[ "9", "ex5", "ex_h", "6,8", "6.8", "1,9 %", "28", "ex_d1","10%" ]
		];
		
		return(
			<div className="indicatorTable">
				<div className="indicator-content">
					<table className="indicTable indictable" id="indicTable">
						{
							(()=>{
								let thead = [];
								let th = [];
								let data = datajson[0];
								data.map((data,k)=>{
									th.push(<th className={"td"+k}>{data}</th>)
								})
								return <thead><tr>{th}</tr></thead>
							})()
						}
						{
							(()=>{
								let tbody=[];
								let data = [];
								for(let i = 1;i<datajson.length;i++){
									data.push(datajson[i]);
								}
								data.map((data,k)=>{
									let tr = [];
									this.datatrlen = data.length;
									for(let i = 0; i< data.length; i++){
										tr.push(<td >{data[i]}</td>)
									}
									tbody.push(<tr >{tr}</tr>);
								})
								return <tbody>{tbody}</tbody>; 
							})()
						}
					</table>
				</div>
				<div className="comment-split"></div>

			</div>
		)
	}
}

class ContainerIndicatorModule1 extends React.Component {
	
	getExplain(){
		let explainCon = "指标解释内容指标解释内容指标解释内容指标解释内容指标解释内容指标解释内容指标解释内容指标解释内容指标解释内容指标解释内容";
		layer.open({
			title: '指标解释',
			content: explainCon,
			scrollbar: true,
			shadeClose: true, //开启遮罩关闭
			btn: []//无“确定”按钮
		});
	}
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
						<img onClick={this.getExplain} src="../../../images/exponent-pay/expl.jpg" alt=""/>
					</div>
				</div>
				<IndicatorTableComponent/>
			</div>
		)
	}
}

module.exports = ContainerIndicatorModule1