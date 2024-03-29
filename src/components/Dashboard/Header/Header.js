import React from "react";
import logo from "../../../assets/img/dolar-fx-logo.png";
import logosm from '../../../assets/img/cross-seticap.png';
import { Link } from "react-router-dom";
import classes from "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import DropDown from "../../Nifty/UI/DropDown/HeaderDropDown";

const header = props => {
  return (
    <header id="navbar">
      <div id="navbar-container" className="boxed">

        <div className="navbar-content">
          <div className={[classes.HeaderLogoDiv, props.largeMenu ? '' : classes.HeaderLogoDivSM].join(' ')}>
            <Link to="/">
              <img src={logosm} alt="Set ICAP logo sm" className={classes.HeaderLogoSM} />
            </Link>
            {/* {props.largeMenu ?
          <Link to="/">
            <img src={logo} alt="Set ICAP Logo" className={classes.HeaderLogo} />
          </Link>
          : 
          <Link to ="/">
            <img src={logosm} alt="Set ICAP logo sm" className={classes.HeaderLogoSM}/>
          </Link>
        } */}
          </div>
          <ul className="nav navbar-top-links" style={{position: 'absolute', left: '60px'}}>
            <li className="tgl-menu-btn">
              <a className="mainnav-toggle" onClick={props.actions.toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
              </a>
            </li>
          </ul>
          <ul className="nav navbar-top-links">
            <li>
              <span className={classes.WelcomeName}>{`Bienvenido(a) ${props.user}`}</span></li>
            <DropDown user={props.user} icon={faUser}>
              <ul className="head-list">
                <li>
                  <a onClick={() => props.actions.logout()}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </a>
                </li>
              </ul>
            </DropDown>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default header;
