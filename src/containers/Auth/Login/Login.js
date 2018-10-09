import React, {Component} from 'react';
import Button from '../../../components/Nifty/UI/Button/Button'
import classes from './Login.css';
import Layout from '../../../components/Auth/Layout';
import {Link} from 'react-router-dom';
import { withFormik, Field } from 'formik';

class LoginContainer extends Component {  
    render(){
        return (
            <Layout>
                <div className="panel-body">
		            <div className={['mar-ver', 'pad-btm', classes.TitleSection].join(' ')}>
		                <h1 className="h3">Iniciar sesión</h1>
		                <p>Inicia sesión en tu cuenta de SET-ICAP | FX</p>
		            </div>
		            <form>
                        <div className="form-group">
                            <Field name="username" placeholder="Usuario" className="form-control"></Field>
                        </div><div className="form-group">
                            <Field type="password" name="password" placeholder="Contraseña" className="form-control"></Field>
                        </div>
		                <div className="checkbox pad-btm text-left">
		                    <label>
                                 <Field name="rememberme" type="checkbox" />
                                Recuerdame
                            </label>
		                </div>
                        
		                <Button>Iniciar sesión</Button>
		            </form>
		        </div>
                <div className="pad-all">
		            <Link to="/auth/forgot-password/" className="btn-link pull-left">¿Olvidaste tu contraseña?</Link>
		            <Link to="/auth/create-account/" className="btn-link pull-right">Crear nueva cuenta</Link>
		        </div>
            </Layout>
        )
    }
}
const mapPropsToValues = (props) => {
    return {
        user: props.user || '',
        password: props.password || '',
        rememberme: props.rememberme || ''
    }
}
export default withFormik({
    mapPropsToValues:mapPropsToValues
})(LoginContainer);