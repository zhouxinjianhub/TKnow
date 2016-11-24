
import React from 'react';
import { Link, hashHistory } from 'react-router';
// import List from './list.jsx' // 资讯分类
/**
 * @name  TitlebarComponent 标题组件
 */
class TitlebarComponent extends React.Component{
	render(){
		return(
			<div className="titlebar">
				<p><span>「</span><span>旅游</span><span>」</span>&nbsp;<label>相关的文章</label></p>
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
		console.log(listArray);
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
					<input type="submit"  value="+加载更多"></input>
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
		this.totalPage = 0;
	}
    state = {
		data: []
	};
	componentDidMount() {
		var that = this;
		that._getDatas();
		require.ensure([], require => {
			require ("./css/tab.css");
			require('./js/tab.js');
		}, 'list')
	}
	_getDatas() {//加载tab选项卡数据方法
        const that = this;
        let setData = {
            // "areaId": areaId ? areaId : '',
            // dataType:'json',
            type:1,
            needAll:true
        };
        $.GetAjax('http://192.168.1.221:8888/api/v1/information/getTopList', setData, 'GET', true, function(data , state) {
        // $.GetAjax('/view/info/data/getAreaScale.json', setData,'GET', true, function(data ,state) {
            // data:data
           if (state && data.code == 1) {
                that.setState({
                    data:data
                });
            } else if(!state) {
                 setTimeout(function() {//数据没有请求成功，就一直请求
                    that._getDatas();
                    console.log('主人，刚才服务器出了一下小差');
                }, 2000);
            } else {
                // $.noDataFunc();
            }
        });
    }
	render() {
        return (
            <div className="ranking">
  				<div className="wrap" id="wrap">
  					<div className="header">
						<h3 className="title">排行榜</h3>
			            <ul className="tabClick">
			                <li className="week active">周</li><span>|</span>
			                <li className="mon">月</li><span>|</span>
			                <li className="year">年</li>
			            </ul>
  					</div>
  					<hr className="wraphr"/>
		            <div className="lineBorder">
		                <div className="lineDiv">
		                </div>
		            </div>
		            <div className="tabCon">
		            	<TabListComponent  data={this.state.data ? this.state.data : []} getDatas={this._getDatas} />
		            </div>
		        </div>
	        </div>
        )
    }
}

class TabListComponent extends React.Component{
	state = {
		data: []
	};
    constructor(props) {
		super(props);
		this.listData = props;
	}
    componentWillReceiveProps(nextProps){//在组件接收到一个新的prop时被调用
       this.listData = nextProps ? nextProps : '';
        // console.log("1");
        // console.log( this.listData);
        // if(!data.length>0||state.ready){
        //     return false;
        // }
    }
	render(){
		return(
			<div className="tabBox">
                <div className="tabList">
                	<ul>
                		<li>-<label>01</label>-人工智能应用内容内容</li>
                		<li>-<label>01</label>-人工智能应用内容内容</li>
                		<li>-<label>01</label>-人工智能应用内容内容</li>
                	</ul>
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
		var that = this;
		that._getTypeData();
	}
	_getTypeData() {
        const that = this;
        let setData = {
            dataType:'json',
        };
        $.GetAjax('http://192.168.1.221:8888/api/v1/information/getCategory', setData, 'GET', true, function(data , state) {
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
		var that = this;
		that._getHottagData();
	}
	_getHottagData() {
        const that = this;
        let setData = {
            dataType:'json',
        };
        $.GetAjax('http://192.168.1.221:8888/api/v1/information/getHotTags', setData, 'GET', true, function(data , state) {
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
        this.FetchNum = 10; //每页总个数，每次请求的总页数
        this.data = []; //设置初始data状态，填充空数据，避免报错问题
        this.arrayGroup = []; //拉取数据回来进行分组的转换数组
	}
	state = {
		data: []
	};
    componentDidMount() {
		var that = this;
		that._getListDatas();
	}
    _getListDatas(nums, tagId, page) {
        const that = this;
        let session = sessionStorage.getItem('InfoList' + nums); //判断当前类型是否有用户的缓存数据
        const PageErs = this.PageErs; //每页总个数
        const FetchNum = this.FetchNum;
        const pageSize = 100; //请求每页数据
        if (!session) {
        	let page = 1;
            let setData = {
            	"type":2,
                "page": page ? page : 1,
                "pageSize": pageSize,
                "tagId":tagId ? tagId : ''
            };
            console.log(page);
            $.GetAjax('http://192.168.1.221:8888/api/v1/information/page', setData, 'GET', true, function(data, state) {
            // $.GetAjax('/TJ-province/public/data/sumsAndList.json', setData, 'GET', true, function(data, state) {
                if (state && data.code == 1) {
                    var data = data.data;
                    // 进行数据组装
                    for (let i = 0; i < data.data.length / PageErs; i++) {
                        let attr = []; //该数组用于缓存当前页循环的数据信息（最多存15条数据），赋给缓存session
                        for (let k = i * PageErs; k < i * PageErs + PageErs; k++) {
                        	console.log(data.data[k]);
                            attr.push( data.data ? data.data[k] : '');
                        }
                        // 当前页赋值
                        that.arrayGroup[i + (page * FetchNum - FetchNum)] = attr;
                        // 缓存每一页和总页数
                        sessionStorage.setItem('InfoList' + (page * FetchNum - FetchNum + 1 + i), JSON.stringify(that.arrayGroup[i + (page * FetchNum - FetchNum)]));
                        // 初始化数据渲染
                        if (i == 0 && page == 1) {
                            let pagedata = that.arrayGroup[i + (page * FetchNum - FetchNum)];
                            that.setState({
                            	data: pagedata,
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
                    $.noDataFunc();
                }
            });
        } else {

            // 用缓存数据更新view达到高效的用户体验
            session = JSON.parse(session); //将字符串转化为数组数据
            that.setState({
            	data: session,
                status: true,
            });
        }
    }
	render() {
		// console.log(this.state.data);
		return (
			<div className="information">
				<TitlebarComponent data={this.state.data ? this.state.data : []} getDatas={this._getListDatas} />
				<div className="top">
					<div className="topL"></div>
					<img src="../../../images/info/2.png" alt=""/>
					<div className="topR"></div>
				</div>
				<div className="content">

					<ListComponent data={this.state.data ? this.state.data : []}/>

		      		<div className="right">

		      			<RankingComponent/>
		      			<TypeComponent/>
		      			<PopularComponent/>
		      			
		      		</div>
		      		<div class="clearfloat"></div>
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
