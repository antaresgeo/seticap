import React, { Component } from 'react'
import classes from './HomePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import HomeHeader from '../../components/HomePage/Header/Header'
import DolarPrices from '../../components/HomePage/DolarPrices/DolarPrices';
import DolarAmmounts from '../../components/HomePage/DolarAmounts/DolarAmounts';
import { AxiosHome } from '../../axiosInstances';
class HomePage extends Component {
    
    state = {
        dolarPrices: {},
        dolarAmmounts: {},
        closePrice: 0,
        avgPrice: 0
    }

    mapDolarPrices = (stats) => {
        const dolarPrices = {
            trm: {
                price: stats.trm,
                change: stats.trmPriceChange
            },
            openPrice: {
                price: stats.openPrice,
                change: stats.openPriceChange
            },
            minPrice: {
                price: stats.minPrice,
                change: stats.minPriceChange
            },
            maxPrice: {
                price: stats.maxPrice,
                change: stats.maxPriceChange
            },
        }

        const newState = {
            ...this.state,
            dolarPrices: dolarPrices
        }
        this.setState(newState);
    }

    mapAmmountPrices = stats => {
        const ammountPrices = {
            totalAmmount : stats.totalAmmount,
            latestAmmount: stats.latestAmmount,
            avgAmmount: stats.avgAmmount,
            minAmmount: stats.minAmmount,
            maxAmmount: stats.maxAmmount,
            transactions: stats.transactions
        }
        const newState = {
            ...this.state,
            dolarAmmounts: ammountPrices
        }
        this.setState(newState)
    }

    componentDidMount(){
        let now = new Date();
        AxiosHome.get(`/stats?${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)
            .then(response => {
                this.mapDolarPrices(response.data);
                this.mapAmmountPrices(response.data);
                this.setState({
                    ...this.state,
                    closePrice: response.data.closePrice,
                    avgPrice: response.data.avgPrice
                })
            })
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
                                                <p className="text-2x mar-no text-semibold">{this.state.closePrice}</p>
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
                                                <p className="text-2x mar-no text-semibold">{this.state.avgPrice}</p>
                                                <p className="mar-no">Promedio</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    {Object.keys(this.state.dolarPrices).length ? <DolarPrices dolarPrices={this.state.dolarPrices}></DolarPrices> : ''}
                                </div>
                                <div className="col-md-6">
                                    {Object.keys(this.state.dolarAmmounts).length ? <DolarAmmounts dolarAmmounts={this.state.dolarAmmounts}></DolarAmmounts> : ''}
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