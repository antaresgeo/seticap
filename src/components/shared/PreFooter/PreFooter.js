import React from 'react';
import classes from './PreFooter.css';
import setFXlogo from '../../../assets/img/logo-seticap-sinbg.png';
import setTPlogo from '../../../assets/img/logo-tp-icap.png';
import bvcLogo from '../../../assets/img/logo-bvc.png';
import SFCLogo from '../../../assets/img/vigilado-sfc.png';
const prefooter = (props) => {
    return (
    <React.Fragment>
        <div className="row">
            <div className={['col-12', classes.VDivider].join(' ')}></div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-sm-6 col-lg-4">
                <img alt="set Icap logo" className={classes.SetFXLogo} src={setFXlogo} />
                {/* <div className={classes.HDivider}></div> */}
            </div>
            <div className="col-xs-12 col-sm-12 col-lg-8">
                <img src={setTPlogo} className={classes.SetTPLogo} alt="icap-tp logo"/>
                <img src={bvcLogo} className={classes.BVCLogo} alt="bvc logo"/>
                <img src={SFCLogo} className={classes.SFCLogo} alt="superindustria financiera colombia logo"/>
            </div>
        </div>
        <div className="row">
            <div className={['col-12', classes.VDivider].join(' ')}></div>
        </div>
    </React.Fragment>)
}


export default prefooter