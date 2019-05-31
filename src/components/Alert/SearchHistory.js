
import React, {Component} from 'react';
import './searchHistory.less';
import Config from '../../lib/Config';
import Axios from "axios";
export default class SearchHistory extends Component {
    constructor() {
        super()
        this.state = {
            results: null,
            minPage:1,
            maxPage:12,
            searchPage:1,
        }
       
    }
    UrlData = {}

    async getResults(startTime,endTime,page,limit){
        
        let loginURL = `http://lotterywebserver.0351sxzc.com/monaco5230s?start=${startTime}&end=${endTime}&page=${page}&limit=${limit}&name=MONACO5230S`;
        let response = await Axios.get(loginURL, { timeout: 6000}).catch(error => {
            console.log(error)
        });
        
        return response;
    }
    async componentDidMount(){
        this.UrlData = Config.getUrlData('?'+window.location.hash.split('?')[1])
        let response = await this.getResults(this.UrlData.startTime,this.UrlData.endTime,this.state.searchPage,10);
        this.setState({
            results:response.data,
        })
    }
    
   async pageUp(){
       let searchData = this.state.searchPage >1 ?this.state.searchPage - 1 :1;
        this.setState({
            searchPage:searchData
           })
        this.UrlData = Config.getUrlData('?'+window.location.hash.split('?')[1])
        let response = await this.getResults(this.UrlData.startTime,this.UrlData.endTime,searchData,10);
        this.setState({
            results:response.data,
        })
   }
    async  pageDown(){
        if(!this.state.results) return
        let searchData = this.state.results.length == 10 ? this.state.searchPage + 1 :this.state.searchPage
        this.setState({
            searchPage :searchData
        })
        this.UrlData = Config.getUrlData('?'+window.location.hash.split('?')[1])
        let response = await this.getResults(this.UrlData.startTime,this.UrlData.endTime,searchData,10);
        this.setState({
            results:response.data,
        })
    }
    render() {
        return (
            <div className="App">
                {this.state.visible?<SearchHistory app={this}/>:''}
                <header className="App-header">
                    {/* eslint-disable-next-line  */}
                    <h1 className='App-logo'
                        style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/logo.png)"}}
                        // onClick={()=>{
                        //     window.location.hash="/"
                        // }}
                    ></h1>

                    <div className='App-gongGao'>Ce site ne offrit que le service abonnement, ne fournit pas les
                        services achetés.
                    </div>
                </header>
                <div className='Search-content'>
                    <div className="Search-banner-div">
                        <div className='Search-banner'
                             style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/banner.jpg)"}}>

                        </div>
                    </div>
                    <div className="Search-inner-content">
                        <p className="icon_title"
                           style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/fdjsao.png)"}}></p>
                        <div className="content-sidebar">
                            <div className="sidebar-box1"
                                 onMouseOver={() => {
                                     document.getElementById('icon_right').style.backgroundImage = "url(" + process.env.PUBLIC_URL + "/images/arrow_Right2.png)"
                                 }}
                                 onMouseLeave={() => {
                                     document.getElementById('icon_right').style.backgroundImage = "url(" + process.env.PUBLIC_URL + "/images/arrow_Right.png)"
                                 }}
                                 onClick={() => {
                                     window.location.hash="/"
                                 }}
                            >
                                <i id='icon_right'
                                   style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/arrow_Right.png)"}}></i>
                                <span>monacoSuper52</span>
                            </div>
                            <div className="sidebar-box2">
                                <div
                                    style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/app-bg2.jpg)"}}></div>
                            </div>
                        </div>
                        <div className="content-content" >
                            <div className="content-box3">
                                <p className="content-box3-title"><span>numéro du tirage</span><span>boules</span></p>
                                {
                                    this.state.results?(
                                        this.state.results.map((item, index) => {
                                            let code = item.code.split(',');
                                                return <div key={index} className="content-box3-list">
                                                <span>{item.date}-{item.issue}</span>
                                                <div>
                                                    <ul>
                                                        {
                                                            code.map((item, index) => {
                                                                return <li key={index}
                                                                           style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/ball.png)"}}>
                                                                    <span>{item}</span>
                                                                </li>
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                            })
                                    ):''
                                }
                                <p className='content-box3-page'>
                                    <span  className='pageUp' style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/pageUp.png)"}}
                                           onClick={ ()=>this.pageUp()}
                                    ></span>
                                    <span className='minPage'></span>
                                    <span className='maxPage'></span>
                                    <span className='pageDown' style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/pageDown.png)"}}
                                        onClick={()=>this.pageDown()}
                                    ></span></p>
                            </div>
                        </div>
                        <div className="content-sidebar-right">
                            <div className="sidebar-right-box1">
                                <div
                                    style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/app-bg.jpg)"}}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="App-footer">
                    <div>
                    </div>
                    <div>
                        <p style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/logo.png)"}}
                           onClick={() => {
                               window.location.hash = "/"
                           }}
                        ></p>
                        <p>
                            Global Service Building<br/>
                            Adresse:52e rue<br/>
                            De 9 heures à 18 heures du matin de 9 heures à 18 heures.<br/>
                        </p>
                    </div>
                </footer>
            </div>
        );
    }
}


