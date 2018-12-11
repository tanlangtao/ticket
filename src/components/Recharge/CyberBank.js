import React from "react";
import Recharge  from "../../container/Recharge";
export default class CyberBank extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    setPath(val){
        this.props.setProps(val)
    }
    render(){
        return  <Recharge current="5" setPath={this.setPath.bind(this)}>
                    暂不支持，敬请期待！
        </Recharge> 
    }
}
 