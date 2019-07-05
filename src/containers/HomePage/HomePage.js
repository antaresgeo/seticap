/*eslint no-control-regex: "off", no-invalid-regexp: "off"*/
import React, { Component } from "react";
import { connect } from "react-redux";

import { Http } from "../../axiosInstances";
import CloseImage from '../../assets/img/iconos_cierre.png'
import Average from '../../assets/img/icono_promedio.png'
import HomeHeader from "../../components/HomePage/Header/Header";
import DolarPrices from "../../components/HomePage/DolarPrices/DolarPrices";
import DolarAmmounts from "../../components/HomePage/DolarAmounts/DolarAmounts";
import News from "../../components/HomePage/News/News";
import Currencies from "../../components/HomePage/Currencies/Currency";
import BVCStock from "../../components/HomePage/BVCStock/BVCStock";
import StockIndex from '../../components/HomePage/StockIndex/StockIndex';
import DolarSpot from "../shared/DolarSpot/DolarSpot";
import classes from "./HomePage.css";
import Loader from '../../components/Nifty/UI/Loader/Loader';
import clockRewind from '../../assets/img/transaction.png';
import PreFooter from '../../components/HomePage/PreFooter/PreFooter';
import Footer from "../../components/shared/Footer/Footer";

const CURRENCY_REGEX = new RegExp(
  "(?<from>\\w{3})\\s+\\/\\s+(?<to>\\w{3})\\s+(?<value>[\\d\\.]+)\\s*(?<change>[\\d\\.\\+\\-]+)"
);
const BVC_REGEX = new RegExp(
  "(?<stock>[A-Za-z]+)(?<stock_value>\\d*\\.*\\d{1,3}\\,\\d{2})(?<stock_change>\\-*\\d+\\.*\\d*)"
);
class HomePage extends Component {
  state = {
    dolarPrices: {},
    dolarAmmounts: {},
    closePrice: 0,
    avgPrice: 0,
    news: [],
    currencies: [],
    bvc: []
  };

  mapDolarPrices = stats => {
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
      }
    };

    const newState = {
      ...this.state,
      dolarPrices: dolarPrices
    };
    this.setState(newState);
  };

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

  mapNews = news => {
    const newState = {
      ...this.state,
      news: news
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

  mapBVCData = data => {
    const newState = {
      ...this.state,
      bvc: data
    };
    this.setState(newState);
  };

  componentDidMount() {
    let now = new Date();
    Http.get('/news/rss/').then(response => {
      console.log(response.data);
      const news = response.data.item.map(elem => {
        return {
          ...elem,
          body: elem.description,
          headline: elem.title
        }
      });
      this.mapNews(news);
    })

    Http.get(
      `/stats?${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    ).then(response => {
      this.mapDolarPrices(response.data);
      this.mapAmmountPrices(response.data);
      this.setState({
        ...this.state,
        closePrice: response.data.closePrice,
        avgPrice: response.data.avgPrice
      });
    });

    Http.get(
      `/stock/index/`
    ).then(response => {
      this.setState({
        ...this.state,
        stockTable: response.data.table
      })
    })

    Http.get(
      `/igbcjsonV2?type=IGBC-CAP`
    ).then(response => {
      this.setState({
        ...this.state,
        stockChart: response.data
      })
    })

    //Http.get("/json/newsJson").then(response => {
    //  const fixed = response.data.map(elem => {
    //    return {
    //      ...elem,
    //      body: fixUtf8(elem.body),
    //      headline: fixUtf8(elem.headline)
    //    };
    //  });
    //  this.mapNews(fixed);
    //});

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
  }

  render() {
    return (
      <React.Fragment>
        {this.props.auth.logginIn ? <Loader opacity="0.8"></Loader> : null}
        <div id="container">
          <HomeHeader auth={this.props.auth} />
          <div className="boxed">
            <div className={['container-fluid', classes.padd20].join(' ')}>
            <div className={classes.DolarEndDay}>
                <div className="row">
                <div className="col-md-3">
                    <div className="panel panel-primary panel-colorful media middle pad-all">
                      <div className="media-left">
                        <div className="pad-hor">
                          <img style={{width: '52px'}} src={CloseImage} alt="Cierre"></img>
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
                        <img style={{width: '52px'}} src={Average} alt="Promedio"></img>
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
                  <div className="col-md-6">
                    <div className="panel media middle pad-all">
                      <div className="media-left">
                        <div className="pad-hor">
                          <img alt="clock" src={clockRewind} style={{width: '52px'}}></img>
                        </div>
                      </div>
                      <div className="media-body">
                        <p className="mar-no text-semibold" style={{fontSize: '1.4em'}}>
                        Información del dólar con 15 minutos de retraso.
                        </p>
                        <p className="mar-no" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DolarSpot />
              <div className="row">
              <div className="col-md-12">
                <iframe
                  title="actions ticker"
                  id="st_e4e0feb0d6e34ce6a093d4059fe3bd6d"
                  frameBorder="0"
                  scrolling="no"
                  width="100%"
                  height="40px"
                  src="https://api.stockdio.com/visualization/financial/charts/v1/Ticker?app-key=395DFC50D7D9415DA5A662933D57E22F&stockExchange=BVC&symbols=ECOPETROL;GRUPOAVAL;BCOLOMBIA;GRUPOSURA;BOGOTA;GRUPOARGOS&culture=Spanish-LatinAmerica&palette=Financial-Light&googleFont=true&onload=st_e4e0feb0d6e34ce6a093d4059fe3bd6d"
                />
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
                <div className="col-md-5">
                  {Object.keys(this.state.dolarAmmounts).length ? (
                    <DolarAmmounts dolarAmmounts={this.state.dolarAmmounts} />
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-4">
                  <Currencies currencies={this.state.currencies} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <BVCStock stocks={this.state.bvc} />
                </div>
                <div className="col-md-4">
                    <StockIndex chart={this.state.stockChart} table={this.state.stockTable}></StockIndex>
                </div>
                <div className="col-md-4">
                  <News news={this.state.news} />
                </div>
              </div>
              {!this.props.auth.token ? <div className="row">
                    <div className="col-md-12 text-center">
                    Información con 15 minutos de retraso
                    </div>
              </div> : '' }
              <PreFooter></PreFooter>
              <Footer></Footer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(HomePage);
