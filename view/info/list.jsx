
import React from 'react';
import { Link, hashHistory } from 'react-router';

let pageType;
let result;//决定加载的模块
/**
 * @name  TitlebarComponent 标题组件
 */
class TitlebarComponent extends React.Component{
	constructor(props) {
		super(props);
	}
	render(){
		let title = this.props.data ? this.props.data.name : '全部资讯';
		if(title == undefined){
			title = "全部资讯";
		}
		return(
			<div className="titlebar">
				<p><span>「</span><span>{title}</span><span>」</span>&nbsp;<label>相关的文章</label></p>
			</div>
		)
	}
}
/**
 * @name  ListComponent 列表组件
 */
class ListComponent extends React.Component{
	constructor(props) {
		super(props);
	}
	getTime(time){

		// 将时间戳(以毫秒为单位)换成时间格式字符串
	    Date.prototype.Format = function (fmt) { //author: meizz 
	        let o = {
	            "M+": this.getMonth() + 1, //月份 
	            "d+": this.getDate(), //日 
	            "H+": this.getHours(), //小时 
	            "m+": this.getMinutes(), //分 
	            "s+": this.getSeconds(), //秒 
	            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	            "S": this.getMilliseconds() //毫秒 
	        };
	        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	        for (let k in o)
	        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	        return fmt;
	    }
	
		let dateTimeJsonStr = time; // C# DateTime类型转换的Json格式
	    dateTimeJsonStr = Date.now();
	    let msecStr = dateTimeJsonStr.toString().replace(/\/Date\(([-]?\d+)\)\//gi, "$1"); // => '1419492640000' ：通过正则替换，获取毫秒字符串
	    let msesInt = Number.parseInt(msecStr); // 毫秒字符串转换成数值
	    let dt = new Date(msesInt); // 初始化Date对象
		return dt.Format('yyyy-MM-dd');
	}
	render(){
		// 渲染列表数据
		let listArray = this.props.data ? this.props.data : [];
		return(
				<ul>
					 
					{
		        		listArray.map((data,k) => {
					        return	<li>
										<Link className="inlinea" to={{ pathname: "/info/detail",query:{id:data.id} }} >
											<div >
												<img src={data?data.picUrl : ''} alt=""/>
												<div>
													<p className="title">{data? data.title : ""}</p>
													<p className="summary">{data? data.summary : ''}</p>
													<p className="time"><label htmlFor="">{data? this.getTime(data.created) : ""}</label></p>
												</div>
											</div>
										</Link>
										<hr/>
									</li>
			        	})
			        }
				</ul>
			
		)
	}
}

/**
 * @name RankingComponent tab选项卡组件
 */
class RankingComponent extends React.Component{
	constructor(props) {
		super(props);
		this.arrayGroup = []; //拉取数据回来进行分组的转换数组
	}
    state = {
		data: []
	};
	componentDidMount() {
		const that = this;
		that._getTabDatas();
	}
	_getTabDatas(type) {//加载tab选项卡数据方法
        const that = this;
        let setData = {
            dataType:'json',
            type:type ? type : 0,
            "page": 1,
            "pageSize": 10,
        };

        $(".tabList").removeClass("tabList-active");

        $.GetAjax('/v1/information/getTopList', setData, 'GET', true, function(data , state) {
        // $.GetAjax('http://192.168.1.101:8090/view/info/data/getTopList.json', setData,'GET', true, function(data ,state) {
            if (state && data.code == 1) {
                that.setState({
                    data:data
                });
		    	$(".tabList").addClass("tabList-active");
            }else{
            	that.setState({
                    data: []
                });
            }
        });
    }
    clickFun(e){
    	this._getTabDatas(e);
    	$(".tabClick li").removeClass('active');
    	$("#type"+e).addClass('active');
    }
	render() {
		const that = this;
		let datas= this.state.data.data?this.state.data.data:[];
	
        return (
            <div className="ranking">
  				<div className="wrap" id="wrap">
  					<div className="header">
						<h3 className="title">排行榜</h3>
			            <ul className="tabClick"  >
			                <li id='type0' onClick={this.clickFun.bind(this,0) }  className="week active">周</li><span>|</span>
			                <li id='type1' onClick={this.clickFun.bind(this,1) }  className="mon">月</li><span>|</span>
			                <li id='type2' onClick={this.clickFun.bind(this,2) }  className="year">年</li>
			            </ul>
  					</div>
  					<hr className="wraphr"/>
		            <div className="lineBorder">
		                <div className="lineDiv">
		                </div>
		            </div>
		            <div className="tabCon">
		            	<div className="tabBox">
		            	<div className="tabList">
		            	<ul>
		            	{
		            		datas.map((data,i)=>{
		            			i=i+1;
		            			if(i<10){
		            				i="0"+i;
		            			}
		            			if(i>10){
		            				return false;
		            			}
		            			return <li>
		            				<Link to={{ pathname: "/info/detail",query:{id:data.id}}} >
										<label className={"label"+i}>-{i}-</label>
										<p>{ data.title }</p>
									</Link>
							     	</li>
						        })
						}
						</ul>
						</div>
				        </div>
		            </div>
		        </div>
	        </div>
        )
    }
}

/**
 * @name TypeComponent 分类标签组件
 */
class TypeComponent extends React.Component{
	constructor(props) {
		super(props);
	}
    state = {
		data: []
	};
	componentDidMount() {
		const that = this;
		that._getTypeData();
	}
	readySome(e){
		var data={type:2,id:e.id,name:e.name};
		this.props.rkn(data);
	}
	_getTypeData() {
        const that = this;
        let setData = {
            dataType:'json',
        };
        $.GetAjax('/v1/information/getCategory', setData, 'GET', true, function(data , state) {
        // $.GetAjax('http://192.168.1.101:8090/view/info/data/getCategory.json', setData,'GET', true, function(data ,state) {
           if (state && data.code == 1) {
                that.setState({
                    data:data
                });
            } else{
            	that.setState({
                    data: []
                });
            }
        });
    }
	render(){
		let typedata = this.state.data["data"] ? this.state.data["data"] :'';
		let arr = Object.keys(typedata).map(key=> typedata[key]);

		return(
			<div className="type" role="nav">
  				<h3 className="title">分类</h3>
  				<hr/>
  				<a href="#/info/list?categoryId">
  					<button onClick={this.readySome.bind(this)}>
  						<p>全部资讯</p>
  					</button>
  				</a>
  				{
					arr.map((data,k) => {
						let e = {
							"name":data.name,
							"id":data.id
						}
						return  <Link to={{ pathname: '/info/list?categoryId'}} >
		        		     		<button  onClick={this.readySome.bind(this,e)} >
					        			<p>{data.name}</p>
					        		</button>
				        		</Link>
		        	})
				}
  			</div>
		)
	}
}

/**
 * @name TypeComponent 热门标签组件
 */
class PopularComponent extends React.Component{
	constructor(props) {
		super(props);
	}
    state = {
		data: []
	};
	componentDidMount() {
		const that = this;
		that._getHottagData();
	}
	readySome(e){
		var data={type:1,id:e.id,name:e.name};
		this.props.rkn(data);
	}
	_getHottagData() {
        const that = this;
        let setData = {
            dataType:'json',
        };
        $.GetAjax('/v1/information/getHotTags', setData, 'GET', true, function(data , state) {
        // $.GetAjax('http://192.168.1.101:8090/view/info/data/getHotTags.json', setData,'GET', true, function(data ,state) {
           if (state && data.code == 1) {
           	
                that.setState({
                    data:data
                });
            } else{
            	that.setState({
                    data: []
                });
            }
        });
    }
	render(){
		let typedata = this.state.data["data"] ? this.state.data["data"] :'';
		let arr = Object.keys(typedata).map(key=> typedata[key]);
		return(
			<div className="Popular">
				<h3 className="title">热门标签</h3>
				<hr/>

				{
					arr.map((data,k) => {
						let e = {
							"name":data.name,
							"id":data.id
						}
		        		return  <Link to={{ pathname: '/info/list?tagId'}} >
		        		     		<button  onClick={this.readySome.bind(this,e)} >
					        			<p>{data.name}</p>
					        		</button>
				        		</Link>
		        	})
				}

  			</div>
		)
	}
}
class ContainerList extends React.Component {
	constructor(props) {
		super(props);
        // this.data = []; //设置初始data状态，填充空数据，避免报错问题
        this.totalPage = 1;
        this.page = 0;
        this.Somes=[];
        this.tagId=[];//如果类型为分类，就加上tagId
        this.categoryId=[];//如果类型为热门标签，就加上categoryId
        this.title = [];
	}
	state = {
		data:[],
		status: false //当前组件的状态，当为true时更新组件
	};
    componentDidMount() {
		const that = this;
		that._getListDatas();
	}
    getMoredatas(data){
		$(".buttom button").css("display","block");
    	this._getListDatas(data);
    }
    check(){
		pageType = this.props.parent.params.pagetype ? this.props.parent.params.pagetype : "info";
	}
    _getListDatas(data) {
        const that = this;
        that.page++;
        var setData = {
        	"type":2,
            "page": that.page,
            "pageSize": 10,
            "tagId":that.tagId?that.tagId : '',
            "categoryId":that.categoryId? that.categoryId : '' ,
        };
        if(data){
        	if(data.type){
        		if(data.type==1){//如果类型为分类，就加上tagId
        			//设置本次请求数据参数
        			setData["tagId"]=data.id;
        			setData["categoryId"] = '';
        			setData["page"] = 1;
        			//对参数进行重置，加载更多数据时使用新设置的参数值
					that.Somes=[];
        			that.tagId = data.id;
        			that.categoryId = '';
        			that.page = 1;
        			that.title = data;
        			
        		}else if(data.type==2){//如果类型为热门标签，就加上categoryId
        			//设置本次请求数据参数
					setData["categoryId"]=data.id;
					setData["tagId"] = '';
					setData["page"] = 1;
					//对参数进行重置，加载更多数据时使用新设置的参数值
					that.categoryId = data.id;
					that.Somes=[];
					that.tagId = '';
					that.page = 1;
					that.title = data;
        		}
        	}
        }
        
        $.GetAjax('/v1/information/page', setData, 'GET', true, function(data, state) {
        // $.GetAjax('http://192.168.1.101:8090/view/info/data/page.json', setData, 'GET', true, function(data, state) {
            if (state && data.code == 1) {
            	let totalPage = data.data.totalPage;
            	if(that.page == totalPage || that.page > totalPage ){
            		$(".buttom button").css("display","none");
            	}
               that.Somes.push(data.data.data);
               that.setState({
	               	data:that.Somes,
	               	status:true
               });
            } else{
            	that.setState({
                    data: []
                });
            }
        });
    }
	render() {
		let some1=this.state.data?this.state.data:[];
		this.check();
		return (
			<div className="con">
			<div className="information">

				{(() => {
					if(pageType=="info"){
						return false;
					}else{
						return <TitlebarComponent data={this.title}  />;
					}
				})()}
				
				<div className="top">
					<div className="topL"></div>
					<img src="../../../images/info/info-topBg.png" alt=""/>
					<div className="topR"></div>
				</div>
				<div className="content">
					<div className="left">
						 {
				        	some1.map((data1,k) => {
				        		 return <ListComponent    parent={this.props.parent} data={data1?  data1 : []}/>
					   			 })
				        }
			           <div className="buttom"  >
							<button onClick={this.getMoredatas.bind(this)} >+&nbsp;加载更多</button>
						</div>
					</div>
              

		      		<div className="right">
		      			<RankingComponent/>
		      			<TypeComponent rkn={this.getMoredatas.bind(this)}/>
		      			<PopularComponent rkn={this.getMoredatas.bind(this)}/>
		      			
		      		</div>
				</div>
	      		<div className="bottom">
					<div className="topL"></div>
					<img src="../../../images/info/info-bottomBg.png" alt=""/>
					<div className="topR"></div>
	      		</div>
			</div>
			</div>
		)
	}
}

module.exports = ContainerList


