import React from "react";
import Recharge  from "../../container/Recharge";
import "./Dc.less";
function formatDuring(countDown) {
    let m =parseInt(Number(countDown)/60%60);
    let s =parseInt(Number(countDown)%60);
    return '00:'+m+':'+s
}
const api="http://111.231.57.144:8081/api"
export default class Dc_recharge extends React.Component{
    constructor(props){
        super(props);
        this.state={
            "money":0,
            "time":0,
            "showOrder":false,
            "true":false,
            "isAlert":"",
            "removeDcOrderResults":"",
        }
        // 请求代充首页接口
       fetch(`${api}/replace_payment/index?user_id=${this.props.data.user_id}`,{
            method:"GET",
        }).then((data)=>data.json())
        .then((responseJson)=>{
            this.setState({
                results:responseJson
            })
            var createdTime=Number(responseJson.data.created_at)
            let nowTime=Math.round(new Date().getTime()/1000);
            let countDown= 1800 -(nowTime-createdTime)
            this.setState({
                time:countDown
            })
        })
        .catch((error) => {
            alert(error)
        })
        //定时器
        clearInterval(this.timer)
        this.timer = setInterval(()=>{
           this.setState({
               time:this.state.time-1
           })
       },1000)
    }
    setPath(val){
        this.props.setProps(val)
    }
    componentDidMount(){
        document.getElementById("p2").style.display="none";
        const {results} = this.state;
       
        if(!results){
            return null;
        }  
        
    }

    componentWillUnmount(){
        clearInterval(this.timer)
        this.setState = (state,callback)=>{
            return;
        };
    }
    showOrder(){
        this.setState({
            showOrder:true
        })
    }
    hideOrder(){
        this.setState({
            showOrder:false
        })
    }
    czBtn(){
        // eslint-disable-next-line 
        if(this.state.results.data.is_undone=='1'){ 
            this.showOrder()
        }else{
            this.props.setMoney(this.state.money)
            this.props.setProps("#/recharge/list")
        }
    }
    render(){

        const {user_id}=this.props.data;
        const {results,removeDcOrderResults} = this.state;
       
        if(results){
            // 变量判断代充
            // eslint-disable-next-line 
            var is_replace= results.data.is_replace==1 ? true:false;
        } 
        return  <Recharge current="1"  setPath={this.setPath.bind(this)}>
                <div className="dcBody">
                    <p className="dcP1">说明：充值金额必须与转账金额一致</p>
                    <div className="userInput">
                        <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}}> 
                            <input  id="userInput" type="text" placeholder="请输入充值金额"
                                maxLength="7"
                                autoComplete="off"
                                onChange={(e)=>{
                                    var reg=/^[1-9].*$/
                                    var money=e.target.value
                                    // eslint-disable-next-line 
                                    if(e.target.value==""){
                                        document.getElementById("p2").style.display="none";
                                        
                                    }else if(reg.test(money)){
                                        document.getElementById("p2").style.display="none";
                                    this.setState({
                                        "money":money
                                    })
                                    }else {
                                        document.getElementById("p2").style.display="block";
                                    }
                                }}
                            />
                        </div>
                        <p className="deleBtn" onTouchStart={()=>{
                            document.getElementById("userInput").value="";
                            document.getElementById("p2").style.display="none";
                        }}><img src={process.env.PUBLIC_URL+"/images/75.png"} alt=""></img>    </p>
                    </div>
                    <p id="p2" style={{display:"none"}} className="dcP2" >您输入的金额有误</p>
                    {/* 充值按钮 */}
                    <p style={{backgroundImage: "url("+process.env.PUBLIC_URL+"/images/dd8.png)"}}
                         className="czBtn" 
                         onClick={()=>{
                            if(this.state.money>0){
                                this.czBtn()
                            }else{
                                return null
                            }
                        }}
                    ><span>确认充值</span></p>
                    <p className="dcP3">
                        如果充值后30分钟内未到账，请及时联系客服
                    </p>
                </div>
             {/* 判断是否当前账号是不是代充 */}
             {
                is_replace ?
                    <p className="czBtn2 publicbtn" style={{backgroundImage: "url("+process.env.PUBLIC_URL+"/images/newbtn.png)"}} 
                        onTouchEnd={()=>{
                            this.props.setProps("#/recharge/MyDc")
                        }}
                    >
                    <span>我的代充</span>
                    </p>
                    :<p className="czBtn2 publicbtn" style={{backgroundImage: "url("+process.env.PUBLIC_URL+"/images/newbtn.png)"}} 
                        onTouchEnd={()=>{
                            this.props.setProps("#/recharge/Apply_for")
                        }}
                    >
                    <span>成为代充</span>
                    </p>
                }   
            {/* 订单撤销弹窗 */}
            {
                this.state.showOrder ? <div className="div-container" id="div-container" >
                    <div className="div-child-container" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/fdhsaoi;bo;idf.png)"}}>
                        <div className="div-child">
                                <div 
                                    className="div-child_child1"
                                    style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/gantanhao.png)" ,fontSize:"8px"}} >
                                    您有一笔{parseInt(results.data.amount)}元的代理订单待完成，是否立即撤销
                                </div>
                                <div className="div-child_child2"
                                >
                                    <span className="WordArt">自动撤单倒计时:</span>
                                    <span>{formatDuring(this.state.time)}</span>
                                </div>
                        </div>
                        <div className="my-btn">
                                <div id="cancleBtn" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/dfhio;as.png)"}}
                                    onTouchEnd={()=>{
                                        this.hideOrder()
                                    }}
                                >
                                    
                                </div>
                                <div id="confrim" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/uiehfoia.png)"}}
                                    onTouchEnd={()=>{
                                        this.hideOrder()
                                        // 取消订单接口,返回结果status
                                        fetch(`${api}/Order/cancelOrder?recharge_id=${user_id}&order_id=${results.data.order_id}`,{
                                            method:"GET"
                                        }).then((data)=>data.json())
                                        .then((responseJson)=>{
                                            this.setState({
                                                removeDcOrderResults:responseJson
                                            })
                                        })
                                        .catch((error) => {
                                            alert(error)
                                        })
                                        setTimeout(()=>{ 
                                            // 延迟请求代充首页接口，刷新界面
                                            fetch(`${api}/replace_payment/index?user_id=${this.props.data.user_id}`,{
                                                method:"GET",
                                            }).then((data)=>data.json())
                                            .then((responseJson)=>{
                                                this.setState({
                                                    results:responseJson
                                                })
                                            })
                                            .catch((error) => {
                                                alert(error)
                                            })
                                        },500)
                                        this.setState({
                                            isAlert:true
                                        })
                                    }}
                                >
                                
                                </div>
                            </div>
                        </div>
                    </div>
                :""
            }
             {/* 弹窗 */}
             {
                    !this.state.isAlert?null:<div className="Alert-container" id="Alert-container" >
                    <div className="Alert-child-container" >
                        <div className="Alert-child">
                        {/* eslint-disable-next-line  */}
                            {removeDcOrderResults.status==0?"撤销成功":removeDcOrderResults.msg}     
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
