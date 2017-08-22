import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './components/Layout';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

import './scss/main.scss';

class App extends Component {
    render() {
        return (
		  <Router history={browserHistory}>
		    <Route path="/" component={Layout}>
		      <IndexRoute component={HomePage}/>
			  <Route path="/login" component={LoginPage}/>
			  <Route path="/signup" component={RegisterPage}/>
			  <Route path="/logout" component={HomePage}/>
		    </Route>
		  </Router>
        );
    }
}

ReactDOM.render(
  <App />, document.getElementById('main'));