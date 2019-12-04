import reducers from 'react-redux'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("Token"),
    isAuthenticated: false,
    user: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem("Token")
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null

            }
        default:
            return state

    }
}