import React from 'react'
import '../Recharge/History.less'
import '../../container/Recharge.less';
const api="http://111.231.57.144:8081/api"
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
export default class History_withdrawCash extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            current: 0,
            page:1,
            "order_status":0,
            page_set:8,
            // eslint-disable-next-line 
            order_status:0
        }
        fetch(`${api}/order/withDrawOrderList?user_id=${this.props.data.user_id}&order_status=${this.state.order_status}&page=${this.state.page}&page_set=${this.state.page_set}`,{
            method:"GET"
        }).then((data)=>data.json())
        .then((responseJson)=>{
            this.setState({
                withDrawCashHistory:responseJson,
                withDrawOrderList:responseJson.data.list
            })
        })
        .catch((error) => {
            alert(error)
        })
    }
    componentWillUpdate(){
    }
    render(){
        // eslint-disable-next-line 
        const {user_id} = this.props.data;
        const {withDrawOrderList,withDrawCashHistory} = this.state;
        // eslint-disable-next-line 
        if(withDrawCashHistory){
            var list = withDrawOrderList
            // eslint-disable-next-line 
            var totalpage = withDrawCashHistory.data.total_page==0?1: withDrawCashHistory.data.total_page;
        }else{
            // eslint-disable-next-line 
            var list =[];
            // eslint-disable-next-line 
            var totalpage=1;
        }
        return <div className = "RechargeBox" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/bg.jpg)"}}>
                    {/* child1 */}
                    <div className="RechargeBox_child1">
                        <div style = {{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/fanhui.png)"}} 
                            onClick={()=>{
                                this.props.setProps("#/withdrawCash/dh")
                            }}
                        >
                        </div>
                        <div style = {{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/26.png)"}} 
                            className="child_title"                    
                        >   
                            <div style = {{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/title_dhjl.png)",width:"50%"}}
                                
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
                                    fetch(`${api}/order/withDrawOrderList?user_id=${user_id}&order_status=0&page=${this.state.page}&page_set=${this.state.page_set}`,{
                                        method:"GET"
                                    }).then((data)=>data.json())
                                    .then((responseJson)=>{
                                        this.setState({
                                            withDrawCashHistory:responseJson,
                                            withDrawOrderList:responseJson.data.list
                                        })
                                    })
                                    .catch((error) => {
                                        alert(error)
                                    })
                                    document.getElementById("all").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/navBtnCur.png)";
                                    document.getElementById("success").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/btn1.png)"
                                    document.getElementById("noSuccess").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/btn1.png)"
                                }}
                                // eslint-disable-next-line 
                                className={this.state.current=="0"?"cur":""}
                                id="all"
                                >
                                <span>全部</span>
                            </div> 
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/btn1.png)"}}
                                 onClick={()=>{
                                    this.setState({
                                        page:1,
                                        current: 1,
                                        order_status:4
                                    })
                                    fetch(`${api}/order/withDrawOrderList?user_id=${user_id}&order_status=4&page=${this.state.page}&page_set=${this.state.page_set}`,{
                                        method:"GET"
                                    }).then((data)=>data.json())
                                    .then((responseJson)=>{
                                        this.setState({
                                            withDrawCashHistory:responseJson,
                                            withDrawOrderList:responseJson.data.list
                                        })
                                    })
                                    .catch((error) => {
                                        alert(error)
                                    })
                                    document.getElementById("all").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/btn1.png)";
                                    document.getElementById("success").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/navBtnCur.png)";
                                    document.getElementById("noSuccess").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/btn1.png)"
                                }}
                                // eslint-disable-next-line 
                                className={this.state.current=="1"?"cur":""}
                                id="success"
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
                                    fetch(`${api}/order/withDrawOrderList?user_id=${user_id}&order_status=1&page=${this.state.page}&page_set=${this.state.page_set}`,{
                                        method:"GET"
                                    }).then((data)=>data.json())
                                    .then((responseJson)=>{
                                        this.setState({
                                            withDrawCashHistory:responseJson,
                                            withDrawOrderList:responseJson.data.list
                                        })
                                    })
                                    .catch((error) => {
                                        alert(error)
                                    })
                                    document.getElementById("all").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/btn1.png)";
                                    document.getElementById("success").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/btn1.png)";
                                    document.getElementById("noSuccess").style.backgroundImage="url("+process.env.PUBLIC_URL+"/images/navBtnCur.png)"
                                }}
                                // eslint-disable-next-line 
                                className={this.state.current=="2"?"cur":""}
                                id="noSuccess"
                                >
                                <span>未成功</span>
                            </div>
                        </div>
                        <div className="child_content" >
                           <div className="inner_box">
                           <div className="historyWhite">
                                <div className="history_BgWhite_child1">
                                        <div  className="WordArt" >金额</div>
                                        <div  className="WordArt">费用</div>
                                        <div  className="WordArt">到账金额</div>
                                        <div  className="WordArt">状态</div>
                                        <div  className="WordArt">提现时间</div>
                                        <div  className="WordArt">到账时间</div>
                                        <div  className="WordArt">备注</div>
                                    </div>
                                    <div
                                        id="history_BgWhite_child2"
                                        className="history_BgWhite_child2"
                                        style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/gezi8.png)" }}>
                                        {
                                            // eslint-disable-next-line 
                                            list==undefined ?"":list.map((item, index) => {
                                                return <div className="history_orderlist" key={index}>
                                                    <div>{parseInt(item.amount)}</div> 
                                                    <div>{parseInt(item.amount-item.arrival_amount)}</div> 
                                                    <div>{parseInt(item.arrival_amount)}</div> 
                                                    {/*eslint-disable-next-line  */}
                                                    <div>{item.status==4 ? "已成功":"未成功"}</div> 
                                                    <div>{timestampToTime(item.created_at)}</div> 
                                                    {/*eslint-disable-next-line  */}
                                                    <div>{item.updated_at=="0"?"无":timestampToTime(item.updated_at)}</div> 
                                                    <div>{item.temarks}</div> 
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
                                                }else{
                                                    return null
                                                }
                                                fetch(`${api}/order/withDrawOrderList?user_id=${user_id}&order_status=${this.state.order_status}&page=${this.state.page-1}&page_set=${this.state.page_set}`,{
                                                    method:"GET"
                                                }).then((data)=>data.json())
                                                .then((responseJson)=>{
                                                    this.setState({
                                                        withDrawCashHistory:responseJson,
                                                        withDrawOrderList:responseJson.data.list
                                                    })
                                                })
                                                .catch((error) => {
                                                    alert(error)
                                                })
                                            }}
                                        ></div>
                                        <div>{this.state.page}/{totalpage}</div>
                                        <div style={{backgroundImage:'url('+process.env.PUBLIC_URL+'/images/xiayiydie.png)'}}
                                            onClick={()=>{
                                                if(this.state.page<totalpage){
                                                    this.setState({
                                                        page:this.state.page+1
                                                    })
                                                    fetch(`${api}/order/withDrawOrderList?user_id=${user_id}&order_status=${this.state.order_status}&page=${this.state.page+1}&page_set=${this.state.page_set}`,{
                                                        method:"GET"
                                                    }).then((data)=>data.json())
                                                    .then((responseJson)=>{
                                                        this.setState({
                                                            withDrawCashHistory:responseJson,
                                                            withDrawOrderList:responseJson.data.list
                                                        })
                                                    })
                                                    .catch((error) => {
                                                        alert(error)
                                                    })
                                                }else{
                                                    return null;
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
