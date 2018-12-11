import React from 'react';
import './App.less';
import Dh_withdrawCash from "./components/Withdraw_cash/Dh_withdrawCash";
import Give_withdrawCash from "./components/Withdraw_cash/Give_withdrawCash";
import History_withdrawCash from  "./components/Withdraw_cash/History_withdrawCash";
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
            hash:"#/withdrawCash/dh",
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
            case "#/withdrawCash/dh":
                o = (
                    // eslint-disable-next-line
                    <Dh_withdrawCash money={this.state.money} data={this.state.data} setProps={this.setProps.bind(this)} ></Dh_withdrawCash>
                )
                break;
            case "#/withdrawCash/give":
                o = (
                    // eslint-disable-next-line
                    <Give_withdrawCash money={this.state.money} data={this.state.data} setProps={this.setProps.bind(this)} ></Give_withdrawCash>
                )
                break;
            case "#/withdrawCash/history":
                o = (
                    // eslint-disable-next-line
                    <History_withdrawCash money={this.state.money} data={this.state.data} setProps={this.setProps.bind(this)} ></History_withdrawCash>
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