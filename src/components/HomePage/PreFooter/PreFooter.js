import React from 'react';
import classes from './PreFooter.css';
import setFXlogo from '../../../assets/img/set-fx-logo.png';
import setTPlogo from '../../../assets/img/logo-tp-icap.png';
import bvcLogo from '../../../assets/img/logo-bvc.png';
import SFCLogo from '../../../assets/img/vigilado-sfc.png';
const prefooter = (props) => {
    return (
    <div className="row">
        <div className={['col-md-12', classes.VDivider].join(' ')}>
        </div>
        <div className="col-md-3 col-md-push-2 col-xs-12">
            <img alt="set Icap logo" className={classes.SetFXLogo} src={setFXlogo} />
            <div className={classes.HDivider}></div>
        </div>
        <div className="col-md-7 col-md-push-2 col-xs-12">
            <img src={setTPlogo} className={classes.SetTPLogo} alt="icap-tp logo"/>
            <img src={bvcLogo} alt="bvc logo"/>
            <img src={SFCLogo} alt="superindustria financiera colombia logo"/>
        </div>
        <div className={['col-md-12', classes.VDivider].join(' ')}></div>
    </div>
    )
}


export default prefooter