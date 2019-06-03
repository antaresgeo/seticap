import React from "react";
import classes from "./Header.css";
import logo from "../../../assets/img/dolar-fx-logo.png";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import epayco from '../../../assets/img/boton_de_cobro_epayco5.png'


const homeHeader = props => {
  const to = props.auth.token === '' ? '/auth/login/' : '/dashboard/';
  return (
    <React.Fragment>
      <div id="content-container" className={classes.HomeRibbon}>
        <div id="row">
          <div className="col-md-4">
            <img className={classes.MainLogo} alt="set-fx logo" src={logo} />
          </div>
          <div className="col-md-8">
            <div className={[, classes.ContainerButtons].join(' ')}>
            <div style={{ position: 'absolute', right: '40px', top: '0'}}>
            {props.auth.token === '' ? 
            <React.Fragment><Link to={`/auth/create-account/`} className={['btn', 'btn-warning', classes.HeaderButton].join(' ')}>
              Regístrese y obtenga una Demo
            </Link> <div className={classes.Separator}></div> </React.Fragment>: ''}
            
            <Link to={to} className={['btn', 'btn-success', classes.HeaderButton].join(' ')}>
                {!props.auth.logginIn ?  
                    props.auth.token === ''? 
                    "Iniciar sesión" : 
                    `Bienvenido(a) ${props.auth.user}`
                 : '...'}
                  <FontAwesomeIcon style={{marginLeft: '10px'}} icon={faUser}></FontAwesomeIcon>
            </Link>
            <div className={classes.Separator}></div>
            <div className={classes.EpaycoInline}>
              <span className={classes.EpaycoLabel}>Cancele sus servicios online</span>
            <div className={['btn', classes.BTNEpayco].join(' ')}>
              <img alt="epayco button" src={epayco} />
            </div>
            </div>
            </div>
            </div>
          </div>
          <div className="clearfix"/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default homeHeader;
