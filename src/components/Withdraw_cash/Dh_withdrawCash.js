import React from "react";
import WithDrawCash  from "../../container/WithDrawCash";
import "./Dh.less";
import {toggleSlide} from "./config.js";
const api="http://111.231.57.144:8081/api"
export default class Dh_withdrawCash extends React.Component{
    constructor(props){
        super(props);
        this.state={
            //充值金额
            money:0,
            isAlert:false,
            current:1,
            withdraw_type:1,
            password:"",
            isShowAler2:false,
            isShowAler3:false,
            isShowAler4:false,
            isShowAler5:false,
            isShowAler6:false,
            pay_password:"",
            alipay_name:"",
            alipay_account:"",
            card_name:"",
            bank_num:"",
            bank_name:'',
            old_password:"",
            new_password:"",
            repeat_password:"",
            //密码验证type
            passwordTest:"",
            //提示内容
            msg:""

        }
        fetch(`${api}/with_draw/index?user_id=${this.props.data.user_id}&withdraw_type=${this.state.withdraw_type}`,{
            method:"GET"
        }).then((data)=>data.json())
        .then((responseJson)=>{
           this.setState({
                indexResults:responseJson
           })
        })
        .catch((error) => {
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
        var selectUl= document.getElementById("selectUl");
        var cite =document.getElementById("cite");
        var userInput=document.getElementById("userInput");
        const {user_id,nick_name, client,proxy_id,proxy_name,from_brand,gold} = this.props.data;
        const {indexResults} = this.state;
        if(indexResults){
            var isBind = indexResults.data.is_bind
            var is_password = indexResults.data.is_password;
              // eslint-disable-next-line 
            if(isBind == 1){
                var num =indexResults.data.bank_num ?indexResults.data.bank_num:indexResults.data.alipay_account;
            }else{
                  // eslint-disable-next-line 
                var num = "未绑定"
                
            }
        }else{
              // eslint-disable-next-line 
            var is_password =0
        }
        var dataList =[
            "支付宝",
            "银行卡",
        ]
        var dataList2 =[
            "建设银行",
            "工商银行",
            "农业银行",
            "中国银行",
        ]
        //定义变量，固定弹窗的高度
        const height= window.screen.height;
        return  <WithDrawCash current="1" setPath={this.setPath.bind(this)}>
                    <div className="DhBox1">
                        <div  className="DhBox1_child1" >
                        <i className="WordArt">主账户余额</i>
                            <div > 
                                {gold}
                            </div>
                            <p style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/btn_dh.png)"}}>
                                转账到主账户
                            </p>
                        </div>
                        <div  className="DhBox1_child2" >
                            <i className="WordArt">兑换数额</i>
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}}>
                                <input type="text" id="userInput" placeholder="输入金额"
                                    autoComplete="off"
                                    maxLength="7"
                                    onInput={(e)=>{
                                        e.target.value= e.target.value.match(/\d+(\.\d{0,2})?/) ? e.target.value.match(/\d+(\.\d{0,2})?/)[0] : ''
                                    }}
                                    onChange={(e)=>{
                                        this.setState({
                                            "money":e.target.value
                                        })
                                    }}/>
                                {/* 点击清空金额 */}
                                <span style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/75.png)"}}
                                    onClick={()=>{
                                        this.setState({
                                            money:0
                                        })
                                        userInput.value=("")
                                    }}
                                        
                                ></span>
                            </div>
                            <p style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/btn_dh.png)"}}
                                onClick={()=>{
                                    this.setState({
                                        money:gold
                                    })
                                    userInput.value=(`${gold}`)
                                }}
                            >
                                全部
                            </p>
                        </div>
                        <div className="DhBox1_child3">
                            <i className="WordArt">兑换方法</i>
                            <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}}>
                                {/* 下拉框 */}
                                <form action="" method="post" > 
                                    <div id="divselect" > 
                                        <cite id="cite" 
                                            onClick={()=>{
                                                toggleSlide('selectUl','500','60')
                                            }}
                                        >支付宝</cite> 
                                        <ul style={{display:"none"}} id="selectUl"> 
                                        {
                                            dataList.map((item,index)=>{
                                                return  <li key={index}
                                                    onClick={()=>{
                                                        selectUl.style.display="none";
                                                        cite.innerHTML=item
                                                        this.setState({
                                                            current:index+1,
                                                            withdraw_type:index+1
                                                        })
                                                        fetch(`${api}/with_draw/index?user_id=${user_id}&withdraw_type=${index+1}`,{
                                                            method:"GET"
                                                        }).then((data)=>data.json())
                                                        .then((responseJson)=>{
                                                           this.setState({
                                                            indexResults:responseJson
                                                           })
                                                        })
                                                        .catch((error) => {
                                                            alert(error)
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
                                <span style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/1.png)"}}></span>
                            </div>
                           
                        </div>
                        <div  className="DhBox1_child4" >
                            <i className="WordArt">绑定的账户</i>
                            <div > 
                            {num}
                            </div>
                            {
                                  // eslint-disable-next-line 
                                this.state.withdraw_type==1? <p style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/btn_dh.png)"}}
                                    onClick={()=>{
                                        // 如果是修改账户，需要先输入密码弹窗确认,如果密码未设置，先设置密码
                                        // eslint-disable-next-line 
                                        if(is_password==0){
                                            this.setState({
                                                isAlert:true,
                                                msg:"请先设置资金密码!"
                                            })
                                        }else{
                                            // eslint-disable-next-line 
                                            isBind==0?this.setState({
                                                isShowAler2:true
                                            })
                                            :this.setState({
                                                passwordTest:1,
                                                isShowAler5:true
                                            })
                                        }
                                    }}
                                >
                                    {
                                        // eslint-disable-next-line  
                                        isBind==0? "去绑定":"去修改"
                                    }
                                </p>:<p style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/btn_dh.png)"}}
                                    onClick={()=>{
                                        // eslint-disable-next-line 
                                        isBind==0?this.setState({
                                            isShowAler3:true
                                        })
                                        :this.setState({
                                            passwordTest:2,
                                            isShowAler5:true
                                        })
                                    }}
                                >
                                    {
                                        // eslint-disable-next-line 
                                        isBind==0? "去绑定":"去修改"
                                    }
                                </p>
                            
                            }
                           
                        </div>
                        <div  className="DhBox1_child5" >
                            <i className="WordArt">资金密码</i>
                            <div > 
                            {/* eslint-disable-next-line  */}
                            {is_password==0? "未设置":"已设置"}
                            </div>
                           {
                                // eslint-disable-next-line 
                                is_password==0
                                ?<p style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/btn_dh.png)"}}
                                onClick={()=>{
                                    this.setState({
                                        isShowAler6:true
                                        })
                                    }}
                                >
                                去设置
                                </p>
                                : <p style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/btn_dh.png)"}}
                                onClick={()=>{
                                    this.setState({
                                        isShowAler4:true
                                    })
                                }}
                                >
                                去修改
                                </p>
                           }
                        </div>
                    </div>
                  
                    <div className="DhBox3">
                        <p 
                            onClick={()=>{
                                this.props.setProps("#/withdrawCash/history")
                            }}
                        >兑换记录</p>
                        <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/dd8.png)"}}
                            onClick={()=>{
                                // eslint-disable-next-line 
                                this.state.money!=""
                                ? 
                                    this.setState({
                                        msg:"",
                                        passwordTest:3,
                                        isShowAler5:true,
                                    })
                                :this.setState({
                                    msg:"金额不能为空！",
                                    isAlert:true
                                })
                                
                            }}
                        >确认兑换</div>
                    </div> 
            {/* 提示信息弹窗 */}
            {
            !this.state.isAlert
                ?null
                :<div className="Alert-container" id="Alert-container" >
                <div className="Alert-child-container" >
                    <div className="Alert-child">
                    {/* eslint-disable-next-line  */}
                        { this.state.msg}     
                    </div>
                    <div className="Alert-btn">
                            <div
                                onClick={()=>{
                                    fetch(`${api}/with_draw/index?user_id=${user_id}&withdraw_type=${this.state.withdraw_type}`,{
                                        method:"GET"
                                    }).then((data)=>data.json())
                                    .then((responseJson)=>{
                                       this.setState({
                                            indexResults:responseJson
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
            {/* 修改支付宝账户弹窗 */}
            {
            !this.state.isShowAler2? null :
                <div className="list-container2" id="list-container2"  style={{width:`${height*1.775}px`,height:`${height}px`}}>
                    <div className="list-child-container2" style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/fdhsaoi;bo;idf.png)" }}>
                        <div className="Alert2-title">
                            <div>修改账户</div>
                            <div
                                onClick={()=>{
                                    this.setState({
                                        isShowAler2:false
                                    })
                                }}
                             >X</div>
                        </div>
                        <div className="Alert2-child">
                               <div className="Alert2-child-child1">
                                    <div className="WordArt" >
                                    姓名
                                    </div>
                                    <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}} >
                                            <input type="text" 
                                                maxLength="10"
                                                onChange={(e)=>{
                                                    this.setState({
                                                        alipay_name:e.target.value
                                                    })
                                                }}
                                            />
                                    </div>         
                            </div>
                            <div className="Alert2-child-child2">
                                <div className="WordArt" >
                                        账户
                                    </div>
                                        <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}} >
                                            <input type="text" 
                                                maxLength="20"
                                                onInput={(e)=>{
                                                    // eslint-disable-next-line 
                                                    e.target.value= e.target.value.replace(/[^\w\.\/]/ig,'');
                                                }}
                                                onChange={(e)=>{
                                                    this.setState({
                                                        alipay_account:e.target.value
                                                })
                                                
                                            }}
                                        />
                                </div>
                            </div>
                       </div> 
                        <div className="Alert2-btn1">
                            <div
                                style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/btn_dh.png)" }}
                                onClick={()=>{
                                    //绑定支付宝账户
                                    fetch(`${api}/with_draw/bindAccountPay?user_id=${user_id}&nick_name=${nick_name}&withdraw_type=1&alipay_account=${this.state.alipay_account}&alipay_name=${this.state.alipay_name}&client=${client}&proxy_id=${proxy_id}&proxy_name=${proxy_name}&from_brand=${from_brand}`,
                                    {
                                        method:"GET"
                                    }).then((data)=>data.json())
                                    .then((responseJson)=>{
                                        this.setState({
                                            zfbStatus:responseJson,
                                            isShowAler2:false
                                        })
                                        // 重新拉取数据
                                        fetch(`${api}/with_draw/index?user_id=${user_id}&withdraw_type=${this.state.withdraw_type}`,{
                                            method:"GET"
                                        }).then((data)=>data.json())
                                        .then((responseJson)=>{
                                        this.setState({
                                            indexResults:responseJson
                                        })
                                        })
                                        .catch((error) => {
                                            alert(error)
                                        })
                                    })
                                    .catch((error) => {
                                        alert(error)
                                    })
                                }}
                            >
                                绑定
                            </div>
                        </div>
                        <div className="Alert2-btn2">
                            请保持账户与名字一致，否则您将无法完成兑换
                        </div>
                    </div>
                </div>
            }
            {/* 修改银行卡账户弹窗 */}
            {
                !this.state.isShowAler3? null :
                <div className="list-container2" id="list-container2"  style={{width:`${height*1.775}px`,height:`${height}px`}}>
                        <div className="list-child-container2" style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/fdhsaoi;bo;idf.png)" }}>
                            <div className="Alert2-title">
                            {/* eslint-disable-next-line  */}
                                <div>{isBind==0?"设置账户":"修改账户"}</div>
                                <div
                                    onClick={()=>{
                                        this.setState({
                                            isShowAler3:false
                                        })
                                    }}
                                >X</div>
                            </div>
                            <div className="Alert3-child">
                                <div className="Alert3-child-child1">
                                    <div className="WordArt Alert3-child-child1_font" >
                                    姓名
                                    </div>
                                    <div
                                        className="Alert3-child-child1_div"
                                        style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}} >
                                            <input type="text" 
                                                maxLength="10"
                                                onChange={(e)=>{
                                                    this.setState({
                                                        card_name:e.target.value
                                                    })
                                                }}
                                            />
                                    </div>         
                            </div>
                                <div className="Alert3-child-child2">
                                        <div className="WordArt WordArt Alert3-child-child2_font" >
                                            账户
                                        </div>
                                        <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}}
                                            className="Alert3-child-child2_div" 
                                        >
                                                <input type="text" 
                                                    maxLength="20"
                                                    onInput={(e)=>{
                                                        e.target.value=e.target.value.replace(/[^\d]/g,'');
                                                    }}
                                                    onChange={(e)=>{
                                                        this.setState({
                                                            bank_num:e.target.value
                                                        })
                                                    
                                                }}
                                            />
                                    </div>
                                </div>
                                <div className="Alert3-child-child3">
                                        <div className="WordArt Alert3-child-child3_font" >
                                            银行名称
                                        </div>
                                        <div  className="Alert3-child-child3_select" style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}}>
                                            <form action="" method="post" > 
                                                <div id="divselect2" > 
                                                    <cite id="cite2"
                                                        onClick={()=>{
                                                            toggleSlide('selectUl2','500','100')
                                                        }}
                                                    >请选择开户行</cite> 
                                                    <ul id="selectUl2" style={{display:"none"}} > 
                                                    {
                                                        dataList2.map((item,index)=>{
                                                            return  <li key={index}
                                                                    onClick={()=>{
                                                                        document.getElementById("selectUl2").style.display="none";
                                                                        document.getElementById("cite2").innerHTML=item;
                                                                        this.setState({
                                                                            bank_name:item,
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
                                            <i style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/形状1.png)"}}></i>
                                    </div>   
                                </div>
                        </div> 
                            <div className="Alert2-btn1">
                                <div
                                    style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/btn_dh.png)" }}
                                    onClick={()=>{
                                        //绑定银行卡账户
                                        // eslint-disable-next-line 
                                        if(this.state.bank_num!=""&& this.state.bank_name!=""&& this.state.card_name!=""){
                                            fetch(`${api}/with_draw/bindAccountPay?user_id=${user_id}&nick_name=${nick_name}&withdraw_type=2&bank_name=${this.state.bank_name}&bank_num=${this.state.bank_num}&card_name=${this.state.card_name}&client=${client}&proxy_id=${proxy_id}&proxy_name=${proxy_name}&from_brand=${from_brand}`,
                                            {
                                                method:"GET"
                                            }).then((data)=>data.json())
                                            .then((responseJson)=>{
                                                this.setState({
                                                    cardStatus:responseJson,
                                                    isShowAler3:false
                                                })
                                                //重新拉取数据
                                                fetch(`${api}/with_draw/index?user_id=${user_id}&withdraw_type=${this.state.withdraw_type}`,{
                                                    method:"GET"
                                                }).then((data)=>data.json())
                                                .then((responseJson)=>{
                                                this.setState({
                                                    indexResults:responseJson
                                                })
                                                })
                                                .catch((error) => {
                                                    alert(error)
                                                })
                                            })
                                            .catch((error) => {
                                                alert(error)
                                            })
                                        }else{
                                            return null;
                                        }
                                    }}
                                >
                                    绑定
                                </div>
                            </div>
                            <div className="Alert2-btn2">
                                请保持账户与名字一致，否则您将无法完成兑换
                            </div>
                        </div>
                    </div>
                }
            {/* 修改资金密码弹窗 */}
            {
                !this.state.isShowAler4? null :
                <div className="list-container2" id="list-container2"  style={{width:`${height*1.775}px`,height:`${height}px`}}>
                    <div className="list-child-container2" style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/fdhsaoi;bo;idf.png)" }}>
                        <div className="Alert2-title">
                            <div>修改密码</div>
                            <div
                                onClick={()=>{
                                    this.setState({
                                        isShowAler4:false
                                    })
                                }}
                             >X</div>
                        </div>
                        <div className="Alert4-child">
                               <div className="Alert4-child-child1">
                                    <div className="WordArt" >
                                    旧密码
                                    </div>
                                    <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}} >
                                            <input type="password" 
                                                placeholder="输入旧密码"
                                                maxLength="20"
                                                onChange={(e)=>{
                                                    this.setState({
                                                        old_password:e.target.value
                                                    })
                                                }}
                                            />
                                    </div>         
                            </div>
                            <div className="Alert4-child-child2">
                                <div className="WordArt" >
                                        新密码
                                    </div>
                                        <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}} >
                                            <input type="password" 
                                                placeholder="请输入新密码"
                                                maxLength="20"
                                                onChange={(e)=>{
                                                    this.setState({
                                                        new_password:e.target.value
                                                    })
                                                
                                            }}
                                        />
                                </div>
                            </div>
                            <div className="Alert4-child-child3">
                                <div className="WordArt" >
                                        新密码
                                    </div>
                                        <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}} >
                                            <input type="password" 
                                                placeholder="请再次输入新密码"
                                                maxLength="20"
                                                onChange={(e)=>{
                                                    this.setState({
                                                        repeat_password:e.target.value
                                                    })
                                                
                                            }}
                                        />
                                </div>
                            </div>
                       </div> 
                        <div className="Alert4-btn1">
                            <div
                                style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/btn_dh.png)" }}
                                onClick={()=>{
                                    //修改资金密码
                                    fetch(`${api}/with_draw/bindAccountPassword?user_id=${user_id}&action_type=2&old_password=${this.state.old_password}&new_password=${this.state.new_password}&repeat_password=${this.state.repeat_password}&nick_name=${nick_name}&client=${client}&proxy_id=${proxy_id}&proxy_name=${proxy_name}&from_brand=${from_brand}`,
                                    {
                                        method:"GET"
                                    }).then((data)=>data.json())
                                    .then((responseJson)=>{
                                        // eslint-disable-next-line
                                       if(responseJson.status==0){
                                           this.setState({
                                               msg:"修改成功！"
                                           })
                                       }else{
                                            this.setState({
                                                msg:responseJson.msg
                                            })
                                       }
                                       this.setState({
                                        passwordResults:responseJson,
                                        isShowAler4:false,
                                        isAlert:true,
                                       })
                                    })
                                    .catch((error) => {
                                        alert(error)
                                    })
                                }}
                            >
                                确认修改
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* 输入密码弹窗验证*/}
            {
                !this.state.isShowAler5? null :
                <div className="list-container2" id="list-container2"  style={{width:`${height*1.775}px`,height:`${height}px`}}>                                                                                                                                                                                                                    
                    <div className="list-child-container2" style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/fdhsaoi;bo;idf.png)" }}>
                        <div className="Alert2-title">
                            <div>输入密码</div>
                            <div
                                onClick={()=>{
                                    this.setState({
                                        isShowAler5:false,
                                        isAlert:false
                                    })
                                }}
                             >X</div>
                        </div>
                        <div className="Alert2-child">
                               <div className="Alert2-child-child1"
                                    style={{marginTop:"5%"}}
                               >
                                    <div className="WordArt" >
                                    密码
                                    </div>
                                    <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}} >
                                            <input type="password" 
                                                 maxLength="20"
                                                onChange={(e)=>{
                                                    this.setState({
                                                        password:e.target.value
                                                    })
                                                }}
                                            />
                                    </div>         
                            </div>
                       </div> 
                        <div className="Alert2-btn1">
                            <div
                                style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/btn_dh.png)" ,
                                        marginTop:"10%"
                                }}
                                onClick={()=>{
                                    // eslint-disable-next-line 
                                   if(this.state.passwordTest!=""){
                                        //    返回结果 checkPasswordStatus
                                        fetch(`${api}/with_draw/checkPassword?user_id=${user_id}&pay_password=${this.state.password}`,{
                                            method:"GET"
                                        }).then((data)=>data.json())
                                        .then((responseJson)=>{
                                            this.setState({
                                                checkPasswordStatus:responseJson,
                                                isShowAler5:false
                                            })
                                             // eslint-disable-next-line 
                                            if(responseJson.status==0 && this.state.passwordTest==1){
                                                this.setState({
                                                    isShowAler2:true
                                                })
                                            // eslint-disable-next-line 
                                            }else if(responseJson.status==0 && this.state.passwordTest==2){
                                                this.setState({
                                                    isShowAler3:true
                                                })
                                            // eslint-disable-next-line 
                                            }else if( this.state.passwordTest==3&&responseJson.status==0){
                                                // eslint-disable-next-line 
                                                const {user_id,nick_name, client,proxy_id,proxy_name,from_brand,gold} = this.props.data;
                                                //确认提现
                                                fetch(`${api}/with_draw/withDrawApply?user_id=${user_id}&nick_name=${nick_name}&withdraw_type=${this.state.withdraw_type}&amount=${this.state.money}&pay_password=${this.state.password}&client=${client}&proxy_id=${proxy_id}&proxy_name=${proxy_name}&from_brand=${from_brand}`,{
                                                    method:"GET"
                                                }).then((data)=>data.json())
                                                .then((responseJson)=>{
                                                    this.setState({
                                                        status:responseJson,
                                                        passwordTest:"",
                                                        isAlert:true
                                                    })
                                                    // eslint-disable-next-line
                                                    if(responseJson.status==0){
                                                        this.setState({
                                                            msg:"提交成功!"
                                                        })
                                                    }else{
                                                        this.setState({
                                                            msg:"提交失败!"
                                                        })  
                                                    }
                                                })
                                                .catch((error) => {
                                                    alert(error)
                                                })
                                                // eslint-disable-next-line 
                                            }else if(responseJson.status==-1){
                                                this.setState({
                                                    isAlert:true,
                                                    msg:"密码错误，请重新输入！"
                                                })
                                            }
                                        })
                                        .catch((error) => {
                                            alert(error)
                                        })
                                   }
                                }}
                            >
                                确定
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* 设置密码弹窗 */}
            {
                !this.state.isShowAler6? null :
                <div className="list-container2" id="list-container2"  style={{width:`${height*1.775}px`,height:`${height}px`}}>
                <div className="list-child-container2" style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/fdhsaoi;bo;idf.png)" }}>
                    <div className="Alert2-title">
                        <div>设置密码</div>
                        <div
                            onClick={()=>{
                                this.setState({
                                    isShowAler6:false,
                                    isAlert:false
                                })
                            }}
                            >X</div>
                    </div>
                    <div className="Alert2-child">
                            <div className="Alert2-child-child1"
                                style={{marginTop:"5%"}}
                            >
                                <div className="WordArt" >
                                密码
                                </div>
                                <div style={{backgroundImage:"url("+process.env.PUBLIC_URL+"/images/kuangd.png)"}} >
                                        <input type="password" 
                                             maxLength="20"
                                            onChange={(e)=>{
                                                this.setState({
                                                    pay_password:e.target.value
                                                })
                                            }}
                                        />
                                </div>         
                        </div>
                    </div> 
                    <div className="Alert2-btn1">
                        <div
                            style={{ backgroundImage: "url("+process.env.PUBLIC_URL+"/images/btn_dh.png)" }}
                            onClick={()=>{
                                //设置密码
                                fetch(`${api}/with_draw/bindAccountPassword?user_id=${user_id}&action_type=1&pay_password=${this.state.pay_password}&nick_name=${nick_name}&client=${client}&proxy_id=${proxy_id}&proxy_name=${proxy_name}&from_brand=${from_brand}`,{
                                    method:"GET"
                                }).then((data)=>data.json())
                                .then((responseJson)=>{
                                    // eslint-disable-next-line
                                    if(responseJson.status==0){
                                        this.setState({
                                            msg:"设置成功!"
                                        })
                                    }else{
                                        this.setState({
                                            msg:responseJson.msg
                                        })
                                    }
                                    this.setState({
                                        passwordResults:responseJson,
                                        isShowAler6:false,
                                        isAlert:true,
                                    })
                                     
                                })
                                .catch((error) => {
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

           
        </WithDrawCash> 
    }
}
 