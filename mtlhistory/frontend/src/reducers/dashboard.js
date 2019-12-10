import reducers from 'react-redux'

import {
    TOGGLE_INFOWINDOW,
    TOGGLE_SHOWPANORAMA,
    SET_ACTIVEMARKER,
    SET_SELECTEDPLACE
} from "../actions/types";


const initialState = {
    showInfoWindow: false,
    showPanorama: false,
    activeMarker: {},
    //selectedPlace: {name: "",},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_INFOWINDOW:
            return {
                ...state,
                showInfoWindow: !state.showInfoWindow
            }
        case TOGGLE_SHOWPANORAMA:
            return {
                ...state,
                showPanorama: !state.showPanorama
            }
        case SET_ACTIVEMARKER:
            return {
                ...state,
                activeMarker: action.payload
            }
        case SET_SELECTEDPLACE: return { ...state, selectedPlace: action.payload }


        default:
            return state
    }
}

