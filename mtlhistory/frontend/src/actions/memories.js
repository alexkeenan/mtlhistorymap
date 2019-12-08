import axios from 'axios'
import {
    GET_MEMORIES,
} from "./types";
import { TokenConfig } from './auth'


export const getMemories = () => (dispatch, getState) => {
    axios
        .get('api/memories', TokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_MEMORIES,
                payload: res.data
            })
        })
        .catch(err => console.log(err.response.data))
}
