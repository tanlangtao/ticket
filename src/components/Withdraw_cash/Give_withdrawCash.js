import React from "react";
import WithDrawCash from "../../container/WithDrawCash";
import './Give.less';
export default class Give_withdrawCash extends React.Component{
    constructor(props){
        super(props);
        this.state={ 
        }
    }  
    setPath(val){
        this.props.setProps(val)
    }
    render(){
        return <WithDrawCash current="2" setPath={this.setPath.bind(this)} >
            <div>赠送界面</div>
        </WithDrawCash>
    } 
}
