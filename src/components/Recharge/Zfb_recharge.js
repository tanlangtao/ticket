import React from "react";
import Recharge  from "../../container/Recharge";
import "./Zfb.less"; 
import {toggleSlide} from "../Withdraw_cash/config"
const api="http://111.231.57.144:8081/api"
export default class Zfb_recharge extends React.Component{
    constructor(props){
        super(props);
        this.state={
            //充值金额
            money:0,
            // 默认选中渠道信息
            channel_type:1,
            channel_val:7,
            channel_name:"银河支付宝",
            min_amount:"300",
            max_amount:"5000",
            isAlert:false,
            current:1
        }
        // props.dispatch({"type":"homeModel/getZfbResults"})
        fetch(`${api}/payment/aliPayPaymentIndex`,{
            method:"GET"
        }).then((data)=>data.json())
        .then((responseJson)=>{
            this.setState({
                zfbresults:responseJson
            })
        })
        .catch((error) =>{
            alert(error)
        })
    }
    setPath(val){
        this.props.setProps(val)
    }
    componentWillUnmount(){
        this.setState = (state,callback)=>{
          return;
        };
    }
    render(){ 
        const{user_id,nick_name,client,proxy_id,proxy_name,from_brand} =this.props.data;
        // //results,保存支付渠道信息，orderStatus支付宝支付状态
        const {zfbresults} =this.state;
        if(zfbresults){
            var dataList = zfbresults.data;
        }else{
             // eslint-disable-next-line 
            var dataList =[]
        }
        return  <Recharge current="2" setPath={this.setPath.bind(this)}>
                    <div className="ZfbBox1">
                        <div className="ZfbBox1_child1">
                            <p className="WordArt">渠道</p>
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}}>
                                {/* 下拉框 */}
                                <form action="" method="post" > 
                                    <div id="divselect" > 
                                        <cite id="cite"
                                             onClick={()=>{
                                                toggleSlide('selectUl','500','120')
                                            }}
                                        >支付宝支付1</cite> 
                                        <ul style={{display:"none"}} id="selectUl"> 
                                        {
                                            dataList.map((item,index)=>{
                                                return  <li key={index}
                                                    onClick={()=>{
                                                        document.getElementById("selectUl").style.display="none";
                                                        document.getElementById("cite").innerHTML=`支付宝支付${index+1}`
                                                        this.setState({
                                                            current:index+1,
                                                            channel_type:item.channel_type,
                                                            channel_val:item.channel_val,
                                                            max_amount:item.max_amount,
                                                            min_amount:item.min_amount,
                                                        })
                                                    }}
                                                     // eslint-disable-next-line 
                                                ><a href="javascript:;" selectid={index+1}>{`支付宝支付${index+1}`}</a></li>
                                            })
                                        }
                                        </ul> 
                                        
                                    </div> 
                                    <input name="" type="hidden" value="" id="inputselect"/> 
                                </form> 
                                <i style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/1.png)"}}></i>
                            </div>
                        </div>
                        <div  className="ZfbBox1_child2" >
                            <p className="WordArt">充值金额</p>
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}}>
                                <input id="userInput" type="number" placeholder="请输入充值金额"
                                    autoComplete="off"
                                    onChange={(e)=>{
                                        this.setState({
                                            "money":e.target.value
                                        })
                                    }}
                                />
                                {/* 点击清空金额 */}
                                <i style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/75.png)"}}
                                    onClick={()=>{
                                        this.setState({
                                            money:0
                                        })
                                        document.getElementById("userInput").value=""
                                    }}
                                        
                                ></i>
                            </div>
                            <span>（充值范围：{this.state.min_amount}-{this.state.max_amount}）</span>
                        </div>
                    </div>
                    <div className="ZfbBox2">
                        <div className="ZfbBox2_child1 WordArt"  
                        >
                        常用金额
                        </div>
                        <div className="ZfbBox2_child2">
                        {
                            dataList.map((item,index)=>{
                                //  eslint-disable-next-line 
                                return this.state.current == index+1?
                                        item.random_amount.map((item,index)=>{
                                        return <p style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/5copy.png)"}} 
                                                    key={index}
                                                    id={`p${index}`}
                                                    onTouchStart={()=>{
                                                        this.setState({
                                                            money:Number(this.state.money)+Number(item)
                                                        })
                                                        document.getElementById(`p${index}`).style.backgroundImage=`url(${process.env.PUBLIC_URL}/images/5.png)`
                                                    }}
                                                    onTouchEnd={()=>{
                                                        document.getElementById("userInput").value=this.state.money;
                                                        document.getElementById(`p${index}`).style.backgroundImage=`url(${process.env.PUBLIC_URL}/images/5copy.png)`
                                                    }}
                                                >
                                            <img width="30%" src={process.env.PUBLIC_URL+"/images/jinbi.png"} alt=""/>
                                            <span>+{item}</span>
                                        </p>
                                    })
                                :null
                            })
                        }
                        </div>
                    </div>
                    <div className="ZfbBox3" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/dd8.png)"}}
                         onClick={()=>{
                             if(this.state.money>= Number(this.state.min_amount)&&this.state.money<=Number(this.state.max_amount)){
                                // eslint-disable-next-line 
                                this.state.channel_type==1
                                    // 返回paymentResults
                                    ? 
                                        fetch(`${api}/payment/payment?user_id=${user_id}&nick_name=${nick_name}&payment_amount=${this.state.money}&channel_type=${this.state.channel_type}&channel_val=${this.state.channel_val}&channel_name=${this.state.channel_name}&client=${client}&proxy_id=${proxy_id}&proxy_name=${proxy_name}&from_brand=${from_brand}`,{
                                            method:"GET"
                                        }).then((data)=>data.json())
                                        .then((responseJson)=>{
                                            this.setState({
                                                paymentResults:responseJson
                                            })
                                            window.open(responseJson.data.url,["_blank"]
                                            )
                                        })
                                        .catch((error) =>{
                                            alert(error)
                                        })
                                    : window.open(`${api}/payment/payment?user_id=${user_id}&nick_name=${nick_name}&payment_amount=${this.state.money}&
                                        channel_type=${this.state.channel_type}&channel_val=${this.state.channel_val}&channel_name=${this.state.channel_name}&
                                        client=${client}&proxy_id=${proxy_id}&proxy_name=${proxy_name}&from_brand=${from_brand}`,["_blank"]
                                        )
                             }else{
                                this.setState({
                                    isAlert:true
                                })
                             }
                           
                        }}
                    >
                    <span>确认充值</span>
                    </div> 
                    {/* 弹窗 */}
                    {
                        !this.state.isAlert?null:<div className="Alert-container" id="Alert-container" >
                        <div className="Alert-child-container" >
                            <div className="Alert-child">
                                充值金额需符合充值范围！     
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
        </Recharge> 
    }
}