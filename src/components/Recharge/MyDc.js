import React from "react";
import "./Apply.less";
import Recharge from "../../container/Recharge";
import "./MyDc.less";
import {CopyToClipboard} from 'react-copy-to-clipboard';
const api="http://111.231.57.144:8081/api";
export default class MyDc extends React.Component{
    constructor(props){
        super(props);
        this.state={
            "showValue":false,
            "showScale":false,
            "scale":"",
            "value":"",
            "details":"",
            "showOrder":false,
            "isShowdetails":false
        }
        fetch(`${api}/replace_payment/myInfo?user_id=${this.props.data.user_id}`,{
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
    //显示增加金额弹窗
    showValue() {
        this.setState({ showValue: true })
    }
    //隐藏增加金额弹窗
    hideValue() {
        this.setState({ showValue: false })
    }
     //显示修改比例弹窗
    showOrder() {
        this.setState({ showOrder: true })
    }
    //隐藏修改比例弹窗
    hideOrder() {
        this.setState({ showOrder: false })
    }
    //显示详情弹窗
    showDetailes(){
        this.setState({isShowdetails:true})
    }
    //隐藏详情弹窗
    hideDetailes(){
        this.setState({isShowdetails:false})
    }

    componentWillReceiveProps(a,b){
          // eslint-disable-next-line 
        if (a.homeModel.orderStatus.status == 0) {
            this.hideValue()
            this.showOrder()
        }
          // eslint-disable-next-line 
        if(a.homeModel.statusInfo.status ==0){
            this.hideScale()
        }
    }

    render(){
        const{user_id,nick_name,client,proxy_id,proxy_name,from_brand} =this.props.data;
        const {results,orderStatus} =this.state;
        if(results){
            var available_amount=results.data.available_amount?parseInt(results.data.available_amount):0;
            var fraction_amount=results.data.available_amount?parseInt(results.data.fraction_amount):0;
            var fraction_scale=results.data.fraction_scale*100<=102?results.data.fraction_scale*100:102;
            var details =results.data.details;
        }
        // 弹窗固定高度
        const height= window.screen.height;
        return  <Recharge current="1" setPath={this.setPath.bind(this)}>
            <div className="MyDctitle">
                <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/newbtn.png)"}}
                     onTouchEnd={()=>{
                        this.props.setProps("#/")
                    }}
                    className="publicbtn"
                ><span>返 回</span></div>
                <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/wodedajochgxiao.png)"}}></div>
                <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/wodjaojo.png)"}}
                     onTouchEnd={()=>{
                        this.props.setProps("#/recharge/MyOrder")
                    }}
                ></div>
            </div>
            <div className="MyDcBgWhite" >
                <div>
                    <span className="WordArt">当前可上分余额：</span>
                    <span>{available_amount}</span>
                </div>
                <div>
                    <div className="WordArt">买分比例</div>
                    <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/fjdsalohfid.png)"}}>
                        {fraction_scale}
                    </div>
                </div>
                <div>
                    <div className="WordArt">买分金额</div>
                    <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/fjdsalohfid.png)"}}>
                        {fraction_amount}
                    </div>
                    <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/anniud.png)"}}
                        className="publicbtn"
                        id="maifen_value"
                        onClick={()=>{
                            this.showValue()
                        }}
                    ><span>增 加</span></div>
                </div>
                <div>
                    <div className="WordArt">买分详情</div>
                    <div >
                        {details}
                    </div>
                    <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/anniud.png)"}} 
                          className="publicbtn"
                        onClick={()=>{
                            this.showDetailes()
                        }}
                    ><span>修 改</span></div>
                </div>
            </div> 
               {/* 追加金额弹窗 */}
               {
                   !this.state.showValue?null :<div className="MyDcBzj-container" id="MyDcZJJE-container" style={{width:`${height*1.775}px`,height:`${height}px`}} >
                   <div className="MyDcBzj-child-container" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/fdhsaoi;bo;idf.png)" }}>
                        <div className="Alert2-title">
                            <div>增加金额</div>
                        </div>
                       <div className="MyDcBzj-child">
                               <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/gantanhao.png)" }}></div>
                               <div className="MyDcBzj-child-child2">
                                    <div className="WordArt" >
                                    买分比例
                                    </div>
                                    <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/fjdsalohfid.png)"}} >
                                            <input type="text" 
                                                maxLength="5"
                                                 onInput={(e)=>{
                                                    e.target.value= e.target.value.match(/\d+(\.\d{0,2})?/) ? e.target.value.match(/\d+(\.\d{0,2})?/)[0] : ''
                                                }}
                                                onChange={(e)=>{
                                                    this.setState({
                                                    scale:e.target.value>= 102 ?102:e.target.value
                                                    })
                                                }}
                                            />
                                    </div>
                                    <div className="WordArt" >
                                    买分金额
                                    </div>
                                    <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/fjdsalohfid.png)"}} >
                                            <input type="text"
                                                maxLength="7"
                                                 onInput={(e)=>{
                                                    e.target.value= e.target.value.match(/\d+(\.\d{0,2})?/) ? e.target.value.match(/\d+(\.\d{0,2})?/)[0] : ''
                                                }} 
                                                onChange={(e)=>{
                                                    this.setState({
                                                        value:e.target.value
                                                    })
                                                    
                                                }}
                                            />
                                    </div>
                               </div>
                       </div>
                       <div className="MyDcBzj-btn1">
                               <div id="MyDcZJJE_cancleBtn" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/dfhio;as.png)"}}
                                     onClick={()=>{
                                        this.hideValue()
                                    }}
                               >
                                   
                               </div>
                               {/* 创建订单 */}
                               <div id="MyDcZJJE_confrim"  style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/uiehfoia.png)"}}
                                    onClick={()=>{
                                        //发送请求
                                          // eslint-disable-next-line 
                                        this.state.value!=""?
                                        fetch(`${api}/Payment/transferPayment?user_id=${user_id}&nick_name=${nick_name}&fraction_scale=${this.state.scale}&amount=${this.state.value}&client=${client}&proxy_id=${proxy_id}&proxy_name=${proxy_name}&from_brand=${from_brand}&order_type=2`,{
                                            method:"GET"
                                        }).then((data)=>data.json())
                                        .then((responseJson)=>{
                                            this.setState({
                                                orderStatus:responseJson, 
                                            })
                                            // eslint-disable-next-line 
                                            if(responseJson.status==0){
                                                this.setState({
                                                    showOrder:true, 
                                                })
                                            }else{
                                                this.setState({
                                                    isAlert:true, 
                                                })
                                            }
                                            this.hideValue()
                                        })
                                        .catch((error) =>{
                                            alert(error)
                                        }):"";
                                    }}
                               ></div>
                       </div>
                   </div>
               </div>   
               }
               {/* 订单弹窗 */}
               {
                    // eslint-disable-next-line
                    !this.state.showOrder || orderStatus.status!=0 ?null : <div className="Applyfor-container" id="Applyfor-container" style={{width:`${height*1.775}px`,height:`${height}px`}}>
                    <div className="Applyfor-child-container" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd2.png)"}}>
                        <div className="Applyfor-title" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/dingdanxcind.png)"}}></div>
                        <div className="Applyfor-child">
                                   <div>
                                       <span>充值方式：支付宝转账</span>
                                       <span>收款银行：{orderStatus.data.bank_name}</span>
                                   </div>
                                   <div>用户昵称：{nick_name}</div>
                                   <div>收款账号：{orderStatus.data.card_num}
                                        <CopyToClipboard text={orderStatus.data.card_num}
                                            onCopy={this.onCopy}
                                        >
                                        <img id="Orderfuzhi1" src={process.env.PUBLIC_URL+"/images/fuzhide.png"} alt=""
                                            onTouchStart={()=>{
                                                document.getElementById("Orderfuzhi1").src=process.env.PUBLIC_URL+"/images/fuzhid.png"
                                            }}
                                            onTouchEnd={()=>{
                                                document.getElementById("Orderfuzhi1").src=process.env.PUBLIC_URL+"/images/fuzhide.png"
                                            }}
                                        ></img>
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
                            <div>1.请正确填写转账备注（），是否撒</div>
                            <div>1.请正确填写转账备注（），是否撒</div>
                        </div>
                        <div className="Applyfor-btn1">
                                <div id="Applyfor_confrim" 
                                  className="publicbtn"
                                  style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/newbtn.png)"}}
                                    onClick={()=>{
                                        //重新拉取数据
                                        fetch(`${api}/replace_payment/myInfo?user_id=${this.props.data.user_id}`,{
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
                                        this.setState({
                                            isAlert:false
                                        })
                                        this.hideOrder()
                                    }}
                                >
                                    <span>如何充值</span>
                                </div>
                            </div>
                        </div>
                    </div> 
                }
                   {/* 修改详情弹窗 */}
               {
                   !this.state.isShowdetails?null :<div className="ChangeDetails-container" id="ChangeDetails-container" style={{width:`${height*1.775}px`,height:`${height}px`}} >
                   <div className="ChangeDetails-child-container" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/fdhsaoi;bo;idf.png)" }}>
                        <div className="Alert2-title">
                            <div>修改详情</div>
                        </div>
                       <div className="ChangeDetails-child" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/shurukuangd.png)"}}>
                            <textarea
                                maxLength="100"
                                onChange={(e)=>{
                                    this.setState({
                                        "details":e.target.value
                                    })
                                }}
                            ></textarea>
                       </div>
                       <div className="ChangeDetails-btn1">
                               <div id="ChangeDetails_cancleBtn" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/dfhio;as.png)"}}
                                     onClick={()=>{
                                        this.hideDetailes()
                                    }}
                               >  
                               </div>
                               {/* 发送详情 */}
                               <div id="ChangeDetails_confrim"  style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/uiehfoia.png)"}}
                                    onClick={()=>{
                                          // eslint-disable-next-line 
                                        if(this.state.details!=""){
                                            fetch(`${api}/replace_payment/saveDetails?user_id=${user_id}&details=${this.state.details}`,{
                                                method:"GET"
                                            }).then((data)=>data.json())
                                            .then((responseJson)=>{
                                                this.setState({
                                                    orderStatus:responseJson,
                                                    isAlert:true
                                                })
                                            })
                                            .catch((error) => {
                                                alert(error)
                                            })
                                            this.hideDetailes()
                                        }else{
                                            return null;
                                        }
                                        // 延迟刷新界面
                                    }}
                               ></div>
                       </div>
                   </div>
               </div>   
               }
               {/* 提交修改金额结果 */}
                 {
                    !this.state.isAlert?null:<div className="Alert-container" id="Alert-container" >
                    <div className="Alert-child-container" >
                        <div className="Alert-child">
                        {/*  eslint-disable-next-line  */}
                            {orderStatus.status=="0"?"修改成功！":orderStatus.msg}     
                        </div>
                        <div className="Alert-btn">
                                <div
                                    onClick={()=>{
                                        //重新拉取数据
                                        fetch(`${api}/replace_payment/myInfo?user_id=${this.props.data.user_id}`,{
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
        </Recharge>
    }
}