import React from 'react'
import './WithDrawCash.less'
import "./Recharge.less"
import "../components/Recharge/List.less"
export default class WithDrawCash extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
       
    }
    componentDidMount(){
          // eslint-disable-next-line 
        if(this.props.current==1){
            document.getElementById("dhBtn").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/navBtnCur.png)"
              // eslint-disable-next-line 
        }else if(this.props.current==2){
            document.getElementById("giveBtn").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/navBtnCur.png)"
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
                            <div style = {{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/title_dh.png)"}} ></div>
                        </div>
                    </div>
                    <div className="RechargeBox_child2">
                        <div className="child2_nav">
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/btn1.png)"}}
                                onClick={()=>{
                                        this.props.setPath("#/withdrawCash/dh")
                                }}
                                  // eslint-disable-next-line 
                                className={this.props.current=="1"?"cur":""}
                                id="dhBtn"
                                >
                                <span>兑换</span>
                            </div> 
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/btn1.png)"}}
                                 onClick={()=>{
                                        this.props.setPath("#/withdrawCash/give")
                                }}
                                  // eslint-disable-next-line 
                                className={this.props.current=="2"?"cur":""}
                                id="giveBtn"
                                >
                                <span>赠送</span>
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
