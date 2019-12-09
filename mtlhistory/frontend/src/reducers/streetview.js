import reducers from 'react-redux'
import {
    GET_PANORAMA,
} from "../actions/types";

const initialState = {
    panoramaReady: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PANORAMA:
            console.log("got to reducer")
            return {
                ...state,
                panoramaReady: action.payload
            }
        default:
            return state

    }
}
