import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import App2 from './App2';
import * as serviceWorker from './serviceWorker';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Switch,HashRouter } from 'react-router-dom';
ReactDOM.render(<HashRouter>
                    <Switch >
                        <Route exact path='/' component={App}></Route>
                        <Route exact path='/Cash' component={App2}></Route>
                    </Switch>   
        </HashRouter>, 
        document.getElementById('root')
    );
serviceWorker.unregister();