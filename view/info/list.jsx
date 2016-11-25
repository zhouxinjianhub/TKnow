
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
		this.head = [];

	}
	title(data){
		let title = data[0] ? data[0] : []
		this.head = title.tagName ? title.tagName : "全部资讯";
	}
	render(){
		this.title(this.props.data);
		return(
			<div className="titlebar">
				<p><span>「</span><span>{this.head}</span><span>」</span>&nbsp;<label>相关的文章</label></p>
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
	render(){
		// 渲染列表数据
		let listArray = this.props.data ? this.props.data : [];
		return(
			<div className="left">
				<ul>
					{this.dom}
					{
		        		listArray.map((data,k) => {
					        return	<li>
										<Link className="inlinea" to={{ pathname: "/info/detail"}} >
											<div >
												<img src={data?data.picUrl : ''} alt=""/>
												<div>
													<p className="title">{data? data.title : ""}</p>
													<p>{data? data.summary : ''}</p>
													<p className="time"><label htmlFor="">{data? data.created : ""}</label></p>
												</div>
											</div>
										</Link>
										<hr/>
									</li>
			        	})
			        }
				</ul>
				<div className="buttom">
					<input  onClick={this.props.getMoredata} type="submit"  value="+加载更多"></input>
				</div>
      		</div>
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
		// this.totalPage =[];
		this.arr = [true,false,false];
		// this.tabList = [];
	}
    state = {
		data: []
	};
	componentDidMount() {
		const that = this;
		that._getTabDatas();
		require.ensure([], require => {
			// require ("./css/tab.css");
			require('./js/tab.js');
		}, 'list')
	}
	_getTabDatas(type) {//加载tab选项卡数据方法
        const that = this;
        let setData = {
            dataType:'json',
            type:type ? type : 0,
            needAll:true
        };
        $.GetAjax($.httpxhr+'/api/v1/information/getTopList', setData, 'GET', true, function(data , state) {
        // $.GetAjax('/view/info/data/getAreaScale.json', setData,'GET', true, function(data ,state) {
           if (state && data.code == 1) {
                that.setState({
                    data:data
                });
            } else if(!state) {
                 setTimeout(function() {//数据没有请求成功，就一直请求
                    that._getTabDatas();
                    console.log('主人，刚才服务器出了一下小差');
                }, 2000);
            }
        });
    }
    checkData(type){
    	const that = this;
		if(that.arr[type] == false){
			that.arr[type] = true;
			that._getTabDatas(type);
		}else{
			return false;
		}
    }
	render() {
		const that = this;
		let render= this.state.data;
		let renderObj = render.data;
		let index = 0;
		let li = [];
		let tabList = [];
		for ( let i in renderObj ){
			index++;
			if(index<10){
				index = "0"+index;
			}
			li.push(<li>
		            	<Link to={{ pathname: "/info/detail"}} >
							<label>-{index}-</label>
							<p>{ renderObj[i].title }</p>
						</Link>
					</li>)
			tabList.push(<div className="tabList"><ul>{ li }</ul></div>);
		};
        return (
            <div className="ranking">
  				<div className="wrap" id="wrap">
  					<div className="header">
						<h3 className="title">排行榜</h3>
			            <ul className="tabClick"  >
			                <li onmousedown={this.checkData(0)} className="week active">周</li><span>|</span>
			                <li onmousedown={this.checkData(1)} className="mon">月</li><span>|</span>
			                <li onmousedown={this.checkData(2)} className="year">年</li>
			            </ul>
  					</div>
  					<hr className="wraphr"/>
		            <div className="lineBorder">
		                <div className="lineDiv">
		                </div>
		            </div>
		            <div className="tabCon">
		            	<div className="tabBox">
							{tabList}
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
	_getTypeData() {
        const that = this;
        let setData = {
            dataType:'json',
        };
        $.GetAjax($.httpxhr+'/api/v1/information/getCategory', setData, 'GET', true, function(data , state) {
        // $.GetAjax('/view/info/data/getAreaScale.json', setData,'GET', true, function(data ,state) {
           if (state && data.code == 1) {
                that.setState({
                    data:data
                });
            } else if(!state) {
                 setTimeout(function() {//数据没有请求成功，就一直请求
                    that._getTypeData();
                    console.log('主人，刚才服务器出了一下小差');
                }, 2000);
            } else {
                // $.noDataFunc();
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
  				{
					arr.map((data,k) => {
		        		return  <Link to={{ pathname: '/info/list' }} >
				        			<p>{data.name}</p>
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
	_getHottagData() {
        const that = this;
        let setData = {
            dataType:'json',
        };
        $.GetAjax($.httpxhr+'/api/v1/information/getHotTags', setData, 'GET', true, function(data , state) {
        // $.GetAjax('/view/info/data/getAreaScale.json', setData,'GET', true, function(data ,state) {
           if (state && data.code == 1) {
                that.setState({
                    data:data
                });
            } else if(!state) {
                 setTimeout(function() {//数据没有请求成功，就一直请求
                    that._getHottagData();
                    console.log('主人，刚才服务器出了一下小差');
                }, 2000);
            } else {
                // $.noDataFunc();
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
		        		return  <Link to={{ pathname: '/info/list' }} >
				        			<p>{data.name}</p>
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
		this.PageErs = 10; //每页总个数
        this.FetchNum = 5; //每次请求的总页数
        this.data = []; //设置初始data状态，填充空数据，避免报错问题
        this.arrayGroup = []; //拉取数据回来进行分组的转换数组
        this.nextPagerNum = 1; //当前请求的页数（现在按照每页50条数据拉取，分5组）
        this.totalPager = [];

	}
	state = {
		pageNum: 1, //当前用户所在页
		data: []
	};
    componentDidMount() {
		const that = this;
		that._getListDatas();
		
	}
    _getListDatas(nums, tagId, page) {
        const that = this;
        let session = sessionStorage.getItem('InfoList' + nums); //判断当前页是否有用户的缓存数据
        const PageErs = this.PageErs; //每页总个数
        const FetchNum = this.FetchNum;
        const pageSize = 50; //请求每页数据
        if (!session) {
        	let page = 1;
            let setData = {
            	"type":2,
                "page": page ? page : 1,
                "pageSize": pageSize,
                "tagId":tagId ? tagId : ''
            };
            $.GetAjax($.httpxhr+'/api/v1/information/page', setData, 'GET', true, function(data, state) {
            // $.GetAjax('/TJ-province/public/data/sumsAndList.json', setData, 'GET', true, function(data, state) {
                if (state && data.code == 1) {
                    var data = data.data;
                    // 进行数据组装
                    for (let i = 0; i < data.data.length / PageErs; i++) {
                        let attr = []; //该数组用于缓存当前页循环的数据信息（最多存15条数据），赋给缓存session
                        for (let k = i * PageErs; k < i * PageErs + PageErs; k++) {
                        	if(data.data[k]){
                    		 attr.push( data.data ? data.data[k] : '');
                    		}else{
                    			continue;
                    		}
                           
                        }
                        // 当前页赋值
                        that.arrayGroup[i + (page * FetchNum - FetchNum)] = attr;
                        // 缓存每一页和总页数
                        sessionStorage.setItem('InfoList' + (page * FetchNum - FetchNum + 1 + i), JSON.stringify(that.arrayGroup[i + (page * FetchNum - FetchNum)]));
                        sessionStorage.setItem('InfoTotalPager',Math.ceil(data.total/PageErs));

                        // 初始化数据渲染
                        if (i == 0 && page == 1) {
                            let pagedata = that.arrayGroup[i + (page * FetchNum - FetchNum)];
                            that.totalPage = Math.ceil(data.total/PageErs);
                            that.setState({
                            	data: pagedata,
                            	totalPager: that.totalPage,
                                status: true,
                            });

                        }

                    }

                } else if (!state) {
                    setTimeout(function() {
                        that._getListDatas(nums, tagId, page);
                        console.log('主人，刚才服务器出了一下小差');
                    }, 2000);
                } else {
                    // $.noDataFunc();
                }
            });
        } else {

            // 用缓存数据更新view达到高效的用户体验
            session = JSON.parse(session); //将字符串转化为数组数据
            that.totalPage = Math.ceil(sessionStorage.getItem('InfoTotalPager'));
            that.setState({
            	data: session,
            	totalPager: that.totalPage,
                status: true,
            });
        }
    }
    getMoredata(event ,totalPager){
    	console.log(totalPager);
    	// console.log(11);
    	// console.log(this.state.totalPager);
		// event.preventDefault();
        totalPager = totalPager ? totalPager : 1; //总页数

        if (this.state.pageNum >= totalPager) { //超过总页数退出
            return false;
        } else {
            this.state.pageNum++; //每次点击加载更多数据进行累计
            //判断是否发送请求数据，如果即将加载的数据是缓存最后一页，则去请求数据
            if (this.state.pageNum == this.nextPagerNum * this.FetchNum - 5) { 
                // 判断缓存中是否存在该数据，如果没有则添加上
                sessionStorage.getItem('InfoList' + (this.nextPagerNum * this.FetchNum + 1)) ? '' : this._getListDatas(this.nextPagerNum * this.FetchNum + 1, this.nextPagerNum + 1);
                this.nextPagerNum++;
            }
            // 当前页数数据
            this._getListDatas(this.state.pageNum );
            // $.cookie('PAGE',this.state.pageNum);
        }
    }
    check(){
		pageType = this.props.parent.params.pagetype ? this.props.parent.params.pagetype : "info";
	}
	render() {
		this.check();
		// console.log(this.state.totalPager);
		return (
			<div className="information">

				{(() => {
					if(pageType=="info"){
						return false;
					}else{
						return <TitlebarComponent data={this.state.data ? this.state.data : []} getDatas={this._getListDatas} />;
					}
				})()}
				
				<div className="top">
					<div className="topL"></div>
					<img src="../../../images/info/2.png" alt=""/>
					<div className="topR"></div>
				</div>
				<div className="content">

					<ListComponent getMoredata = {this.getMoredata(event,this.state.totalPager)} data={this.state.data ? this.state.data : []}/>

		      		<div className="right">

		      			<RankingComponent/>
		      			<TypeComponent/>
		      			<PopularComponent/>
		      			
		      		</div>
				</div>
	      		<div className="bottom">
					<div className="topL"></div>
					<img src="../../../images/info/1.png" alt=""/>
					<div className="topR"></div>
	      		</div>
			</div>
		)
	}
}

module.exports = ContainerList

// class aaa extends React.Component {
// 	constructor(props) {
// 		super(props);
// 	}
// 	componentDidMount() {
// 		console.log(this.props);
// 	}
// 	render() {
// 		return (<div onClick={this.props.bbb}>About</div>)
// 	}
// }

// module.exports = aaa
