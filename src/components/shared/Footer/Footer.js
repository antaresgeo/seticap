import React from 'react';
import poweredePayco from '../../../assets/img/powered_01.png';
import setFXNegative from '../../../assets/img/dolar-fx-logo.png';
import classes from './Footer.css'
const Footer = (props) => {
    return (
        <React.Fragment>
            <div className="row">
                <div className={["col-md-12", classes.PoweredByEpayco].join(' ')}>
                    <img src={poweredePayco} alt="powered ePayco" />
                </div>
            </div>
            <div className="row foo">
                <div className={classes.SitemapBackground}></div>
                <div className={["row", classes.SiteMap].join(' ')}>
                    <div className="col-md-2 col-sm-12">
                        <div className={classes.Col100}>
                            <img style={{ maxWidth: '200px' }} src={setFXNegative} className={classes.SetFXNegative} alt="Set fx logo negative" />
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <ul className={classes.FooterMiddle}>
                            <li><a>Política de Privacidad y Tratamiento de Datos Personales</a></li>
                            <li><a> Términos y Condiciones de Uso</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <div className={classes.LastMiddle}>
                            <div className="col-md-12 col-sm-12">
                                <h5>Mapa del sitio</h5>
                            </div>
                            <div className="col-md-12">
                                <ul>
                                    <li><a>Productos y Servicios</a></li>
                                    <li><a>Mercado Cambiario</a></li>
                                    <li><a>SET - FX</a></li>
                                    <li><a>Contacto</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <ul className={classes.Address}>
                            <li>Cra. 11 No. 93 - 46 Oficina 403</li>
                            <li>Llámenos: +57 (1) 742 77 77</li>
                            <li>Escríbanos: info@set-icap.co</li>
                            <li>Bogotá D.C</li>
                        </ul>
                    </div>
                </div>
                <div className={classes.RightReservedBackground}></div>
                <div className={["col-md-12", "text-center", classes.RightReserved].join(' ')}>
                    © 2018 SET-ICAP | Todos los derechos reservados
            </div>
            </div>
        </React.Fragment>
    )
}

export default Footer;