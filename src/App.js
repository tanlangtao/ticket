import React, { Component } from 'react';
import './App.less';
class InnerContentChild extends Component{
    constructor(){
        super()
        this.state={

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
        //定时器
        this.setState({
            cutDown:this.props.data.next_second
        })
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
    render(){
        var {imageName,issue,number,hash} = this.props.data
        return <div className='inner-content-child'>
                <div className="child-images" 
                    style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/"+imageName+".jpg)"}}
                    onClick={()=>{
                        window.location.hash=hash
                    }}
                >
                </div>
                <div className="child-child2">
                    <div className="child-child2-qh">numéro du tirage：{issue}</div>
                    <div className="child-child2-time">
                        <span>Temps restant：</span>
                        <span>00 :</span>
                        <span>00 : </span>
                        <span>{this.state.cutDown>=10?this.state.cutDown:'0'+this.state.cutDown}</span>
                    </div>
                </div>
                <div className="child-child3">
                    <div className="child-child3-font" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/luck.png)"}}></div>
                    <div className="child-child3-number">
                        <ul>
                            {
                                this.splitNumber(number).map((item,index)=>{
                                    return  <li key={index} style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/ball.png)"}}><span>{item}</span></li> 
                                })
                            }
                        </ul>
                    </div>
                </div>
        </div>
    }
}
class App extends Component {
    constructor(){
        super()
        this.state={
            data:{
                imageName:"ffc_banner",
                issue:"20190109-837",
                number:'01234',
                hash:'/Super10',
                next_second:18
            },
            nextData:{
                imageName:"wfc_banner",
                issue:"20190109-838",
                number:'01234',
                hash:'/Chanceux10',
                next_second:30
            },
            results:{"next_time":"2019-01-10 02:17:00","next_num":"20190110-1714","latest_num":"61094","latest_time":"2019-01-10 02:16:30","next_second":18,"history":[{"num":"20190110-1713","openTime":"2019-01-10 02:16:30","result":"61094"},{"num":"20190110-1712","openTime":"2019-01-10 02:16:00","result":"36008"},{"num":"20190110-1711","openTime":"2019-01-10 02:15:30","result":"63388"},{"num":"20190110-1710","openTime":"2019-01-10 02:15:00","result":"65168"},{"num":"20190110-1709","openTime":"2019-01-10 02:14:30","result":"33852"},{"num":"20190110-1708","openTime":"2019-01-10 02:14:00","result":"53440"},{"num":"20190110-1707","openTime":"2019-01-10 02:13:30","result":"13070"},{"num":"20190110-1706","openTime":"2019-01-10 02:13:00","result":"88708"},{"num":"20190110-1705","openTime":"2019-01-10 02:12:30","result":"36951"},{"num":"20190110-1704","openTime":"2019-01-10 02:12:00","result":"09430"}]}
        }
    }
    componentWillMount(){
        this.setState({
            data1:{
                ...this.state.data1,
                "next_second":this.state.results.next_second
            },
            data2:{
                ...this.state.data1,
                "next_second":this.state.results.next_second
            }
        })
    }
    render() {
        
        return (
        <div className="App">
            <header className="App-header">
                {/* eslint-disable-next-line  */}
                <h1 className='App-logo' style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/logo.png)"}} ></h1>
                <div className="selectBox"
                     onMouseOver={()=>{
                        document.getElementById('jiantou').style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/arrow_Down2.png)"
                    }}
                    onMouseLeave={()=>{
                        document.getElementById('jiantou').style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/arrow_Down.png)"
                    }}
                >
                    <p>Latest Rsults 
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
                        <li onClick={()=>{
                                window.location.hash="/Chanceux10"
                            }}
                                // eslint-disable-next-line 
                            ><a href="javascript:;" selectid='li2'>Monaco Chanceux10</a>
                        </li>
                    </ul> 
                </div>
                <div className='App-gongGao'></div>
            </header>
            <div className='App-content' >
                <div className="App-banner-div">
                    <div className='App-banner' style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/banner.jpg)"}}>
                        
                    </div>
                </div>
                <div className="inner-content">
                    <InnerContentChild 
                        data={this.state.data}
                    ></InnerContentChild>
                    <InnerContentChild
                        data={this.state.nextData}
                    ></InnerContentChild>
                </div>
            </div>
            <footer className="App-footer">
                <div>
                </div>
                <div>
                    <p  style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/logo.png)"}}></p>
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

export default App;
