import React from 'react';
import classes from './Header.css'
import logo from '../../../assets/img/SET-ICAP FX neg.png';

const homeHeader = (props) => {
    return (
        <div id="content-container" className={classes.HomeRibbon}>
            <div id="page-head">
                <div className="pad-all text-center">
                    <img className={classes.MainLogo} alt="set-fx logo" src={logo} />
                    <h4>NEGOCIACIÓN Y REGISTRO DE DIVISAS</h4>
                </div>
            </div>
        </div>
    )
}

export default homeHeader;