import React, { Component } from "react";
import { connect } from "react-redux";
import authActions from "../../store/actions/auth.actions";

import Header from "../../components/Dashboard/Header/Header";
import Navbar from "../../components/Dashboard/Navbar/Navbar";

class Dashboard extends Component {
  state = {
    largeMenu: true
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
        <Header
          largeMenu={this.state.largeMenu}
          user={this.props.auth.user}
          actions={{ logout: this.props.logout, toggleMenu: this.toggleMenu }}
        />
        <Navbar />
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
						<div className="panel-heading">
							<h3 className="panel-title">Dolar SPOT</h3>
						</div>
						<div className="pad-all">
							CHART GOES HERE
						</div>
					</div>
				</div>
			</div>
		  </div>

        </div>
      </div>
    );
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
