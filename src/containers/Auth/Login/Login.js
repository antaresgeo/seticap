import React, { Component } from "react";
import Button from "../../../components/Nifty/UI/Button/Button";
import classes from "./Login.css";
import Layout from "../../../components/Auth/Layout";
import { Link } from "react-router-dom";
import { withFormik, Field } from "formik";
import { connect } from "react-redux";
import actions from "../../../store/actions/auth.actions";
class LoginContainer extends Component {
  render() {
    return (
      <Layout>
        <div className="panel-body">
          <div
            className={["mar-ver", "pad-btm", classes.TitleSection].join(" ")}
          >
            <h1 className="h3">Iniciar sesión</h1>
            <p>Inicia sesión en tu cuenta de SET-ICAP | FX</p>
          </div>
          <form onSubmit={this.props.handleSubmit}>
            <div
              className={[
                "form-group",
                this.props.errors.username && this.props.touched.username ? "has-error" : ""
              ].join(" ")}
            >
              <Field
                name="username"
                placeholder="Usuario"
                className="form-control"
              />
              {this.props.errors.username &&
                this.props.touched.username && (
                  <div className="help-block">{this.props.errors.username}</div>
                )}
            </div>
            <div
              className={[
                "form-group",
                this.props.errors.password && this.props.touched.password ? "has-error" : ""
              ].join(" ")}
            >
              <Field
                type="password"
                name="password"
                placeholder="Contraseña"
                className="form-control"
              />
              {this.props.errors.password &&
                this.props.touched.password && (
                  <div className="help-block">{this.props.errors.password}</div>
                )}
            </div>
            <div className="checkbox pad-btm text-left">
              <label>
                <Field name="rememberme" type="checkbox" />
                Recuerdame
              </label>
            </div>

            <Button type="submit">Iniciar sesión</Button>
          </form>
        </div>
        <div className="pad-all">
          <Link to="/auth/forgot-password/" className="btn-link pull-left">
            ¿Olvidaste tu contraseña?
          </Link>
          <Link to="/auth/create-account/" className="btn-link pull-right">
            Crear nueva cuenta
          </Link>
        </div>
      </Layout>
    );
  }
}
const mapPropsToValues = props => {
  return {
    username: props.username || "",
    password: props.password || "",
    rememberme: props.rememberme || ""
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password, history) => dispatch(actions.login(username, password, history))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues: mapPropsToValues,
    validate: values => {
      const errors = {};
      if (!values.username) {
        errors.username = "El usuario es requerido";
      }
      if (!values.password) {
        errors.password = "Por favor digite una contraseña";
      }
      return errors;
    },
    handleSubmit(values, cmp) {
      cmp.props.login(values.username, values.password, cmp.props.history);
    }
  })(LoginContainer)
);
