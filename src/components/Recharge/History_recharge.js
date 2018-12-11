import React from 'react'
import './History.less';
const api="http://111.231.57.144:8081/api";
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    // var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return M+D+h+m+s;
}
export default class History_Recharge extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            current: 0,
            page:1,
            order_status:0,
            page_set:8
        }
        fetch(`${api}/order/payOrderList?user_id=${this.props.data.user_id}&page_set=${this.state.page_set}&page=${this.state.page}&order_status=${this.state.order_status}`,{
            method:"GET"
        }).then((data)=>data.json())
        .then((responseJson)=>{
            this.setState({
                rechargeHistory:responseJson,
                historylist:responseJson.data.list
            })
        })
        .catch((error) =>{
            alert(error)
        })
    }
    componentWillUpdate(){
    }
    render(){
        const {user_id} =this.props.data;
        const {rechargeHistory,historylist} =this.state;
        if(rechargeHistory){
            var list =historylist;
              // eslint-disable-next-line 
            var totalpage =rechargeHistory.data.total_page==0?1:rechargeHistory.data.total_page
        }else{
              // eslint-disable-next-line 
            var totalpage =1
        }
        return <div className = "RechargeBox" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/bg.jpg)"}}>
                    {/* child1 */}
                    <div className="RechargeBox_child1">
                        <div style = {{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/fanhui.png)"}} 
                            onClick={()=>{
                                this.props.setProps("#/")
                            }}
                        >
                        </div>
                        <div style = {{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/26.png)"}} 
                            className="child_title"                    
                        >   
                            <div style = {{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/rechargehistory.png)",width:"50%"}}
                                
                            ></div>
                        </div>

                    </div>
                    <div className="RechargeBox_child2">
                        <div className="child2_nav">
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/navBtnCur.png)"}}
                                onClick={()=>{
                                    this.setState({
                                        page:1,
                                        current: 0,
                                        order_status:0
                                    })
                                    fetch(`${api}/order/payOrderList?user_id=${this.props.data.user_id}&page_set=${this.state.page_set}&page=${this.state.page}&order_status=0`,{
                                        method:"GET"
                                    }).then((data)=>data.json())
                                    .then((responseJson)=>{
                                        this.setState({
                                            rechargeHistory:responseJson,
                                            historylist:responseJson.data.list
                                        })
                                    })
                                    .catch((error) =>{
                                        alert(error)
                                    })
                                    document.getElementById("dcBtn").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/navBtnCur.png)";
                                    document.getElementById("zfbBtn").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/btn1.png)"
                                    document.getElementById("tobankBtn").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/btn1.png)"
                                }}
                                  // eslint-disable-next-line 
                                className={this.state.current=="0"?"cur":""}
                                id="dcBtn"
                                >
                                <span>全部</span>
                            </div> 
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/btn1.png)"}}
                                 onClick={()=>{
                                    this.setState({
                                        page:1,
                                        current: 1,
                                        order_status:2
                                    })
                                    fetch(`${api}/order/payOrderList?user_id=${user_id}&page_set=${this.state.page_set}&page=${this.state.page}&order_status=2`,{
                                        method:"GET"
                                    }).then((data)=>data.json())
                                    .then((responseJson)=>{
                                        this.setState({
                                            rechargeHistory:responseJson,
                                            historylist:responseJson.data.list
                                        })
                                    })
                                    .catch((error) =>{
                                        alert(error)
                                    })
                                    document.getElementById("dcBtn").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/btn1.png)";
                                    document.getElementById("zfbBtn").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/navBtnCur.png)";
                                    document.getElementById("tobankBtn").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/btn1.png)";
                                }}
                                  // eslint-disable-next-line 
                                className={this.state.current=="1"?"cur":""}
                                id="zfbBtn"
                                >
                                <span>已成功</span>
                            </div>
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/btn1.png)"}}
                                 onClick={()=>{
                                    this.setState({
                                        page:1,
                                        current: 2,
                                        order_status:1
                                    })
                                    fetch(`${api}/order/payOrderList?user_id=${user_id}&page_set=${this.state.page_set}&page=${this.state.page}&order_status=1`,{
                                        method:"GET"
                                    }).then((data)=>data.json())
                                    .then((responseJson)=>{
                                        this.setState({
                                            rechargeHistory:responseJson,
                                            historylist:responseJson.data.list
                                        })
                                    })
                                    .catch((error) =>{
                                        alert(error)
                                    })
                                    document.getElementById("dcBtn").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/btn1.png)";
                                    document.getElementById("zfbBtn").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/btn1.png)";
                                    document.getElementById("tobankBtn").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/navBtnCur.png)";
                                }}
                                  // eslint-disable-next-line 
                                className={this.state.current=="2"?"cur":""}
                                id="tobankBtn"
                                >
                                <span>未成功</span>
                            </div>
                        </div>
                        <div className="child_content" >
                           <div className="inner_box">
                           <div className="historyWhite">
                                <div className="history_BgWhite_child1_recharge">
                                        <div  className="WordArt">金额</div>
                                        <div  className="WordArt">状态说明</div>
                                        <div  className="WordArt">下单时间</div>
                                        <div  className="WordArt">到账时间</div>
                                    </div>
                                    {/* 动态展示列表 */}
                                    <div
                                        className="history_BgWhite_child2_recharge"
                                        style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/gezi8.png)" }}>
                                        {
                                              // eslint-disable-next-line 
                                            list==undefined|| list.length==0  ? "" :list.map((item, index) => {
                                                return <div className="history_orderlist_recharge" key={index}>
                                                    <div>{parseInt(item.amount)}</div>  
                                                    {/* eslint-disable-next-line  */}
                                                    <div>{item.status ==0 ? "未成功":"已成功"}</div> 
                                                    <div>{timestampToTime(item.created_at)}</div> 
                                                    {/*  eslint-disable-next-line  */}
                                                    <div>{item.updated_at=="0"?"无":timestampToTime(item.updated_at)}</div> 
                                                </div>
                                            }) 
                                        }
                                    </div>
                                    <div className="history_BgWhite_child3">
                                        <div style={{backgroundImage:'url('+process.env.PUBLIC_URL+'/images/shangyiye.png)'}}
                                            onClick={()=>{
                                                if(this.state.page>1){
                                                    this.setState({
                                                        page:this.state.page-1
                                                    })
                                                    fetch(`${api}/order/payOrderList?user_id=${user_id}&page_set=${this.state.page_set}&page=${this.state.page-1}&order_status=${this.state.order_status}`,{
                                                        method:"GET"
                                                    }).then((data)=>data.json())
                                                    .then((responseJson)=>{
                                                        this.setState({
                                                            rechargeHistory:responseJson,
                                                            historylist:responseJson.data.list
                                                        })
                                                    })
                                                    .catch((error) =>{
                                                        alert(error)
                                                    })
                                                }else{
                                                    return null
                                                }
                                            }}
                                        ></div>
                                        <div>{this.state.page}/{totalpage}</div>
                                        <div style={{backgroundImage:'url('+process.env.PUBLIC_URL+'/images/xiayiydie.png)'}}
                                            onClick={()=>{
                                                if(this.state.page<totalpage){
                                                    this.setState({
                                                        page:this.state.page+1
                                                    })
                                                    fetch(`${api}/order/payOrderList?user_id=${user_id}&page_set=${this.state.page_set}&page=${this.state.page+1}&order_status=${this.state.order_status}`,{
                                                        method:"GET"
                                                    }).then((data)=>data.json())
                                                    .then((responseJson)=>{
                                                        this.setState({
                                                            rechargeHistory:responseJson,
                                                            historylist:responseJson.data.list
                                                        })
                                                    })
                                                    .catch((error) =>{
                                                        alert(error)
                                                    })
                                                }else{
                                                    return null
                                                }
                                            }}
                                        ></div>
                                </div>
                                </div>

                           </div>
                        </div>
                    </div>
                </div>
    }
}
