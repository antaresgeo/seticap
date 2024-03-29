import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import authActions from "./store/actions/auth.actions";
import Login from "./containers/Auth/Login/Login";
import ForgotPassword from "./containers/Auth/ForgotPassword/ForgotPassword";
import CreateAccount from "./containers/Auth/CreateAccount/CreateAccount";
import HomePage from "./containers/HomePage/HomePage";
import Dashboard from "./containers/Dashboard/Dashboard";
import { connect } from "react-redux";
import "./App.css";

class App extends Component {
    componentDidMount() {
        this.props.checkLogin();
    }

    render() {
        return (
            <Switch>
                <Route path="/auth/login/" component={Login} />
                <Route
                    path="/auth/forgot-password/"
                    component={ForgotPassword}
                />
                <Route path="/auth/create-account/" component={CreateAccount} />
                {this.props.auth.token !== "" ? (
                    <Route path="/dashboard/" component={Dashboard} />
                ) : null}
                <Route path="/" exact component={HomePage} />
                <Redirect to="/" />
            </Switch>
        );
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkLogin: () => dispatch(authActions.checkLogin())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
