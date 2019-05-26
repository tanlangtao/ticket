import React, {Component} from 'react';
import '../App.less';
import './TenScore.less'
import Socket from "lows";
import Config from '../lib/Config';

var nowYear = new Date().getFullYear();
var nowMonth = new Date().getMonth() + 1;
var nowDay = new Date().getDate();
var nowHour = new Date().getHours();

var dateResults = Config.creatDate(nowYear);


var timeArr = []
// eslint-disable-next-line
var min = 3600;
for (var i = 0, j = 1; i < 24; i++, j++) {
    timeArr.push({'minTime': min * i, 'maxTime': min * j - 1});
}
class TenScore extends Component {
    constructor() {
        super()
        this.state = {
            after_second:30-((Date.now()/1000)>>0)%30
            ,
            results: {
            },
            selectYear: '',
            selectMonth: '',
            selectDay: '',
            selectTime: ['0','3599'],
            minPage:1,
            maxPage:12
        }
       
    }
     splitNumber(number) {
        var str = number
        var arr = []
        for (var i = 0; i < str.length; i++) {
            arr.push(str.substring(i, i + 1))
        }
        return arr;
    }

    componentDidMount() {
        let socket = new Socket({
            host: "http://lotterywebserver.0351sxzc.com",
            port: 80,
            path: "/lotteryWebServer"
        });
        
        socket.addListener("lottery-begin", (e, data) => {
            console.log("begin", data);
            this.setState({
                after_second:data.after_second
            })
        });
        
        socket.addListener("lottery-open", (e, data) => {
            console.log("open", data);
            this.setState({
                results:data
            })
        });
        
        socket.start();
        
        this.setState({
            selectYear: nowYear,
            selectMonth: nowMonth,
            selectDay: nowDay,
        })
        //定时器
        this.timer = setInterval(() => {
            this.setState({
                after_second: this.state.after_second - 1
            })
        }, 1000)
        const {results} = this.state;
        if (!results) {
            return null;
        }
    }
    componentWillUpdate(a, b) {
        // 年月日联动的判断
        // eslint-disable-next-line
       
        if (b.selectYear == nowYear) {
            var month = []
            for (var i = 1; i <= nowMonth; i++) {
                month.push(i)
            }
            dateResults.month = month;
            // eslint-disable-next-line
            if (b.selectMonth == nowMonth && b.selectDay == nowDay) {
                timeArr = []
                // eslint-disable-next-line
                for (var i = 0, j = 1; i <= nowHour; i++, j++) {
                    timeArr.push({'minTime': min * i, 'maxTime': min * j-1})
                }
            } else {
                timeArr = []
                // eslint-disable-next-line
                for (var i = 0, j = 1; i < 24; i++, j++) {
                    timeArr.push({'minTime': min * i, 'maxTime': min * j-1})
                }
            }
        } else {
            // eslint-disable-next-line
            var month = []
            // eslint-disable-next-line
            for (var j = 1; j <= 12; j++) {
                month.push(j)
            }
            dateResults.month = month
        }
        // eslint-disable-next-line
        if (b.selectMonth == nowMonth && b.selectYear == nowYear) {
            var days = []
            for (var x = 1; x <= nowDay; x++) {
                days.push(x)
            }
            dateResults.days = days
        } else if (b.selectMonth === '2') {
            //如果是闰年
            if ((b.selectYear % 4 === 0 && b.selectYear % 100 !== 0) || b.selectYear % 400 === 0) {
                days = []
                for (i = 1; i <= 29; i++) {
                    days.push(i)
                }
                dateResults.days = days
                //如果是平年
            } else {
                days = []
                for (i = 1; i <= 28; i++) {
                    days.push(i)
                }
                dateResults.days = days
            }
        } else if (b.selectMonth === '4' || b.selectMonth === '6' || b.selectMonth === '9' || b.selectMonth === '11') {
            days = []
            for (i = 1; i <= 30; i++) {
                days.push(i)
            }
            dateResults.days = days
        } else {
            days = []
            for (i = 1; i <= 31; i++) {
                days.push(i)
            }
            dateResults.days = days
        }
        //关闭定时器
        // eslint-disable-next-line
    }

    componentWillUnmount() {
        //关闭定时器
        clearInterval(this.timer)
        //避免异步请求结果未返回就切换页面报错
        this.setState = (state, callback) => {
            return;
        };
    }

    getDate() {

    }
    shouldComponentUpdate(){
        if(!this.results){
            return false;
        }else{
            return true;
        }
    }
    render() {
        var {latest_time, latest_num, history} = this.state.results;
        latest_num = '1234567891234567891234567891234567891234567891234567'
        return (
            <div className="App">
                <header className="App-header">
                    {/* eslint-disable-next-line  */}
                    <h1 className='App-logo'
                        style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/logo.png)"}}
                        // onClick={()=>{
                        //     window.location.hash="/"
                        // }}
                    ></h1>

                    {/* 下拉选择 */}
                    {/* <div className="selectBox"
                        onMouseOver={()=>{
                            document.getElementById('jiantou').style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/arrow_Down2.png)"
                        }}
                        onMouseLeave={()=>{
                            document.getElementById('jiantou').style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/arrow_Down.png)"
                        }}
                    >
                        <p>Monaco Super10
                            <i id='jiantou' style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/arrow_Down.png)"}}>
                            </i>
                        </p>
                        <ul id="selectUl">
                            <li onClick={()=>{
                                    window.location.hash="/Chanceux10"
                                }}
                                    // eslint-disable-next-line 
                                ><a href="javascript:;" selectid='li1'>Monaco Chanceux5</a>
                            </li>
                        </ul> 
                    </div> */}


                    <div className='App-gongGao'>Ce site ne offrit que le service abonnement, ne fournit pas les
                        services achetés.
                    </div>
                </header>
                <div className='TenScore-content'>
                    <div className="TenScore-banner-div">
                        <div className='TenScore-banner'
                             style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/banner.jpg)"}}>

                        </div>
                    </div>
                    <div className="TenScore-inner-content">
                        <p className="icon_title"
                           style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/fdjsao.png)"}}></p>
                        <div className="content-sidebar">
                            <div className="sidebar-box1"
                                 onMouseOver={() => {
                                     document.getElementById('icon_right').style.backgroundImage = "url(" + process.env.PUBLIC_URL + "/images/arrow_Right2.png)"
                                 }}
                                 onMouseLeave={() => {
                                     document.getElementById('icon_right').style.backgroundImage = "url(" + process.env.PUBLIC_URL + "/images/arrow_Right.png)"
                                 }}
                                 onClick={() => {
                                     // window.location.hash="/Chanceux10"
                                 }}
                            >
                                <i id='icon_right'
                                   style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/arrow_Right.png)"}}></i>
                                <span>monacoSuper52</span>
                            </div>
                            <div className="sidebar-box2">
                                <div
                                    style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/app-bg2.jpg)"}}></div>
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
                                                this.splitNumber(latest_num).map((item, index) => {
                                                    return <li key={index}
                                                               style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/ball.png)"}}>
                                                        <span>{item}</span></li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="box-row3"
                                         style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/subtle-bg-small.png)"}}>
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
                                                    <span>{this.state.after_second >= 10 ? this.state.after_second : '0' + this.state.after_second}</span>
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
                                            onChange={(e) => {
                                                this.setState({
                                                    selectYear: e.target.value,
                                                    selectMonth: 1,
                                                    selectDay: 1
                                                })
                                            }}
                                            value={this.state.selectYear}
                                    >
                                        {dateResults.year.map((item, index) => {
                                            return <option key={index} value={item}>{item}</option>
                                        })}
                                    </select>
                                    <select name="sel2" id="sel2"
                                            onChange={(e) => {
                                                this.setState({
                                                    selectMonth: e.target.value,
                                                })

                                            }}
                                            value={this.state.selectMonth}
                                    >
                                        {dateResults.month.map((item, index) => {
                                            return <option key={index} value={item}>{item}</option>
                                        })}
                                    </select>
                                    <select name="sel3" id="sel3"
                                            onChange={(e) => {
                                                this.setState({
                                                    selectDay: e.target.value
                                                })
                                            }}
                                            value={this.state.selectDay}
                                    >
                                        {dateResults.days.map((item, index) => {
                                            return <option key={index} value={item}>{item}</option>
                                        })}
                                    </select>
                                    <span>Time:</span>
                                    <select name="" id="selectYear"
                                            onChange={(e) => {
                                                this.setState({
                                                    selectTime: e.target.value.split(",")
                                                })
                                            }}
                                    >
                                        {
                                            timeArr.map((item, index) => {
                                                return <option key={index}
                                                               value={item.minTime + ',' + item.maxTime}>{Config.formatDuring(item.minTime) + '-' + Config.formatDuring(item.maxTime)}</option>
                                            })
                                        }
                                    </select>
                                    <div id="Rechercher"
                                         onMouseDown={() => {
                                             document.getElementById('Rechercher').style.transform = 'scale(0.9)';
                                             let min = `${this.state.selectYear}-${this.state.selectMonth}-${this.state.selectDay} ${Config.formatDuring(this.state.selectTime[0])}`.replace(/-/g,'/');
                                            let startTime = new Date(min).getTime();
                                             let max = `${this.state.selectYear}-${this.state.selectMonth}-${this.state.selectDay} ${Config.formatDuring(this.state.selectTime[1])}`.replace(/-/g,'/');
                                             let endTime = new Date(max).getTime();
                                             console.log(startTime,endTime)
                                         }}
                                         onMouseUp={() => {
                                             document.getElementById('Rechercher').style.transform = 'scale(1)'
                                         }}
                                    >Rechercher
                                    </div>
                                </div>
                            </div>
                            <div className="content-box3">
                                {/* <p className="content-box3-title"><span>numéro du tirage</span><span>boules</span></p>
                                {
                                    history.map((item, index) => {
                                        return <div key={index} className="content-box3-list">
                                            <span>{item.num}</span>
                                            <div>
                                                <ul>
                                                    {
                                                        this.splitNumber(item.result).map((item, index) => {
                                                            return <li key={index}
                                                                       style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/ball.png)"}}>
                                                                <span>{item}</span>
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    })
                                } */}
                                <p className='content-box3-page'>
                                    <span  className='pageUp' style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/pageUp.png)"}}
                                           onClick={()=>{
                                               this.setState({
                                                   minPage:this.state.minPage >1 ?this.state.minPage - 1 :1
                                               })
                                           }}
                                    ></span>
                                    <span className='minPage'>{this.state.minPage}</span>/
                                    <span className='maxPage'>{this.state.maxPage}</span>
                                    <span className='pageDown' style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/pageDown.png)"}}
                                        onClick={()=>{
                                            this.setState({
                                                minPage : this.state.minPage < this.state.maxPage ? this.state.minPage + 1 :this.state.minPage
                                            })
                                        }}
                                    ></span></p>
                            </div>
                        </div>
                        <div className="content-sidebar-right">
                            <div className="sidebar-right-box1">
                                <div
                                    style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/app-bg.jpg)"}}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="App-footer">
                    <div>
                    </div>
                    <div>
                        <p style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/logo.png)"}}
                           onClick={() => {
                               window.location.hash = "/"
                           }}
                        ></p>
                        <p>
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

export default TenScore;
