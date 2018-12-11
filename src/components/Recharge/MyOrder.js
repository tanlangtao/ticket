import React from "react";
import Recharge from "../../container/Recharge";
import "./MyOrder.less";
import {toggleSlide} from "../Withdraw_cash/config";
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
export default class MyOrder extends React.Component{
    constructor(props){
        super(props);
        this.state={
            page:1,
            "isShow":false,
            recharge_id:"",
            order_id:'',
            order_status:0,
            //输入上分金额
            input_money:0,
            shangfenId:""
        }
        fetch(`${api}/order/orderList?replace_id=${this.props.data.user_id}&recharge_id=${this.state.recharge_id}&order_status=${this.state.order_status}&page=${this.state.page}&page_set=5`,{
            method:"GET"
        }).then((data)=>data.json())
        .then((responseJson)=>{
            this.setState({
                results:responseJson,
                myOrderList:responseJson.data.list
            })
        })
        .catch((error) =>{
            alert(error)
        })
    }
    setPath(val){
        this.props.setProps(val)
    }
    showAlert(value){
        this.setState({
            isShow:true
        })
    }
    hideAlert(){
        this.setState({
            isShow:false
        })
    }
    render(){
        const{user_id} =this.props.data;
        var {results,myOrderList,upScorestatus}=this.state;
        if(results){
            // eslint-disable-next-line 
            var totalPage = results.data.total_page ==0?1:results.data.total_page;
        }else{
            // eslint-disable-next-line 
            var totalPage = 1;
        }
        const height= window.screen.height;
        var dataList =[
            "全部",
            "未完成",
            "已完成"
        ]
        return  <Recharge current="1" setPath={this.setPath.bind(this)}>
            <div className="MyDctitle">
                <div style={{backgroundImage:`url(${process.env.PUBLIC_URL}/images/newbtn.png)`}}
                    className="publicbtn"
                    onTouchEnd={()=>{
                        this.props.setProps("#/")
                    }}
                ><span>返 回</span></div>
                <div style={{backgroundImage:`url(${process.env.PUBLIC_URL}/images/wodefda.png)`}}></div>
                <div style={{backgroundImage:`url(${process.env.PUBLIC_URL}/images/wodedajoicjoi.png)`}}
                    onTouchEnd={()=>{
                        this.props.setProps("#/recharge/MyDc")
                    }}
                ></div>
            </div>
            <div className="MyOrderBgWhite" >
                <div className="MyOrderBgWhite_child1">
                    <div className="MyOrderBgWhite_child1_child1"
                        style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/fjdsalohfid.png)"}}>
                        <input type="text" placeholder="输入ID"
                            maxLength="10"
                            onInput={(e)=>{
                                e.target.value= e.target.value.match(/\d+(\.\d{0,2})?/) ? e.target.value.match(/\d+(\.\d{0,2})?/)[0] : ''
                            }}
                            onChange={(e)=>{
                                this.setState({
                                    recharge_id:e.target.value
                                })
                            }}
                        />
                    </div>
                    <div  className="MyOrderBgWhite_child1_select" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/fjdsalohfid.png)"}}>
                                <form action="" method="post" > 
                                    <div id="divselect" > 
                                        <cite id="cite"
                                               onClick={()=>{
                                                toggleSlide('selectUl','500','80')
                                            }}
                                        >全部</cite> 
                                        <ul id="selectUl" style={{display:"none"}} > 
                                        {
                                            dataList.map((item,index)=>{
                                                return  <li key={index}
                                                    onClick={()=>{
                                                        document.getElementById("selectUl").style.display="none"
                                                        document.getElementById("cite").innerHTML=item;
                                                        this.setState({
                                                            order_status:index
                                                        })
                                                    }}
                                                    // eslint-disable-next-line 
                                                ><a href="javascript:;" selectid={index+1}>{item}</a></li>
                                            })
                                        }
                                        </ul> 
                                        
                                    </div> 
                                    <input name="" type="hidden" value="" id="inputselect"/> 
                                </form> 
                                <i style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/xialade.png)"}}></i>
                            </div>
                    <div
                        className="MyOrderBgWhite_child1_child3 publicbtn"
                        style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/anniud.png)"}}
                        onClick={()=>{
                            this.setState({
                                page:1
                            })
                            fetch(`${api}/order/orderList?replace_id=${this.props.data.user_id}&recharge_id=${this.state.recharge_id}&order_status=${this.state.order_status}&page=1&page_set=5`,{
                                method:"GET"
                            }).then((data)=>data.json())
                            .then((responseJson)=>{
                                this.setState({
                                    results:responseJson,
                                    myOrderList:responseJson.data.list
                                })
                            })
                            .catch((error) =>{
                                alert(error)
                            })
                        }}
                    > <span>搜 索</span></div>
                </div>
                <div className="MyOrderBgWhite_child2">
                    <div className="WordArt">ID</div>
                    <div className="WordArt">昵称</div>
                    <div className="WordArt">状态</div>
                    <div className="WordArt">应上金额</div>
                    <div className="WordArt">实上金额</div>
                    <div className="WordArt">创建时间</div>
                </div>
                {/* 动态展示列表 */}
                <div 
                    className="MyOrderBgWhite_child3"
                    style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/gezi5.png)"}}>
                    {
                        // eslint-disable-next-line
                        myOrderList==undefined?"":myOrderList.map((item,index)=>{
                            return <div className="orderlist" key={index}>
                                        <div>{item.recharge_id}</div>
                                        <div>{item.recharge_name}</div>
                                        {/* eslint-disable-next-line  */}
                                        <div>{item.status==0 ? "支付中":(item.status==1?"已完成":(item.status==2?"已过期":"已撤销"))}</div>
                                        <div>{parseInt(item.must_amount)}</div>
                                        <div>{parseInt(item.actual_amount)}</div>
                                        <div>{timestampToTime(item.created_at)}</div>
                                        <div id="shangfenBtn"
                                            onClick={()=>{
                                                this.showAlert()
                                                this.setState({
                                                    shangfenId:item.recharge_id,
                                                    order_id:item.order_id
                                                })
                                            }}
                                        >{
                                            // eslint-disable-next-line 
                                            item.status==0 ? <img src={process.env.PUBLIC_URL+"/images/shangfen.png"} 
                                                                style={{width:"100%"}}
                                            alt=""/> :""
                                        }</div>
                                </div>
                        })
                    }
                </div>
                <div className="MyOrderBgWhite_child4">
                    {/* 上一页 */}
                    <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/shangyiye.png)"}}
                           onClick={()=>{
                            if(this.state.page >1){
                                this.setState({
                                    page:this.state.page-1
                                })
                                fetch(`${api}/order/orderList?replace_id=${this.props.data.user_id}&recharge_id=${this.state.recharge_id}&order_status=${this.state.order_status}&page=${this.state.page-1}&page_set=5`,{
                                    method:"GET"
                                }).then((data)=>data.json())
                                .then((responseJson)=>{
                                    this.setState({
                                        results:responseJson,
                                        myOrderList:responseJson.data.list
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
                    {/* eslint-disable-next-line  */}
                    <div>{this.state.page}/{totalPage==0?1:totalPage}</div>
                    {/* 下一页 */}
                    <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/xiayiydie.png)"}}
                        onClick={()=>{
                            if(this.state.page<totalPage){
                                this.setState({
                                    page:this.state.page+1
                                })
                                fetch(`${api}/order/orderList?replace_id=${this.props.data.user_id}&recharge_id=${this.state.recharge_id}&order_status=${this.state.order_status}&page=${this.state.page+1}&page_set=5`,{
                                    method:"GET"
                                }).then((data)=>data.json())
                                .then((responseJson)=>{
                                    this.setState({
                                        results:responseJson,
                                        myOrderList:responseJson.data.list
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
                  {/* 上分弹窗 */}
            {
                !this.state.isShow?null : <div className="MyOrder-container" id="MyOrder-container"  style={{width:`${height*1.775}px`,height:`${height}px`}}>
                <div className="MyOrder-child-container" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/fdhsaoi;bo;idf.png)"}}>
                        <div className="Alert2-title">
                        </div>
                    <div className="MyOrder-child">
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/gantanhao.png)"}}></div>
                            <div  className="WordArt">
                                上分金额
                            </div>
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/fjdsalohfid.png)"}} >
                                <input type="number" 
                                    onChange={(e)=>{
                                        this.setState({
                                            input_money:e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div className="WordArt">
                            角色ID
                            </div>
                            <div >
                                {this.state.shangfenId}
                            </div>
                    </div>
                    <div className="MyOrder-btn1">
                            <div id="MyOrder_cancleBtn" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/dfhio;as.png)"}}
                                onClick={()=>{
                                    this.hideAlert();
                                }}
                            >  
                            </div>
                            <div id="MyOrder_confrim"  style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/uiehfoia.png)"}}
                                onClick={()=>{
                                    //返回status
                                    fetch(`${api}/replace_payment/addScore?recharge_id=${this.state.shangfenId}&replace_id=${user_id}&amount=${this.state.input_money}&order_id=${this.state.order_id}`,{
                                        method:"GET"
                                    }).then((data)=>data.json())
                                    .then((responseJson)=>{
                                        this.setState({
                                            upScorestatus:responseJson
                                        })
                                        this.hideAlert();
                                        this.setState({
                                            isAlert:true
                                        })
                                    })
                                    .catch((error) =>{
                                        alert(error)
                                    })
                                }}
                            >
                            </div>
                    </div>
                </div>
            </div>  
            }
            {/* 上分结果弹窗 */}
             {
                    !this.state.isAlert?null:<div className="Alert-container" id="Alert-container" >
                    <div className="Alert-child-container" >
                        <div className="Alert-child">
                        {/*  eslint-disable-next-line  */}
                            {upScorestatus.status=="0"?"上分成功！":upScorestatus.msg}     
                        </div>
                        <div className="Alert-btn">
                                <div
                                    onClick={()=>{
                                        //重新拉取数据
                                        fetch(`${api}/order/orderList?replace_id=${this.props.data.user_id}&recharge_id=${this.state.recharge_id}&order_status=${this.state.order_status}&page=${this.state.page}&page_set=5`,{
                                            method:"GET"
                                        }).then((data)=>data.json())
                                        .then((responseJson)=>{
                                            this.setState({
                                                results:responseJson,
                                                myOrderList:responseJson.data.list,
                                                isAlert:false
                                            })
                                        })
                                        .catch((error) =>{
                                            alert(error)
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
