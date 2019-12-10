import {
    TOGGLE_INFOWINDOW,
    TOGGLE_SHOWPANORAMA,
    SET_ACTIVEMARKER,
    SET_SELECTEDPLACE
} from "./types";




export const toggleInfoWindow = () => dispatch => {
    dispatch({
        type: TOGGLE_INFOWINDOW,
    })
}
export const toggleShowPanorama = () => dispatch => {
    dispatch({
        type: TOGGLE_SHOWPANORAMA,
    })
}
export const setActiveMarker = activeMarker => dispatch => {
    dispatch({
        type: SET_ACTIVEMARKER,
        payload: activeMarker
    })
}
//export const setSelectedPlace = (selectedPlace) => dispatch => {    dispatch({        type: SET_SELECTEDPLACE,        payload: selectedPlace    })}









