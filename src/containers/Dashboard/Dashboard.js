import React, { Component } from "react";
import { connect } from "react-redux";
import authActions from "../../store/actions/auth.actions";

import Header from "../../components/Dashboard/Header/Header";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import DolarSpot from '../shared/DolarSpot/DolarSpot';
import Loader from '../../components/Nifty/UI/Loader/Loader';

class Dashboard extends Component {
  state = {
    largeMenu: true,
    market: 'spot',
  };

  render() {
    return (
      <div
        id="container"
        className={[
          "effect",
          "aside-float",
          "aside-bright",
          this.state.largeMenu ? "mainnav-lg" : "mainnav-sm"
        ].join(" ")}>
        {this.props.auth.logginIn ? <Loader opacity="0.8"></Loader> : null}
        <Header
          largeMenu={this.state.largeMenu}
          user={this.props.auth.user}
          actions={{ logout: this.props.logout, toggleMenu: this.toggleMenu }}
        />
        <Navbar market={this.state.market} changeMarket={this.changeMarket} />
        <div id="content-container">

          <div id="page-head">
            <div className="pad-all text-center">
              <h2>Información del dólar intercambiario en tiempo real</h2>
            </div>
          </div>

          <div id="page-content">
            <div className="row">
              <div className="col-lg-12">
                <div id="demo-panel-network" className="panel">
                  <div className="pad-all">
                    <div className="container-fluid">
                      <DolarSpot refresh={30} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  changeMarket = (market) => {
    console.log(market);
    this.setState({market: market})
  }

  toggleMenu = () => {
    this.setState({
      ...this.state,
      largeMenu: !this.state.largeMenu
    });
  };
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logout())
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
