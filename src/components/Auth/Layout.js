import React from 'react';
import classes from './Layout.css';
import setIcapLogo from '../../assets/img/SET-ICAP FX.png';
const layout = (props) => {
    return(
        <div className={classes.LoginContainer}>
            <img alt="SET ICAP | FX" src={setIcapLogo} className={classes.Logo}/>
            {props.children}
        </div>
    )
}

export default layout;