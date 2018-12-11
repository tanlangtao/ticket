import React from "react";
import Recharge from "../../container/Recharge";
import "./List.less";
import {CopyToClipboard} from 'react-copy-to-clipboard';
const api="http://111.231.57.144:8081/api";
export default class List_recharge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results:"",
            money:props.money,
            bulidScoresOrderResults:"",
            show: false,
            //详情
            details: '',
            isShowFZ:false,
            type:'',
            info:'',
            //代充Id
            replace_id:0,
            //代充昵称
            recharge_name:"",
            page:1,
            isAlert:false
        }
        fetch(`${api}/replace_payment/replacePaymentList?amount=${this.props.money}&page=${this.state.page}&from_brand=${this.props.data.from_brand}&user_id=${this.props.data.user_id}`,{
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
    //显示详情弹窗
    showAlert(details) {
        this.setState({ show: true, details })
    }
    //隐藏详情弹窗
    hideAlert() {
        this.setState({ show: false })
    }
    showFzAlert(type,info,user_id,nick_name){
        this.setState({ isShowFZ: true,type,info,"replace_id":user_id,"replace_name":nick_name })
    }
    hideFzAlert() {
        this.setState({ isShowFZ: false })
    }
    render() {
        const {user_id,nick_name, client,proxy_id,proxy_name,from_brand} = this.props.data;
        const { results,bulidScoresOrderResults} = this.state;
        if (results) {
            var List =results.data.list
            var totalPage=results.data.total_page?results.data.total_page:"1"
        }else {
            // eslint-disable-next-line 
            var totalPage=1;
            // eslint-disable-next-line 
            var List =""
        }
        const height= window.screen.height;
        return <Recharge current="1" setPath={this.setPath.bind(this)}>
            <div className="ListTitle">
                <div style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/newbtn.png)" }}
                    onTouchEnd={() => {
                        this.props.setProps("#/")
                    }}
                    className="publicbtn"
                ><span>返 回</span></div>
                <div style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/daichonglieb.png)" }}></div>

            </div>
            <div className="List_rechargeBgWhite" >
                <div className="List_rechargeBgWhite_child1">
                    <div className="WordArt">昵称</div>
                    <div className="WordArt">联系方式</div>
                    <div className="WordArt">详情</div>
                    <div className="WordArt" >24小时充值人数</div>
                </div>
                {/* 动态展示列表 */}
                <div
                    id="List_rechargeBgWhite_child2"
                    className="List_rechargeBgWhite_child2"
                    style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/28fcopy.png)"}}
                >
                    {
                        // eslint-disable-next-line 
                         List=="undefined"|| List.length==0? "": List.map((item, index) => {
                            return <p className="orderlist" key={index}>
                                <span>{item.nick_name}</span>
                                {/* eslint-disable-next-line  */}
                                <span>{item.contact_type == "1" ? "QQ" : "微信"}{item.contact_info}</span>
                                <span 
                                    onClick={(type,info) => this.showFzAlert(item.contact_type,item.contact_info,item.user_id,item.nick_name)}
                                >
                                     <CopyToClipboard text={item.contact_info}
                                    
                                        onCopy={this.onCopy}
                                    >
                                        <img src={process.env.PUBLIC_URL+"/images/fuzhid.png"}
                                            style={{ width: "100%" ,marginTop:"10%"}}
                                            alt="" />
                                    </CopyToClipboard>
                                   
                                </span>
                                {/*eslint-disable-next-line  */}
                                <span>{item.is_replace=="1" ? item.details.slice(0,4):"" }</span>
                                {/*eslint-disable-next-line  */}
                                <span id="xiangQingBtn" onClick={(details) => this.showAlert(item.details)}>{item.is_replace=="1" ? "更多详情":""}</span>
                                <span>{item.recharge_total}</span>
                            </p>
                        })
                     
                    }
                    
                </div>
                <div className="List_rechargeBgWhite_child3">
                    {/* 翻页 */}
                    <div style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/shangyiye.png)" }}
                          onClick={()=>{
                            if(this.state.page >1){
                                this.setState({
                                    page:this.state.page-1
                                })
                                fetch(`${api}/replace_payment/replacePaymentList?amount=${this.props.money}&page=${this.state.page-1}&from_brand=${this.props.data.from_brand}&user_id=${this.props.data.user_id}`,{
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
                            }else{
                                return null
                            }
                        }}
                    ></div>
                    <div>{this.state.page}/{totalPage}</div>
                    <div style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/xiayiydie.png)" }}
                        onClick={()=>{
                            if(this.state.page<totalPage){
                                this.setState({
                                    page:this.state.page+1
                                })
                                fetch(`${api}/replace_payment/replacePaymentList?amount=${this.props.money}&page=${this.state.page+1}&from_brand=${this.props.data.from_brand}&user_id=${this.props.data.user_id}`,{
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
                            }else{
                                return null;
                            };
                        }}
                    ></div>
                </div>
            </div>
            {/* 复制弹窗 */}
            {
                !this.state.isShowFZ ? null :<div className="list-container" id="list-container" style={{width:`${height*1.775}px`,height:`${height}px`}} >
                    <div className="list-child-container" style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/fdhsaoi;bo;idf.png)" }}>
                        <div className="Alert2-title">
                            <div>创建订单</div>
                        </div>

                        <div className="list-child">
                            <div style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/gantanhao.png)", fontSize: "8px" }}></div>
                            <div  >
                                {/*eslint-disable-next-line  */}
                                <p>您已成功复制改该代充{this.state.type=="1" ?"QQ" :"微信"}{this.state.info}</p>
                                <p>请于5分钟内联系该代充进行充值操作!</p>
                                <p>您提交的充值金额为：{this.props.money}</p>
                                <p>如代充在{"30"}分钟内未完成充值，请及时反馈客服处理</p>
                            </div>
                        </div>
                        <div className="list-btn1">
                            <div id="list_cancleBtn" style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/dfhio;as.png)" }}
                                onClick={() => this.hideFzAlert()}
                            >
                            </div>
                            <div id="list_confrim" style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/uiehfoia.png)" }}
                                onClick={()=>{
                                    this.hideFzAlert()
                                    fetch(`${api}/replace_payment/buyPoints?recharge_id=${user_id}&recharge_name=${nick_name}&replace_id=${this.state.replace_id}&replace_name=${this.state.replace_name}&client=${client}&proxy_id=${proxy_id}&proxy_name=${proxy_name}&from_brand=${from_brand}&must_amount=${this.props.money}`,{
                                        method:"GET"
                                    }).then((data)=>data.json())
                                    .then((responseJson)=>{
                                        this.setState({
                                            bulidScoresOrderResults:responseJson
                                        })
                                    })
                                    .catch((error) => {
                                    alert(error)
                                    })
                                    this.setState({
                                        isAlert:true
                                    })
                                }}
                            >

                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* 详情弹窗 */}
            {
            !this.state.show ? null :
                <div className="list-container2" id="list-container2"  style={{width:`${height*1.775}px`,height:`${height}px`}}>
                    <div className="list-child-container2" style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/fdhsaoi;bo;idf.png)" }}>
                        <div className="Alert2-title">
                            <div>代充详情</div>
                        </div>
                        <div className="list-child2">
                            <img width="8%" src={process.env.PUBLIC_URL+"/images/wenand.png"} alt="" />
                            {this.state.details}
                        </div>
                        <div className="list-btn2">
                            <div
                                id="list_cancleBtn2"
                                style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/guanbid.png)" }}
                                onClick={() => this.hideAlert()}
                            >
                            </div>
                        </div>
                    </div>
                </div>
            }
              {/* 弹窗 */}
              {
                    !this.state.isAlert?null:<div className="Alert-container" id="Alert-container" >
                    <div className="Alert-child-container" >
                        <div className="Alert-child">
                        {/*eslint-disable-next-line  */}
                            {bulidScoresOrderResults.status=="0"?"订单创建成功！":bulidScoresOrderResults.msg}     
                        </div>
                        <div className="Alert-btn">
                                <div
                                    onClick={()=>{
                                        this.props.setProps("#/")
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

