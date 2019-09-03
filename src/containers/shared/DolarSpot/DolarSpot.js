import React, { Component } from "react";
import classes from "./DolarSpot.css";
import Chart from "chart.js";
import { HttpNode } from "../../../axiosInstances";
import {connect} from 'react-redux';
class DolarSpotChart extends Component {
  state = {
    labels: [],
    dolarValueData: [],
    mountUSD: [],
    loaded: false
  };

  chart = null;

  getChartData() {
    const delay = this.props.delay ? this.props.delay : '15'
    const today = new Date();
    HttpNode.post('seticap/api/graficos/graficoMoneda', {
      "fecha": `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${(today.getDate()).toString().padStart(2, '0')}`,
      "moneda": 1,
      "delay": delay
    }).then(
      response => {
        let data = response.data.result[0].datos_grafico_moneda_mercado;
        data = data
                .replace(/'/g, '"')
                .replace(/\d{2}:\d{2}(:\d{2})*/gi, function(x){ return '"'+x+'"' })
                .replace(/data:/g, '"data":')
                .replace(/label:/g, '"label":')
                .replace(/type:/g, '"type":')
                .replace(/labels:/g, '"labels":')
                .replace(/datasets:/g, '"datasets":')
        
        data = JSON.parse("{" + data + "}").data;
        this.setState({
          ...this.state,
          labels: data.labels,
          dolarValueData:data.datasets[0].data,
        })
      }
    )

    /*client.get("/json/allStatsV2", {params : {market: this.props.market ? this.props.market : 'spot'}}).then(response => {
      
      const labels = response.data ? response.data.map(elem => {
        return elem[0].map(el => (parseInt(el, 10) > 9 ? el : `0${el}`)).join(":");
      }) : [];
      const dolarValueData = response.data ? response.data.map(elem => elem[2]) : [];
      const mountUSD = response.data ? response.data.map(elem => elem[1]) : [];

    });*/
  }

  componentDidMount() {
    this.getChartData();
    if (this.props.delay !== undefined) {
      let delay = this.props.delay == 0 ? 1 : this.props.delay;
      this.interval = setInterval(this.getChartData.bind(this), delay * 1000 * 60)
    }
  }


  componentDidUpdate(prevProps) {
    if (
      !this.state.loaded &&
      this.state.labels.length &&
      this.state.dolarValueData.length
    ) {

      let ctx = document.getElementById("DolarSpotChart").getContext("2d");
      const config = {
        type: "bar",
        data: {
          labels: this.state.labels,
          datasets: [
            {
              label: "Precios del cierre",
              data: this.state.dolarValueData,
              borderColor: "#8bc34a",
              borderWidth: 4,
              pointRadius: 0,
              yAxisID: "y-axis-1",
              backgroundColor: "rgba(0,0,0,0)",
              type: "line"
            }
          ]
        },
        options: {
          responsive: true,
          animation: false,
          maintainAspectRatio: false,
          line: {
            tension: 0 // disables bezier curves
          },
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Precios'
                },
                type: "linear",
                ticks: {
                  beginAtZero: false
                },
                position: "left",
                id: "y-axis-1",
                gridLines: {
                  display: false
                }
              }],
              xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Horas'
                },
                ticks: {
                    maxRotation: 90,
                    minRotation: 90
                }
            }]
          }
        }
      };
      this.chart = new Chart(ctx, config);
      this.setState({
        ...this.state,
        loaded: true
      });
    }
  }

  render() {
    return (
      <div className="panel">
        <div className="panel-heading">
          <h3 className="panel-title">Dolar Spot</h3>
        </div>
        <div style={{ width: "100%", padding: '0 20px' }}>
          <canvas
            className={classes.DolarSpotCanvas}
            id="DolarSpotChart"
          />
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(DolarSpotChart);
