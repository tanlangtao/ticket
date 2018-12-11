import React from 'react';
import './App.less';
import Dc_recharge from "./components/Recharge/Dc_recharge";
import Zfb_recharge from './components/Recharge/Zfb_recharge';
import ZfbToBank from "./components/Recharge/ZfbToBank";
import Wx_recharge from "./components/Recharge/Wx_recharge";
import CyberBank from "./components/Recharge/CyberBank";
import Apply_for from "./components/Recharge/Apply_for";
import List_recharge from './components/Recharge/List_recharge';
import MyDc from './components/Recharge/MyDc';
import MyOrder from './components/Recharge/MyOrder';
import History_recharge from "./components/Recharge/History_recharge";
function GetRequest(url) {
    // eslint-disable-next-line 
    var theRequest = new Object();  
    // eslint-disable-next-line 
    if (url.indexOf("?") != -1) {  
       var str = url.substr(1);  
       var strs = str.split("&");  
       for(var i = 0; i < strs.length; i ++) {  
          theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);  
       }  
    }  
    return theRequest;  
 } 
export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hash:"#/",
            // "data":{
            //     "user_id":2,
            //     "nick_name":"风清扬",
            //     "client":'ios',
            //     "proxy_id":2,
            //     "proxy_name":"代充1",
            //     "from_brand":'Q项目',
            //     "gold":10000,
            // }
            data:GetRequest(this.props.location.search)
        } 

    }
    //子组件设置hash
    setProps(val){
        this.setState({
            hash:val
        })
    }
    //获取用户输入金额
    setMoney(val){
        this.setState({
            money:val
        })
    }
    render(){
        let o;
        const {hash} = this.state;
        // eslint-disable-next-line
        switch (hash) {
            case "#/":
                o = (
                    // eslint-disable-next-line 
                    <Dc_recharge 
                        data={this.state.data} 
                        setProps={this.setProps.bind(this)}
                        setMoney={this.setMoney.bind(this)}
                    ></Dc_recharge>
                );
                break;
            case "#/recharge/zfb":
                o = (
                    // eslint-disable-next-line
                    <Zfb_recharge 
                        setProps={this.setProps.bind(this)}
                        data={this.state.data}
                    ></Zfb_recharge>
                )
                break;
            case "#/recharge/zfbtobank":
                o = (
                    // eslint-disable-next-line
                    <ZfbToBank setProps={this.setProps.bind(this)} ></ZfbToBank>
                )
                break;
            case "#/recharge/wx":
                o = (
                    // eslint-disable-next-line
                    <Wx_recharge setProps={this.setProps.bind(this)} ></Wx_recharge>
                )
                break;
            case "#/recharge/cyberbank":
                o = (
                    // eslint-disable-next-line
                    <CyberBank setProps={this.setProps.bind(this)} ></CyberBank>
                )
                break;
            case "#/recharge/Apply_for":
                o = (
                    // eslint-disable-next-line
                    <Apply_for data={this.state.data} setProps={this.setProps.bind(this)} ></Apply_for>
                )
                break;
            case "#/recharge/list":
                o = (
                    // eslint-disable-next-line
                    <List_recharge money={this.state.money} data={this.state.data} setProps={this.setProps.bind(this)} ></List_recharge>
                )
                break;
            case "#/recharge/MyDc":
                o = (
                    // eslint-disable-next-line
                    <MyDc money={this.state.money} data={this.state.data} setProps={this.setProps.bind(this)} ></MyDc>
                )
                break;
            case "#/recharge/MyOrder":
                o = (
                    // eslint-disable-next-line
                    <MyOrder money={this.state.money} data={this.state.data} setProps={this.setProps.bind(this)} ></MyOrder>
                )
                break;
            case "#/recharge/history":
                o = (
                    // eslint-disable-next-line
                    <History_recharge money={this.state.money} data={this.state.data} setProps={this.setProps.bind(this)} ></History_recharge>
                )
                break;
        }
        return (
            <div className="AppBox">
                {o}
            </div>
        )
    }
}