
import React from 'react';
import { Link ,hashHistory} from 'react-router';
import "./reportIndex.less";


/**
 * 列表的数据适配器
 */
class ListAdapter extends React.Component{
        constructor(props) {
            super(props);
            

        }
        componentDidMount() {

        }
        jumpToDetil(data,event){
            // this.props.setDetailData(data);
            hashHistory.push('/exponent_pay/report/reportDetail?id='+data.id);
        }
        render() {
            let listData = this.props.data ? this.props.data : [];

            if(!listData||listData.length==0) {
                return (
                    <div className="report-nodata">
                        <img src="./images/exponent-pay/no-data.png" alt=""/>
                    </div>
                )
            }

            let pdfImg="./images/exponent-pay/pdf.png";
            let wordImg="./images/exponent-pay/word.png";
            let excelImg="./images/exponent-pay/excel.png";
            let pptImg="./images/exponent-pay/ppt.png";

            return (
                <div > 
                        {
                            listData.map((data,k) => {                            
                                            return  <div className="list-cell">
                                                        <img className="img-main" src={data.picUrl} onClick={this.jumpToDetil.bind(this,data)}/>
                                                        <div className="div-content">
                                                            <h1 className="title" onClick={this.jumpToDetil.bind(this,data)}>{data.name}</h1>
                                                            <p className="content" onClick={this.jumpToDetil.bind(this,data)}>{data.summary}</p>
                                                            <div className="div-download">
                                                                {(()=>{
                                                                    let downloadHtml = [];
                                                                    let downloadUrl= JSON.parse(data.url);
                                                                    
                                                                    if(downloadUrl){
                                                                        downloadHtml.push(<b>下载:</b>);

                                                                        if(downloadUrl.pdf){
                                                                            downloadHtml.push(<a href={downloadUrl.pdf} target="view_window"><img src={pdfImg} className="img-download" /></a>);
                                                                        }

                                                                        if(downloadUrl.word){
                                                                            downloadHtml.push(<a href={downloadUrl.word} target="view_window"><img src={wordImg} className="img-download" /></a>);
                                                                        }

                                                                        if(downloadUrl.excel){
                                                                            downloadHtml.push(<a href={downloadUrl.excel} target="view_window"><img src={excelImg} className="img-download" /></a>);
                                                                        }

                                                                        if(downloadUrl.ppt){
                                                                            downloadHtml.push(<a href={downloadUrl.ppt} target="view_window"><img src={pptImg} className="img-download" /></a>);
                                                                        }
                                                                    }
                                                                    return downloadHtml;
                                                                    
                                                                })()} 
                                                            </div>
                                                        </div>
                                                    </div> 
                                        })
                        }
                </div>
            )
        }

    }
/**
 * TabComponent  可以滑动的四级数据切换组件
 */
class TabComponent extends React.Component{
	constructor(props) {
		super(props);
        //数据
        this.state = {       
                    dataMonth:[],
                    dataQuarter:[],
                    dataHalfYear:[],
                    dataYear:[]
                };
        //每夜数量
        this.pageSize=3;
        //请求第几页
        this.pageMonth=1;
        this.pageQuarter=1;
        this.pageHalfYear=1;
        this.pageYear=1;
        //请求类型
        this.typeMonth=14;
        this.typeQuarter=13
        this.typeHalfYear=12;
        this.typeYear=11;
        this.typeNow=this.typeMonth;

	}

	componentDidMount() {
		//初始化动画	    	
	    this.initAnimation();
        //默认加载月度数据
        this.loadListData(this.typeMonth,this.pageMonth ,this.pageSize);       
   
	}
    /**
     * initAnimation 初始化tab导航以及动画
     */
	initAnimation(){
        self=this;
		var init={
		        translate:function(obj,windowWidth,star){
		            obj.style.webkitTransform='translate3d('+-star*windowWidth+'px,0,0)';
		            obj.style.transform='translate3d('+-star*windowWidth+',0,0)px';
		            obj.style.webkitTransition='all 0.3s ease-in-out';
		            obj.style.transition='all 0.3s ease-in-out';
		        },
		        touchs:function(obj,windowWidth,tar,distance,endX){
		            obj.style.webkitTransform='translate3d('+(distance+endX)+'px,0,0)';
		            obj.style.transform='translate3d('+(distance+endX)+',0,0)px';
		        },
		        lineAnme:function(obj,stance){
		            obj.style.webkitTransform='translate3d('+stance+'px,0,0)';
		            obj.style.transform='translate3d('+stance+'px,0,0)';
		            obj.style.webkitTransition='all 0.1s ease-in-out';
		            obj.style.transition='all 0.1s ease-in-out';
		        },
		        back:function(obj,windowWidth,tar,distance,endX,time){
		            obj.style.webkitTransform='translate3d('+(distance+endX)+'px,0,0)';
		            obj.style.transform='translate3d('+(distance+endX)+',0,0)px';
		            obj.style.webkitTransition='all '+time+'s ease-in-out';
		            obj.style.transition='all '+time+'s ease-in-out';
		        }
	    	};
		var windowWidth = document.getElementById('wrap').clientWidth; //window 宽度;
		var wrap = document.getElementById('wrap');
        var tabClick = wrap.querySelectorAll('.tabClick')[0];
        var tabLi = tabClick.getElementsByTagName('li');
        
        var tabBox =  wrap.querySelectorAll('.tabBox')[0];
        var tabList = tabBox.querySelectorAll('.tabList');
        
        var lineBorder = wrap.querySelectorAll('.lineBorder')[0];
        var lineDiv = lineBorder.querySelectorAll('.lineDiv')[0];
        
        var tar = 0;
        var endX = 0;
        var dist = 0;
        
        tabBox.style.overflow='hidden';
        tabBox.style.position='relative';
        tabBox.style.width=windowWidth*tabList.length+"px";
        
        for(var i = 0 ;i<tabLi.length; i++ ){
              tabList[i].style.width=windowWidth+"px";
              tabList[i].style.float='left';
              tabList[i].style.float='left';
              tabList[i].style.padding='0';
              tabList[i].style.margin='0';
              tabList[i].style.verticalAlign='top';
              tabList[i].style.display='table-cell';
        }
        for(var i = 0 ;i<tabLi.length; i++ ){
            tabLi[i].start = i;
            tabLi[i].onclick = function(){
                var star = this.start;
                self.firstLoadData(star);
                for(var i = 0 ;i<tabLi.length; i++ ){
                    tabLi[i].className='';
                };
                tabLi[star].className='active';
                init.lineAnme(lineDiv,windowWidth/tabLi.length*star)
                init.translate(tabBox,windowWidth,star);
                endX= -star*windowWidth;
                
            }
        }
        
        function OnTab(star){
            if(star<0){
                star=0;
            }else if(star>=tabLi.length){
                star=tabLi.length-1
            }
            for(var i = 0 ;i<tabLi.length; i++ ){
                tabLi[i].className='';
            };
            
             tabLi[star].className='active';
            init.translate(tabBox,windowWidth,star);
            endX= -star*windowWidth;
        };
        
        tabBox.addEventListener('touchstart',chstart,false);
        tabBox.addEventListener('touchmove',chmove,false);
        tabBox.addEventListener('touchend',chend,false);
        //按下
        function chstart(ev){
            ev.preventDefault;
            var touch = ev.touches[0];
            tar=touch.pageX;
            tabBox.style.webkitTransition='all 0s ease-in-out';
            tabBox.style.transition='all 0s ease-in-out';
        };
        //滑动
        function chmove(ev){
            var stars = wrap.querySelector('.active').start;
            ev.preventDefault;
            var touch = ev.touches[0];
            var distance = touch.pageX-tar;
            dist = distance;
            init.touchs(tabBox,windowWidth,tar,distance,endX);
            init.lineAnme(lineDiv,-dist/tabLi.length-endX/4);
        };
        //离开
        function chend(ev){
            var str= tabBox.style.transform;
            var strs = JSON.stringify(str.split(",",1));  
            endX = Number(strs.substr(14,strs.length-18)); 
            
            if(endX>0){
                init.back(tabBox,windowWidth,tar,0,0,0.3);
                endX=0
            }else if(endX<-windowWidth*tabList.length+windowWidth){
                endX=-windowWidth*tabList.length+windowWidth
                init.back(tabBox,windowWidth,tar,0,endX,0.3);
            }else if(dist<-windowWidth/3){
                 OnTab(tabClick.querySelector('.active').start+1);
                 init.back(tabBox,windowWidth,tar,0,endX,0.3);
            }else if(dist>windowWidth/3){
                 OnTab(tabClick.querySelector('.active').start-1);
            }else{
                 OnTab(tabClick.querySelector('.active').start);
            }
            var stars = wrap.querySelector('.active').start;
            init.lineAnme(lineDiv,stars*windowWidth/4);
            
        };
	}
    /**
     * 初次加载数据
     * @param  {[int]} i [序列：0 月；1 季度；2 半年；3 全年]
     * @return 
     */
    firstLoadData(i){
        switch (i) {
            case 0:
                this.typeNow=this.typeMonth;
                let oldDataMouth=this.state.dataMonth;

                if(oldDataMouth.length==0){

                    this.loadListData(this.typeMonth,this.pageMonth, this.pageSize);
                }
                break;
            case 1:
                this.typeNow=this.typeQuarter;
                let oldDataQuarter=this.state.dataQuarter;

                if(oldDataQuarter.length==0){

                    this.loadListData(this.typeQuarter,this.pageQuarter, this.pageSize);
                }
                break;
            case 2:
                this.typeNow=this.typeHalfYear;
                let oldDataHalfYear=this.state.dataHalfYear;

                if(oldDataHalfYear.length==0){

                     this.loadListData(this.typeHalfYear,this.pageHalfYear, this.pageSize);
                } 
                break;
            case 3:
                this.typeNow=this.typeYear;
                let oldDataYear=this.state.dataYear;

                if(oldDataYear.length==0){

                    this.loadListData(this.typeYear,this.pageYear, this.pageSize); 
                } 
                break;
            default:
                // statements_def
                break;
        }
    }
    /**
     * [加载列表数据]
     * @param  {[int]} type  [请求类型：11 全年;12 半年; 13 季度 ;14 月度]
     * @param  {[int]} page  [请求页数]
     * @param  {[int]} size  [请求数量]
     * @param  {[object]} event [事件]
     * @return 
     */
    loadListData(type,page,size,event){
        var button;

        if(event){
          button= event.target; 
        }else{
            switch (type) {
                case this.typeMonth:
                    button=this.refs.btnMonth;
                    break;
                case this.typeQuarter:
                    button=this.refs.btnQuarter;
                    break;
                case this.typeHalfYear:
                    button=this.refs.btnHalfYear;
                    break;
                case this.typeYear:
                    button=this.refs.btnYear;
                    break;
                default:
                     button=this.refs.btnMonth;
                    break;
            }
        }
        
        var self = this;
        let datas = {
                page:page,                 
                pageSize:size,
                type:type
            };
        layer.load();
        $.GetAjax('/v1/zhishu/inner/payDataReportPage', datas, 'GET', true, function(data , state) {                  
            layer.closeAll('loading');
            if (state && data.code == 1) { 
                let dataValue=data.data;
                if(dataValue){

                    if(page>=dataValue.totalPage){
                        self.dismissView(button);
                    }
                    self.addListData(type,dataValue.data,event);
                } else{
                    self.dismissView(button);
                }          
            } else {
                self.dismissView(button);
            }
        });

    }

    dismissView(view){
        if(view){
            view.style.display="none";
        }
         
    }

    showView(view){
                
    }

    /**
     * 添加新数据
     * @param {[int]} type  [请求类型：11 全年;12 半年; 13 季度 ;14 月度]
     * @param {[array]} data  [新增数据]
     * @param {[object]} event [事件]
     */
    addListData(type,data,event){
        if(!data||data.length==0){
            return ;
        }

        switch (type) {
            case this.typeMonth:
                    let oldDataMouth=this.state.dataMonth;
                    let tempDataMouth= oldDataMouth.concat(data);
                    
                    this.setState({dataMonth: tempDataMouth});                   
                    this.pageMonth++;
                    
                break;
            case this.typeQuarter:
                    let oldDataQuarter=this.state.dataQuarter;
                    let tempDataQuarter= oldDataQuarter.concat(data);
                    
                    this.setState({dataQuarter: tempDataQuarter}); 
                    this.pageQuarter++;
                break;
            case this.typeHalfYear:
                    let oldDataHalfYear=this.state.dataHalfYear;
                    let tempDataHalfYear= oldDataHalfYear.concat(data);
                    
                    this.setState({dataHalfYear: tempDataHalfYear}); 
                    this.pageHalfYear++;
                break;
            case this.typeYear:
                    let oldDataYear=this.state.dataYear;
                    let tempDataYear= oldDataYear.concat(data);

                    this.setState({dataYear: tempDataYear});
                    this.pageYear++; 
                break;
            default:
                // statements_def
                break;
        }      

    }

    /**
     * 获取更多的数据
     * @param  {[int]} type  [类型]
     * @param  {[object]} event [事件]
     * @return 
     */
    getMoreData(type,event){

        var page=1;
        switch (type) {
            case this.typeMonth:
                page=this.pageMonth;
                break;
            case this.typeQuarter:
                page=this.pageQuarter;
                break;
            case this.typeHalfYear:
                page=this.pageHalfYear;
                break;
            case this.typeYear:
                page=this.pageYear;
                break;
            default:
                page=-1;
                break;
        }
      
        this.loadListData(type,page,this.pageSize,event);

    }


	render() {

        let dataMonth = this.state.dataMonth ? this.state.dataMonth : [];
        let dataQuarter= this.state.dataQuarter ? this.state.dataQuarter : [];
        let dataHalfYear = this.state.dataHalfYear ? this.state.dataHalfYear : [];
        let dataYear = this.state.dataYear ? this.state.dataYear : [];
      
       
		return (
			<div className="wrap" id="wrap">
			    <ul className="tabClick">
			        <li className="active">月报</li>
			        <li>季度报</li>
			        <li>半年报</li>
			        <li>年报</li>
			    </ul>
			    <div className="lineBorder">
			        <div className="lineDiv"></div>
			    </div>
			    <div className="tabCon">
			        <div className="tabBox">
                        <div  className="tabList">
                            <ListAdapter data={dataMonth} setDetailData={this.props.setDetailData}/> 
                            <div className="div-bottom">
                                <button ref="btnMonth" className="btn-more" onClick={this.getMoreData.bind(this,this.typeMonth)}>+&nbsp;加载更多</button>
                            </div>
                        </div> 
                        <div  className="tabList">
                            <ListAdapter data={dataQuarter} setDetailData={this.props.setDetailData}/> 
                            <div className="div-bottom">
                                <button ref="btnQuarter" className="btn-more" onClick={this.getMoreData.bind(this,this.typeQuarter)}>+&nbsp;加载更多</button>
                            </div>
                        </div>  
                        <div  className="tabList">
                            <ListAdapter data={dataHalfYear} setDetailData={this.props.setDetailData}/> 
                            <div className="div-bottom">
                                <button ref="btnHalfYear" className="btn-more" onClick={this.getMoreData.bind(this,this.typeHalfYear)}>+&nbsp;加载更多</button>
                            </div>
                        </div>  
                        <div  className="tabList">
                            <ListAdapter data={dataYear} setDetailData={this.props.setDetailData}/> 
                             <div className="div-bottom">
                                <button ref="btnYear"  className="btn-more" onClick={this.getMoreData.bind(this,this.typeYear)}>+&nbsp;加载更多</button>
                             </div>
                        </div>                            
                                              
			           
			        </div>
			    </div>
			</div>
		)
	}

}

class ContainerReportIndex extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {

	}
    
	render() {
		return (
			<div className="pay-report">
			   <TabComponent setDetailData={this.props.setDetailData}/>
			</div>
		)
	}
}

module.exports = ContainerReportIndex