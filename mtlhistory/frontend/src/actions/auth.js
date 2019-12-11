import axios from 'axios'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR

} from "./types";

import { returnErrors } from "./messages";



// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });

    const token = getState().auth.token
    if (token) {
        axios
            .get("/api/auth/user", TokenConfig(getState))
            .then(res => {
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: AUTH_ERROR
                });
            });
    }

};

export const login = (username, password) => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({ username, password })

    axios
        .post('api/auth/login', body, config)
        .then(res => {
            console.log("success logging in")
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log("error logging in")
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

//REGISTER
export const register = ({ username, password, email }) => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ username, password, email })

    axios.post('api/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: REGISTER_FAIL
            })
        })
}


export const logout = () => (dispatch, getState) => {


    axios.post('api/auth/logout', null, TokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        })
        .catch(err => console.log(err.response.data)
        )
}

export const TokenConfig = getState => {

    const token = getState().auth.token

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    if (token) {
        config.headers["Authorization"] = `Token ${token}`
    }

    return config
}