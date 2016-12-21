
import React from 'react';
import "../../../dist/page.js";

class IndicatorTableComponent extends React.Component {
	constructor(props) {
		super(props);
		this.istradeMap = true;
		this.headData = [];
		this.tableData = [];
	}

	componentDidMount() {
		this.option = this.props.option;
		this.renderPager();
	    this._getDatas(this.option);
	    
	}
	componentWillReceiveProps(nextProps){
		this.props = nextProps;
		this._getDatas();
	}
	//分页方法
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
	_getDatas(){

		let config = {
			// timeIds: this.props.timeId ,
			// areaId: this.props.areaId,
			// categoryIds: this.props.tradeId,
			// indexId:this.props.IndicId,
			timeIds:"50,49,48",
			areaId: 51,
			categoryIds: "4,5",
			indexId:1,
		}
		$.GetAjax('/v1/zhishu/inner/getIndex', config, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
            	this.istradeMap = true;
            	
            	let tabledata = data.data;
				this.headData = [];
				let tharr = [];
				tharr.push(<th className=""> {tabledata.areaName} </th>);
				tabledata.times.map((data,k)=>{
					tharr.push(<th className="indexValue" data-name="indexValue"> {data} </th>);
					tharr.push(<th className="yearOnYear"> {data+"同比"} </th>);
					tharr.push(<th className="chainUpAndDow"> {data+"环比"} </th>);
				});
				this.headData.push(tharr);
				
				this.tableData = [];
				tabledata.indexCategories.map((data,k)=>{
					let tbodyarr = [];
					tbodyarr.push(<td className="">{data.categoryName}</td>);
					data.data.map((data,y)=>{
						tbodyarr.push(<td className="indexValue">{data.indexValue}</td>);
						tbodyarr.push(<td className="yearOnYear">{data.yearOnYear}</td>);
						tbodyarr.push(<td className="chainUpAndDow">{data.chainUpAndDow}</td>);
					});
					
					this.tableData.push(<tr >{tbodyarr}</tr>);
				});

            	this.setState({
            		status: true
            	},()=>{

            		this.getslimtable();
            	});
            } else {
            	this.istradeMap = false;
            	this.setState({
            		status: false
            	});
            }
        });
	}
	getslimtable(){
		require.ensure([], require => {
			require('./slimtable.js');
			$(".indictable").slimtable();
		}, 'indicTable');
	}
	render(){
		if ( this.istradeMap == false ) {
			return null;
		}
		return(
			<div className="indicatorTable">
				<div className="indicator-content">
					<table className="indicTable indictable" id="indicTable">
						{
							(()=>{
								return <thead><tr>{this.headData}</tr></thead>;
							})()
							
						}
						
						{
							(()=>{
								return <tbody>{this.tableData}</tbody>;
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
	constructor(props) {
		super(props);
	}
	componentDidMount() {
        $(".choose-input").click(function() {
            if (this.checked) {
            	if(this.id == "checkbox_a1"){
            		$(".indexValue").addClass('thhidden');
            	}else if(this.id == "checkbox_a2"){
            		$(".yearOnYear").addClass('thhidden');
            	}else{
            		$(".chainUpAndDow").addClass('thhidden');
            	}
                $(this).siblings(".choose-box").find("img").attr("src", "../../../images/exponent-pay/check.png");
            } else{
            	if(this.id == "checkbox_a1"){
            		$(".indexValue").removeClass('thhidden');
            	}else if(this.id == "checkbox_a2"){
            		$(".yearOnYear").removeClass('thhidden');
            	}else{
            		$(".chainUpAndDow").removeClass('thhidden');
            	}
                $(this).siblings(".choose-box").find("img").attr("src", "../../../images/exponent-pay/uncheck.png");
            }
        })
	}
	componentWillReceiveProps(nextProps){
		this.props = nextProps;
	}
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
							<label>
								<input className=" choose-input" id="checkbox_a1" type="checkbox" value="" />
								<div className="choose-box" >
						            <img src="../../../images/exponent-pay/uncheck.png"/>
						        </div>
								<label for="checkbox_a1">显示排名 </label> 
							</label> 
							<label>
								<input className=" choose-input"  id="checkbox_a2" name="" type="checkbox" value="" />
								<div className="choose-box" >
						            <img src="../../../images/exponent-pay/uncheck.png"/>
						        </div>
								<label for="checkbox_a2">显示同比 </label>
							</label> 
							<label>
								<input className=" choose-input"  id="checkbox_a3" name="" type="checkbox" value="" />
								<div className="choose-box" >
						            <img src="../../../images/exponent-pay/uncheck.png"/>
						        </div>
								<label for="checkbox_a3">显示环比 </label>
							</label> 
						</form> 
					</div>
					<div className="Indic-header-expl">
						<img onClick={this.getExplain} src="../../../images/exponent-pay/expl.jpg" alt=""/>
					</div>
				</div>
				<IndicatorTableComponent timeId={this.props.timeId} areaId={this.props.areaId} tradeId={this.props.tradeId} IndicId={this.props.IndicId}/>
			</div>
		)
	}
}

module.exports = ContainerIndicatorModule1