/*eslint no-control-regex: "off", no-invalid-regexp: "off"*/
import React, { Component } from 'react'

import { AxiosHome } from '../../axiosInstances';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import fixUtf8 from 'fix-utf8';

import HomeHeader from '../../components/HomePage/Header/Header'
import DolarPrices from '../../components/HomePage/DolarPrices/DolarPrices';
import DolarAmmounts from '../../components/HomePage/DolarAmounts/DolarAmounts';
import News from '../../components/HomePage/News/News';
import Currencies from '../../components/HomePage/Currencies/Currency'
import BVCStock from '../../components/HomePage/BVCStock/BVCStock';
import DolarSpot from './DolarSpot/DolarSpot';
import classes from './HomePage.css'

const CURRENCY_REGEX = new RegExp('(?<from>\\w{3})\\s+\\/\\s+(?<to>\\w{3})\\s+(?<value>[\\d\\.]+)\\s*(?<change>[\\d\\.\\+\\-]+)');
const BVC_REGEX = new RegExp('(?<stock>[A-Za-z]+)(?<stock_value>\\d*\\.*\\d{1,3}\\,\\d{2})(?<stock_change>\\-*\\d+\\.*\\d*)')
class HomePage extends Component {
    
    state = {
        dolarPrices: {},
        dolarAmmounts: {},
        closePrice: 0,
        avgPrice: 0,
        news : [],
        currencies: [],
        bvc: []
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

    mapNews = news => {
        const newState = {
            ...this.state,
            news: news
        }
        this.setState(newState);
    }

    mapCurrencyData = data => {
        const newState = {
            ...this.state,
            currencies: data
        }
        this.setState(newState);
    }

    mapBVCData = data => {
        console.log(data);
        const newState = {
            ...this.state,
            bvc: data
        }
        this.setState(newState);
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
            });

        AxiosHome.get('/json/newsJson').then(
            response => {
                const fixed = response.data.map(elem => {
                    return {
                        ...elem,
                        body: fixUtf8(elem.body),
                        headline: fixUtf8(elem.headline)
                    }
                });
                this.mapNews(fixed);
            }
        )

        AxiosHome.get('/currencies').then(
            response => {
                const parser = new DOMParser();
                let parserTable = parser.parseFromString(response.data, 'text/html');
                const CurrencyData = Array.from(parserTable.getElementsByTagName('tr')).map(tr => {
                    if(CURRENCY_REGEX.test(tr.innerText)){
                        const results = CURRENCY_REGEX.exec(tr.innerText);
                        return results.slice(1)
                    }
                    return null;
                }).filter(Boolean);
                this.mapCurrencyData(CurrencyData)
            }
        )

        AxiosHome.get('/bvc').then(
            response => {
                const parser = new DOMParser();
                let parserTable = parser.parseFromString(response.data, 'text/html');
                const CurrencyData = Array.from(parserTable.getElementsByTagName('tr')).map(tr => {
                    if(BVC_REGEX.test(tr.innerText)){
                        const results = BVC_REGEX.exec(tr.innerText);
                        return results.slice(1);
                    }
                    return null;
                }).filter(Boolean);
                this.mapBVCData(CurrencyData);
            }
        )
    }

    render() {
        return (
            <React.Fragment>
                <div id="container">
                    <HomeHeader />
                    <div className="boxed">
                        <div className="container-fluid">
                            <DolarSpot></DolarSpot>
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
                                <div className="col-md-3">
                                    {Object.keys(this.state.dolarPrices).length ? <DolarPrices dolarPrices={this.state.dolarPrices}></DolarPrices> : ''}
                                </div>
                                <div className="col-md-5">
                                    {Object.keys(this.state.dolarAmmounts).length ? <DolarAmmounts dolarAmmounts={this.state.dolarAmmounts}></DolarAmmounts> : ''}
                                </div>
                                <div className="col-md-4">
                                    <Currencies currencies={this.state.currencies}></Currencies>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-md-4">
                                    <News news={this.state.news}></News>
                                </div>
                                <div className="col-md-4">
                                    <BVCStock stocks={this.state.bvc}></BVCStock>
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