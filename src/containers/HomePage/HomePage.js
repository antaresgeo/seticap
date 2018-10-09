import React, { Component } from 'react'
import classes from './HomePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import HomeHeader from '../../components/HomePage/Header/Header'
import DolarPrices from '../../components/HomePage/DolarPrices/DolarPrices';
import DolarAmounts from '../../components/HomePage/DolarAmounts/DolarAmounts';
import Footer from '../../components/HomePage/Footer/Footer';

class HomePage extends Component {
    
    componentDidMount(){
        console.log('did mount')
    }

    render() {
        return (
            <React.Fragment>
                <div id="container">
                    <HomeHeader />
                    <div className="boxed">
                        <div className="container-fluid">
                            <div className={classes.DolarSpot}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h3>Dolar Spot</h3>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className={classes.DolarEndDay}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="panel media middle pad-all">
                                            <div className="media-left">
                                                <div className="pad-hor">
                                                    <FontAwesomeIcon className='fa-4x' icon={faDollarSign} />
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <p className="text-2x mar-no text-semibold">Dolar set FX</p>
                                                <p className="mar-no"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="panel panel-info panel-colorful media middle pad-all">
                                            <div className="media-left">
                                                <div className="pad-hor">
                                                    <FontAwesomeIcon className='fa-4x' icon={faExchangeAlt} />
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <p className="text-2x mar-no text-semibold">3200</p>
                                                <p className="mar-no">Cierre</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="panel panel-info panel-colorful media middle pad-all">
                                            <div className="media-left">
                                                <div className="pad-hor">
                                                    <FontAwesomeIcon className='fa-4x' icon={faExchangeAlt} />
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <p className="text-2x mar-no text-semibold">3120</p>
                                                <p className="mar-no">Promedio</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <DolarPrices></DolarPrices>
                                </div>
                                <div className="col-md-6">
                                    <DolarAmounts></DolarAmounts>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HomePage;