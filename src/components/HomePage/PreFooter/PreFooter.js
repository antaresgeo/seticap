import React from 'react';
import classes from './PreFooter.css';
import setFXlogo from '../../../assets/img/logo-seticap-sinbg.png';
import setTPlogo from '../../../assets/img/logo-tp-icap.png';
import bvcLogo from '../../../assets/img/logo-bvc.png';
import SFCLogo from '../../../assets/img/vigilado-sfc.png';
const prefooter = (props) => {
    return (
    <div className="row">
        <div className={['col-lg-12', classes.VDivider].join(' ')}>
        </div>
        <div className="col-lg-2 col-md-2"></div>
        <div className="col-lg-3 col-xs-6">
            <img alt="set Icap logo" className={classes.SetFXLogo} src={setFXlogo} />
            <div className={classes.HDivider}></div>
        </div>
        <div className="col-lg-6 col-xs-6">
            <img src={setTPlogo} className={classes.SetTPLogo} alt="icap-tp logo"/>
            <img src={bvcLogo} className={classes.BVCLogo} alt="bvc logo"/>
            <img src={SFCLogo} className={classes.SFCLogo} alt="superindustria financiera colombia logo"/>
        </div>
        <div className={['col-lg-12', classes.VDivider].join(' ')}></div>
    </div>
    )
}


export default prefooter