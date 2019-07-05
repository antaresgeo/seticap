import React, { Component } from "react";
import { connect } from "react-redux";
import { Http } from "../../axiosInstances";
import authActions from "../../store/actions/auth.actions";
import DolarPrices from "../../components/HomePage/DolarPrices/DolarPrices";
import DolarAmmounts from "../../components/HomePage/DolarAmounts/DolarAmounts";
import Header from "../../components/Dashboard/Header/Header";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import DolarSpot from '../shared/DolarSpot/DolarSpot';
import Loader from '../../components/Nifty/UI/Loader/Loader';
import Currencies from "../../components/HomePage/Currencies/Currency";
import News from "../../components/HomePage/News/News";
import BVCStock from "../../components/HomePage/BVCStock/BVCStock";
import StockIndex from '../../components/HomePage/StockIndex/StockIndex';

const CURRENCY_REGEX = new RegExp(
  "(?<from>\\w{3})\\s+\\/\\s+(?<to>\\w{3})\\s+(?<value>[\\d\\.]+)\\s*(?<change>[\\d\\.\\+\\-]+)"
);

const BVC_REGEX = new RegExp(
  "(?<stock>[A-Za-z]+)(?<stock_value>\\d*\\.*\\d{1,3}\\,\\d{2})(?<stock_change>\\-*\\d+\\.*\\d*)"
);

class Dashboard extends Component {
  state = {
    largeMenu: true,
    market: 'spot',
    dolarPrices: {},
    dolarAmmounts: {},
    currencies: [],
    bvc: [],
    news: [],
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

  componentDidMount(){
    let now = new Date();
    Http.get(
      `/stats?${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    ).then(response => {
      this.mapDolarPrices(response.data);
      this.mapAmmountPrices(response.data);
    });

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
      <div
        id="container"
        className={[
          "effect",
          "aside-float",
          "aside-bright",
          this.state.largeMenu ? "mainnav-lg" : "mainnav-sm"
        ].join(" ")}>
        {this.props.auth.logginIn ? <Loader opacity="0.8"></Loader> : null}
        <Header
          largeMenu={this.state.largeMenu}
          user={this.props.auth.user}
          actions={{ logout: this.props.logout, toggleMenu: this.toggleMenu }}
        />
        <Navbar market={this.state.market} changeMarket={this.changeMarket} />
        <div id="content-container">

          <div id="page-head">
            <div className="pad-all text-center">
              <h2>Información del dólar intercambiario en tiempo real</h2>
            </div>
          </div>

          <div id="page-content">
            <div className="row">
              <div className="col-lg-12">
                <div id="demo-panel-network" className="panel">
                  <div className="pad-all">
                    <div className="container-fluid">
                      { this.state.market === 'spot' ?
                        <DolarSpot key="spot" market="spot" refresh={30} /> : <DolarSpot key="nextday" market="nextday" refresh={30} />}
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
          </div>

        </div>
      </div>
    );
  }

  changeMarket = (market) => {
    this.setState({market: market})
  }

  toggleMenu = () => {
    this.setState({
      ...this.state,
      largeMenu: !this.state.largeMenu
    });
  };
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logout())
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
