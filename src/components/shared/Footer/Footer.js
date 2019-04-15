import React from 'react';
import poweredePayco from '../../../assets/img/powered_01.png';
import setFXNegative from '../../../assets/img/SET-ICAP FX neg.png';
import classes from './Footer.css'
const Footer = (props) => {
    return (
        <div className="row">
            <div className={["col-md-12", classes.PoweredByEpayco].join(' ')}>
                <img src={poweredePayco} alt="powered ePayco"/>
            </div>
            <div className={classes.SitemapBackground}></div>
            <div className={["col-md-12", classes.SiteMap].join(' ')}>
                <div className="col-md-4">
                    <img src={setFXNegative} className={classes.SetFXNegative} alt="Set fx logo negative"/>
                    <div className={classes.VDivider}>
                    </div>
                </div>
                <div className="col-md-4">
                    <ul className={classes.FooterMiddle}>
                        <li><a>Política de Privacidad y Tratamiento de Datos Personales</a></li>
                        <li><a> Términos y Condiciones de Uso</a></li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <div className={classes.LastMiddle}>
                    <div className="col-md-12">
                        <h4>Mapa del sitio</h4>
                    </div>
                    <div className="col-md-6">
                        <ul>
                            <li><a>Productos y Servicios</a></li>
                            <li><a>Mercado Cambiario</a></li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <ul>
                            <li><a>SET - FX</a></li>
                            <li><a>Contacto</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
            <div className={classes.RightReservedBackground}></div>
            <div className={["col-md-12", "text-center", classes.RightReserved].join(' ')}>
                © 2018 SET-ICAP | Todos los derechos reservados
            </div>
        </div>
    )
}

export default Footer;