import React, { Component } from "react";
import { Http, HttpNode } from "../../axiosInstances";
import DolarPrices from "../../components/HomePage/DolarPrices/DolarPrices";
import DolarAmmounts from "../../components/HomePage/DolarAmounts/DolarAmounts";
import CloseImage from '../../assets/img/iconos_cierre.png'
import Average from '../../assets/img/icono_promedio.png';
import clockRewind from '../../assets/img/rewind-time.png';
import DolarSpot from '../shared/DolarSpot/DolarSpot';
import Currencies from "../../components/HomePage/Currencies/Currency";
import News from "../../components/HomePage/News/News";
import Footer from "../../components/shared/Footer/Footer";
import PreFooter from '../../components/shared/PreFooter/PreFooter';
import ChartSwitcher from '../../components/Dashboard/ChartSwitcher/ChartSwitcher';

const CURRENCY_REGEX = new RegExp(
  "(?<from>\\w{3})\\s+\\/\\s+(?<to>\\w{3})\\s+(?<value>[\\d\\.]+)\\s*(?<change>[\\d\\.\\+\\-]+)"
);

const BVC_REGEX = new RegExp(
  "(?<stock>[A-Za-z]+)(?<stock_value>\\d*\\.*\\d{1,3}\\,\\d{2})(?<stock_change>\\-*\\d+\\.*\\d*)"
);


class DashboardHome extends Component {
  state = {
    largeMenu: true,
    market: 'spot',
    dolarPrices: {},
    dolarAmmounts: {},
    currencies: [],
    bvc: [],
    news: [],
  };

  interval = null;

  MARKET_MAP = {
    'spot': 71,
    'nexday': 76
  }

  mapAmmountPrices = stats => {
    const ammountPrices = {
      totalAmmount: stats.totalAmmount,
      latestAmmount: stats.latestAmmount,
      avgAmmount: stats.avgAmmount,
      minAmmount: stats.minAmmount,
      maxAmmount: stats.maxAmmount,
      transactions: stats.transactions
    };
    const newState = {
      ...this.state,
      dolarAmmounts: ammountPrices
    };
    this.setState(newState);
  };

  mapCurrencyData = data => {
    const newState = {
      ...this.state,
      currencies: data
    };
    this.setState(newState);
  };

  mapNews = news => {
    const newState = {
      ...this.state,
      news: news
    };
    this.setState(newState);
  };

  mapBVCData = data => {
    const newState = {
      ...this.state,
      bvc: data
    };
    this.setState(newState);
  };

  componentDidMount() {
    this.interval = setInterval(this.onMount.bind(this), 1000 * 60);
    this.onMount();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onMount() {
    let now = new Date();

    const month = now.getMonth() < 8 ? `0${now.getMonth() + 1}` : '' + now.getMonth() + 1

    HttpNode.post(`seticap/api/estadisticas/estadisticasPromedioCierre/`, {
      fecha: `${now.getFullYear()}-${month}-${now.getDate()}`,
      mercado: this.MARKET_MAP[this.state.market], // USD for now
      delay: 0
    }).then(response => {
      this.setState({
        ...this.state,
        closePrice: response.data.data.close,
        avgPrice: response.data.data.avg
      })
    });

    HttpNode.post(`seticap/api/estadisticas/estadisticasPrecioMercado/`, {
      fecha: `${now.getFullYear()}-${month}-${now.getDate()}`,
      mercado: this.MARKET_MAP[this.state.market], //USD for now
      delay: 0
    }).then(response => {
      this.setState({
        ...this.state,
        dolarPrices:{
          trm: {price: response.data.data.trm},
          openPrice: {price: response.data.data.open},
          minPrice: {price: response.data.data.low},
          maxPrice: {price: response.data.data.high}
        }
      })
    })

    HttpNode.post(`seticap/api/estadisticas/estadisticasMontoMercado/`, {
      fecha: `${now.getFullYear()}-${month}-${now.getDate()}`,
      mercado: this.MARKET_MAP[this.state.market], //USD for now.
      delay: 0
    }).then(response => {
      this.setState({
        ...this.state,
        dolarAmmounts: {
          totalAmmount: response.data.data.sum,
          latestAmmount: response.data.data.close,
          avgAmmount: response.data.data.avg,
          minAmmount: response.data.data.low,
          maxAmmount: response.data.data.high,
          transactions: response.data.data.count
        }
      })
    })

    Http.get('/news/rss/').then(response => {
      const news = response.data.item.map(elem => {
        return {
          ...elem,
          body: elem.description,
          headline: elem.title
        }
      });
      this.mapNews(news);
    });

    Http.get("/currencies").then(response => {
      const parser = new DOMParser();
      let parserTable = parser.parseFromString(response.data, "text/html");
      const CurrencyData = Array.from(parserTable.getElementsByTagName("tr"))
        .map(tr => {
          if (CURRENCY_REGEX.test(tr.innerText)) {
            const results = CURRENCY_REGEX.exec(tr.innerText);
            return results.slice(1);
          }
          return null;
        })
        .filter(Boolean);
      this.mapCurrencyData(CurrencyData);
    });

    Http.get("/bvc").then(response => {
      const parser = new DOMParser();
      let parserTable = parser.parseFromString(response.data, "text/html");
      const CurrencyData = Array.from(parserTable.getElementsByTagName("tr"))
        .map(tr => {
          if (BVC_REGEX.test(tr.innerText)) {
            const results = BVC_REGEX.exec(tr.innerText);
            return results.slice(1);
          }
          return null;
        })
        .filter(Boolean);
      this.mapBVCData(CurrencyData);
    });

    Http.get(
      `/stock/index/`
    ).then(response => {
      this.setState({
        ...this.state,
        stockTable: response.data.table
      })
    });

    Http.get(
      `/igbcjsonV2?type=IGBC-CAP`
    ).then(response => {
      this.setState({
        ...this.state,
        stockChart: response.data
      })
    })
  }

  render() {
    return (
    <div id="content-container">

        <div id="page-content">
        <div style={{marginTop: "6%"}}>
            <div className="row">
            <div className="col-md-6">
                <div className="panel media middle pad-all">
                <div className="media-left">
                    <div className="pad-hor">
                    <img alt="clock" src={clockRewind} style={{ width: '52px' }}></img>
                    </div>
                </div>
                <div className="media-body">
                    <p className="mar-no text-semibold" style={{ fontSize: '1.4em' }}>
                    Información del dólar en tiempo real.
                    </p>
                    <p className="mar-no" />
                </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="panel panel-primary panel-colorful media middle pad-all">
                <div className="media-left">
                    <div className="pad-hor">
                    <img style={{ width: '52px' }} src={CloseImage} alt="Cierre"></img>
                    </div>
                </div>
                <div className="media-body">
                    <p className="text-2x mar-no text-semibold">
                    {this.state.closePrice}
                    </p>
                    <p className="mar-no">Cierre</p>
                </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="panel panel-primary panel-colorful media middle pad-all">
                <div className="media-left">
                    <div className="pad-hor">
                    <img style={{ width: '52px' }} src={Average} alt="Promedio"></img>
                    </div>
                </div>
                <div className="media-body">
                    <p className="text-2x mar-no text-semibold">
                    {this.state.avgPrice}
                    </p>
                    <p className="mar-no">Promedio</p>
                </div>
                </div>
            </div>
            </div>
        </div>

        <div className="row">
            <div className="col-lg-12">
            <div id="demo-panel-network" className="panel">
                <div className="pad-all">
                <div className="container-fluid">
                    {this.props.match.params.market === 'spot' ?
                    <DolarSpot key="spot" market="spot" delay="0" /> : <DolarSpot key="nextday" market="nextday" delay="0" />}
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-3">
            {Object.keys(this.state.dolarPrices).length ? (
                <DolarPrices dolarPrices={this.state.dolarPrices} />
            ) : (
                ""
                )}
            </div>
            <div className="col-sm-4">
            {Object.keys(this.state.dolarAmmounts).length ? (
                <DolarAmmounts dolarAmmounts={this.state.dolarAmmounts} />
            ) : (
                ""
                )}
            </div>
            <div className="col-md-5">
            <Currencies currencies={this.state.currencies} />
            </div>
        </div>
        <div className="row">
            <div className="col-sm-9">
            <ChartSwitcher/>
            </div>
            <div className="col-sm-3">
            <News news={this.state.news} />
            </div>
        </div>
        </div>
        <PreFooter></PreFooter>
        <Footer></Footer>
    </div>
    );
  }

  changeMarket = (market) => {
    this.setState({ market: market })
  }
}

export default DashboardHome;
