import reducers from 'react-redux'

import {
    TOGGLE_INFOWINDOW,
    TOGGLE_SHOWPANORAMA,
    SET_ACTIVEMARKER,
    SET_SELECTEDPLACE,
    GOOGLEAPI_SET,
    CLUSTERAPI_SET

} from "../actions/types";


const initialState = {
    showInfoWindow: false,
    showPanorama: false,
    activeMarker: {},
    googleApiLoaded: false,
    clustersLoaded: false,
    selectedPlace: "none"
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
        case GOOGLEAPI_SET:
            return {
                ...state,
                googleApiLoaded: true
            }
        case CLUSTERAPI_SET:
            return {
                ...state,
                clustersLoaded: true
            }
        case SET_SELECTEDPLACE: return { ...state, selectedPlace: action.payload }


        default:
            return state
    }
}

