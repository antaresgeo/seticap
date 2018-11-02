import React, { Component } from "react";
import classes from "./DolarSpot.css";
import Chart from "chart.js";
import { Http } from "../../../axiosInstances";
class DolarSpotChart extends Component {
  state = {
    labels: [],
    dolarValueData: [],
    mountUSD: [],
    loaded: false
  };

  chart = null;

  getChartData() {
    Http.get("/json/allStatsV2").then(response => {
      const labels = response.data.map(elem => {
        return elem[0].map(el => (parseInt(el, 10) > 9 ? el : `0${el}`)).join(":");
      });
      const dolarValueData = response.data.map(elem => elem[2]);
      const mountUSD = response.data.map(elem => elem[1]);
      this.setState({
        ...this.state,
        labels: labels,
        dolarValueData: dolarValueData,
        mountUSD: mountUSD
      });
    });
  }

  componentDidMount() {
    this.getChartData();
    if (this.props.refresh !== undefined) {
      this.interval = setInterval(this.getChartData.bind(this), this.props.refresh * 1000)
    }
  }

  componentDidUpdate() {
    if (
      !this.state.loaded &&
      this.state.labels.length &&
      this.state.dolarValueData.length &&
      this.state.mountUSD
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
            },
            {
              label: "Montos (USD) minuto a minuto",
              data: this.state.mountUSD,
              yAxisID: "y-axis-2",
              backgroundColor: "rgba(255,99,132,1)",
              borderColor: "rgba(0,0,0,0)"
            }
          ]
        },
        options: {
          responsive: true,
          animation: false,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                type: "linear",
                ticks: {
                  beginAtZero: false
                },
                position: "left",
                id: "y-axis-1",
                gridLines: {
                  display: false
                }
              },
              {
                type: "linear",
                display: true,
                position: "right",
                id: "y-axis-2",
                gridLines: {
                  display: false
                }
              }
            ]
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

export default DolarSpotChart;
