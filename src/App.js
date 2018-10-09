import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './containers/Auth/Login/Login';
import ForgotPassword from './containers/Auth/ForgotPassword/ForgotPassword';
import CreateAccount from './containers/Auth/CreateAccount/CreateAccount';
import HomePage from './containers/HomePage/HomePage';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/auth/login/" component={Login}/>
        <Route path="/auth/forgot-password/" component={ForgotPassword}/>
        <Route path="/auth/create-account/" component={CreateAccount} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    );
  }
}

export default App;
