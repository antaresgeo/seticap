import React from "react";
import classes from "./Header.css";
import logo from "../../../assets/img/SET-ICAP FX neg.png";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
const homeHeader = props => {
  const to = props.auth.token === '' ? '/auth/login/' : '/dashboard/';
  return (
    <React.Fragment>
      <div className={classes.authRibbon}>
        <div className="row">
          <div className="col-md-12">
            <Link to={to} className={['pull-right', classes.login].join(' ')}>
                {!props.auth.logginIn ?  
                    props.auth.token === ''? 
                    "Iniciar sesión" : 
                    `Bienvenido(a) ${props.auth.user}`
                 : null}
                  <FontAwesomeIcon style={{marginLeft: '10px'}} icon={faUser}></FontAwesomeIcon>
            </Link>
          </div>
        </div>
      </div>
      <div id="content-container" className={classes.HomeRibbon}>
        <div id="page-head">
          <div className="pad-all text-center">
            <img className={classes.MainLogo} alt="set-fx logo" src={logo} />
            <h4>NEGOCIACIÓN Y REGISTRO DE DIVISAS</h4>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default homeHeader;
