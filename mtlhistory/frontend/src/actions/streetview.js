import axios from 'axios'
import {
    GET_PANORAMA,
} from "./types";


export const getPanorama = () => (dispatch) => {

    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBMNy2d4VK0AWVfUSDYe3luvrFykVhNsZk";


    script.async = true;
    document.body.appendChild(script);

    script.addEventListener('load', () => {
        dispatch({
            type: GET_PANORAMA,
            payload: true
        })
    })


}