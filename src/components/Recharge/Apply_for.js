import React from "react";
import "./Apply.less";
import Recharge from "../../container/Recharge";
import {toggleSlide} from "../Withdraw_cash/config";
import {CopyToClipboard} from 'react-copy-to-clipboard';
const api="http://111.231.57.144:8081/api"
// const api="http://10.63.252.30:8087/api"
export default  class Apply_for extends React.Component{
    constructor(props){
        super(props);
        this.state={
            "statusInfo":false,
            "saveDetailsResults":"",
            "proportion":0,
            "buyAmount":0,
            "show":false,
            "contact_type":1,
            "contact_info":"",
            "details":"",
            "isAlert":false,
            "isAlert2":false,
            "isAlert3":false,
            "msg":""
        }
        fetch(`${api}/replace_payment/register`,{
            method:"GET"
        }).then((data)=>data.json())
        .then((responseJson)=>{
            this.setState({
                results:responseJson
            })
        })
        .catch((error) => {
            alert(error)
        })
    }
    setPath(val){
        this.props.setProps(val)
    }
    //显示订单弹窗
    showOrder() {
        this.setState({ show: true })
    }
    //隐藏订单弹窗
    hideOrder() {
        this.setState({ show: false })
    }
    componentWillReceiveProps(a,b){
         //判断创建订单的返回结果
         if (b.orderStatus.status === "0") {
            this.showOrder()
        }else if(b.orderStatus.status === "-1"){
            this.setState({
                isAlert3:true
            })
        }
    }
    
    onCopy(){
        console.log("复制成功")
    }

    render(){
        const{user_id,nick_name,client,proxy_id,proxy_name,from_brand} =this.props.data;
        const{results,statusInfo,orderStatus,} =this.state;
        // const {results,statusInfo,status,orderStatus} = this.props.homeModel;
        if(results){
            var max= results.data.max_scale?results.data.max_scale*100:102;
        }
        const height= window.screen.height;
        var dataList =[
            "微信",
            "QQ"
        ]
        return  <Recharge current="1" setPath={this.setPath.bind(this)}>
                    <div className="ListTitle">
                        <div style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/newbtn.png)" }}
                            className="publicbtn"
                            onTouchEnd={() => {
                                this.props.setProps("#/")
                            }}
                        >
                            <span>返 回</span>
                        </div>
                        <div style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/shenghoiqda.png)" }}></div>
                    </div>
                    <div  className="huadongBg">
                        <div className="whiteBg1">
                            <div className="whiteBg1_child1 WordArt">
                                基础信息
                            </div>
                            <p className="whiteBg1_child2">昵称: <span>{nick_name}</span></p>
                            <p className="whiteBg1_child3" >ID: <span>{user_id}</span></p>
                            <div className="whiteBg1_child4" >
                                <div  className="whiteBg1_child4_select" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/fjdsalohfid.png)"}}>
                                        <form action="" method="post" > 
                                            <div id="divselect" > 
                                                <cite id="cite"
                                                    onClick={()=>{
                                                        toggleSlide('selectUl','500','35')
                                                    }}
                                                >微信</cite> 
                                                <ul id="selectUl" style={{display:"none"}} > 
                                                {
                                                    dataList.map((item,index)=>{
                                                        return  <li key={index}
                                                            onClick={()=>{
                                                                document.getElementById("selectUl").style.display="none";
                                                                document.getElementById("cite").innerHTML=item;
                                                                this.setState({
                                                                    current:index+1,
                                                                    contact_type:index+1
                                                                })
                                                            }}
                                                            // eslint-disable-next-line
                                                        ><a href="javascript:;" selectid={index+1}>{item}</a></li>
                                                    })
                                                }
                                                </ul> 
                                                
                                            </div> 
                                            <input name="" type="hidden" value="" id="inputselect" maxLength="20"/> 
                                        </form> 
                                        <i style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/xialade.png)"}}></i>
                                    </div>
                                <div className="whiteBg1_child4_child2" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}}>
                                    <input type="text"
                                        placeholder="请输入账户"
                                        maxLength="20"
                                        onKeyUp={(e)=>{
                                                e.target.value= e.target.value.replace(/[^\w_]/g,'');
                                            }}
                                        onChange={(e)=>{
                                            this.setState({
                                                "contact_info":e.target.value
                                            })
                                        
                                        }}
                                    />
                                </div>
                                {/* 提交基本资料 */}
                            {
                                    statusInfo.status!==0?<div  className="whiteBg1_child4_child3 publicbtn"  style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/anniud.png)"}}
                                        onClick={()=>{
                                            //
                                            if(this.state.contact_info.length>=1) {
                                                fetch(`${api}/Replace_payment/saveContact?user_id=${user_id}&nick_name=${nick_name}&contact_type=${this.state.contact_type}&contact_info=${this.state.contact_info}&client=${client}&proxy_id=${proxy_id}&proxy_name=${proxy_name}&from_brand=${from_brand}&action=add`,{
                                                    method:"GET"
                                                }).then((data)=>data.json())
                                                .then((responseJson)=>{
                                                    // eslint-disable-next-line
                                                    if(responseJson.status!=0){
                                                        this.setState({
                                                            isAlert:true,
                                                            msg:"重复提交"
                                                        })
                                                    }else{
                                                        this.setState({
                                                            statusInfo:responseJson,
                                                            isAlert:true,
                                                            msg:"提交成功！"
                                                        })
                                                    }
                                                    
                                                })
                                                .catch((error) => {
                                                    alert(error)
                                                })
                                               
                                            }else{
                                                return null
                                            } 
                                        }}
                                        >
                                        <span>确 定</span>
                                    </div>
                                    :
                                    <div className="whiteBg1_child4_child3 publicbtn" 
                                        style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/anniud.png)"}}
                                        onClick={()=>{
                                            if(this.state.contact_info.length>=1){
                                                fetch(`${api}/Replace_payment/saveContact?user_id=${user_id}&nick_name=${nick_name}&contact_type=${this.state.contact_type}&contact_info=${this.state.contact_info}&client=${client}&proxy_id=${proxy_id}&proxy_name=${proxy_name}&from_brand=${from_brand}&action=edit`,{
                                                    method:"GET"
                                                }).then((data)=>data.json())
                                                .then((responseJson)=>{
                                                    this.setState({
                                                        statusInfo:responseJson,
                                                        isAlert:true
                                                    })
                                                })
                                                .catch((error) => {
                                                    alert(error)
                                                })
                                            } else{
                                                return null
                                            }
                                            }}
                                        
                                        >
                                        <span>修 改</span>
                                    </div>
                            }
                            </div>
                            <div className="whiteBg1_child5 WordArt" >详情</div>
                            <div className="whiteBg1_child6"  style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/shurukuangd.png)"}}>
                                <textarea maxLength="90"
                                    onChange={(e)=>{
                                        this.setState({
                                            "details":e.target.value
                                        })
                                    }}
                                ></textarea>
                            </div>
                            {/* 提交详情 */}
                            <div className="whiteBg1_child7 publicbtn"  style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/newbtn.png)"}}
                                onClick={()=>{
                                    if(this.state.contact_info!==""&&this.state.details.length>=1){
                                        fetch(`${api}/replace_payment/saveDetails?user_id=${user_id}&details=${this.state.details}`,{
                                            method:"GET"
                                        }).then((data)=>data.json())
                                        .then((responseJson)=>{
                                            // eslint-disable-next-line
                                            if(responseJson.status!=0){
                                                this.setState({
                                                    isAlert:true,
                                                    msg:responseJson.msg
                                                })
                                            }else{
                                                this.setState({
                                                    saveDetailsResults:responseJson,
                                                    isAlert:true,
                                                    msg:responseJson.msg
                                                })
                                            }
                                            
                                        })
                                        .catch((error) => {
                                            alert(error)
                                        })
                                    } else{
                                        return null
                                    }
                                }}
                            >
                                <span>编 辑</span>
                            </div>
                        </div>
                        <div className="whiteBg2" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/xuxian.png)"}}>
                            <div>
                                <div className="WordArt" >买分比例</div>
                                <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}}>
                                    <input type="text"  placeholder="百分比"
                                         onBlur={(e)=>{
                                            if(Number(e.target.value)<=Number(max)){
                                                this.setState({ 
                                                    "proportion":Number(e.target.value)
                                                })
                                            }else{
                                                this.setState({
                                                    "proportion":Number(max)
                                                })
                                            }  
                                        }}
                                        maxLength="5" 
                                        onInput={(e)=>{
                                            e.target.value= e.target.value.match(/\d+(\.\d{0,2})?/) ? e.target.value.match(/\d+(\.\d{0,2})?/)[0] : ''
                                        }}
                                    />
                                </div>
                                <div>比例越低，在等待队列排名越前(最大{max})</div>
                            </div>
                            <div>
                                <div className="WordArt">买分金额</div>
                                <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}}>
                                    <input type="text" style={{top:"31%"}} 
                                        onBlur={(e)=>{
                                                this.setState({
                                                    "buyAmount":Number(e.target.value)
                                                })    
                                        }}
                                        maxLength="6" 
                                        onInput={(e)=>{
                                            e.target.value= e.target.value.match(/\d+(\.\d{0,2})?/) ? e.target.value.match(/\d+(\.\d{0,2})?/)[0] : ''
                                        }}
                                        placeholder="输入金额"
                                    />
                                </div>
                                <div>实际得到分数：<span>{this.state.proportion*this.state.buyAmount/100}</span></div>
                            </div>
                            <div></div>
                        {/* 提交订单 */}
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/newbtn.png)"}}
                                onClick={()=>{
                                    // 返回orderStatus
                                  // eslint-disable-next-line 
                                    if(this.state.contact_info!=""&&this.state.proportion!=""&&this.state.buyAmount!=""){
                                        fetch(`${api}/Payment/transferPayment?user_id=${user_id}&nick_name=${nick_name}&fraction_scale=${this.state.proportion}&amount=${this.state.buyAmount}&client=${client}&proxy_id=${proxy_id}&proxy_name=${proxy_name}&from_brand=${from_brand}&order_type=1`,{
                                            method:"GET"
                                        }).then((data)=>data.json())
                                        .then((responseJson)=>{
                                            // eslint-disable-next-line 
                                            if(responseJson.status!=0){
                                                this.setState({
                                                    isAlert:true,
                                                    msg:responseJson.msg
                                                })
                                            }
                                            this.setState({
                                                orderStatus:responseJson,
                                                show:true,
                                            })
                                        })
                                        .catch((error) =>{
                                            alert(error)
                                        })
                                    }else{
                                        return null
                                    }
                                }}
                                className="publicbtn"
                            >
                                <span>提 交</span>
                            </div>
                        </div>
                        {/* 订单弹窗 */}
                        {
                            // eslint-disable-next-line 
                            !this.state.show || orderStatus.status !=0?null : <div className="Applyfor-container" id="Applyfor-container" style={{width:`${height*1.775}px`,height:`${height}px`}} >
                            <div className="Applyfor-child-container" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd2.png)"}}>
                                <div className="Applyfor-title" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/dingdanxcind.png)"}}></div>
                                <div className="Applyfor-child">
                                        <div>
                                            <span>充值方式：支付宝转账</span>
                                            <span>收款银行：{orderStatus.data.bank_name}</span>
                                        </div>
                                        <div>用户昵称:{nick_name}</div>
                                        <div>收款账号：{orderStatus.data.card_num}
                                                    <CopyToClipboard text={orderStatus.data.card_num}
                                                        onCopy={this.onCopy}
                                                    >
                                                    <img id="Orderfuzhi1" src={process.env.PUBLIC_URL+"/images/fuzhide.png"}
                                                        alt=""
                                                        onTouchStart={()=>{
                                                            document.getElementById("Orderfuzhi1").src=process.env.PUBLIC_URL+"/images/fuzhid.png"
                                                        }}
                                                        onTouchEnd={()=>{
                                                            document.getElementById("Orderfuzhi1").src=process.env.PUBLIC_URL+"/images/fuzhide.png"
                                                        }}
                                                        alit=""
                                                        />
                                                    </CopyToClipboard> 
                                        </div>
                                        <div>收款人姓名：{orderStatus.data.card_name}
                                                    
                                                    <CopyToClipboard text={orderStatus.data.card_name}
                                                        onCopy={this.onCopy}
                                                    >
                                                        <img src={process.env.PUBLIC_URL+"/images/fuzhide.png"} alt=""
                                                            id="Orderfuzhi2"
                                                            onTouchStart={()=>{
                                                                document.getElementById("Orderfuzhi2").src=process.env.PUBLIC_URL+"/images/fuzhid.png"
                                                            }}
                                                            onTouchEnd={()=>{
                                                                document.getElementById("Orderfuzhi2").src=process.env.PUBLIC_URL+"/images/fuzhide.png"
                                                            }}
                                                        />
                                                    </CopyToClipboard> 
                                        </div>
                                        <div>转账金额:{orderStatus.data.amount}
                                                <CopyToClipboard text={orderStatus.data.amount}
                                                        onCopy={this.onCopy}
                                                    >
                                                    <img src={process.env.PUBLIC_URL+"/images/fuzhide.png"} alt=""
                                                        id="Orderfuzhi3"
                                                        onTouchStart={()=>{
                                                        document.getElementById("Orderfuzhi3").src=process.env.PUBLIC_URL+"/images/fuzhid.png"
                                                    }}
                                                    onTouchEnd={()=>{
                                                        document.getElementById("Orderfuzhi3").src=process.env.PUBLIC_URL+"/images/fuzhide.png"
                                                    }}
                                                    />
                                                </CopyToClipboard> 
                                        </div>
                                        <div>请务必按照该金额（包含小数点）进行转账，否则无法正常上分</div>
                                </div>
                                <div className="Applyfor-child2">
                                    <div>注意事项:</div>
                                    <div>1.请正确填写转账备注</div>
                                    <div>2.请确保在30分钟内完成转账</div>
                                </div>
                                <div className="Applyfor-btn1">
                                        <div id="Applyfor_confrim"  
                                            className="publicbtn"
                                            style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/newbtn.png)"}}
                                            onClick={()=>{
                                                this.hideOrder();
                                                this.props.setProps("#/")
                                            }}
                                        >
                                            <span>如何充值</span>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        }

                    {/* 提交订单结果弹窗 */}
                    {
                            !this.state.isAlert?null:<div className="Alert-container" id="Alert-container" >
                            <div className="Alert-child-container" >
                                <div className="Alert-child">
                                    {this.state.msg}     
                                </div>
                                <div className="Alert-btn">
                                        <div
                                            onClick={()=>{
                                            this.setState({
                                                isAlert:false
                                            })
                                            }}
                                        >
                                            确定
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
             </div>
        </Recharge>
    }
}
