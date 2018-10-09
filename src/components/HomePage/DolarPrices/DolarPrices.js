import React from "react";
import NiftyTable from "../../Nifty/UI/Table/NiftyTable";
import Row from "../../../components/Nifty/UI/Table/Row/NiftyRow";
import Cell from "../../../components/Nifty/UI/Table/Row/NiftyCell";
import classes from "./DolarPrices.css";

const dolarPrices = props => {
  return (
    <div className={["panel", "panel-primary", classes.DolarPrice].join(" ")}>
      <div className="panel-heading">
        <h3 className="panel-title">Precios del dolar</h3>
      </div>
      <div className={["panel-body", classes.Body].join(" ")}>
        <NiftyTable lineHeight="36px">
          <Row>
            <Cell>
              <span className="text-main text-semibold">TRM</span>
            </Cell>
            <Cell>
              <span className="text-danger text-semibold">- 28.76%</span>
            </Cell>
          </Row>
          <Row>
            <Cell style={{ lineHeight: props.lineHeight }}>
              <span className="text-main text-semibold">Apertura</span>
            </Cell>
            <Cell className="text-center">
              <span className="text-warning text-semibold">- 8.55%</span>
            </Cell>
          </Row>
          <Row>
            <Cell style={{ lineHeight: props.lineHeight }}>
              <span className="text-main text-semibold">Mínimo</span>
            </Cell>
            <Cell className="text-center">
              <span className="text-success text-semibold">+ 58.56%</span>
            </Cell>
          </Row>
          <Row>
            <Cell style={{ lineHeight: props.lineHeight }}>
              <span className="text-main text-semibold">Máximo</span>
            </Cell>
            <Cell className="text-center">
              <span className="text-success text-semibold">+ 35.76%</span>
            </Cell>
          </Row>
        </NiftyTable>
      </div>
    </div>
  );
};

export default dolarPrices;
