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
							<div className="panel-control">
								<button id="demo-panel-network-refresh" className="btn btn-default btn-active-primary" data-toggle="panel-overlay" data-target="#demo-panel-network"><i className="demo-psi-repeat-2"></i></button>
								<div className="dropdown">
									<button className="dropdown-toggle btn btn-default btn-active-primary" data-toggle="dropdown" aria-expanded="false"><i className="demo-psi-dot-vertical"></i></button>
									<ul className="dropdown-menu dropdown-menu-right">
										<li><a >Action</a></li>
										<li><a >Another action</a></li>
										<li><a >Something else here</a></li>
										<li className="divider"></li>
										<li><a >Separated link</a></li>
									</ul>
								</div>
							</div>
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
