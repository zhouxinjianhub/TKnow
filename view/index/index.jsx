
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import { Nologin, Islogin } from "loginState";

import './index.less';

class ContainerIndexLogo extends React.Component {
	render() {
		return (
			<div className="logo">
				<img src="../../images/logo.png" ref="logo"/>
			</div>
		)
	}
}

class ContainerIndex extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		for ( let i in this.refs) {
			let imgDom = ReactDOM.findDOMNode(this.refs[i]);
			let data_url = imgDom.getAttribute('data-url');
			if ( data_url ) {
				$.lazyloadImg(data_url, images => {
					setTimeout(()=>{
						imgDom.setAttribute('src',images.src);
					},1000);
				});
			} else if ( i == "logo" ) {
				imgDom.ondragstart = () => {
					return false;
				};
			}
		}
	}
	render() {
		let renderObj = [{
			server: {
				title: '数据服务',
				info: [{
					pathurl: '/regional',
					imgurl:'../../images/user.jpg',
					lazyurl: '../../images/index/diyu.png',
					name:'地域维度'
				},{
					pathurl: '/trade',
					imgurl:'../../images/user.jpg',
					lazyurl: '../../images/index/hangye.png',
					name:'行业维度'
				},{
					pathurl: '/info',
					imgurl:'../../images/user.jpg',
					lazyurl: '../../images/index/news.png',
					name:'数据资讯'
				}]
			},
			yczs: {
				title: '映潮产品',
				info: [{
					pathurl: '/',
					imgurl:'../../images/user.jpg',
					lazyurl: '../../images/index/yczs.png',
					name:'映潮指数'
				},{
					pathurl: '/',
					imgurl:'../../images/user.jpg',
					lazyurl: '../../images/index/tianji.png',
					name:'天玑'
				},{
					pathurl: '/',
					imgurl:'../../images/user.jpg',
					lazyurl: '../../images/index/app.png',
					name:'手机APP'
				}]
			}
		}];

        let [bodyHtml=[],childHtml=[]] = [];
        renderObj.map((data,k) => {
        	for ( let i in data ){
        		bodyHtml.push(<p className="list-title">{ data[i].title }</p>);
        		childHtml = [];
        		data[i].info.map((obj,key) => {
	                childHtml.push(<li><Link to = { obj.pathurl } >
										<div className="list-dv">
											<img src = { obj.imgurl } data-url = { obj.lazyurl } key = { i } ref = { 'lazy' + $.MathRand() }/>
										</div>
										<p>{ obj.name }</p>
									</Link></li>)
	            });
        		bodyHtml.push(<ul>{ childHtml }</ul>);
        	}
        });

		return (
			<div className="container-index">
				<div className="regist">
					{(() => {
						let userObj = $.userlogin();
						let result = userObj ? true : false;
						switch ( result ) {
							case true: return <Islogin userName={ userObj.userName }/>;
							default:   return <Nologin />;
						}
					})()}
				</div>
				<ContainerIndexLogo />
				<div className="list">{ bodyHtml }</div>
			</div>
		)
	}
}

module.exports = ContainerIndex