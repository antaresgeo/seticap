import React,{Component} from 'react';
import Layout from '../../../components/Auth/Layout';
import classes from './CreateAccount.css';
import {Link} from 'react-router-dom';
import { withFormik, Field } from 'formik';

class CreateAccount extends Component{
    render(){
        return(
            <Layout>
                <div className="panel-body">
		            <div className={["mar-ver", "pad-btm", classes.TitleSection].join(' ')}>
		                <h1 className="h3">Crear una nueva cuenta</h1>
		                <p>¡Únete a SET-ICAP | FX!. Vamos a configurar tu cuenta</p>
		            </div>
		            <form>
		                <div className="row">
		                    <div className="col-sm-6">
								<div className="form-group">
									<Field type="text" name="firstName" placeholder="Nombre completo" className="form-control"></Field>
								</div>
								<div className="form-group">
									<Field type="text" name="lastName" placeholder="Apellidos" className="form-control"></Field>
								</div>
								<div className="form-group">
									<Field type="text" name="enterprise" placeholder="Empresa" className="form-control"></Field>
								</div>
								<div className="form-group">
									<Field component="select" name="legalPerson" className="form-control">
										<option value="natural">Persona natural</option>
										<option value="juridica">Persona jurídica</option>
									</Field>
								</div>
								<div className="form-group">
									<Field name="identification" component="select" className="form-control">
										<option value="C">Cédula</option>
										<option value="N">Nit</option>
									</Field>
								</div>
		                    </div>
		                    <div className="col-sm-6">
								<div className="form-group">
									<Field name="identificationNumber" placeholder="Número de identificación" className="form-control"></Field>
								</div>
								<div className="form-group">
									<Field name="email" placeholder="Email" className="form-control"></Field>
								</div>
								<div className="form-group">
									<Field name="country" placeholder="País" className="form-control"></Field>
								</div>
								<div className="form-group">
									<Field name="city" placeholder="Ciudad" className="form-control"></Field>
								</div>
								<div className="form-group">
									<Field name="telephone" placeholder="Teléfono" className="form-control"></Field>
								</div>
		                    </div>
		                </div>
		                <div className="checkbox pad-btm text-left">
							<label>
							<Field type="checkbox" name="termsandconds" checked={this.props.values.termsandconds}></Field>
								Acepto <a className="btn-link text-bold">Terminos y condiciones.</a>
							</label>
		                </div>
		                <button className="btn btn-primary btn-lg btn-block" type="submit">Registrarse</button>
		            </form>
		        </div>
				<div className="pad-all">
		            <p>¿Ya tienes una cuenta? <Link to="/auth/login/" className="btn-link">Inicia sesión</Link></p>
		        </div>
            </Layout>
        )
    }
}

const mapPropsToValues = (props) => {
	return {
		firstName : props.firstName || '',
		lastName: props.lastName || '',
		enterprise: props.enterprise || '',
		legalPerson: props.legalPerson || 'natural',
		identification: props.identification || '',
		identificationNumber: props.identificationNumber || '',
		email: props.email || '',
		country: props.country || '',
		city: props.city || '',
		telephone: props.telephone || '',
		termsandconds: props.termsandconds || true
	}
}

export default withFormik({ mapPropsToValues: mapPropsToValues })(CreateAccount)