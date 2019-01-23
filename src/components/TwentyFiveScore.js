import React, { Component } from 'react';
import '../App.less';
import './TwentyFiveScore.less'
function creatDate(){
    var year =[];
    var month = [];
    var days= [];
    for(var i = 2018; i<=nowYear;i++){
        year.push(i);
    }
    for(var j = 1; j <=12; j++){
        month.push(j)
    }
    for(var x = 1; x <=31; x++){
        days.push(x)
    }
    return {
        year :year,
        month :month ,
        days :days
    }
}
var nowYear = new Date().getFullYear();
var nowMonth = new Date().getMonth()+1;
var nowDay = new Date().getDate();
var nowHour = new Date().getHours();
var dateResults = creatDate()
function formatDuring(countDown) {
    let h =parseInt(Number(countDown)/60/60);
    let m =parseInt(Number(countDown)/60%60);
    return `${h<=0?'00':(h<10?'0'+h:h)} : ${m<=0?'00':(m<10?'0'+m:m)}`
}
var timeArr =[]
// eslint-disable-next-line
var min = 3600;
var max = 3599;
for(var i = 0,j = 1;i<24;i++,j++){
    timeArr.push({'minTime':min*i,'maxTime':max*j})
}
class TwentyFiveScore extends Component {
    constructor(){
        super()
        this.state={
            results:{"next_time":"2019-01-10 02:17:00","next_num":"20190110-1714","latest_num":"61094","latest_time":"2019-01-10 02:16:30","next_second":18,"history":[{"num":"20190110-1713","openTime":"2019-01-10 02:16:30","result":"61094"},{"num":"20190110-1712","openTime":"2019-01-10 02:16:00","result":"36008"},{"num":"20190110-1711","openTime":"2019-01-10 02:15:30","result":"63388"},{"num":"20190110-1710","openTime":"2019-01-10 02:15:00","result":"65168"},{"num":"20190110-1709","openTime":"2019-01-10 02:14:30","result":"33852"},{"num":"20190110-1708","openTime":"2019-01-10 02:14:00","result":"53440"},{"num":"20190110-1707","openTime":"2019-01-10 02:13:30","result":"13070"},{"num":"20190110-1706","openTime":"2019-01-10 02:13:00","result":"88708"},{"num":"20190110-1705","openTime":"2019-01-10 02:12:30","result":"36951"},{"num":"20190110-1704","openTime":"2019-01-10 02:12:00","result":"09430"}]},
            selectYear:'',
            selectMonth:'',
            selectDay:'',
            selectTime:{}
        }
    }
    splitNumber(number){
        var str = number
        var arr =[]
        for(var i = 0;i<str.length;i++ ){
            arr.push(str.substring(i,i+1))
        }
        return arr;
    }
    componentDidMount(){
        this.setState({
            cutDown:this.state.results.next_second,
            selectYear:nowYear,
            selectMonth:nowMonth,
            selectDay:nowDay,
        })
        //定时器
        this.timer = setInterval(()=>{
            this.setState({
                cutDown:this.state.cutDown-1
            })
        },1000)
        const {results} = this.state;
        if(!results){
            return null;
        }
    }
    componentWillUpdate(a,b){
        // 年月日联动的判断
        // eslint-disable-next-line
        if(b.selectYear ==nowYear ){
            var month = []
            for(var i = 1; i <=nowMonth; i++){
                month.push(i)
            }
            dateResults.month = month;
            // eslint-disable-next-line
            if(b.selectMonth == nowMonth && b.selectDay == nowDay){
                timeArr=[]
                // eslint-disable-next-line
                for(var i = 0,j = 1;i<=nowHour;i++,j++){
                    timeArr.push({'minTime':min*i,'maxTime':max*j})
                }
            }else{
                timeArr=[]
                // eslint-disable-next-line
                for(var i = 0,j = 1;i<24;i++,j++){
                    timeArr.push({'minTime':min*i,'maxTime':max*j})
                }
            }
        }else{
            // eslint-disable-next-line
            var month = []
            // eslint-disable-next-line
            for(var j = 1; j <=12; j++){
                month.push(j)
            }
            dateResults.month=month
        }
        // eslint-disable-next-line
        if(b.selectMonth==nowMonth&&b.selectYear==nowYear){
            var days= []
            for(var x = 1; x <=nowDay; x++){
                days.push(x)
            }
            dateResults.days=days
        }else if (b.selectMonth=== '2'){
                //如果是闰年
            if((b.selectYear  % 4 === 0 && b.selectYear  % 100 !== 0)  || b.selectYear  % 400 === 0){
                days= []
                for(i = 1; i <=29; i++){
                    days.push(i)
                }
                dateResults.days=days
                //如果是平年
            }else{
                days= []
                for(i = 1; i <=28; i++){
                    days.push(i)
                }
                dateResults.days=days
            }
        }else if(b.selectMonth === '4' || b.selectMonth === '6' ||b.selectMonth === '9' ||b.selectMonth === '11'){
                days= []
                for(i = 1; i <=30; i++){
                    days.push(i)
                }
                dateResults.days=days
        }else{
            days= []
            for(i = 1; i <=31; i++){
                days.push(i)
            }
            dateResults.days=days
        }
        //关闭定时器
        // eslint-disable-next-line
        if(b.cutDown==0){
            clearInterval(this.timer)
        }
    }
    componentWillUnmount(){
        //关闭定时器
        clearInterval(this.timer)
        //避免异步请求结果未返回就切换页面报错
        this.setState = (state,callback)=>{
            return;
        };
    }
    getDate(){

    }
    render() {
        var {latest_time,latest_num,history} = this.state.results
        return (
        <div className="App">
            <header className="App-header">
                {/* eslint-disable-next-line  */}
                <h1 className='App-logo' style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/logo.png)"}} 
                    onClick={()=>{
                        window.location.hash="/"
                    }}
                ></h1>
                <div className="selectBox"
                     onMouseOver={()=>{
                        document.getElementById('jiantou').style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/arrow_Down2.png)"
                    }}
                    onMouseLeave={()=>{
                        document.getElementById('jiantou').style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/arrow_Down.png)"
                    }}
                >
                    <p>Monaco Chanceux5
                        <i id='jiantou' style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/arrow_Down.png)"}}>
                        </i>
                    </p>
                    <ul id="selectUl"> 
                        <li onClick={()=>{
                                window.location.hash="/Super10"
                            }}
                                // eslint-disable-next-line 
                            ><a href="javascript:;" selectid='li1'>Monaco Super10</a>
                        </li>
                    </ul> 
                </div>
                <div className='App-gongGao'>Ce site ne offrit que le service abonnement, ne fournit pas les services achetés.</div>
            </header>
            <div className='TwentyFiveScore-content' >
                <div className="TwentyFiveScore-banner-div">
                    <div className='TwentyFiveScore-banner' style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/banner.jpg)"}}>
                        
                    </div>
                </div>
                <div className="TwentyFiveScore-inner-content" >
                    <p className ="icon_title" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/LOGO5.png)"}}></p>  
                    <div className="content-sidebar">
                        <div className="sidebar-box1" 
                            onMouseOver={()=>{
                                document.getElementById('icon_right').style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/arrow_Right2.png)"
                            }}
                            onMouseLeave={()=>{
                                document.getElementById('icon_right').style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/arrow_Right.png)"
                            }}
                             onClick={()=>{
                                window.location.hash="/Super10"
                            }}
                        >
                            <i id='icon_right' style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/arrow_Right.png)"}}></i>
                            <span>À Monaco Super10</span>
                        </div>
                        <div className="sidebar-box2">
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/app-bg2.jpg)"}}></div>
                        </div>
                    </div>
                    <div className="content-content">
                        <div className='content-box1'>
                            <h2 className='content-box1-font'>Résultats des tirages</h2>
                            <div className='content-box1-box'>
                                <p className="box-row1">{latest_time}</p>
                                <div className="box-row2">
                                    <ul>
                                        {
                                            this.splitNumber(latest_num).map((item,index)=>{
                                                return  <li key={index} style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/ball.png)"}}><span>{item}</span></li> 
                                            }) 
                                        }
                                    </ul>
                                </div>
                                <div className="box-row3" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/subtle-bg-small.png)"}}>
                                    <span className='box-row3-span'>le prochain tirage</span>
                                    <div className='box-row3-div'>
                                        <span>Temps restant</span>
                                        <ul>
                                            <li>
                                                <span>00</span>
                                                <span>heures</span>
                                            </li>
                                            <li>
                                                <span>00</span>
                                                <span>mins</span>
                                            </li>
                                            <li>
                                                <span>{this.state.cutDown>=10?this.state.cutDown:'0'+this.state.cutDown}</span>
                                                <span>secs</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='content-box2'>
                            <h2 className="content-box2-font">Résultats des tirages précédents</h2>
                            <div className='content-box2-box'>
                                <span>Date:</span>
                                <select name="sel1" id="sel1" 
                                    onChange={(e)=>{
                                        this.setState({
                                            selectYear:e.target.value,
                                            selectMonth:1,
                                            selectDay:1
                                        })
                                    }}
                                    value={this.state.selectYear}
                                >
                                    {dateResults.year.map((item,index)=>{
                                        return <option key={index} value={item}>{item}</option>
                                    })}
                                </select>
                                <select name="sel2" id="sel2" 
                                    onChange={(e)=>{
                                        this.setState({
                                            selectMonth:e.target.value,
                                        })
                                        
                                    }}
                                    value={this.state.selectMonth}
                                >
                                    {dateResults.month.map((item,index)=>{
                                        return <option key={index} value={item}>{item}</option>
                                    })}
                                </select>
                                <select name="sel3" id="sel3" 
                                    onChange={(e)=>{
                                        this.setState({
                                            selectDay:e.target.value
                                        })
                                    }}
                                    value={this.state.selectDay}
                                >
                                    {dateResults.days.map((item,index)=>{
                                        return <option key={index} value={item}>{item}</option>
                                    })}
                                </select>
                                <span>Time:</span>
                                <select name="" id="selectYear" 
                                     onChange={(e)=>{
                                        this.setState({
                                            selectTime:e.target.value.split(",")
                                        })
                                    }}
                                >
                                    {
                                        timeArr.map((item,index)=>{
                                            return  <option key={index} value={item.minTime+','+item.maxTime}>{formatDuring(item.minTime) +'-'+formatDuring(item.maxTime)}</option>
                                        })
                                    }
                                </select>
                                <div 
                                    id="Rechercher" 
                                    onMouseDown={()=>{
                                        document.getElementById('Rechercher').style.transform='scale(0.9)'
                                    }}
                                    onMouseUp={()=>{
                                        document.getElementById('Rechercher').style.transform='scale(1)'
                                    }}
                                >Rechercher</div>
                            </div>
                        </div>
                        <div className="content-box3">
                            <p className="content-box3-title"><span>numéro du tirage</span><span>boules</span></p>
                            {
                                history.map((item,index)=>{
                                    return <div key={index} className="content-box3-list">
                                        <span>{item.num}</span>
                                        <div>
                                            <ul>
                                                {
                                                    this.splitNumber(item.result).map((item,index)=>{
                                                        return  <li key={index} style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/ball.png)"}}><span>{item}</span></li> 
                                                    }) 
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="content-sidebar-right">
                         <div className="sidebar-right-box1">
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/app-bg.jpg)"}}></div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="App-footer">
                <div>
                </div>
                <div>
                    <p  style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/logo.png)"}}
                        onClick={()=>{
                            window.location.hash="/"
                        }}
                    ></p>
                    <p >
                        Global Service Building<br/>
                        Adresse:52e rue<br/>
                        De 9 heures à 18 heures du matin de 9 heures à 18 heures.<br/>
                    </p>
                </div>
            </footer>
        </div>
        );
  }
}

export default TwentyFiveScore;

