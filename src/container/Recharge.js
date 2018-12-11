import React from 'react'
import './Recharge.less';
export default class Recharge extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            current:"1"
        }
       
    }

    componentDidMount(){
        if(this.props.current==="1"){
            document.getElementById("dcBtn").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/navBtnCur.png)"
        }else if(this.props.current==="2"){
            document.getElementById("zfbBtn").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/navBtnCur.png)"
        }else if(this.props.current==="3"){
            document.getElementById("tobankBtn").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/navBtnCur.png)"
        }else if(this.props.current==="4"){
            document.getElementById("wxBtn").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/navBtnCur.png)"
        }else if(this.props.current==="5"){
            document.getElementById("wyBtn").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/navBtnCur.png)"
        }
    }
    render(){
        return <div className = "RechargeBox" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/bg.jpg)"}}>
                    {/* child1 */}
                    <div className="RechargeBox_child1">
                        <div style = {{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/fanhui.png)"}} >
                        </div>
                        <div style = {{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/26.png)"}} 
                            className="child_title"                    
                        >   
                            <div style = {{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/9.png)"}} ></div>
                        </div>
                        <div style = {{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/chongzhilishi.png)"}} 
                            className="historyBtn"  
                            onClick={()=>{
                                this.props.setPath("#/recharge/history")
                            }}                  
                        >   
                        </div>
                    </div>
                    <div className="RechargeBox_child2">
                        <div className="child2_nav">
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/btn1.png)"}}
                                onClick={()=>{
                                    this.props.setPath("#/")
                                    
                                }}
                                className={this.props.current==="1"?"cur":""}
                                id="dcBtn"
                                >
                                <span>人工代充值</span>
                            </div> 
                            
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/btn1.png)"}}
                                 onClick={()=>{
                                    this.props.setPath("#/recharge/zfb")
                                }}
                                className={this.props.current==="2"?"cur":""}
                                id="zfbBtn"
                                >
                                <span>支付宝</span>
                            </div>
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/btn1.png)"}}
                                 onClick={()=>{
                                    this.props.setPath("#/recharge/zfbtobank")
                                }}
                                className={this.props.current==="3"?"cur":""}
                                id="tobankBtn"
                                >
                                <span>支付宝转银行卡</span>
                            </div>
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/btn1.png)"}}
                                 onClick={()=>{
                                    this.props.setPath("#/recharge/wx")
                                   
                                }}
                                className={this.props.current==="4"?"cur":""}
                                id="wxBtn"
                                >
                                <span>微信</span>
                            </div>
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/btn1.png)"}}
                                 onClick={()=>{
                                    this.props.setPath("#/recharge/cyberbank")
                                }}
                                className={this.props.current==="5"?"cur":""}
                                id="wyBtn"
                                >
                                <span>网银转账</span>
                            </div>
                        </div>
                        <div className="child_content" >
                           <div className="inner_box">
                                {this.props.children}
                           </div>
                        </div>
                    </div>
                </div>
    }
}