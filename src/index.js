import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
// import App from './App';
import TenScore from "./components/TenScore"
import * as serviceWorker from './serviceWorker';
// import TwentyFiveScore  from "./components/TwentyFiveScore"
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Switch,HashRouter } from 'react-router-dom';
ReactDOM.render(<HashRouter >
                    <Switch >
                        {/*<Route exact path='/' component={App}></Route>*/}
                        <Route exact path='/' component={TenScore}></Route>
                        {/*<Route exact path='/Chanceux10' component={TwentyFiveScore}></Route>*/}
                    </Switch>   
        </HashRouter>, 
        document.getElementById('root')
    );
serviceWorker.unregister();