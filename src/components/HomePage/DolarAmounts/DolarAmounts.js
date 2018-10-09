import React from 'react';
import NiftyTable from '../../Nifty/UI/Table/NiftyTable';
import Row from '../../Nifty/UI/Table/Row/NiftyRow';
import Cell from '../../Nifty/UI/Table/Row/NiftyCell';
import classes from './DolarAmounts.css';

const dolarAmounts = (props) => {
    return (
        <div className={["panel", "panel-primary", classes.DolarAmounts].join(' ')} style={{paddingBottom: '2px'}}>
            <div class="panel-heading">
                <h3 class="panel-title">Precios del dolar</h3>
            </div>
            <div className={["panel-body", classes.Body].join(" ")}>
            <NiftyTable lineHeight="18px">
                    <Row>
                        <Cell>
                            <span class="text-main text-semibold">Negociado</span>
                        </Cell>
                        <Cell class="text-center"><span class="text-danger text-semibold">- 28.76%</span></Cell>
                    </Row>
                    <Row>
                        <Cell>
                            <span class="text-main text-semibold">Último</span>
                        </Cell>
                        <Cell class="text-center"><span class="text-warning text-semibold">- 8.55%</span></Cell>
                    </Row>
                    <Row>
                        <Cell>
                            <span class="text-main text-semibold">Promedio</span>
                        </Cell>
                        <Cell class="text-center"><span class="text-success text-semibold">+ 58.56%</span></Cell>
                    </Row>
                    <Row>
                        <Cell>
                            <span class="text-main text-semibold">Mínimo</span>
                        </Cell>
                        <Cell class="text-center"><span class="text-success text-semibold">+ 35.76%</span></Cell>
                    </Row>
                    <Row>
                        <Cell>
                            <span class="text-main text-semibold">Máximo</span>
                        </Cell>
                        <Cell class="text-center"><span class="text-success text-semibold">+ 35.76%</span></Cell>
                    </Row>
                    <Row>
                        <Cell>
                            <span class="text-main text-semibold">Transacciones</span>
                        </Cell>
                        <Cell class="text-center"><span class="text-success text-semibold">+ 35.76%</span></Cell>
                    </Row>
            </NiftyTable>
            </div>
        </div>
    )
}

export default dolarAmounts;