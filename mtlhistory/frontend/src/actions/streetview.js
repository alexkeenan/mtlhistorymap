import axios from 'axios'
import {
    GET_PANORAMA,
} from "./types";

import { TokenConfig } from './auth'

export const getPanorama = () => (dispatch) => {

    //console.log("process.env.API_KEY")
    //console.log(process.env.API_KEY)
    const script = document.createElement("script");
    //script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBo5X5wnWjZuNrmmAnIon65aH2lcAbgDIU&libraries=places`;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&libraries=places`;


    script.async = true;
    document.body.appendChild(script);

    script.addEventListener('load', () => {
        dispatch({
            type: GET_PANORAMA,
            payload: true
        })
    })


}
