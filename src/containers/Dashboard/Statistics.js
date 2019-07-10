import React, { Component } from 'react';
import { Http } from '../../axiosInstances';

const strip_html_tags = (str, rep="") => {
    if ((str===null) || (str===''))
        return false;
    else
    str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, rep);
}


class StatisticsComponent extends Component{
    state = {
        sectorInfo: {
            titles: [],
            info: []
        },
        realInfo: {
            titles: [],
            info: []
        }
    }

    mapTable(response){
        const parser = new DOMParser();
        let parserTable = parser.parseFromString(response.data, "text/html");
        const sectorInfoTitles = Array.from(parserTable.querySelectorAll(".sectores_header > tbody > tr > th")).map(
            cell => strip_html_tags(cell.innerHTML, ' '));
        
        const sectorInfo = Array.from(parserTable.querySelectorAll('.sectores > tbody > tr')).map(
            row => Array.from(row.querySelectorAll('td')).map(
                cell => strip_html_tags(cell.innerHTML, ' ')
            )
        );
        return {
            titles: sectorInfoTitles,
            info: sectorInfo
        }
    }

    componentDidMount(){
        Http.get('sector.html?sector=interbancario&ajax=true').then(
            response => {
                const info = this.mapTable(response)
                this.setState({
                    ...this.state,
                    sectorInfo: info
                })
            }
        )

        Http.get('sector.html?sector=real&ajax=true').then(
            response => {
                const info = this.mapTable(response)
                this.setState({
                    ...this.state,
                    realInfo: info
                })
            }
        )

        
    }

    render(){
        return(
            <div id="content-container">
                <div id="page-content">
                <div style={{marginTop: "6%"}}>
                    <div className="row">
                        <h4><span className="badge badge-warning">ICMS / ICMS</span></h4>
                    </div>
                    <div className="row">
                        <div className="col-md-12" style={{backgroundColor: 'white'}}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        { this.state.sectorInfo.titles.map(title => <th key={title}>{title}</th> )}
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.sectorInfo.info.map( (row, i) => <tr key={`srow-${i}`}>{row.map( (cell, j) => <td key={`scell-${i}${j}`} >{ cell }</td> )}</tr>) }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <h4><span className="badge badge-warning">ICMS - Clientes</span></h4>
                    </div>
                    <div className="row">
                        <div className="col-md-12" style={{backgroundColor: 'white'}}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        { this.state.realInfo.titles.map(title => <th key={title}>{title}</th> )}
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.realInfo.info.map( (row, i) => <tr key={`rrow-${i}`}>{row.map( (cell, j) => <td key={`rcell-${i}${j}`} >{ cell }</td> )}</tr>) }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default StatisticsComponent;