
import React from 'react';

class IndicatorTableComponent extends React.Component {
	constructor(props) {
		super(props);
		this.istradeMap = true;
		// this.headData = [];
		this.tableData = [];
		$.onloadJavascript('./js/bootstrap-table.min.css');
		$.onloadJavascript('./js/bootstrap-table.min.js');
		$.onloadJavascript('./js/bootstrap-table-zh-CN.min.js');
	}

	componentDidMount() {
		this.option = this.props.option;
	    this._getDatas(this.option);
	    
	}
	componentWillReceiveProps(nextProps){
		this.props = nextProps;
		this._getDatas();
	}
	
	_getDatas(){
		let config = {
			timeIds: this.props.timeId ,
			areaId: this.props.areaId,
			categoryIds: this.props.tradeId,
			indexId:this.props.IndicId,
			// timeIds:"40,41,50,50,49,48",
			// areaId: 5101,
			// categoryIds: "13,14,15,17,16,19,27,26,29,28",
			// indexId:1,
		}

		 
		 $.GetAjax('/v1/zhishu/inner/getIndex', config, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
            	let tabledata = data.data;

				//转换后台传入的数据格式为json
				var temp = {};
				tabledata.times.map((data,x)=>{ // 时间
					let monthData = [];
					temp[data] = monthData;
					tabledata.indexCategories.map((data,y)=>{ // 行业
						data.data.map((data,z)=>{ //# 行业下的数据
							if(x==z){
								monthData.push(data.indexValue);
							}				
						});
					})
				});
				//分列获取数据单位
				let unitArr = [];
				for(let i in temp){
					let sum = 0;
					let average = [];
					temp[i].map((data,a)=>{
						sum += data;
					})
					// average = sum/temp[i].length;
					average.push(sum/temp[i].length);
					let unit = $.getFormatCompany(average).company;
					unitArr.push(unit);
				}

            	this.istradeMap = true;
 				let columns=[];

				let valuerows=[];
 				columns.push({
            		field: 'ct',
            		title: tabledata.areaName,
            		sortable: true
        		});

				tabledata.times.map((data,k)=>{
					valuerows.push( data+"0");//放入vaue头数组中待用
					columns.push({
                		field: data+"0",
                		title: data,
                		class:"indexValue",
                		sortable: true,
                		sorter:(a,b)=>{//自定义排序方法
							if(a.indexOf('亿元')!=-1){
								let t1=a.substr(0,a.indexOf("亿元"));
								let t2=b.substr(0,b.indexOf("亿元"));
								let temp1=parseFloat(t1);
								let temp2=parseFloat(t2);
								if (temp1 > temp2) return 1;
						        if (temp1 < temp2) return -1;
						        return 0;
							}else if(a.indexOf('万元')!=-1){
								let t1=a.substr(0,a.indexOf("万元"));
								let t2=b.substr(0,b.indexOf("万元"));
								let temp1=parseFloat(t1);
								let temp2=parseFloat(t2);
								if (temp1 > temp2) return 1;
						        if (temp1 < temp2) return -1;
						        return 0;
							}else{
								let t1=a.substr(0,a.indexOf("元"));
								let t2=b.substr(0,b.indexOf("元"));
								let temp1=parseFloat(t1);
								let temp2=parseFloat(t2);
								if (temp1 > temp2) return 1;
						        if (temp1 < temp2) return -1;
						        return 0;
							}
						}
                		
            		});
            		if(this.props.checkinputState().a){
            			columns.push({
	                		field: data+"1",
	                		title: data+"同比",
	                		class:"yearOnYear ",
	                		sortable: true,
	                		formatter:(value,row,i)=>{
	                			return (value*100).toFixed(2)+'%';
	                		}
	            		});
            		}else{
            			columns.push({
	                		field: data+"1",
	                		title: data+"同比",
	                		class:"yearOnYear thhidden",
	                		sortable: true,
	                		formatter:(value,row,i)=>{
	                			return (value*100).toFixed(2)+'%';
	                		}
	            		});
            		};
            		if(this.props.checkinputState().b){
            			columns.push({
	                		field: data+"2",
	                		title: data+"环比",
	                		class:"chainUpAndDow ",
	                		sortable: true,
	                		formatter:(value,row,i)=>{
	                			return (value*100).toFixed(2)+'%';

	                		}
	            		});
            		}else{
            			columns.push({
	                		field: data+"2",
	                		title: data+"环比",
	                		class:"chainUpAndDow thhidden",
	                		sortable: true,
	                		formatter:(value,row,i)=>{
	                			return (value*100).toFixed(2)+'%';
	                		}
	            		});
            		}
				});
				
				 
				let datas=[]
				let indexrows=[];
				tabledata.indexCategories.map((data,k)=>{

					let row = {};
					row['ct']=data.categoryName;
					data.data.map((data,y)=>{
						let t=tabledata.times[y];//获取当前是第几月
							if(data){
								if(unitArr[y]=="亿元"){
									row[t+'0']=data.indexValue ? (data.indexValue.toFixed(2) + "亿元") : '';
								}else if(unitArr[y]=="万元"){
									row[t+'0']=data.indexValue ? ((data.indexValue*10000).toFixed(2) + "万元") : '';
								}else if(unitArr[y]=="元"){
									row[t+'0']=data.indexValue ? ((data.indexValue*100000000).toFixed(2) + "元") : '';
								}else{
									row[t+'0']=data.indexValue ? (data.indexValue).toFixed(2) : '' ;
								}
							}
					
							row[t+'1']=data.yearOnYear;
							row[t+'2']=data.chainUpAndDow;
					});
					datas.push(row);
				});
				 
				 
				this.setState({
            		status: true
            	},()=>{
            		this.acfun(columns,datas);
            	});
            	
            } else {
            	this.istradeMap = false;
            	this.setState({
            		status: false
            	});
            }
        });
	
	}
	acfun(c,data){
		let $table = $('#indicTable');
		 if($table){
		 	//销毁之前的表格重新渲染一个
		 	 $table.bootstrapTable('destroy').bootstrapTable({
	            columns: c,
	            data: data,
	            onSort:(name,order)=>{
	            	setTimeout(()=>{
	            		if(this.props.checkinputState().a){
	            		$(".yearOnYear").removeClass('thhidden');
		            	} else{
		            		$(".yearOnYear").addClass('thhidden');
		            	}
		            	if(this.props.checkinputState().b){
		            		$(".chainUpAndDow").removeClass('thhidden');
		            	} else{
		            		$(".chainUpAndDow").addClass('thhidden');
		            	}
	            	},200);
	            }
	        }) 
		 }
	}
	render(){

		if ( this.istradeMap == false ) {
			return (
				<div className="indicator-nodata">
					<img src="../../images/exponent-pay/no-data.png" alt=""/>
				</div>
			)
		}
		return(
			<div className="indicatorTable">
				<div className="indicator-content">
					<table className="indicTable indictable" id="indicTable" >
					
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
		this.inputstate={a:false
			,b:false}
	}
	onChangFun(e){
		 if (e.target.checked) {

            	if(e.target.id == "checkbox_a2"){
            		this.inputstate.a=true;
            		$(".yearOnYear").removeClass('thhidden');
            	}else{
            		this.inputstate.b=true;
            		$(".chainUpAndDow").removeClass('thhidden');
            	}
                $(e.target).siblings(".choose-box").find("img").attr("src", "../../images/exponent-pay/check.png");
            } else{
            	if(e.target.id == "checkbox_a2"){
            		this.inputstate.a=false;
            		$(".yearOnYear").addClass('thhidden');
            	}else{
            		this.inputstate.b=false;
            		$(".chainUpAndDow").addClass('thhidden');
            	}
                $(e.target).siblings(".choose-box").find("img").attr("src", "../../images/exponent-pay/uncheck.png");
            }
	}
	checkinputState(){
		return this.inputstate;
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
								<input className=" choose-input"  onChange={this.onChangFun.bind(this)} id="checkbox_a2" name="" type="checkbox" value="" />
								<div className="choose-box" >
						            <img src="../../images/exponent-pay/uncheck.png"/>
						        </div>
								<label for="checkbox_a2">显示同比 </label>
							</label> 
							<label>
								<input className=" choose-input"  onChange={this.onChangFun.bind(this)} id="checkbox_a3" name="" type="checkbox" value="" />
								<div className="choose-box" >
						            <img src="../../images/exponent-pay/uncheck.png"/>
						        </div>
								<label for="checkbox_a3">显示环比 </label>
							</label> 
						</form> 
					</div>
					<div className="Indic-header-expl">
						<img onClick={this.getExplain} src="../../images/exponent-pay/expl.jpg" alt=""/>
					</div>
				</div>
				<IndicatorTableComponent checkinputState={this.checkinputState.bind(this)} timeId={this.props.timeId} areaId={this.props.areaId} tradeId={this.props.tradeId} IndicId={this.props.IndicId}/>
			</div>
		)
	}
}

module.exports = ContainerIndicatorModule1