import { authActionTypes } from "../actions/actionTypes";
import { Http, AuthHttp } from "../../axiosInstances";

export const login = (user, password, history) => {
    return dispatch => {
        dispatch(authStart());
        Http.post("/login/", { username: user, password: password })
            .then(response => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", response.data.user);
                dispatch(authFinished(response.data));
                history.push("/dashboard/");
            })
            .catch(err => {
                dispatch(authError(err.response.data.error));
            });
    };
};

const authStart = () => {
    return {
        type: authActionTypes.LOGIN_START
    };
};

const authFinished = auth => {
    return {
        type: authActionTypes.LOGIN_SUCCESS,
        payload: auth
    };
};

const autoLogin = () => {
    return {
        type: authActionTypes.LOGIN_INITIAL_CHECK
    };
};

const authError = error => {
    return {
        type: authActionTypes.LOGIN_ERROR,
        payload: error
    };
};

const authCheckLogin = () => {
    return dispatch => {
        dispatch(autoLogin());
        const token = localStorage.getItem("token");
        if (token !== "") {
            AuthHttp.get("/check/login/").then(({ data }) => {
                if (data.active) {
                    const user = localStorage.getItem("user");
                    dispatch(authFinished({ token, user }));
                } else {
                    dispatch(logout());
                }
            });
        }
    };
};

const logout = () => {
    return {
        type: authActionTypes.LOGOUT
    };
};

export default {
    login: login,
    checkLogin: authCheckLogin,
    logout: logout
};
