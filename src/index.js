import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
// import App from './App';
import TenScore from "./components/TenScore"
import * as serviceWorker from './serviceWorker';
import SearchHistory  from "./components/Alert/SearchHistory"
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Switch,HashRouter } from 'react-router-dom';
ReactDOM.render(<HashRouter >
                    <Switch >
                        {/*<Route exact path='/' component={App}></Route>*/}
                        <Route exact path='/' component={TenScore}></Route>
                        <Route exact path='/SearchHistory' component={SearchHistory}></Route>
                    </Switch>   
        </HashRouter>, 
        document.getElementById('root')
    );
serviceWorker.unregister();

if (process.env.NODE_ENV !== 'development') {
    console.log = ()=>{}
}