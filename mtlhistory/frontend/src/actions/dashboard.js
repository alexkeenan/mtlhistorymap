import {
    TOGGLE_INFOWINDOW,
    TOGGLE_SHOWPANORAMA,
    SET_ACTIVEMARKER,
    SET_SELECTEDPLACE,
    GOOGLEAPI_SET,
    CLUSTERAPI_SET
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

export const getGoogleAPI = activeMarker => dispatch => {

    const script = document.createElement("script");

    //script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBo5X5wnWjZuNrmmAnIon65aH2lcAbgDIU&libraries=places`;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&libraries=places`;


    script.async = true;
    document.head.appendChild(script);

    script.addEventListener('load', () => {
        dispatch({
            type: GOOGLEAPI_SET,
            payload: true
        })
    })
}



export const getCluster = activeMarker => dispatch => {
    const script = document.createElement("script");
    script.src = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";

    script.async = true;
    document.head.appendChild(script);

    script.addEventListener('load', () => {
        dispatch({
            type: CLUSTERAPI_SET,
            payload: true
        })
    })
}


export const setSelectedPlace = (selectedPlace) => dispatch => {
    console.log("setSelectedPlace FIRING")
    console.log("selectedPlace")
    console.log(selectedPlace)
    dispatch({ type: SET_SELECTEDPLACE, payload: selectedPlace })
}









